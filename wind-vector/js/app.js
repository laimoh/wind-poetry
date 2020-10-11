let img;
// let imgObj, imgObj2;

let images = [];
let history = [];
let i = 1;
let windData = {};


function preload() {
   for (let i = 1; i < 6; i++) {
      images[i] = loadImage('img/image' + i + '.jpg');
   }
}
const api_key = 'http://api.weatherstack.com/current?access_key=8e3abd7cd4196fc3a6d0090397f43fdd&query=Jakarta&units=m';

async function getData() {
   const response = await fetch(api_key)
   const json = await response.json();

   document.getElementById('windSpeed').textContent = json.current.wind_speed
   document.getElementById('windDirection').textContent = json.current.wind_dir

   return json;
}

let angle;
let windDirection = {
   x: null,
   y: null
};

function setup() {
   createCanvas(windowWidth, windowHeight);
   // imgObj2 = new Img(images[1], random(width), random(width), history);

   imgObj = new Img(images[i], width / 2, height / 2, history);

   getData()
      .then(response => {
         windData = {
            degrees: response.current.wind_degree, // returns a num in degrees
            direction: response.current.wind_dir, // returns a string with direction
            speed: response.current.wind_speed // returns a num in m/s
         }

         // we need to form a compass starting zero degrees at 90
         angle = windData.degrees;
         let speed = windData.speed;
        
         windDirection.x = speed + cos(radians(angle - 90)); // start at zero degrees pointing north converting to x
         windDirection.y = speed + sin(radians(angle - 90)); // converting 
         
      })
      .catch(error => {
         console.log(error)
      })

}


// setInterval(() => {
//    getData()
//       .then(response => {
//          windData = response.wind

//          windDirection.x = cos(radians(windData.deg)); // converting to x
//          windDirection.y = sin(radians(windData.deg)); // converting to y
//       })
//       .catch(error => {
//          console.log(error)
//       })

// },1200000); //req every 20 mins


function draw() {
   background(54, 63, 44);
   imgObj.show();
   imgObj.update();
   imgObj.applyMouseAcceleration();
   imgObj.edges()


   let wind = createVector(windDirection.x, windDirection.y);

   // if(windData.speed) {
   //    let speed = windData.speed;
   //    wind.mult(speed);
   // }

   if (mouseIsPressed) {
      // wind.mult(4.6);
      imgObj.applyForce(wind);
   }



}

function keyTyped() {
   if (key === ' ') {
      i++;
      if (i >= images.length) {
         i = 1;
      }
      imgObj = new Img(images[i], history[history.length - 2].x, history[history.length - 2].y, history);

   }
}