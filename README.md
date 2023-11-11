<h1>🚚 Trazabilidad de Entregas Nacionales</h1>

<p>Este proyecto aborda la problemática de la trazabilidad de entregas nacionales en el contexto de FIRPLAK S.A, una empresa dedicada a la fabricación de productos para baños, cocinas y zonas de labores. El enfoque se centra en el desarrollo de un Producto Mínimo Viable (MVP) con el apoyo de un Analista Desarrollador.</p>

<p>Puedes probarla en el siguiente link. <a href="https://www.proyectologistica.online/" target="_blank">https://www.proyectologistica.online/</a></p>

<h2>📋 Descripción del Problema</h2>

<p>Las Transportadoras de mercancía que la compañía usa para tercerizar la operación tienen un buen servicio de transporte, pero mal servicio de transmisión de la información, específicamente los POD ́s. Existen dos tipos de Transportadoras: aquellas que cuentan con una Plataforma Web en la que se puede consultar el estado de las Guías de Transporte y los documentos asociados, y aquellas que no poseen estas plataformas y por ende la Trazabilidad debe hacerse por Teléfono o por Correos Electrónicos. Aquellas de este segundo grupo representan el 80% por ciento de la operación de Transporte.</p>

<p>El problema está radicando en la información que no llega a tiempo. Las POD ́s tardan días en llegar a los correos de los ejecutivos de logística y por ende la Facturación se está tardando más de lo normal, esto implica que FIRPLAK está haciendo un recaudo tardío de sus ventas y comprometiendo su flujo de caja.</p>

<h2>🛠️ Solución del Problema</h2>

<p>Una de las soluciones que ideé para este problema fue crear una trazabilidad donde el personal de la transportadora pueda tener una comunicación directa con la empresa FIRPLAK, subiendo en tiempo real las evidencias, las observaciones y todo lo necesario para que la empresa FIRPLAK pueda tener un flujo de caja más rápido y eficiente.</p>

<p><strong>Para esto se creó un producto mínimo viable donde se imprime la orden de entrega con toda la información del cliente, de la compra, etc., y a su vez tiene un código QR único para esa orden de entrega. Estos productos, en el momento que el trabajador de la transportadora escanee el código QR, podrá subir las fotos y las observaciones de la entrega en tiempo real, información que estará disponible para la empresa y enviar su factura automáticamente al cliente, y así tener un flujo de caja más eficiente.</strong></p>

<h2>💻 Tecnologías Utilizadas</h2>

<h3>🌐 Frontend</h3>
<ul>
  <li>React</li>
  <li>Axios</li>
  <li>React Icons</li>
  <li>React Loader Spinner</li>
  <li>React Phone Number Input</li>
  <li>React Router DOM</li>
</ul>

<h3>⚙️ Backend</h3>
<ul>
  <li>Express</li>
  <li>Axios</li>
  <li>Cloudinary</li>
  <li>CORS</li>
  <li>Multer</li>
  <li>MySQL2</li>
  <li>Nodemailer</li>
  <li>PDFKit</li>
  <li>QRCode</li>
  <li>UUID</li>
</ul>

<h2>⚙️ Configuración y Uso</h2>

<h3>🌐 Frontend:</h3>
<ul>
  <li>Instalar dependencias: npm install</li>
  <li>Configuración en API: en src/config/api.js, configurar <strong>baseURL</strong> que será la ruta del backend</li>
  <li>Ejecutar la aplicación: npm start</li>
</ul>

<h3>⚙️ Backend:</h3>
<ul>
  <li>Instalar dependencias: npm install</li>
  <li>Crear la BD</li>
  <li>Configurar variables de entorno en un archivo .env.</li>
  <li>Iniciar el servidor: npm start</li>
</ul>
