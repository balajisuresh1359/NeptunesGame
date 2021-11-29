var flag_temp=0;
var flag_start=0;
var currentSpace;
var currentSpaceitem;
var data_array = new Array();
var one = document.getElementById('num1');
var two = document.getElementById('num2');
var three = document.getElementById('num3');
var four = document.getElementById('num4');
var five = document.getElementById('num5');
var six = document.getElementById('num6');
var seven = document.getElementById('num7');
var eigth = document.getElementById('num8');
var nine = document.getElementById('num9');




var divone = document.getElementById('one');
var divtwo = document.getElementById('two');
var divthree = document.getElementById('three');
var divfour = document.getElementById('four');
var divfive = document.getElementById('five');
var divsix = document.getElementById('six');
var divseven = document.getElementById('seven');
var diveight = document.getElementById('eight');
var divnine = document.getElementById('nine');


var moves = document.getElementById('moves');
const  timecounter=document.getElementById('timer');
let time,minute=0,sec=0,innerTime;
let timeStart=false;
var flag=0,flag1=0;
var finalTime;
var checked=0;
var wid=0;
var delete_elements;
var number=0;
var innerSeconds=0;



currentSpaceitem=divnine;


function randomNumber() {
	return Math.floor(Math.random()*(9999-1000))+1000;
}
function isPresent(data_array,num) {
	for (var i = 0; i < data_array.length; i++) {
		if(data_array[i] == num){
			return false;
		}
	}
	return true;
}

