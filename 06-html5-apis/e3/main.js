var dbApi = {};
  dbApi.db = null;
  dbApi.initDb = function(){
    var requestOpen = indexedDB.open("db");
    requestOpen.onupgradeneeded = function(e){
      dbApi.db = e.target.result;
      if(!dbApi.db.objectStoreNames.contains("tex1")){
        console.log('database done');
        var store = dbApi.db.createObjectStore("tex1", {keyPath: "timestamp"});
      }
    };
    requestOpen.onsuccess = function(e){
      dbApi.db = e.target.result;
      console.log('database opened!');
    };
  };
  dbApi.storeIndexedDB = function(text){
    var inputValue = text.val();
    var transaction = dbApi.db.transaction(["tex1"],"readwrite");
    var store = transaction.objectStore("tex1");
    var request = store.add({"timestamp": (new Date()).getTime(), "val": inputValue});
    request.onerror = function(e) {
      console.log('Save Failed');
    };

    request.onsuccess = function(e) {
      console.log('saved in indexedDB');
    };
  };

function storeLocal(text, timestamp){
  var value = text.val();
  localStorage["inputData_"+timestamp] = value;
  console.log("saved in localStorage");
}

$(document).ready(function(){
  var text = $('#inputTextToSave');

  dbApi.initDb();
  $('#buttonSave').click(function(){
    var date = new Date();
    var timeStamp = date.getTime();
    dbApi.storeIndexedDB(text, timeStamp);
    storeLocal(text, timeStamp);
    text.val('');
  });
});