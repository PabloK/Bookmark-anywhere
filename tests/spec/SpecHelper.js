var storage;
beforeEach(function () {
storage = {
            locations: JSON.stringify([]),
            bookmarks: JSON.stringify({"2" :{
                        locations:["Home","Work"], 
                        prevParentId: "1"
                      }})
          };
});

var chrome; 
chrome = {
  storage: {
    sync: {
      get : function(location,callback){
        obj = {}; 
        obj[location] = JSON.parse(storage[location]);
        callback(obj);
      },
      set : function(data,callback){   
        for (key in data) {
          var temp = JSON.stringify(data[key])
          storage[key] = temp;   
        }
        if(typeof(callback) === 'function'){ callback(); }
      }
    }
  },
  bookmarks: {
    getTree: function(callback) { callback([{title: "_root", 
                                              id:"1", 
                                              parentId:"0", 
                                              children: [{
                                                title: "Mark1", 
                                                url:"test", 
                                                parentId:"1",
                                                id:"2", 
                                                children: []}
                                                ]
                                             }]);
                        } 
  }
}
localize = function() {};

window.alert = function(){return;};