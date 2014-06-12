define(['Movie'], function(Movie){
    'use strict';
    var Social= function() {
      Movie.call(this);
      console.log('new social');
       
      this.share= function(friendName){
        this.notifyObservers('share '+this.get('title')+' with '+ friendName);
      };
      this.like= function(){
        this.notifyObservers('like '+this.get('title'));
      };
    };
    Social.prototype= new Movie();
    Social.prototype.constructor= Social;
    return Social;
});