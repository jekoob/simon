let power=false;
let win = false;
let sequency=[];
let good=true;
let userTry;
let level=1;
let count=0;
let soundsNames=["one","two","three","four","level-up","negative-beep"];
let audio={};

for(let i=0;i<soundsNames.length;i++){
	getTheSounds(soundsNames[i]);
}  

for(let i=0;i<20;i++){
	let chiose = randomNum();
	switch(chiose){
		case 1:chiose="one";
			break;
		case 2:chiose="two";
			break; 
		case 3:chiose="three";
			break; 
		case 4:chiose="four";
			break;  
	}
	sequency.push(chiose);
}

function simonSay(){
			setTimeout(()=>{
				$(".title h1").text("level "+level);
				$(".circle").html("<P>simon </b>say..</P>");
			},300);
			power=true;
			$("body").off("keydown");
			console.log(sequency);
				let intervalId = setInterval(()=>{
					if(count<level){
						$("#"+sequency[count]).addClass("flash");
						audio[sequency[count]].play();
						setTimeout(()=>{
							$("#"+sequency[count]).removeClass("flash");
							count++;
							if(count===level) {
								clearInterval(intervalId);
								count=0;
								comper();
							}
						},500);
					}
			},800);
}

function comper(){
	$(".circle").html("<P>Repeat</P>");
	$(".gridItem").on("click",(event)=>{
		$(event.target).addClass("flash");
		audio[$(event.target).attr("id")].play();
		setTimeout(()=>{
			$(event.target).removeClass("flash");
		},500);
		if(count<level){
			userTry=$(event.target).attr("id");
			console.log(userTry);
			if(userTry===sequency[count]){
				count++;
				if(count===level){
					$(".gridItem").off("click");
					if(level!==20){
						levelUp();
					}
				}
			}
			else{
				$(".gridItem").off("click");
				setTimeout(()=>{
					flashOver();
				},400);
				level=1;
				count=0;
				$("body").on("keydown",()=>{
					simonSay();
				})
			}
		}
	});
}

function randomNum(){
	return Math.floor(Math.random()*4+1);
}

function levelUp(){
	level++;
	count=0;
	setTimeout(()=>{
		gradlyFlash();
	},100)
}


function flashOver(){
	setTimeout(()=>{
		$(".circle").html("<h1 style=font-size:60px>&#128128</h1>");
		$(".title h1").text("Game over, press a key to restart");
		audio["negative-beep"].play();
	},430);
	
	let intervalId = setInterval(()=>{
		// if(count<4){
		// 	$(".item"+(count+1)).addClass("flash");
		// }
		
		// if(count===4){
		// 	$(".gridItem").removeClass("flash");
		// 	clearInterval(intervalId);
		// 	count=0;
		// }
		// else{
		// 	count++;
		// }
		if(count===0 || count===2 && count<4){
			$(".item"+1).addClass("flash");
			$(".item"+3).addClass("flash");
			$(".item"+2).removeClass("flash");
			$(".item"+4).removeClass("flash");
			count++;
		}
		else if(count===1 || count===3 && count<4 ) {
			$(".item"+2).addClass("flash");
			$(".item"+4).addClass("flash");
			$(".item"+1).removeClass("flash");
			$(".item"+3).removeClass("flash");
			count++;
		}
		else if(count===4){
			$(".gridItem").removeClass("flash");
			clearInterval(intervalId);
			count=0;
		}
	},230);
}
function gradlyFlash(){
	let count=0;
	setTimeout(()=>{
		$(".circle").html("<h1>LEVEL UP !</h1>");
			let intervalId = setInterval(()=>{
			$(".gridItem").addClass("flash");
			audio["level-up"].play();
			setTimeout(()=>{
				$(".gridItem").removeClass("flash");
				if(count==3){
					simonSay();
					clearInterval(intervalId);
				}
				else{
					count++;
				}
			},160)

		},250);
	},500);
}
function getTheSounds(sound){
	audio[sound] = new Audio();
        audio[sound].src = "sounds/"+sound+".mp3"
}

$("body").on("keydown",()=>{
simonSay();
});