const express = require('express');
const app = express();
const cors = require('cors');
const port = 3027;


// Configurar la base de datos
const db = require('./config/database');
require('./config/cloudinary');

const allowedOrigins = ['http://localhost:3000', 'http://www.proyectologistica.online'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use('/', require('./routes/categories'));
app.use('/', require('./routes/colors'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/products'));
app.use('/', require('./routes/inventories/inventoriesPto1'));
app.use('/', require('./routes/inventories/inventoriesPto2'));
app.use('/', require('./routes/inventories/inventories'));
app.use('/', require('./routes/orders'));
app.use('/', require('./routes/paymentMethods'));
app.use('/', require('./routes/paymentStates'));
app.use('/', require('./routes/logAction'));
app.use('/', require('./routes/pod'));

app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
