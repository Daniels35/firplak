const PDFDocument = require('pdfkit');
const fs = require('fs');
const OrdersModel = require('../../models/ordersModel');
const QRCode = require('qrcode');
const PaymentMethodsModel = require('../../models/paymentMethodsModel');
const PaymentStatesModel = require('../../models/paymentStatesModel');
const ProductModel = require('../../models/productsModel');

function formatPriceWithCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
// Controlador para generar un documento de entrega en formato PDF
exports.generateDeliveryDocument = (req, res) => {
  const orderId = req.params.id;
  const productPrices = [];
  // Obtener la información de la orden correspondiente a la orderId
  OrdersModel.getOrderById(orderId, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la orden', err });
    }
    const payment_method_id = order.payment_method_id;
    PaymentMethodsModel.getPaymentMethodById(payment_method_id, (err, paymentMethod) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener método de pago', err });
      }
      const payment_status_id = order.payment_status_id;
      PaymentStatesModel.getPaymentStateById(payment_status_id, (err, paymentStatus) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener estado de pago', err });
        }
        const products = order.products;
        const productNames = [];
        // Crear una función para obtener el nombre de un producto
        function getProductNameAndPrice(productId, callback) {
          ProductModel.getProductById(productId, (err, productInfo) => {
            if (err) {
              return callback(err);
            }
            const productName = productInfo.name;
            const productPrice = productInfo.price; 
            callback(null, productName, productPrice);
          });
        }
        // Iniciar la obtención de los nombres de los productos
        let productIndex = 0;
        function processProduct() {
          if (productIndex < products.length) {
            const productId = products[productIndex].id_product;
            getProductNameAndPrice(productId, (err, name, price) => {
              if (err) {
                return res.status(500).json({ error: 'Error al obtener el nombre y precio del producto', err });
              }
              productNames.push(name);
              productPrices.push(price);
              productIndex++;
              processProduct();
            });
          } else {
            // Crear un nuevo documento PDF
            const doc = new PDFDocument();
            doc.rect(10, 10, 590, 750).stroke();
            doc.moveDown(-4);
            doc.image(__dirname + '/logolarge.png', { width: 200, height: 150 });
            // Generar el contenido del documento PDF usando la información de la orden
            doc.text('Documento de Entrega');
            doc.moveDown(2);
            doc.text(`ID de la Orden: ${order.id}`);
            doc.moveDown();
            // Dar formato a la fecha en que se generó la orden
            const generatedDateOptions = { timeZone: 'America/Bogota' };
            const formattedGeneratedDate = order.generated_date.toLocaleString('es-CO', generatedDateOptions);
            doc.text(`Fecha en que la Orden se generó: ${formattedGeneratedDate}`);
            doc.moveDown();
            doc.text(`Cliente: ${order.client_name}`);
            doc.moveDown();
            doc.text(`Dirección de Entrega: ${order.delivery_address}`);
            doc.moveDown();
            doc.text(`Número del cliente: ${order.phone_number}`);
            doc.moveDown();
            doc.text(`Método de pago: ${paymentMethod.name_payment}`);
            doc.moveDown();
            doc.text(`Tipo de pago: ${paymentStatus.name_state}`);
            doc.moveDown();
            doc.text(`Fecha de despacho de la bodega: ${order.dispatch_date}`);
            doc.moveDown();
            doc.text(`Fecha estimada de Entrega: ${order.delivery_date}`);
            doc.moveDown();
            doc.text('Productos:');
            doc.moveDown();
            // Parsear la cadena JSON a un objeto JavaScript
            products.forEach((product, index) => {
              doc.text(`- ${productNames[index]}, Cantidad: ${product.quantity}, Precio: $${formatPriceWithCommas(productPrices[index])} COP c/u`);
              doc.moveDown(0.5);
            });
            doc.moveDown(3);
            const formattedPrice = formatPriceWithCommas(order.price);
            doc.text('', { continued: true });
            doc.text(`Total: $${formattedPrice} COP`, { align: 'right' });
            // Agregar una línea en blanco para la firma
            doc.moveDown(3);
            doc.moveTo(70, doc.y).lineTo(200, doc.y, { width: 1 }).stroke();
            doc.moveDown(0.5);
            doc.text('Firma Cliente');
            // Generar un enlace o URL que apunte al documento o a una página de edición 
            // (CAMBIARLO PARA QUE ENVÍE AL REPARTIDOR A LA ENTREGA (POD))
            const documentUrl = `${process.env.BASE_URL}/pod/${orderId}`;
            // Generar el código QR
            QRCode.toDataURL(documentUrl, (err, url) => {
              if (err) {
                console.error(err);
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
          }
        }
        processProduct();
      });
    });
  });
};
