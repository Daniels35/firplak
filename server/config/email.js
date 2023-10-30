const nodemailer = require('nodemailer');

const hostEmail = process.env.SMTP_HOST;
const portEmail = process.env.SMTP_PORT;
const userEmail = process.env.SMTP_USER;
const passEmail = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
    host: hostEmail,
    port: 465,
    auth: {
      user: userEmail,
      pass: passEmail,
    },
  });

  // Manejador de evento para verificar si el transporte está en línea
transporter.on('online', () => {
    console.log('El transporte de correo está en línea');
  });
  
  // Manejador de evento para verificar si el transporte se cierra
  transporter.on('close', () => {
    console.log('El transporte de correo se ha cerrado');
  });
  
  // También puedes manejar el evento 'error' para detectar errores en la conexión
  transporter.on('error', (error) => {
    console.error('Error en la conexión con el servidor SMTP:', error);
  });

module.exports = {
  sendAdminEmail: (subject, text) => {
    const mailOptionsAdmin = {
      from: 'contact@daniels35.com',
      to: 'dsdiaz317@misena.edu.co',
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptionsAdmin, (error, info) => {
      if (error) {
        console.error('Error al enviar correo al administrador: ', error);
      } else {
        console.log('Correo al administrador enviado: ' + info.response);
      }
    }
  )},
  sendUserEmail: () => {
    const mailOptionsUser = {
      from: 'contact@daniels35.com',
      to: "danielstiven35@gmail.com",
      subject: "Factura",
      text: "Este es un correo de prueba sin dirección de correo de usuario ni archivo adjunto.",
    };

    transporter.sendMail(mailOptionsUser, (error, info) => {
      if (error) {
        console.error('Error al enviar correo al usuario: ', error);
      } else {
        console.log('Correo al usuario enviado: ' + info.response);
      }
    }
  )},
};
