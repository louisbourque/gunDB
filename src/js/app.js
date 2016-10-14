var app = app || {};
app.fileselect = document.getElementById("file-select-input");
app.error = document.getElementById("error");
app.output = document.getElementById("output");
app.dropTarget = document.getElementById("filedrag");
app.textToRead = document.getElementById("inputtext");
app.readerOverlay = document.getElementById("reader-overlay");
app.readerText = document.getElementById("reader-text");
app.wpmInput = document.getElementById("wpm-input");

app.textArray = [];
app.interval = 0;
app.wpm = 300;

if (window.File && window.FileList && window.FileReader) {
  // file select
  app.fileselect.addEventListener("change", FileSelectHandler, false);

  // file drop
  document.addEventListener("dragover", FileDragHover, false);
  document.addEventListener("dragleave", FileDragHover, false);
  document.addEventListener("drop", FileSelectHandler, false);
  document.addEventListener("keypress", onKeyPress, false);
  document.getElementById("filedrag").style.display = "block";
}

function onKeyPress(e){
  cancelReadText();
}

function updateWPM(){
  if(!isNaN(app.wpmInput.value) && app.wpmInput.value > 0){
    app.wpm = app.wpmInput.value*1;
  }
}

// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	app.dropTarget.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

  //clear current results
  app.error.innerHTML = "";
  app.output.innerHTML = "";

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
    console.log(f);
		if(f.type != "" != "" && f.type.substring(0,4) != "text"){
      app.error.innerHTML += "Unsupported file type: "+f.name+" ("+f.type+")<br>";
    }else{
      loadTextFromFile(f);
    }
	}
}

function loadTextFromFile(file){
  var fr = new FileReader();
  fr.onload = function(e){
    app.textToRead.value = e.target.result;
  };
  fr.readAsText(file);
}

function readText(){
  app.textArray = app.textToRead.value.trim().split(" ");
  app.textArray.push(""); // add a pause at the end before clearing the display
  if(app.interval){
    clearInterval(app.interval);
  }
  app.readerOverlay.style.display = "table";
  //TODO: configurable interval length
  app.interval = setInterval('incrementReadText()',60/app.wpm*1000);
}

function incrementReadText(){
  if(app.textArray.length <= 0){
    cancelReadText();
    return;
  }
  app.readerText.innerText = app.textArray.shift();
}

function cancelReadText(){
  app.readerOverlay.style.display = "none";
  clearInterval(app.interval);
  app.readerText.innerText = "";
}
