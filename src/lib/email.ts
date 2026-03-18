import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Vitimização Angola - Vitimização Criminal" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email enviado: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error };
  }
}

export function getWelcomeEmailHTML(name: string, role: string) {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/login`;
  
  const roleNames: Record<string, string> = {
    ADMIN: "Administrador",
    RESEARCHER: "Investigador",
    POLICE: "Autoridade Policial",
    CITIZEN: "Cidadão"
  };

  const roleName = roleNames[role.toUpperCase()] || role;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Bem-vindo(a) ao Sistema de Vitimização</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${name}</strong>,</p>
        <p>A sua conta foi criada com sucesso!</p>
        <p>Abaixo estão os detalhes do seu acesso:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Perfil de Acesso:</strong> ${roleName}</li>
        </ul>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Aceder à minha conta
          </a>
        </p>
        <p style="font-size: 0.9em; color: #666; margin-top: 40px;">
          Se não solicitou este registo, por favor ignore este e-mail.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy;  2026 Vitimização Angola - Sistema de Vitimização Criminal. Todos os direitos reservados.
      </div>
    </div>
  `;
}
