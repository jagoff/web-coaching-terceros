import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos básicos
    const { nombre, email, mensaje } = body;
    
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar email real
    const emailResult = await sendContactEmail({
      nombre,
      email,
      mensaje
    });

    if (!emailResult.success) {
      console.error('Error al enviar email:', emailResult.error);
      return NextResponse.json(
        { error: 'No se pudo enviar el mensaje. Por favor intenta más tarde.' },
        { status: 500 }
      );
    }

    console.log('✅ Email enviado exitosamente a fernandoferrari@gmail.com');
    console.log('Datos:', { nombre, email, mensaje });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Te responderemos en menos de 24 horas.',
        messageId: emailResult.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API contact:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
