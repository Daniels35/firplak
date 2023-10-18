const PDFDocument = require('pdfkit');
const fs = require('fs');
const OrdersModel = require('../models/ordersModel');
const QRCode = require('qrcode');

function formatPriceWithCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Controlador para generar un documento de entrega en formato PDF
exports.generateDeliveryDocument = (req, res) => {
  const orderId = req.params.id;
  // Obtener la información de la orden correspondiente a la orderId
  OrdersModel.getOrderById(orderId, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la orden', err });
    }
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();
    doc.rect(10, 10, 590, 750).stroke();
    doc.moveDown(-4);
    console.log(__dirname + '/logolarge.png');
    doc.image(__dirname + '/logolarge.png', { width: 200, height: 150 });
    // Generar el contenido del documento PDF usando la información de la orden
    doc.text('Documento de Entrega');
    doc.moveDown(2);
    doc.text(`ID de la Orden: ${order.id}`);
    doc.moveDown();
    // Dar formato a la fecha en que se generó la orden
    const generatedDateOptions = { timeZone: 'America/Bogota' };
    const formattedGeneratedDate = order.generated_date.toLocaleString('es-CO', generatedDateOptions);
    doc.text(`Fecha en que la Orden se genero: ${formattedGeneratedDate}`);
    doc.moveDown();
    doc.text(`Cliente: ${order.client_name}`);
    doc.moveDown();
    doc.text(`Dirección de Entrega: ${order.delivery_address}`);
    doc.moveDown();
    doc.text(`Número del cliente: ${order.phone_number}`);
    doc.moveDown();
    doc.text(`Metodo de pago: ${order.payment_method_id}`);
    doc.moveDown();
    doc.text(`Tipo de pago: ${order.payment_status_id}`);
    doc.moveDown();
    doc.text(`Fecha de despacho de la bodega: ${order.dispatch_date}`);
    doc.moveDown();
    doc.text(`Fecha estimada de Entrega: ${order.delivery_date}`);
    doc.moveDown();
    doc.text('Productos:');
    doc.moveDown();
    order.products.forEach((product) => {
      doc.text(`- Producto: ${product.id_product}, Cantidad: ${product.cantidad}`);
    });
    doc.moveDown(3);
    const formattedPrice = formatPriceWithCommas(order.price);
    doc.text('', { continued: true }); // Espacio para mover el texto a la derecha
    doc.text(`Total: $${formattedPrice} COP`, { align: 'right' });
    // Agregar una línea en blanco para la firma
    doc.moveDown(3);
    doc.moveTo(70, doc.y).lineTo(200, doc.y, { width: 1 }).stroke();
    doc.moveDown(0.5);
    doc.text('Firma Cliente');

    // Generar un enlace o URL que apunte al documento o a una página de edición 
    //(CAMBIARLO PARA QUE ENVIE AL REPARTIDOR A LA ENTREGA (POD))
    const documentUrl = `${process.env.BASE_URL}/orders/${orderId}/delivery/preview`;

    // Generar el código QR
    QRCode.toDataURL(documentUrl, (err, url) => {
      if (err) {
        console.error(err);
        // Manejar el error si es necesario
      } else {
        // Insertar la imagen del código QR en el PDF
        doc.image(url, 480, doc.y - 570, { width: 80, height: 80 });
      }

      // Finalizar el documento
      doc.end();
      // Enviar el documento como respuesta al cliente
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=Documento_Entrega_${orderId}.pdf`);
      doc.pipe(res);
    });
  });
};
