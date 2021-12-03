// submit = document.getElementById('submit');
var one =document.getElementById('one');
var two =document.getElementById('two');
var three =document.getElementById('three');
var four =document.getElementById('four');
var five =document.getElementById('five');
var six =document.getElementById('six');
var start = document.getElementById('start');
var player=document.getElementById('playerspan');
var computer = document.getElementById('systemspan');
var score=document.getElementById('score');
var rating=new Array(6);
var difficulty_level=0;
var loss_result = ["Oops...  Bowled.....!","OUT!.. Cleaned up!.. ","Oops... LBW...!","OUT!...TAKEN!...","OUT!.. DRAGGED ON!..","Oops.. RUN OUT...!","OUT!..  CAUGHT...!"]
for (var i = 0; i < rating.length; i++) {
	rating[i]=0;
}
var main_array=new Array(7).fill(0).map(()=> new Array(7).fill(0));
var timeLineG=[];
var timeLine_dict={};
for (var i = 0; i < 7; i++) {
	timeLine_dict[i]=0;
}
var flag_start=0;
var flag=0;
var mx=0;
var count=0;
var ref=0;
var rare=0;
var frq=0;
var delete_elements;
var rand=0;
var ro=0;
var i=0;
var accuracy=0;
var totalG=0;
var spre = 0;
var algo=0;
var systemC;
var systemscore=0;
var previous = Math.floor(Math.random()*(7));

function Train_maxAlgo() {
	var timeLine=[];
	console.log("Waiting.....");
	var i=0;
	var k=0;
	while(k!=1000){
		timeLine=[];
		i=0;
		while(i!=1000){
			var n = Math.floor(Math.random()*(7));
			timeLine.push(n);
			i+=1
		}
	for (var j = 0; j < timeLine.length-1; j++) {
		main_array[timeLine[j]][timeLine[j+1]]+=1;
		}
		k++;
	}
	if (difficulty_level==0) {
		systemscore=Math.floor(Math.random()*(40-20) + 21);
	}
	if (difficulty_level==1) {
		systemscore=Math.floor(Math.random()*(70-40) + 41);
	}
	if (difficulty_level==2) {
		systemscore=Math.floor(Math.random()*(100-70) + 71);
	}
	
	document.getElementById('systemscore').innerHTML=systemscore;
	// document.getElementById('systemscore').innerHTML=2;

}
// Train_maxAlgo();
function maxAlgo(argument) {
	// var from_train = Math.max(main_array[argument]);
	var	from_train = Math.max.apply(null,main_array[argument]);
	from_train = main_array[argument].indexOf(from_train);
	// console.log("maxAlgo",from_train);
	return from_train;
}

function randomGenAlgo() {
	var temp=Math.floor(Math.random()*(7));
	// console.log("randomGenAlgo",temp);
	return temp;
}

function roundAlgo(totalG) {
	var r5 = totalG%5;
	var r10 = totalG%10;
	if(r10 >=7){
		// console.log("roundAlgo",r5);
		return r5;
	}
	else{
		if (Math.floor(Math.random()*(2))){
			// console.log("roundAlgo",r10);
			return r10;
		}
		// console.log("roundAlgo",r5);
		return r5;
	}
}

function rareAlgo() {
	var temp=[];
	var keys = Object.keys(timeLine_dict);
	var min = Math.min.apply(null,keys.map(function(argument) {
		return timeLine_dict[argument];
	}));
	var match = keys.filter(function(y){return timeLine_dict[y]==min});
	// console.log("rareAlgo",parseInt(match));
	return parseInt(match);
}

function freqAlgo() {
	var temp=[];
	var keys = Object.keys(timeLine_dict);
	var min = Math.max.apply(null,keys.map(function(argument) {
		return timeLine_dict[argument];
	}));
	var match = keys.filter(function(y){return timeLine_dict[y]==min});
	// console.log("freqAlgo",parseInt(match));
	return parseInt(match);
}
function reflex(p){
	// console.log("reflex",p);
	return p;
}

function getValue(n,p,t,pre){

	mx=maxAlgo(p);
	frq=freqAlgo();
	ro=roundAlgo(t);
	rare=rareAlgo();
	ref=reflex(pre);
	rand=randomGenAlgo();
	if (n == 0){
		return mx;
	}
	if( n==1){
		return frq;
	}
	if (n==2){
		return ro;
	}
	if (n==3){
		return rare;
	}
	if (n==4){
		return ref;
	}
	if( n==5 ){
		return rand;
	}
}

function reward(n){
	if (n == mx){
		rating[0]+=1;
	}
	if (n == frq){
		rating[1]+=1;
	}
	if (n==ro){
		rating[2]+=1;
	}
	if (n==rare){
		rating[3]+=1;
	}
	if (n==ref){
		rating[4]+=1;
	}
	if (n==rand){
		rating[5]+=1;
	}
}


