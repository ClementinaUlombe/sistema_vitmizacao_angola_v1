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
  // Verificação de ambiente para simulação (se não houver credenciais reais)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("--- MODO DE SIMULAÇÃO DE E-MAIL ---");
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log("Conteúdo: [HTML suprimido]");
    console.log("-----------------------------------");
    
    // Simula um delay de rede para parecer real
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, messageId: "simulated-id-" + Date.now() };
  }

  try {
    const info = await transporter.sendMail({
      from: `"SambaSegura - Inteligência Criminal" <${process.env.SMTP_USER}>`,
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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const loginUrl = `${appUrl}/auth/login?role=${role.toUpperCase()}`;
  
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
        <h1 style="margin: 0;">Bem-vindo(a) ao SambaSegura</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${name}</strong>,</p>
        <p>A sua conta foi criada com sucesso no sistema de inteligência criminal da Samba!</p>
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
        &copy; 2026 SambaSegura - Todos os direitos reservados.
      </div>
    </div>
  `;
}

export function getPasswordResetEmailHTML(name: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password?token=${token}`;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Recuperação de Senha</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${name}</strong>,</p>
        <p>Recebemos um pedido para redefinir a sua senha no sistema <strong>SambaSegura</strong>.</p>
        <p>Para prosseguir, clique no botão abaixo:</p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Redefinir Minha Senha
          </a>
        </p>
        <p style="font-size: 0.9em; color: #666; margin-top: 40px;">
          Se você não solicitou esta alteração, pode ignorar este e-mail. O link expira em 1 hora.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy; 2026 SambaSegura - Luanda, Angola.
      </div>
    </div>
  `;
}

export function getReportSubmissionEmailHTML(recipientName: string, citizenName: string, subject: string, message: string, role: string = "POLICE") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const loginWithRedirect = `${appUrl}/auth/login?redirect=${encodeURIComponent('/dashboard/occurrences')}&role=${role.toUpperCase()}`;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Novo Relato de Crime</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${recipientName}</strong>,</p>
        <p>Um novo relato de crime foi submetido por <strong>${citizenName}</strong>.</p>
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Assunto:</strong> ${subject}</p>
          <p style="margin: 10px 0; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? "..." : ""}"</p>
        </div>
        <p>Por favor, aceda ao sistema para analisar a situação e tomar as medidas necessárias.</p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${loginWithRedirect}" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Analisar Ocorrência
          </a>
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy; 2026 SambaSegura - Emergência e Segurança.
      </div>
    </div>
  `;
}

export function getReportResponseEmailHTML(citizenName: string, subject: string, status: string, role: string = "CITIZEN") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const loginWithRedirect = `${appUrl}/auth/login?redirect=${encodeURIComponent('/dashboard/occurrences')}&role=${role.toUpperCase()}`;
  const isValidated = status === "Validado";
  const statusLabel = isValidated ? "Validado / Em Processamento" : status;
  const statusColor = isValidated ? "#059669" : "#1e3a8a";
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Atualização do seu Relato</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${citizenName}</strong>,</p>
        <p>O seu relato de crime intitulado "<strong>${subject}</strong>" recebeu uma atualização das autoridades.</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 10px 20px; border-radius: 5px; background-color: ${statusColor}; color: white; font-weight: bold;">
            Status: ${statusLabel}
          </div>
        </div>
        <p>Agradecemos a sua colaboração para uma Samba mais segura. Pode acompanhar o progresso detalhado no seu painel.</p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${loginWithRedirect}" style="background-color: #f3f4f6; color: #1e3a8a; border: 1px solid #1e3a8a; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Ver Meu Relato
          </a>
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy; 2026 SambaSegura - Polícia e Cidadania.
      </div>
    </div>
  `;
}

export function getInquirySubmissionEmailHTML(adminName: string, researcherName: string, residentName: string, residentNumber: string, role: string = "ADMIN") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const loginWithRedirect = `${appUrl}/auth/login?redirect=${encodeURIComponent('/dashboard/data-entry?admin=true')}&role=${role.toUpperCase()}`;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Novo Inquérito Submetido</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${adminName}</strong>,</p>
        <p>Um novo lançamento de inquérito foi submetido pelo investigador <strong>${researcherName}</strong>.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Nº Inquérito:</strong> ${residentNumber}</p>
          <p style="margin: 5px 0;"><strong>Residente:</strong> ${residentName}</p>
        </div>
        <p>Por favor, aceda ao painel de administração para validar os dados.</p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${loginWithRedirect}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verificar Lançamento
          </a>
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy; 2026 SambaSegura - Inteligência Criminal.
      </div>
    </div>
  `;
}

export function getInquiryValidationEmailHTML(researcherName: string, residentNumber: string, status: string, role: string = "RESEARCHER") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  // Link to login with redirect so the investigator can authenticate and then see their submissions
  const loginWithRedirect = `${appUrl}/auth/login?redirect=${encodeURIComponent('/dashboard/data-entry')}&role=${role.toUpperCase()}`;
  const isValidated = status === "VALIDADO";
  const statusLabel = isValidated ? "Validado" : "Rejeitado";
  const statusColor = isValidated ? "#10b981" : "#ef4444";
  const statusIcon = isValidated ? "✅" : "❌";
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Atualização de Inquérito</h1>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #333;">
        <p>Olá, <strong>${researcherName}</strong>,</p>
        <p>O seu lançamento de inquérito <strong>#${residentNumber}</strong> foi processado.</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 10px 20px; border-radius: 50px; background-color: ${statusColor}15; border: 2px solid ${statusColor}; color: ${statusColor}; font-weight: bold; font-size: 1.2em;">
            ${statusIcon} ${statusLabel}
          </div>
        </div>
        <p>O administrador concluiu a revisão do seu envio. Pode consultar os detalhes no seu histórico de lançamentos.</p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="${loginWithRedirect}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Ver Meus Lançamentos
          </a>
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 0.8em; color: #999; border-top: 1px solid #e0e0e0;">
        &copy; 2026 SambaSegura - Luanda, Angola.
      </div>
    </div>
  `;
}
