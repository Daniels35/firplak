require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

if (cloudinary.config().cloud_name) {
  console.log('Configuración de Cloudinary exitosa.');
} else {
  console.error('Error al configurar Cloudinary. Verifica tus credenciales.');
}
