import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  return NextResponse.json({ message: `Se existir uma conta com o e-mail ${email}, um link para redefinir a senha foi enviado.` }, { status: 200 });
}
