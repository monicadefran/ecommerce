
//1-mostrar y ocultar carrito
//Variable donde se hara click para mostrar u ocultar el carrito
const btnCart = document.querySelector('.shopping_cart');
//Div Contenedor del carrito que mostraremos y ocultaremos
const containerCartProductos = document.querySelector('.container-cart-products');

const cerrarProducto = document.querySelector('.cerrar-producto')

//Añadimos evento listener al boton cart que ejecutara 
//una funcion cuando se haga click sobre el 
btnCart.addEventListener('click', () => {
   //una vez el usuario ha hecho click en el boton
    //previamente seleccionado se ejecuta la funcion 
    //.classList.toggle y activamos el interruptor
    //en nuestra doble clase previamente asignada con 
    //el display none en este caso Hidden-cart
   containerCartProductos.classList.toggle('hidden-cart');
      
})


/* =======================  CARRITO   =========================== */

const cartInfo = document.querySelector ('.cart-product');

//Div donde insertaremos los diferentes elementos del carrito 
const rowProduct = document.querySelector ('.row-product');

//Lista de todos los contenedores de productos
const productList = document.querySelector ('.card_container');

//variable para el texto de carrito vacio

const empty_car = document.querySelector('.empty_car');


//variable de array de productos añadidos al carrito y tambien lo que tenemos en el localStorage
let allProducts = JSON.parse(localStorage.getItem("carrito"))||[];

//variable que trae el total a pagar de nuestro carrito
const valorTotal = document.querySelector ('.total-pagar');

//variable que trae el numero de articulos añadidos al articulo 
const countProducts = document.querySelector ('.contador_productos')

//atrapamos los clicks del addEventListener inspeccionamos en chrome y le damos a console
//e.target nos toma el elemento concreto de nuestro div
//por ejemplo la imagen o el boton
//e.target.classlist nos dira la clase del evento sobre el que hacemos click
//.contains('btn_add_cart') nos devuelve un booleano diciendonos si contiene la clase 
//se debe añadir una clase al boton previamente

productList.addEventListener ('click', e => {

   //comprobamos si hemos dado click sobre el boton de añadir al carrito 
    //es decir si es true 
   if (e.target.classList.contains('btn-add-cart')){
      //accedemos al div padre del boton es decir al div que contiene al producto
      console.log(e.target.parentElement);
      // guardamos el elemento padre en una variable 
      const product = e.target.parentElement;

      //guardamos al elemento abuelo en una variable
      const parentProduct = product.parentElement;
      console.log (parentProduct);
      //accedemos al primer hijo figure
      const parentFigure = parentProduct.children[0];
      //accedemos al primer hijo de figure que es img y sacamos el contenid de src
        //para almacenarlo en una variable
        //para  parentProduct.children[0].src
        const img = parentFigure.firstElementChild.src;

      //creamos objeto de producto añadiendo también la imagen 
      
      const infoProduct = {
         quantity: 1,
         title: parentProduct.querySelector('h3').textContent,
         price: parentProduct.querySelector('h4').textContent,
         imagen: img,


      }

      //cuidado con el simbolo del euro para luego poder operar 
      console.log(infoProduct);

      //de esta manera añado al  array de productos el producto nuevo

      //comprobamos si ya hemos añadido previamente un producto 
      const exits = allProducts.some (product => product.title === infoProduct.title)

      //si existe mapeamos nuestro array de carrito y modificamos la cantidad 
      // del producto y actualizamos el carrito sin añadir ningun elemento nuevo
      if (exits) {
         const product = allProducts.map (product => {
            if (product.title === infoProduct.title){
               product.quantity++;
               return product
            } else {
               return product
            }
         })

         console.log('esta');

         allProducts = [...product]
      } else {
         console.log('no esta');
         //si no estaba en nuestro carrito 
         allProducts = [...allProducts, infoProduct]
      }

      showHTML ();
      //añadimos el html llamando a la funcion ShowHtml
      //comprobamos que nos esta agregando productos al array de productos
      console.log(allProducts);
      savelocal();
      

       
      // -----Sacar Src Img para mostrarla en el carrito----- 
      //accedemos al elemento abuelo del boton que contiene a product y la imagen
      console.log(product.parentElement);

      console.log(img);


   }
   
});

