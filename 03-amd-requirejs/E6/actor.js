define(function(require){

  var Hashmap = require('Hashmap');

    var Actor= function() {
     var attributes = new Hashmap();
     console.log('new actor');
     this.set = function (key,value) {
       attributes.setItem(key,value);
       };
      this.get = function (key) {
        return attributes.getItem(key);
      };
    };
    return Actor;
});