define( function(){
	var MovieObserver= function() {
	console.log("new observer");

	this.update= function(message){
	  console.log(message);
    };
  };
  return MovieObserver;
});