function startGame(r) {
	if (flag_start==1) {
		timeLineG.push(r);
		algo = Math.max.apply(null,rating);
		algo = rating.indexOf(algo);
		systemC = getValue(algo,previous,totalG,spre);
		count++;
		timeLineG.push(r);
		timeLine_dict[r]+=1;
		previous=r;
		spre=systemC;
		console.log("Guessed : ",systemC,"| You : ",r);
		console.log(totalG);
		computer.innerText=systemC;
		if(r==systemC){
			reward(r);
			// accuracy+=1;
			console.log("Out..........Steps taken : ",count );
			if (algo == 0){
				console.log("maxAlgo");
			}
			if (algo==1){
				console.log("freqAlgo");
			}
			if (algo==2){
				console.log("roundAlgo");
			}
			if (algo==3){
				console.log("rareAlgo");
			}
			if (algo==4){
				console.log("reflex");
			}
			if (algo==5){
				console.log("randomGenAlgo");	
			}
			console.log(rating);
			// break;
			document.getElementById('player').style.backgroundColor="red";
			document.getElementById('system').style.backgroundColor="red";
			one.disabled=true;
			zero.disabled=true;
			two.disabled=true;
			three.disabled=true;
			four.disabled=true;
			five.disabled=true;
			six.disabled=true;
			final_result(systemscore-totalG);
		}
		else{
			rating[algo]-=1;
			totalG+=r;
			// console.log(totalG);
			if(r==0){
				totalG+=systemC;
			}
			score.innerText=totalG;
			main_array[previous][r]+=1;
			check(totalG);
		}
	}
	else{
		alert("First press the start button ...");
		player.innerText=0;

	}
}
function final_result(argument) {
	 var s=0;
	 delete_elements=setInterval(function(){
		s++;
		if(s === 2)
			document.getElementById('playerName').style.display='none';
		if(s === 3){
			document.getElementById('images').style.display='none';
			document.getElementById('hr').style.display='none';
				
		}
		if(s === 4)
			document.getElementById('liveScore').style.display='none';
		if(s === 5)
			document.getElementById('inningsDetails').style.display='none';
		if(s === 6)
			document.getElementById('inputButtons').style.display='none';
		if(s === 7)
			document.getElementById('inputArea').style.display='none';
		if(s === 8)
			document.getElementById('battleground').style.display='none';
		if(s === 9)
			document.getElementById('mainBox').style.display='none';
		if(s === 10){
			if(argument >=1){
				if (argument<10) {
					document.getElementById('result1').innerHTML=loss_result[Math.floor(Math.random()*loss_result.length)]+"  That was too close...!";	
				}
				else{
					document.getElementById('result1').innerHTML=loss_result[Math.floor(Math.random()*loss_result.length)];
				}
			}
			else{
					document.getElementById('result1').innerHTML="What a stunning victory..........!!!";
			}
			document.getElementById('result').style.display='block';
		}
		if(s === 11)
			stop_delete();
	},1000);	
}

function stop_delete() {
	    clearInterval(delete_elements);
}

function check(totalG) {
	// console.log(totalG,"in check");
	if(systemscore <=totalG){
		document.getElementById('player').style.backgroundColor="green";
		document.getElementById('system').style.backgroundColor="green";
		one.disabled=true;
		zero.disabled=true;
		two.disabled=true;
		three.disabled=true;
		four.disabled=true;
		five.disabled=true;
		six.disabled=true;
		final_result(-1);
	}
}

zero.addEventListener('click',function (argument) {
	// console.log("Waiting..");
	player.innerText=0;
	startGame(0);
});

one.addEventListener('click',function (argument) {
	// console.log("Waiting..");
	player.innerText=1;
	startGame(1);
});

two.addEventListener('click',function (argument) {
	// console.log("Waiting..");
		player.innerText=2;
	startGame(2);
});
three.addEventListener('click',function (argument) {
	// console.log("Waiting..");
		player.innerText=3;
	startGame(3);
});
four.addEventListener('click',function (argument) {
	// console.log("Waiting..");
		player.innerText=4;
	startGame(4);
});
five.addEventListener('click',function (argument) {
	// console.log("Waiting..");
		player.innerText=5;
	startGame(5);
});
six.addEventListener('click',function (argument) {
	// console.log("Waiting..");
		player.innerText=6;
	startGame(6);
});

// function t123(){

// 	document.getElementById('mainBox').style.display="none";
// 	document.getElementById('difficulty_level').style.display="block";
// }
start.addEventListener('click',function(argument){
	
	// t123();
	if (flag_start==0) {
		Train_maxAlgo();
		start.innerText="Restart";
		flag_start=1;		
	}
	else{
		location.reload();
	}	
});

document.getElementById('restart1').addEventListener('click',function (argument) {
	// body...
	location.reload();
});

document.getElementById('homePage1').addEventListener('click',function(){
	location.href="index.html";
});

document.getElementById('easy').addEventListener('click',function(){
	difficulty_level=0;
	document.getElementById('level').style.display="none";
	document.getElementById('level1').style.display="block";
});


document.getElementById('medium').addEventListener('click',function(){
	difficulty_level=1;
	document.getElementById('level').style.display="none";
	document.getElementById('level1').style.display="block";
});

document.getElementById('hard').addEventListener('click',function(){
	difficulty_level=2;
	document.getElementById('level').style.display="none";
	document.getElementById('level1').style.display="block";
});