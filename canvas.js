const canvasTag = document.querySelector("canvas");

canvasTag.width = window.innerWidth * 2; // drawing area shoud be twice the size for retina devices
canvasTag.height = window.innerHeight * 2;

canvasTag.style.width = window.innerWidth + "px"; //styled canvas would be exactly fitting the device dimesnions
canvasTag.style.height = window.innerHeight + "px";

// which dimension are we setting canvas in?
const context = canvasTag.getContext("2d");
// set the scale of canvas to be supporting retina dimensions
context.scale(2, 2); // the 3d part of canvas should be scaled double

// what do I need to draw on canvas object?
let aimX = null; // image move towards this X
let aimY = null; // image move towards this Y
let currentX = null; //img position X
let currentY = null; //img position Y

let i = 0; // counter variable
const imgArr = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg", "img/image4.jpg", "img/image5.jpg"].map(src => {
   const img = document.createElement("img");
   img.src = src;
   return img;
})

document.addEventListener("mousemove", function (event) {
   aimX = event.pageX;
   aimY = event.pageY;

   if (currentX === null) {
      currentX = event.pageX;
      currentY = event.pageY;
   }

   // how do draw an image between mouse movements and tween it to move to a mouse slowly

   // if (imgArr[i].complete) {
   //    // on our 2d context, we want to draw img at size 600 w by 400 h and at mouse y, mouse x
   //    context.drawImage(imgArr[i], event.pageX - 300, event.pageY - 200, 600, 400)
   // }
})

canvasTag.addEventListener('click', () => {
   i = i + 1;
   if (i >= imgArr.length) {
      i = 0;
   }
})

const draw = function () {
   if (currentX) {
      if (imgArr[i].complete) {
         context.drawImage(imgArr[i], currentX - 300, currentY - 200, 600, 400)
      }
      currentX = currentX + (aimX - currentX) * 0.1; // we dont want to to mouseX straight away so we multiply by speed (a small number)   ^distance^
      currentY = currentY + (aimY - currentY) * 0.1;
   }
   requestAnimationFrame(draw);
}

// we need draw() to run once on page load and then continue looping through every frame (request animation frame)
draw() // for running once on page load