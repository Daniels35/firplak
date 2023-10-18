const PDFDocument = require('pdfkit');
const fs = require('fs');
const OrdersModel = require('../models/ordersModel');

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
    
    // Generar el contenido del documento PDF usando la información de la orden
    doc.text('Documento de Entrega');
    doc.text(`ID de la Orden: ${order.id}`);
    doc.text(`Fecha en que la Orden se genero: ${order.generated_date}`);
    doc.text(`Cliente: ${order.client_name}`);
    doc.text(`Dirección de Entrega: ${order.delivery_address}`);
    doc.text(`Número del cliente: ${order.phone_number}`);
    doc.text(`Metodo de pago: ${order.payment_method_id}`);
    doc.text(`Tipo de pago: ${order.payment_status_id}`);
    doc.text(`Fecha de despacho de la bodega: ${order.dispatch_date}`);
    doc.text(`Fecha estimada de Entrega: ${order.delivery_date}`);
    doc.text('Productos:');
    order.products.forEach((product) => {
      doc.text(`- Producto: ${product.id_product}, Cantidad: ${product.cantidad}`);
    })
    doc.text(`Total: ${order.price}`);
    
    // Finalizar el documento
    doc.end();

    // Enviar el documento como respuesta al cliente
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Documento_Entrega_${orderId}.pdf`);
    doc.pipe(res);
  });
};
