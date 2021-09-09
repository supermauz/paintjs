const canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

// Seta o contexto do canvas

let context = canvas.getContext("2d");
let start_background = "white"
context.fillStyle = start_background;
context.fillRect(0, 0, canvas.width, canvas.height);

// variaveis de manipulação do canvas
let draw_color = "black"; //cor do desenho
let draw_width = "2"; //largura do desenho
let is_drawing = false; //não está desenhando

let restore_array = [];
let index = -1; //indice do array


function change_color(element) {
  draw_color = element.style.background;
}

//Adiciona os eventos do mouse no canvas
//Funções de Desenho

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

//Função de inicio do desenho
function start(event){
  is_drawing = true; //está desenhando
  context.beginPath(); //começa a desenhar o canvas
  context.moveTo(event.clientX  - canvas.offsetLeft,
    event.clientY - canvas.offsetTop); //move o ponto inicial
    event.preventDefault();
    
  }
  
  //Funçao que desenha na tela
  
  function draw(event){
    if(is_drawing){
      context.lineTo(event.clientX - canvas.offsetLeft,
        event.clientY-canvas.offsetTop); //move o ponto final
        context.strokeStyle = draw_color; //cor do desenho
        context.lineWidth = draw_width; //largura do desenho
        context.lineCap = "round"; //arredonda o desenho 
        context.lineJoin = "round"; //arredonda o desenho 
        context.stroke();
      }
      event.preventDefault();
    }
    function stop(event){
      if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
      }
      event.preventDefault();
      
      if(event.type != "mouseout"){
        restore_array.push(context.getImageData(0,0,canvas.width,canvas.height)); //adiciona a imagem do canvas ao array
        index++;
      }
    }
    
    function clear_canvas(){
      context.fillStyle = start_background;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(0, 0, canvas.width, canvas.height);
      restore_array = [];
      index = -1;
      
    }
    
    function undo_last(){
      if(index <= 0){
        clear_canvas();
      }else{
        index--;
        restore_array.pop();
        context.putImageData(restore_array[index],0,0);
      }
      
    }