function swap(item1,item2,divitem){
	item2.innerText =item1.innerHTML;
	item1.innerText = "";
	divitem.style.backgroundColor='#F8F8FF';
	divitem.style.borderColor='#F8F8FF';

	currentSpaceitem.style.borderColor= "#000";
	currentSpaceitem.style.backgroundColor= "#283350";

	currentSpaceitem = divitem;

}
function isComplete(argument) {
	if (one.innerHTML == 1) {
		if (two.innerHTML == 2) {
			if (three.innerHTML == 3) {
				if (four.innerHTML == 4) {
					if (five.innerHTML == 5) {
						if (six.innerHTML == 6) {
							if (seven.innerHTML == 7) {
								if (eigth.innerHTML == 8) {
									return true;
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
}
function move(node,divnode) {
	// console.log("###",node.id,"###",node.innerHTML,"###",divnode.innerHTML);
	// console.log(currentSpaceitem.id,"----",currentSpace);
	var nodeid=node.id;
	var nodelocation = parseInt(node.id[nodeid.length-1]);
	// console.log(nodelocation);
	var possibleMove = [-3,-1,1,3];

	for (var i = 0; i < possibleMove.length; i++) {
		// console.log(nodelocation+possibleMove[i])
		if (nodelocation+possibleMove[i] == currentSpace){

			var s= "#num"+currentSpace;
			// console.log(s);
			var temp = document.querySelector(s);
			var temp2 = temp.parentElement;
			
			temp.innerText=node.innerText;
			temp2.style.backgroundColor="#283350";
			temp2.style.borderColor="#000";


			node.innerText = "";
			divnode.style.backgroundColor='#F8F8FF';
			divnode.style.borderColor='#F8F8FF';

			currentSpace=nodelocation;
			moves.innerText = parseInt(moves.innerText)+1;


			break;
		}

	}
	if(isComplete()){
		console.log("Completed");
		if(flag_start==1){
			stopTime(1);
		}
	}
	else{
		console.log("not  Completed");
	}


}

function removeElements(arg) {
	var s=0;
	delete_elements=setInterval(function(){
		s++;
		if(s === 2)
			document.getElementById('one').style.display='none';
		if(s === 3)
			document.getElementById('two').style.display='none';
		if(s === 4)
			document.getElementById('three').style.display='none';
		if(s === 5)
			document.getElementById('four').style.display='none';
		if(s === 6)
			document.getElementById('five').style.display='none';
		if(s === 7){
			document.getElementById('six').style.display='none';
		
		}
		if(s ===8)
			document.getElementById('seven').style.display='none';
		if(s === 9)
			document.getElementById('eight').style.display='none';
		if(s === 10)
			document.getElementById('nine').style.display='none';
		if(s === 11){
			document.getElementById('timer').remove();
		}
		if(s === 12)
			document.getElementById('start').remove();
		if(s === 12){
			document.getElementById('headerElement').remove();
			document.getElementById('board').style.display='none';

		}
		if(s === 13){
			document.getElementById('timeLine').style.display='none';
			if(arg === 0){
				document.getElementById('failed').style.display='block';
				loss();
			}
			else{
				document.getElementById('won').style.display='block';
				win();
			}
		}
		if(s === 14)
			stop_delete();
	},1000);

}

function Start_timer(){

	if(flag_start == 0){
		flag_start=1;
		document.getElementById('start').innerHTML='Restart';
		
		while(data_array.length < 8) {
			var num = randomNumber()%10;
			if (num!=9 && num!=0 && isPresent(data_array,num)){
				data_array.push(num);
			}
		}
		one.innerHTML = data_array[0];
		two.innerHTML = data_array[1];
		three.innerHTML = data_array[2];
		four.innerHTML = data_array[3];
		five.innerHTML = data_array[4];
		six.innerHTML = data_array[5];
		seven.innerHTML = data_array[6];
		eigth.innerHTML = data_array[7];
		data_array.push(0);

		while(1){
			num = randomNumber()%10;
			if (num!=0){
				break;
			}
		}

		currentSpace = num;
		console.log("current Space",num);

		if(num == 1)
			swap(one,nine,divone);
		if(num == 2)
			swap(two,nine,divtwo);
		if(num == 3)
			swap(three,nine,divthree);
		if(num == 4)
			swap(four,nine,divfour);
		if(num == 5)
			swap(five,nine,divfive);
		if(num == 6)
			swap(six,nine,divsix);
		if(num == 7)
			swap(seven,nine,divseven);
		if(num == 8)
			swap(eigth,nine,diveight);

		time=setInterval(function(){
        	sec++;
        	if(wid<=100){
        		document.getElementById('timeLine').style.width=wid+"%";
        		wid=wid+0.138888889;
        	}
        	if(sec===60)
        	{
        	    minute++;
        	    sec=0;
        	}
        	if (minute === 13 && sec >= 20)
        	{
        	    var colorChange=document.getElementById('timer');
        	    colorChange.style.color="red";
        	    document.getElementById('timeLine').backgroundColor='red';
        	}
        	if (minute === 12)
        	{
        	    stopTime(0);
        	}
       		if(sec >9)
        		timecounter.innerHTML="Timer : 0"+minute+":"+sec;
        	else
        		timecounter.innerHTML="Timer : 0"+minute+":0"+sec;
    	},1000);
		
	}
	else{
		flag_start=0;
		location.reload();
	}
	// console.log(data_array);
}


function win() {
	var s=0,t=5;
	finalTime=setInterval(function(){
		s++;
		if(s===6)
		{
			document.getElementById('resultText').innerHTML="You won............!";
			stopFinal();
		}
		else{
			document.getElementById('resultText').innerHTML=t-s;
		}
	},200);

}
function loss() {
	var s=0,t=5;
	finalTime=setInterval(function(){
		s++;
		if(s===6)
		{
			document.getElementById('finalCount').innerHTML="You loss............!";
			stopFinal();
		}
		else{
			document.getElementById('finalCount').innerHTML=t-s;
		}
	},200);
}
function stopFinal() {
	    clearInterval(finalTime);
}
function stop_delete() {
	    clearInterval(delete_elements);
}

function stopTime(arg)
{
    var colorChange=document.getElementById('timer');
    colorChange.style.color="white";
    timecounter.innerHTML="Timer : 00:00";
    minute=0;
    sec=0;
    clearInterval(time);
    removeElements(arg);
}


document.getElementById('start').addEventListener('click',Start_timer);
divone.addEventListener('click',function (argument) {
	move(one,divone);
});

divtwo.addEventListener('click',function (argument) {
	move(two,divtwo);
});

divthree.addEventListener('click',function (argument) {
	move(three,divthree);
});

divfour.addEventListener('click',function (argument) {
	move(four,divfour);
});

divfive.addEventListener('click',function (argument) {
	move(five,divfive);
});

divsix.addEventListener('click',function (argument) {
	move(six,divsix);
		// console.log("final : ",six.id);

});

divseven.addEventListener('click',function (argument) {
	move(seven,divseven);
		// console.log("final : ",seven.id);

});

diveight.addEventListener('click',function (argument) {
	move(eigth,diveight);
	// console.log("final : ",eigth.id);
});


divnine.addEventListener('click',function (argument) {
	move(nine,divnine);
});


document.getElementById('restart1').addEventListener('click',function (argument) {
	// body...
	location.reload();
});

document.getElementById('homePage1').addEventListener('click',function(){
	location.href="index.html";
});

document.getElementById('restart2').addEventListener('click',function (argument) {
	// body...
	location.reload();
});

document.getElementById('homePage2').addEventListener('click',function(){
	location.href="index.html";
});
