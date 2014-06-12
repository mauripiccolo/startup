define(function(require){
  var Hashmap = require('Hashmap');

    var Director= function(name) {
      var directorName= name;
      var attributes = new Hashmap();
      console.log('new Director');
      
      this.getName = function(){
        return directorName;
      };
      this.set = function (key,value) {
        attributes.setItem(key,value);
      };
      this.get = function (key) {
        return attributes.getItem(key);
      };
      this.speak = function(){
        var items = this.get('quotes');
        var text= '';
        for (var i = 0; i < items.length; i++) {
          text +=  items[i];
        }
        console.log(directorName+' says: '+ text);
      };
    };
  return Director;
});