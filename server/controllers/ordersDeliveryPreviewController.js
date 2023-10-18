const axios = require('axios');

// Controlador para generar la vista previa del documento de entrega
exports.previewDeliveryDocument = (req, res) => {
  const orderId = req.params.id;
  const deliveryDocumentUrl = `${process.env.BASE_URL}/orders/${orderId}/delivery`;

  // Hacer una solicitud GET para obtener el documento
  axios({
    method: 'get',
    url: deliveryDocumentUrl,
    responseType: 'stream',
  }).then((response) => {
    // Configurar la cabecera para mostrar el PDF en el navegador
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=delivery_${orderId}.pdf`);
    response.data.pipe(res);
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la vista previa del documento', error });
  });
};
