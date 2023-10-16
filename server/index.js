const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// Configurar la base de datos
const db = require('./config/database');

const allowedOrigins = ['http://localhost:3000', 'http://another-example.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use('/', require('./routes/categories'));
app.use('/', require('./routes/colors'));

app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
