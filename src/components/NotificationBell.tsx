"use client";

import React, { useState, useEffect } from "react";
import { Bell, CheckCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuHeader,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
  type: string;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchNotifications = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`/api/notifications?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user?.id]);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.read) {
        await fetch("/api/notifications", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: notification.id }),
        });
        fetchNotifications();
      }
      router.push(notification.link);
    } catch (error) {
      console.error("Error updating notification:", error);
      router.push(notification.link);
    }
  };

  const markAllAsRead = async () => {
    if (!user?.id) return;
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, all: true }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-muted transition-colors rounded-full">
          <Bell className="h-5 w-5 text-foreground/80" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-background animate-in zoom-in duration-300">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0 shadow-2xl border-none bg-card/95 backdrop-blur-md" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-sm">Notificações</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[10px] h-7 px-2 text-primary hover:text-primary/80 flex items-center gap-1"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3 w-3" /> Marcar todas como lidas
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[350px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
              <Bell className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">Sem notificações no momento.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.read ? "bg-primary/5 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-bold ${!notification.read ? "text-primary" : "text-foreground/70"}`}>
                      {notification.title}
                    </span>
                    {!notification.read && <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-[9px] text-muted-foreground/60">
                    <Clock className="h-3 w-3" />
                    {formatTime(notification.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button 
            variant="ghost" 
            className="w-full text-[10px] h-8 text-muted-foreground hover:text-foreground"
            onClick={() => router.push(user?.role === "CITIZEN" ? "/dashboard/occurrences" : "/dashboard")}
          >
            Ver todas as atividades
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
