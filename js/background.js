// Initialize
var appId = chrome.runtime.id;

// Helpers
// Search array for string key
function hasValue (arr,value) {
  var i;
  for (i=0; i<arr.length; i++) { if (arr[i] === value) return true; }
  return false;
}

// Hide and show bookmarks
function hideShowBookmarks() {
  console.log("Checking Bookmarks");
  chrome.storage.sync.get('bookmarks',function(data){
    var sbookmarks = data.bookmarks
    var bookmarksToRemove = [];    
      
      chrome.storage.local.get('currentlocation',function(data){
        var currentlocation = data.currentlocation;
        for (var key in sbookmarks) {
          console.log(key);
          console.log(sbookmarks);
          if (sbookmarks[key].location == null) { continue; }
          if (sbookmarks[key].location.length == 0) { continue; }
          
          var isInCurrentLocation = hasValue(sbookmarks[key].location,currentlocation);
          
          if(sbookmarks[key].hidden && isInCurrentLocation) {
            // create the bookmark on the bar
            console.log('create on bar');
            continue;
          } 
            
          if(sbookmarks[key].parentId != 1 && isInCurrentLocation) {
            // if the bookmark is not already on the bar move it there.
            console.log('move to bar');
            continue;
          } 
          
          if(!sbookmarks[key].hidden && !isInCurrentLocation) {
            console.log('remove');
            continue;
          } 
        
        }
        
        // Update the list of bookmarks to be removed
    });
  });
}

//Handlers
// Handle storage change
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if(('bookmarks' in changes) || ('locations' in changes) || ('currentlocation' in changes)){
    hideShowBookmarks(); 
  }
});

hideShowBookmarks();