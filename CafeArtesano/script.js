/*leemos lo que hay en Local Storage, si lo hay...*/
let totalGuardado = localStorage.getItem('totalCompra');
/*Si existe, lo usamos y sino lo dejamos en 0*/
let total = totalGuardado ? parseFloat(totalGuardado) : 0;
/*Pintamos el total recuperado en la pantalla*/
document.getElementById('precio-total').innerText = total.toFixed(2);
verificarBotonVaciado();

/*Base de datos local*/
const misCafes =[
    {nombre: "Expreso", precio: 1.50, icono: "☕"},
    {nombre: "Latte", precio: 2.50, icono:"🥛"},
    {nombre: "Capuccino", precio: 3.00, icono:"🍫"},
    {nombre: "Mocaccino", precio: 3.50, icono:"🧋"}
];

const contenedor = document.getElementById('contenedor-menu');

/*Bucle para recorrer la lista de cafes*/

misCafes.forEach(cafe => {
    const estructuraCard = 
                            `<div class="card-menu">
                                <div class="icono">${cafe.icono}</div>
                                    <h3>${cafe.nombre}</h3>
                                        <p>Precio: ${cafe.precio.toFixed(2)}€</p>
                                            <button class="btn-seleccionar" onclick="seleccionarCafe('${cafe.nombre}')">Seleccionar</button>
                                            </div>`;
                                            contenedor.innerHTML += estructuraCard;
});

/*Empezamos con una lista vacia o recuperamos lista guardada*/
let carritoGuardado = localStorage.getItem('miCarrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

/*Funcion para añadir el producto completo al carrito*/
function seleccionarCafe(nombre){
    const cafeEncontrado = misCafes.find(cafe => cafe.nombre === nombre);/*Buscamos el cafe para saber su precio*/

    if (cafeEncontrado){
        /*Añadimos el objeto entero a nuestra lista*/
        carrito.push(cafeEncontrado);

        /*Guardamos la lista actualizada (convertida a texto)*/
        localStorage.setItem('miCarrito', JSON.stringify(carrito));
        mostrarNotificacion(cafeEncontrado.nombre);
        actualizarInterfaz();
    }
    }

/*Crear la función para pintar la lista en JS*/
function actualizarInterfaz(){
    const listaUI = document.getElementById('lista-productos');
    const totalUI = document.getElementById('precio-total');

    /*Limpiamos la lista ante de volver a pintarla*/ 
    listaUI.innerHTML= "";
    let sumaTotal = 0;

    /*Recorremos el carrito para crear los <li>*/
    if (carrito.length === 0){
        listaUI.innerHTML = "<p style='color: #999; text-align:center;'>Tu carrito está vacío. ¡Pide un café☕!</p>";
    }else {
    carrito.forEach((item, index) => {
        sumaTotal+= item.precio;
        listaUI.innerHTML += `
                            <li>
                                ${item.icono} ${item.nombre} - ${item.precio}€
                                <button onclick="eliminarDelCarrito(${index})">❌</button>
                            </li>
                            `;
});
}
    totalUI.innerText = sumaTotal.toFixed(2);
    verificarBotonVaciado();
}
/*Llamamos a esta funcion al cargar la página para que se vea lo guardado*/
actualizarInterfaz();

function eliminarDelCarrito(index){
    /*Quitamos el elemento del array usando su posicion.*/
    carrito.splice(index,1);
    /*Guardamos la lista actualizada en el LocalStorage*/
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
    /*Volvemos a pintar la interfaz para que el cambio se vea*/
    actualizarInterfaz();
}




/*Boton Pedir Ahora*/
const botonPedido = document.querySelector('.btn');
const titulo = document.querySelector('h1');
/*Aplicamos accion*/

botonPedido.addEventListener('click',function(){
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2,'0'); /*Para que salga 09 y no 9*/
    const tiempo = hora + ":" + minutos;
    titulo.innerHTML= "¡Marchando tu cafe!";
    titulo.style.color = "#d4a373";
    const mensajeHora = document.createElement('p');
    mensajeHora.innerText = 'Pedido realizado a las ' + tiempo;
    mensajeHora.style.marginTop = "15px";
    mensajeHora.style.fontWeight = "bold";
    document.querySelector('.hero').appendChild(mensajeHora);  
    botonPedido.disabled = true;
    botonPedido.innerText ="En camino... ";
});

function vaciarCarrito(){
    /*Vaciamos el array*/
    carrito = [];
    localStorage.removeItem('miCarrito'); /*Borramos el dato guardado*/
    actualizarInterfaz();/*Refrescamos pantalla*/
}

function verificarBotonVaciado(){
    const boton = document.getElementById('btn-vaciar');

    if (total > 0 ){
        boton.style.display = "block"; /*Mostramos*/
    }else {
        boton.style.display ="none"; /*Ocultamos*/
    }
}

function actualizarPantalla(){
    document.getElementById('precio-total').innerText = total.toFixed(2);
}

function enviarPedido(){
    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }
    const telefono = "99999999"; /*Número de whatsapp que era dirigido el pedido*/
    let mensaje = "¡Hola! Quisiera hacer el siguiente pedido:\n\n";

    /*Recorremos el carrito para añadir cada producto al mensaje*/
    carrito.forEach((item) => {
        mensaje += `- ${item.nombre} (${item.precio.toFixed(2)})€\n`;
    });
    
    mensaje +=`\nTotal a pagar: ${document.getElementById('precio-total').innerText}€`;
    /*Codificamos el mensaje para que sea apto*/
    const mensajeEnviado = encodeURIComponent(mensaje);

    /*Abrimos la ventana de WhatsApp*/
    window.open(`https://wa.me/${telefono}?text=${mensajeEnviado}`,'_blank');
}

function mostrarNotificacion(nombre){
    const aviso = document.createElement('div');
    aviso.classList.add('notificacion');
    aviso.innerText= `✅${nombre} añadido al carrito`;
    document.body.appendChild(aviso);

    setTimeout(() => {aviso.remove();}, 3000);
}
