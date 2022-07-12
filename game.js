
var sequency=[];
var game;

async function simonSay(array){
	var count =0 ;
	$("body").off("keydown");
	while(count<array.length){
		$(".item"+array[count]).addClass("item");
		await sleep(500);
		$(".item"+array[count]).removeClass("item");
		await sleep(500);
		count++;
	}
	return comperUserSequncy(array);
}

function comperUserSequncy(array){
	var counter = 0 ;
	var state;
	var useraAnswer =[];
	var levelUp = [];
	var btn;
	$(".gridItem").click(function(){
		if(counter<array.length){
			$(this).addClass("item");
			btn = $(".item").attr("id");
			console.log(btn);
			switch(btn){
					case "one" :
					useraAnswer.push(1);
					break;
					case "two" :
					useraAnswer.push(2);
					break;
					case "three" :
					useraAnswer.push(3);
					break;
					case "four" :
					useraAnswer.push(4);
					break;
			}
	 		setTimeout(function(){
				$(".item").removeClass("item");	
	        },500);
        

 		if(useraAnswer[counter]===array[counter] && counter<array.length){

 			 counter++;

 		}

 		else if (useraAnswer[counter]!==array[counter] || counter===array.length){
 			$(".gridItem").off("click");
 			return "over";
 		}
 	  }
	});
};



$("body").keydown(function(event){
		game="on"
		while(game==="on"){
			sequency.push(createSequency());
			game=simonSay(sequency).then(comperUserSequncy(sequency));
			//comperUserSequncy(sequency);
		}	
});


function sleep(ms){
	return new Promise((accept)=>{
		setTimeout(()=>{
			accept();

		},ms);
	});
}

function createSequency(){
	return randomNum = Math.floor(Math.random()*4+1);

}


