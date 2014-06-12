define(['Movie'], function(Movie){
    'use strict';

    var Downloadable= function() {
	  Movie.call(this);
	  console.log('new downloadable');

	  this.download= function(){
	    this.notifyObservers('downloading '+this.get('title'));
	  };
	};
	Downloadable.prototype= new Movie();
	Downloadable.prototype.constructor= Downloadable;
	return Downloadable;
});