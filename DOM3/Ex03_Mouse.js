addEventListener("mousemove", function(event) {
	var dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = (event.pageX - 4) + "px";
	dot.style.top = (event.pageY - 4) + "px";

	var elems = document.querySelectorAll("div.dot");
	console.log(elems);
	if(elems.length > 7){
		elems[0].parentNode.removeChild(elems[0]);
	}

	document.body.appendChild(dot);
});