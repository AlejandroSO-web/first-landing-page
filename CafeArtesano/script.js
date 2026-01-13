
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
