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
var firstNum=0,secondNum=0,thirdNum=0,fourthNum=0,temp;
function Start_timer()
{
	if(flag===0){
			number=randomNumber();
			console.log(number);
			firstNum=(number-(number%1000))/1000;
			console.log(firstNum);
			temp=number-(firstNum*1000);
			secondNum=(temp-(temp%100))/100;
			console.log(secondNum);
			temp=number-((firstNum*1000)+(secondNum*100));
			thirdNum=(temp-(temp%10))/10;
			fourthNum=number%10;
			console.log(thirdNum);
			console.log(fourthNum);
			flag=1;
			document.getElementById("start").innerHTML='Reset';
    		time=setInterval(function(){
        	sec++;
        	if(wid<=100){
        		document.getElementById('timeLine').style.width=wid+"%";
        		wid=wid+0.27777777778;
        	}
        	if(sec===60)
        	{
        	    minute++;
        	    sec=0;
        	}
        	if (minute === 5 && sec >= 20)
        	{
        	    var colorChange=document.getElementById('timer');
        	    colorChange.style.color="red";
        	    document.getElementById('timeLine').backgroundColor='red';
        	}
        	if (minute === 6)
        	{
        	    stopTime();
        	    removeElements(1);
        	}
       		if(sec >9)
        		timecounter.innerHTML="Timer : 0"+minute+":"+sec;
        	else
        		timecounter.innerHTML="Timer : 0"+minute+":0"+sec;
    	},1000); 
	}
	else{
		stopTime();
		document.getElementById('first').value="";
		document.getElementById('second').value="";
		document.getElementById('third').value="";
		document.getElementById('fourth').value="";
		// document.getElementById("start").innerHTML='Start';
		flag=0;
		location.reload();
	}
}

function removeElements(arg) {
	var s=0;
	delete_elements=setInterval(function(){
		s++;
		if(s === 2)
			document.getElementById('firstBox').style.display='none';
		if(s === 6)
			document.getElementById('secondBox').style.display='none';
		if(s === 9)
			document.getElementById('thirdBox').style.display='none';
		if(s === 10)
			document.getElementById('fourthBox').style.display='none';
		if(s === 11)
			document.getElementById('fifthBox').style.display='none';
		if(s === 12){
			document.getElementById('sixthBox').style.display='none';
			document.getElementById('hint').remove();
			document.getElementById('timeLine').remove();
		}
		if(s === 12)
			document.getElementById('check').style.display='none';
		if(s === 13)
			document.getElementById('fourth').style.display='none';
		if(s === 14)
			document.getElementById('third').style.display='none';
		if(s === 15)
			document.getElementById('second').style.display='none';
		if(s === 16)
			document.getElementById('first').style.display='none';
		if(s === 17)
			document.getElementById('timeBomb').style.backgroundImage='none';
		if(s === 18)
			document.getElementById('timeBomb').remove();
		if(s === 19)
			document.getElementById('timer').remove();
		if(s === 20)
			document.getElementById('start').remove();
		if(s === 21)
			document.getElementById('headerElement').remove();
		if(s === 22){
			document.getElementById('Maingame').style.backgroundImage='none';
			if(arg === 1){
				document.getElementById('failed').style.display='block';
				loss(1);
			}
			else{
				if (arg == 2){
					document.getElementById('won').style.display='block';
					win();
				}
				else{
					document.getElementById('failed').style.display='block';
					loss(0);
				}
			}
		}
		if(s === 22)
			stop_delete();
	},1000);

}

document.getElementById('homePage1').addEventListener('click',function(){
	location.href="index.html";
});

document.getElementById('homePage2').addEventListener('click',function(){
	location.href="index.html";
});
document.getElementById('restart').addEventListener('click',function(){
	location.reload();
});