//eliminamos un producto 
//añadimos un evento listener de tipo click a cada row de nuestro producto
//comprobamos si el click se ha hecho en el icono de eliminar producto 
rowProduct.addEventListener ('click',(e)=> {
   if (e.target.classList.contains('cerrar-producto')){
      //nos dirigimos al elemento padre y guardamos el titulo lo logico es tener un id determinado
      const product = e.target.parentElement.parentElement;
      //aplicamos .trim() para ocultar espacios en caso de que existan
      //si tenemos espacios no nos podra  comparar correctamente en la funcion.filters
      const n_product = product.querySelector('h3').textContent.trim();
      


      //buscamos en el array el elemento con titulo igual y lo eliminamos de la lista de articulos del carrito
      //lo suyo es que cada  elementos tuviesen un ID unico
      allProducts = allProducts.filter (
         product => product.title !== n_product);

         showHTML();
         savelocal();
         
        //containerCartProductos.style.display = 'block'; 
         
         console.log (allProducts);
         //llamamos a la funcion showHTML para que vuelva a actualizar los elementos del carrito quitando
        //el articulo que acabamos de eliminar 

   }

});



//Funcion para añadir html a nuestro carrito con productos nuevos 
const showHTML = () => {

   //modificamos la propiedad display para mostrar solo el texto de carrito vacio cuando 
    //esta vacio por eso comprobamos que no hay ningun articulo en el carrito

    if(allProducts.length==0){
         empty_car.style.display = 'block';
         
      }else{
         empty_car.style.display = 'none';
      }

   //colocamos texto si no tenemos nada en el carrito
    //comprobamos si esta vacio comprobando que no nuestro array de articulos no tiene elementos


   let total = 0;
   let totalOfProducts = 0;


   //limpiamos el html contenido en rowproduct
   rowProduct.innerHTML = ``;
   

   //recorremos el array de productos con el metodo foreach
   allProducts.forEach (product => {
      //creamos con el dom un nuevo elemento html de tipo div
      const containerProduct = document.createElement('div')

      //le damos la clase cart-product que es la que hemos añadido al css
      //para darle estilos
      containerProduct.classList.add ('cart-product')

      //añadimos la informacion dinamicamente con los elementos de nuestro producto
        //utilizando innerHtml
        //copiamos nuestro div previamente maquetado
        //añadimos la informacion de nuestro elemento dentro del div con ${objeto.variabl}



      containerProduct.innerHTML = `
      <div class="info-cart-product">
         <div class="card_imagen_carrito_pop_up">
            <img src="${product.imagen}" alt="">
         </div>
         <button class="boton-menos"><span class="material-symbols-outlined">remove</span></button>
         <span class="cantidad-producto-carrito"> ${product.quantity} </span>
         <button class="boton-mas"><span class="material-symbols-outlined">add</span></button>
         <div class="contenido-producto-carrito">
            <h3 > ${product.title} </h3>
         </div>
         <span class="precio-producto-carrito"> ${product.price}</span>
         <span class="material-symbols-outlined cerrar-producto">close</span>
     </div>
                
     `

     //añadimos al html nuestro innerHtml con el metodo append
      //para añadirlo usamos rowproduct(que es el contenedor de productos previamente creado
      // en el html  y almacenado en el js )
     rowProduct.append(containerProduct);

     // Creamos una varaible para poder restar y crear de nuevo el contnido. El boton solo restara
     //Cuando sea mayor que 1, que la minima cantidad en el carrito

     let restar = containerProduct.querySelector('.boton-menos');

     restar.addEventListener('click', ()=>{
      if (product.quantity !== 1){
         product.quantity--;
      }
      // Tenemos que volver a cragra os productos
      showHTML();
      // Lo guardamos en local
      savelocal();
     })

     //Creamos una varaible para poder sumar la cantidad
     let sumar = containerProduct.querySelector('.boton-mas');

     sumar.addEventListener ('click', ()=>{
      product.quantity++;
      savelocal();
      // Tenemos que volver a cragra os productos
      showHTML();
      // Lo guardamos en local
      
     })

    
     total = total + parseInt(product.quantity * product.price.slice(1));

     totalOfProducts = totalOfProducts + product.quantity;

     const saveLocalTotal = () => {
      localStorage.setItem("precioTotal", JSON.stringify (total));

     }
     saveLocalTotal ();

   });

   //modificamos el valor del total a pagar con la suma del coste total de los
    //añadidos al carrito  y el numero total de articulos
   valorTotal.innerText = `${total}`;
   countProducts.innerText = totalOfProducts;
};

//llamamos para que nos ordene la primera vez que entramos en la web el carrito
showHTML();


// TRabajamos con local storage para guardar en el mavegador los elemntos
// selecionados y para ello primero hacemos una constante donde guardamos los elemntos

//set item
const savelocal = () => {
   localStorage.setItem("carrito", JSON.stringify (allProducts))
};

//get item

JSON.parse(localStorage.getItem("carrito"));