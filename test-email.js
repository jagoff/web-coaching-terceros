// Test script para verificar API de Resend
const { Resend } = require('resend');

const resend = new Resend('re_bQJPCJtM_5MFRSRQNenTxFxLFEmJN4Dyo');

async function testEmail() {
  try {
    console.log('Enviando email de prueba...');
    
    const result = await resend.emails.send({
      from: 'ELEVA Coaching <onboarding@resend.dev>',
      to: 'fernandoferrari@gmail.com',
      subject: '🧪 Test de Email - ELEVA Coaching',
      html: `
        <h1>✅ Email de prueba funcionando</h1>
        <p>Este es un test para verificar que la API de Resend está configurada correctamente.</p>
        <p>Si recibes esto, el formulario funcionará perfectamente.</p>
        <br>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });

    console.log('✅ Email enviado exitosamente:', result);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
  }
}

testEmail();
