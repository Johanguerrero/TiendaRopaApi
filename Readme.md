Claro, aquí tienes el `README.md` actualizado con los datos de tu proyecto:

---

# Proyecto Clothing Store

Proyecto desarrollado por: 
- Ana María Poveda 
- Cristian Camilo Criales 
- Johan Guerrero

Materia: Ingeniería Web 2 Docente: Ing. Wilson Ferney Molano

## Descripción del Proyecto

Este proyecto es una aplicación web para la gestión de productos en una tienda de ropa. La aplicación permite mostrar productos en descuento, agregar nuevos productos y actualizar los existentes. Utiliza una estructura de archivos organizada y permite realizar operaciones básicas sobre los productos almacenados en un archivo JSON.

## Funcionalidades

1. **Mostrar Productos en Descuento:**
   - Muestra solo los productos que tienen descuentos aplicados.

2. **Agregar Nuevo Producto:**
   - Permite a los usuarios agregar nuevos productos a la tienda a través de un formulario.

3. **Actualizar Producto Existente:**
   - Permite modificar la información de un producto existente mediante un formulario.

## Tecnologías Utilizadas

- **Frontend:**
  - HTML
  - CSS (para estilos)
  - JavaScript (para la lógica de la aplicación)

- **Backend:**
  - **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
  - **Express.js**: Framework de Node.js para gestionar rutas y manejar solicitudes HTTP.

- **Almacenamiento de Datos:**
  - **JSON**: Archivo para almacenar los datos de los productos.

## Estructura del Proyecto

```
clothing-store/
│   app.js
└───routes/
│   └───products.js
└───data/
│   └───products.json
└───public/
    └───css/
    │   └───styles.css
    └───js/
    │   └───main.js
    └───index.html
```

- `index.html`: Página principal de la aplicación.
- `styles.css`: Estilos personalizados para la aplicación.
- `main.js`: Lógica de la aplicación, incluyendo la gestión de productos.
- `app.js`: Archivo del servidor en Node.js que maneja las solicitudes HTTP para agregar y actualizar productos.
- `products.js`: Rutas relacionadas con la gestión de productos.
- `products.json`: Archivo JSON para almacenar los datos de los productos.

## Detalles de Implementación

### Método GET

El método GET se utiliza para mostrar productos, incluidos los que están en descuento. Cuando se solicita la visualización de productos en descuento, el backend filtra los productos y devuelve solo aquellos que tienen descuentos.

```javascript
// Ruta para obtener productos con descuento
app.get('/products/discounted', (req, res) => {
    const products = JSON.parse(fs.readFileSync('data/products.json'));
    const discountedProducts = products.filter(product => product.discount > 0);
    res.json(discountedProducts);
});
```

### Método POST

El método POST se utiliza para agregar nuevos productos a la tienda. Los datos del nuevo producto se envían al backend, que actualiza el archivo JSON con el nuevo producto.

```javascript
// Ruta para agregar un nuevo producto
app.post('/products', (req, res) => {
    const newProduct = req.body;
    const products = JSON.parse(fs.readFileSync('data/products.json'));
    products.push(newProduct);
    fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
});
```

### Método PUT

El método PUT se utiliza para actualizar productos existentes. Los datos del producto actualizado se envían al backend, que actualiza el archivo JSON con la nueva información.

```javascript
// Ruta para actualizar un producto existente
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const products = JSON.parse(fs.readFileSync('data/products.json'));
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products[productIndex] = updatedProduct;
        fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
        res.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
```

## Futuras Integraciones

- **Base de Datos:** Integración con una base de datos para una mejor gestión y persistencia de datos, reemplazando el almacenamiento en archivo JSON.
- **Interfaz de Usuario Avanzada:** Mejora de la interfaz de usuario para una experiencia más profesional y atractiva.
- **Autenticación y Autorización:** Implementación de sistemas de autenticación y autorización para asegurar el acceso a funciones administrativas.

## Cómo Ejecutar el Proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/clothing-store.git
   ```

2. **Navegar al directorio del proyecto:**
   ```bash
   cd clothing-store
   ```

3. **Instalar las dependencias del backend:**
   ```bash
   npm install
   ```

4. **Abrir `index.html` en un navegador web para ver la aplicación en acción.**

5. **Para ejecutar el servidor backend:**
   - Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
   - Ejecuta el servidor con:
     ```bash
     node app.js
     ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un *issue* o envía un *pull request* con tus cambios.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---