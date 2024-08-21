const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getProducts = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8');
    return JSON.parse(data);
};

const saveProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2));
};

// GET: Obtener todos los productos
router.get('/', (req, res) => {
    const products = getProducts();
    res.json(products);
});

// GET: Obtener un producto por ID
router.get('/:id', (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// POST: Agregar un nuevo producto
router.post('/', (req, res) => {
    const products = getProducts();
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        originalPrice: req.body.originalPrice || req.body.price,
        discount: req.body.discount || false
    };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

// PUT: Actualizar un producto existente
router.put('/:id', (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.originalPrice = req.body.originalPrice || product.originalPrice;
    product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;

    saveProducts(products);
    res.json(product);
});

module.exports = router;
