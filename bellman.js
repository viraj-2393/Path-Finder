// function that builds a grid in the "container"
var edge,graph,src,dest,alternate_src_dest = 0;
function createGrid(x) {
    var grd_no = -1;
    for (var rows = 0; rows < 20; rows++) {
        for (var columns = 0; columns < x; columns++) {
		    grd_no = grd_no + 1;
            $("#container").append("<div class='grid grid"+grd_no+"'"+"></div>");
        };
    };
};

$(document).ready(function() {

    createGrid(30);
   
    $(".grid").click(function(){
	 var color = $(this).css('backgroundColor');
	 var x = hexc(color);
	 if(x == '#ff6347'){
		  $(this).css("background-color","#ffffff");
		  $(this).css('border-left','1px solid #AFD8F8');
		  $(this).css('border-top','1px solid #AFD8F8');
		  decrease_weight(this.className);
	 }
	 else{
		 $(this).css("background-color","tomato");
		 $(this).css("border","none");
		 increase_weight(this.className);
	 }
    });
	
    $(".grid").mousedown(function() {
        $(".grid").mouseover(function() {
		     var color = $(this).css('backgroundColor');
			 var x = hexc(color);
			 if(x == '#ff6347'){
				  $(this).css("background-color","#ffffff");
				  $(this).css('border-left','1px solid #AFD8F8');
				  $(this).css('border-top','1px solid #AFD8F8');
				  decrease_weight(this.className);
			 }
			 else{
				 $(this).css("background-color","tomato");
				 $(this).css("border","none");
				 increase_weight(this.className);
		}
		});
		
    });
		
     $(".grid").mouseup(function(){
         $(".grid").unbind('mouseover');
     });
	 
	$(".setflag").click(function(){
	  if($('#src').val() && $('#dest').val()){
	    $('.grid'+src+" img").remove();
		$('.grid'+dest+" img").remove();
		src = $('#src').val();
		dest = $('#dest').val();
		$('.grid'+src).prepend("<img class ='image' src='robot4.gif' height='30px', width='100%'/>");
		$('.grid'+dest).prepend("<img class='image' src='battery.gif' height='30px', width='100%'/>");
		alternate_src_dest = 1;
	}
	});

   $(".run").click(function(){
     ford_driver();
   });
});

$(document).ready(function(){
 edge = (((19*29)*2) + 29 + 29) * 2;
  graph = Array.from(Array(edge), () => new Array(3));
  var main = -1;
  var index = -1;
  for(var m=0; m<600; m++){
     main = main + 1;
	 index = index + 1;
	 if((main + 1) % 30 == 0){
	   if((main + 30) < (600)){
	     graph[index] = [main,main+30,1];
		 index = index + 1;
		 graph[index] = [main+30,main,1];
	   } 
	   continue;
	 }
	 
		 graph[index] = [main,main+1,1];
		 index = index + 1;
		 graph[index] = [main+1,main,1];
		 if((main + 30) < 600){
		  index = index + 1;
		  graph[index] = [main,main+30,1];
		  index = index + 1;
		  graph[index] = [main+30,main,1];
		 }
}
   if(alternate_src_dest == 0){
		src = 35;
		dest = 345;
		$('.grid'+src).prepend("<img class ='image' src='robot4.gif' height='30px', width='100%'/>");
		$('.grid'+dest).prepend("<img class='image' src='battery.gif' height=30px', width='100%'/>");
   }
   
});

//increase and decrease function starts here 
 function increase_weight(weight){
   var exact_node = weight.match(/\d+/);
   var flag = 0;
   finder:for(var i=0; i<edge; i++){
     if(graph[i][0] == exact_node){graph[i][2] = 1000;}
	 if(flag == 2){break finder;}
   }
  }
  
  function decrease_weight(weight){
   var exact_node = weight.match(/\d+/);
   var flag = 0;
   finder:for(var i=0; i<edge; i++){
     if(graph[i][0] == exact_node){graph[i][2] = 1;}
	 if(flag == 2){break finder;}
   }
  }
//increase and decrease function ends here
 
//implementation of bellman ford algorithm starts here
function ford_driver(){
 V = 600;
 E = edge;
 bellman_ford(graph,V,E,src,dest);
}

 
function bellman_ford(graph,V,E,src,dest){
 var dis = Array.from(Array(V), () => new Array(2));
  for(var i=0; i<V; i++){
   dis[i] = [1.7976931348623157E+10308,0];
  }
  dis[src][0] = 0;
  outer:for(var i=0; i<V-1; i++){
   inner:for(var j=0; j<E; j++){
      if(typeof graph[j][0] == 'undefined'){break inner;}
      if(dis[graph[j][0]][0] + graph[j][2] < dis[graph[j][1]][0]){
	    initial_painting(i,graph[j][1]);
	    dis[graph[j][1]][0] = dis[graph[j][0]][0] + graph[j][2];
		dis[graph[j][1]][1] = graph[j][0];
	  }
	  //if(graph[j][1] == dest){break outer;}
   }
  }
  //backtracking path starts here
	path_finder(src,dest,dis,graph);
  //-----------
}

const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
   }

//path finding to the source from destination starts here  
 const path_finder = async(src,dest,dis,graph) =>{
  await sleep(2000);
  d = dest;
  s = src;
  ini = 0;
  path = [];
  if(dis[d][0] < 1000){
		while(d != s){
	   path[ini] = dis[d][1];
	   d = dis[d][1];
	   ini = ini + 1;
	  }
	  $('.grid'+dest).css('background-image',"linear-gradient(#FFFE6A,#FFFE6A)");
	  $('.grid'+dest).css('border','none');
	  path.reverse();
	  for(let z = 0; z <= path.length ; z++){
	   paint(z);
	  }
  }
  
}
//----------------------------------------
 
//painting stuff are done in this section
  function paint(z){
	  setTimeout(function() { 
		  $('.grid'+path[z]).css('background-image',"linear-gradient(#FFFE6A,#FFFE6A)");
		  $('.grid'+path[z]).css('border','none');
		  $('.grid'+path[z]).css('background-size',"100% 100%");
	  }, 50 * z); 
  }
  
  function initial_painting(i,j){
     var color = $('.grid'+j).css('backgroundColor');
	 var x = hexc(color);
	 if(x != '#ff6347'){
		 setTimeout(function() { 
		  //$('.grid'+j).css('background-image',"linear-gradient(#4961BA,#4961BA)");
		  $('.grid'+j).css('animation','5s multicolor');
		  $('.grid'+j).css('background-size',"100% 100%");
		 }, 50 * (i+i));
	 }
	 
  }  
//--------


//function to change rgb to hex
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if(parts == null){return '';}
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}
//--------