
/*Boton Pedir Ahora*/
const botonPedido = document.querySelector('.btn');
const titulo = document.querySelector('h1');
/*Aplicamos accion*/

botonPedido.addEventListener('click',function(){
    titulo.innerHTML= "¡Marchando tu cafe!";
    titulo.style.color = "#d4a373";
    botonPedido.innerText ="En camino...";
    botonPedido.disabled = true;
    botonPedido.style.opacity  ="0.7";
    botonPedido.style.cursor = "not-allowed";
});
