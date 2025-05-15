const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const logger = require('./logger');

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Cargar y compilar plantilla
const loadTemplate = async (templateName) => {
  const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
  const template = await fs.readFile(templatePath, 'utf-8');
  return handlebars.compile(template);
};

// Función principal de envío de email
exports.sendEmail = async ({ email, subject, template, data }) => {
  try {
    // Cargar plantilla
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(data);

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'BeardStyle <noreply@beardstyle.com>',
      to: email,
      subject,
      html
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email enviado: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Error al enviar email:', error);
    throw error;
  }
}; 