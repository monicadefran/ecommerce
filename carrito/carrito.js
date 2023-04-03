function openNav(){
    document.getElementById('sidenav').style.display = 'block';
    document.getElementById('sidenav').style.width = '50%';
 }
 function closeNav(){
    document.getElementById('sidenav').style.width = '0%';
 }
 
 const btnCart = document.querySelector('.container_icon');
 const containerCartProductos = document.querySelector('.container-cart-products');
 
 btnCart.addEventListener('click', () => {
     containerCartProductos.classList.toggle('hidden-cart');
 
 })


 /*CARRITO SUMAR Y RESTAR*/

 function actualizarTotal() {
    const productos = [
        {
            cantidad: document.getElementById('cantidad-producto-1'),
            precio: document.getElementById('precio-producto-1'),
            total: document.getElementById('total-producto-1')
        },
        {
            cantidad: document.getElementById('cantidad-producto-2'),
            precio: document.getElementById('precio-producto-2'),
            total: document.getElementById('total-producto-2')
        }
    ];

    let totalCarrito = 0;

    for (const producto of productos) {
        const cantidad = parseInt(producto.cantidad.textContent);
        const precio = parseFloat(producto.precio.textContent.replace('€', ''));
        const total = cantidad * precio;
        producto.total.textContent = total.toFixed(2) + '€';
        totalCarrito += total;
    }

    document.getElementById('total-carrito').textContent = totalCarrito.toFixed(2) + '€';
}

document.querySelectorAll('.boton-menos').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const cantidad = document.getElementById(`cantidad-producto-${index + 1}`);
        const nuevaCantidad = Math.max(0, parseInt(cantidad.textContent) - 1);
        cantidad.textContent = nuevaCantidad;
        actualizarTotal();
    });
});

document.querySelectorAll('.boton-mas').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const cantidad = document.getElementById(`cantidad-producto-${index + 1}`);
        const nuevaCantidad = parseInt(cantidad.textContent) + 1;
        cantidad.textContent = nuevaCantidad;
        actualizarTotal();
    });
});

document.querySelector('.boton-actualizar').addEventListener('click', () => {
    actualizarTotal();
});
document.querySelectorAll('.papelera').forEach((papelera, index) => {
    papelera.addEventListener('click', () => {
        const producto = document.querySelector(`.producto-${index + 1}`);
        producto.style.display = 'none';
        
        const cantidad = document.getElementById(`cantidad-producto-${index + 1}`);
        cantidad.textContent = '0';
        
        actualizarTotal();
    });
});


function mostrarProductos() {
    document.querySelectorAll('.producto-1, .producto-2').forEach(producto => {
        producto.style.display = 'grid';
    });
}

document.querySelector('.boton-actualizar').addEventListener('click', () => {
    mostrarProductos();
});
