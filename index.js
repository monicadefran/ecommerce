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