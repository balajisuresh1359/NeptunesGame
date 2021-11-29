random=Math.floor(Math.random()*(250-0));
var  colors =["#FF681F","#AFE313","#63B76C","#00CC99","#00CCCC","#02A4D3","#4570E6","#7070CC","#3F26BF","#652DC1","#FC74FD","#BB3385","#E62E6B","#E97451","#FF355E","#FF6037","#FF9933","#50BFE6","#FF00CC","#87FF2A","#FFFF38","#FF5050","#A0E6FF"];
var game=document.getElementById('games');
var children=[];
children=game.childNodes;
console.log(children);
var grandchildren=[];
for (var i = children.length - 1; i >= 0; i--) {
	if (children[i].childNodes.length){
		grandchildren = children[i].childNodes;
		for (var j = grandchildren.length - 1; j >= 0; j--) {
			if (grandchildren[j] instanceof HTMLDivElement){
			console.log(grandchildren[j]);
			randColor=colors[Math.floor(Math.random()*(colors.length))]
			grandchildren[j].style.backgroundColor=randColor;
		}
			
		}
		grandchildren=[];
	}

}