document.getElementById('restart2').addEventListener('click',function(){
	location.reload();
});
function win() {
	document.getElementById('mainBody').backgroundColor="#fff";
	document.getElementById('resultText').innerHTML="You win............!";

}
function loss(arg) {
	var s=0,t=5;
	finalTime=setInterval(function(){
		s++;
		if(s===6)
		{
			if(arg)
				document.getElementById('finalCount').innerHTML="You loss............!";
			else
				document.getElementById('finalCount').innerHTML="BOOOOOOOOMMMM...";
			document.getElementById('bombImg').src="./img/2nd.jpg";
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
function randomNumber() {
	return Math.floor(Math.random()*(9999-1000))+1000;
}
function stopTime()
{
    var colorChange=document.getElementById('timer');
    colorChange.style.color="white";
    timecounter.innerHTML="Timer : 00:00";
    minute=0;
    sec=0;
    clearInterval(time);
}

document.getElementById('start').addEventListener('click',Start_timer);
document.getElementById('check').addEventListener('click',function(){
	var temp1=parseInt(document.getElementById('first').value);
	var temp2=parseInt(document.getElementById('second').value);
	var temp3=parseInt(document.getElementById('third').value);
	var temp4=parseInt(document.getElementById('fourth').value);
	temp=(temp1*1000)+(temp2*100)+(temp3*10)+temp4;
	console.log(temp);
	var checking=(temp === number);
	console.log(checking);
	checked=1;
	if(temp === number){
		//document.getElementById('result').style.display='block';
		removeElements(2);
	}
	else{
		document.getElementById('result').style.display='block';
	}
});
document.getElementById('result').addEventListener('click',function(){
	document.getElementById('result').style.display='none';
});
document.getElementById('firstBox').addEventListener('click',function(){
		if (minute !=0 || sec!=0){
			var equal=0;
			if(firstNum === secondNum )
				equal+=1;
			if(firstNum === thirdNum )
				equal+=1;
			if(firstNum === fourthNum )
				equal+=1;
			if(secondNum === thirdNum )		
				equal+=1;
			if(secondNum === fourthNum)
				equal+1;
			if (thirdNum === fourthNum) 
				equal+=1;
			document.getElementById('firstBox').style.fontSize="1.1em";
			document.getElementById('hint1').style.display='none';
			document.getElementById('uniqueResult').style.display='block';
			document.getElementById('uniqueResult').innerHTML="The number of unique digits : "+equal;
	}
	else{
		alert("First start the timer...")
	}
});

document.getElementById('secondBox').addEventListener('click',function(){
	if(minute>=2)
	{
		var sum=firstNum+secondNum+thirdNum+fourthNum;
		document.getElementById('hint2').style.display='none';
		document.getElementById('sumResult').style.display='block';
		document.getElementById('secondBox').style.fontSize="1.1em";
		document.getElementById('sumResult').innerHTML="The sum of the four digits is "+sum;	
	}
	else{
		alert("Not available ");
	}
});

document.getElementById('thirdBox').addEventListener('click',function(){
	if(minute>=3)
	{
		document.getElementById('thirdBox').style.fontSize="1.2em";
		document.getElementById('hint3').style.display='none';
		document.getElementById('perCheck').style.display='block';
		document.getElementById('innerTimer').style.display='block';
	}
	else{
		alert("Not available");
	}
});

document.getElementById('fourthBox').addEventListener('click',function(){
	if(minute>=4)
	{
		document.getElementById('fourthBox').style.fontSize="1.2em";
		document.getElementById('one').style.display='block';
		document.getElementById('two').style.display='block';
		document.getElementById('checkCompare').style.display='block';
		document.getElementById('hint4').style.display='none';
	}
	else{
		alert("Not available");
	}
});

document.getElementById('fifthBox').addEventListener('click',function(){
	if(minute>=5)
	{
		document.getElementById('fifthBox').style.fontSize="1.2em";
		document.getElementById('show').style.display='block';
		document.getElementById('showNum').style.display='block';
		document.getElementById('hint5').style.display='none';
	}
	else{
		alert("Not available");
	}
});

document.getElementById('checkCompare').addEventListener('click',function(){
	document.getElementById('fourthBox').style.fontSize="1.5em";
	var one=parseInt(document.getElementById('one').value);
	var two=parseInt(document.getElementById('two').value);
	document.getElementById('one').remove();
	document.getElementById('two').remove();
	var array=[];
	array[0]=firstNum;
	array[1]=secondNum;
	array[2]=thirdNum;
	array[3]=fourthNum;
	document.getElementById('CompareResult').style.display='block';
	document.getElementById('checkCompare').remove();
	if(1 <= one <=4 && 1 <= two <=4)
	{
		if(array[one-1] > array[two-1])
		{
			document.getElementById('CompareResult').innerHTML="box-"+one+" is greater than box-"+two;		
		}
		if(array[one-1] < array[two-1])
		{
			document.getElementById('CompareResult').innerHTML="box-"+one+" is lesser than box-"+two;		
		}
		if(array[one-1] === array[two-1])
		{
			document.getElementById('CompareResult').innerHTML="box-"+one+" is equal to box-"+two;		
		}
	}
});

document.getElementById('perCheck').addEventListener('click',function(){
	if(flag1 === 0){
		flag1==1;
		var percentage=0;
		var temp1=parseInt(document.getElementById('first').value);
		var temp2=parseInt(document.getElementById('second').value);
		var temp3=parseInt(document.getElementById('third').value);
		var temp4=parseInt(document.getElementById('fourth').value);
		if(temp1===firstNum)
			percentage+=25;
		if(temp2===secondNum)
			percentage+=25;
		if(temp3===thirdNum)
			percentage+=25;
		if(temp4===fourthNum)
			percentage+=25;
		document.getElementById('perResult').style.display='block';
		document.getElementById('perResult').innerHTML=percentage+'%';
		innerTime=setInterval(function(){
        	innerSeconds++;
        	if(innerSeconds===15)
        	{
        		stopinnerTime();
        	}
        	else{
        		if(innerSeconds >9)
        			document.getElementById('innerTimer').innerHTML="available in 00:"+innerSeconds;
        		else
        			document.getElementById('innerTimer').innerHTML="available in 00:0"+innerSeconds;

        	}
    	},1000);
	}
});

function stopinnerTime()
{
	innerSeconds=0;
	flag1=0;
	document.getElementById('innerTimer').innerHTML="available in 00:00";    
    clearInterval(innerTime);
}

document.getElementById('showNum').addEventListener('click',function(){
	var num=parseInt(document.getElementById('show').value);
	document.getElementById('hint5answer').style.display='block';
	if(num===1)
	{
		document.getElementById('hint5answer').innerHTML=num+":"+firstNum;
		document.getElementById('first').value=firstNum;
		document.getElementById('first').style.backgroundColor="#000";
		document.getElementById('first').style.color="#fff";
	}
	if(num===2)
	{
		document.getElementById('hint5answer').innerHTML=num+":"+secondNum;
		document.getElementById('second').value=secondNum;
		document.getElementById('second').style.backgroundColor="#000";
		document.getElementById('second').style.color="#fff";
	}
	if(num===3)
	{
		document.getElementById('hint5answer').innerHTML=num+":"+thirdNum;
		document.getElementById('third').value=thirdNum;
		document.getElementById('third').style.backgroundColor="#000";
		document.getElementById('third').style.color="#fff";
	}
	if(num===4)
	{
		document.getElementById('hint5answer').innerHTML=num+":"+fourthNum;
		document.getElementById('fourth').value=fourthNum;
		document.getElementById('fourth').style.backgroundColor="#000";
		document.getElementById('fourth').style.color="#fff";
	}
	document.getElementById('show').remove();
	document.getElementById('showNum').remove();
});
document.getElementById("sixthBox").addEventListener("click",function(){
	removeElements(3);
});
