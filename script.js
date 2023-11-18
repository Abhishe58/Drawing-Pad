let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 12;
canvas.height = window.innerHeight * 0.9;
let context = canvas.getContext("2d");
context.fillStyle = "transparent";
context.fillRect(0, 0, canvas.width, canvas.height);
let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false; 
let draggableText = null;
function drawText() {
  var textInput = document.getElementById("textInput");
  var text = textInput.value;

  context.font = "20px Arial"; // Set the font size and type
  context.fillStyle = stroke_color; // Set the text color
  context.fillText(text, 20, 20); // Draw the text at coordinates (50, 50), adjust as needed
  /* var textInput = document.getElementById("textInput");
    var text = textInput.value;

    // Create a new div for the draggable text
    draggableText = document.createElement("div");
    draggableText.className = "draggable";
    draggableText.innerText = text;

    // Set initial position for the draggable text
    draggableText.style.left = "50px";
    draggableText.style.top = "50px";

    // Make the text draggable
    draggableText.draggable = true;
    draggableText.ondragstart = function (event) {
      event.dataTransfer.setData("text/plain", ""); // Necessary for Firefox
    };

    // Append the text to the container
    document.body.appendChild(draggableText);

    // Add an event listener for dragging the text
    draggableText.addEventListener("drag", function (event) {
      var x = event.clientX;
      var y = event.clientY;

      // Update the position of the draggable text
      draggableText.style.left = x + "px";
      draggableText.style.top = y + "px";
    });

    // Add an event listener for releasing the text
    draggableText.addEventListener("dragend", function () {
      // Cleanup: remove the reference to the draggable text
      draggableText = null;
    });
   */
  
}


function downloadDrawing() {
  // Convert the canvas content to a data URL
  var dataUrl = canvas.toDataURL('image/png');

  // Create a blob from the data URL
  var blob = dataURLtoBlob(dataUrl);

  // Create a link element
  var downloadLink = document.createElement('a');

  // Set the download attribute with a default filename (e.g., drawing.png)
  downloadLink.download = 'drawing.png';

  // Create a URL for the blob and set it as the link's href
  downloadLink.href = window.URL.createObjectURL(blob);

  // Append the link to the document body
  document.body.appendChild(downloadLink);

  // Trigger a click on the link to start the download
  downloadLink.click();

  // Remove the link from the document
  document.body.removeChild(downloadLink);
}

// Function to convert data URL to Blob
function dataURLtoBlob(dataUrl) {
  var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


/* main */
function change_color(element) {
  stroke_color = element.style.background;
}

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
    }
  }
}

function Clear() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}
/* image */
const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("img-preview");

chooseFile.addEventListener("change", function () {
  getImgData();
});
function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img class="imgbox" src="' + this.result + '" />';
    });    
  }
}

/* sample */
 function proopen() {
 var progressContainer = document.getElementById("progressContainer").style.display = "block";
 setTimeout(() => {
  var progressContainer = document.getElementById("progressContainer").style.display = "none";
 },3000);
 }
 function coloropen() {
 var colorContainer = document.getElementById("colorContainer").style.display = "block";
 setTimeout(() => {
  var colorContainer = document.getElementById("colorContainer").style.display = "none";
 },3000);
 }
 function textopen() {
 var colorContainer = document.getElementById("textContainer").style.display = "block";
 setTimeout(() => {
  var textContainer = document.getElementById("textContainer").style.display = "none";
 },3000);
 }
 
 