document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display products
    const fetchProducts = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(products => {
                const productContainer = document.querySelector('#product-list');
                productContainer.innerHTML = ''; // Clear previous content

                products.forEach(product => {
                    const colDiv = document.createElement('div');
                    colDiv.className = 'col mb-5';
                    colDiv.innerHTML = `
                        <div class="card h-100">
                            ${product.discount ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Oferta</div>` : ''}
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="${product.name}" />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${product.name}</h5>
                                    ${product.discount ? `<span class="text-muted text-decoration-line-through">$${product.originalPrice} COP</span>` : ''}
                                    $${product.price} COP
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">${product.discount ? 'Agregar al carrito' : 'Ver opciones'}</a></div>
                            </div>
                        </div>
                    `;
                    productContainer.appendChild(colDiv);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    // Event listener for fetch discounted products
    document.querySelector('#fetch-discounted-products').addEventListener('click', () => {
        fetchProducts('/api/products?discount=true');
    });

    // Event listener for creating a new product
    document.querySelector('#create-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#product-name').value;
        const price = document.querySelector('#product-price').value;
        const originalPrice = document.querySelector('#product-original-price').value || price;
        const discount = document.querySelector('#product-discount').checked;

        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, originalPrice, discount })
        })
        .then(response => response.json())
        .then(product => {
            console.log('Product created:', product);
            // Optionally, fetch the updated list of products
            fetchProducts('/api/products');
        })
        .catch(error => console.error('Error creating product:', error));
    });

    // Event listener for updating a product
    document.querySelector('#update-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.querySelector('#update-product-id').value;
        const name = document.querySelector('#update-product-name').value;
        const price = document.querySelector('#update-product-price').value;
        const originalPrice = document.querySelector('#update-product-original-price').value || price;
        const discount = document.querySelector('#update-product-discount').checked;

        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, originalPrice, discount })
        })
        .then(response => response.json())
        .then(product => {
            console.log('Product updated:', product);
            // Optionally, fetch the updated list of products
            fetchProducts('/api/products');
        })
        .catch(error => console.error('Error updating product:', error));
    });

    // Initial load of products
    fetchProducts('/api/products');
});
