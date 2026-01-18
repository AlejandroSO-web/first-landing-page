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

/*Variable que ira cambiando*/
let total = 0;

/*Funcion para cuando se haga click en el menu*/

function seleccionarCafe(nombre){
    const cafeEncontrado = misCafes.find(cafe => cafe.nombre === nombre);/*Buscamos el cafe para saber su precio*/

    if (cafeEncontrado){
        total += cafeEncontrado.precio; /*Sumar el total*/
        actualizarPantalla();
        verificarBotonVaciado();
    }
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
/*Funcion para resetear el contador*/
function vaciarCarrito(){
    total = 0;
    actualizarPantalla();
    verificarBotonVaciado();
}

function verificarBotonVaciado(){
    const boton = document.getElementById('btn-vaciar');

    if (total > 0 ){
        boton.style.display = "block"; /*Mostramos el boton*/
    }else {
        boton.style.display ="none"; /*Ocultamos el boton*/
    }
}

function actualizarPantalla(){
    document.getElementById('precio-total').innerText = total.toFixed(2);
}
