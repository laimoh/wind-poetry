let img;
let imgObj;
let images = [];
let history = [];
let i = 1;
let windData;

function preload() {
   for (let i = 1; i < 6; i++) {
      images[i] = loadImage('img/image' + i + '.jpg');
   }
}
const api_key = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=712752d47ab68a6a3718ef462af11bcc';

async function getData() {
   const response = await fetch(api_key)
   const json = await response.json();

   document.getElementById('windSpeed').textContent = json.wind.speed
   document.getElementById('windDirection').textContent = json.wind.deg

   return json;
}

function setup() {
   createCanvas(windowWidth, windowHeight);
   imgObj = new Img(images[i], width / 2, height / 2, history);

}
let windDirection = {
   x: null,
   y: null
};

function draw() {
   background(54, 63, 44);
   imgObj.show();
   imgObj.update();
   imgObj.applyMouseAcceleration();
   
   getData()
   .then(response => {
      windData = response.wind
      
      windDirection.x = cos(windData.deg);
      windDirection.y = sin(windData.deg);

      let wind = createVector(windDirection.x, windDirection.y);

      if (mouseIsPressed) {
         // wind.mult(4.6);
         imgObj.applyForce(wind);
      }
   })
   .catch(error => {
      console.log(error)
   })

   imgObj.edges()


}

function keyTyped() {
   if (key === ' ') {
      i++;
      if (i >= images.length) {
         i = 1;
      }
      imgObj = new Img(images[i], history[history.length - 1].x, history[history.length - 1].y, history);

   }
}