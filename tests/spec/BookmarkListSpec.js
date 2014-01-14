describe("BookmarkList", function() {
  describe("Load",function() {
    var blist;  
    
    beforeEach(function(done) {
      blist = new BookmarkList(function(){return;});  
      setTimeout(function(){
        done();
      },25);
      
    });

    it("it should load bookmarks", function(done) {
      expect(blist.bookmarks);
      expect(blist.bookmarks.length).not.toBe(0);
      expect(blist.bookmarks[0].toString()).toBe('Bookmark');
      done();
    });
    
    it("it should load labels for bookmarks given they exist", function(done) {
      expect(blist.bookmarks);
      expect(blist.bookmarks.length).not.toBe(0);
      expect(blist.bookmarks[0].toString()).toBe('Bookmark');
      expect(blist.bookmarks[0].locations.length).not.toBe(0);
      done();
    });
  });
  describe("Save",function() {
    var blist;  
    
    beforeEach(function(done) {
      blist = new BookmarkList(function(){return;});  
      setTimeout(function(){
        blist.bookmarks[0].addLocation("Test");
      },25);
      setTimeout(function(){
        blist.save();
      },50);
      setTimeout(function(){
        done();
      },75);
    });

    it("it should save changes made to bookmarks when save is called", function(done) {
      var temp = JSON.parse(storage.bookmarks)
      expect(temp[2].locations.length).toBe(3);
      done();
    });
  });
  
  describe("Save",function() {
    var blist;  
    
    beforeEach(function(done) {
      blist = new BookmarkList(function(){return;});  
      setTimeout(function(){
        blist.bookmarks[0].addLocation("Test");
      },25);
      setTimeout(function(){
        done();
      },50);
    });

    it("it should not save changes made to bookmarks when save is not called", function(done) {
      var temp = JSON.parse(storage.bookmarks)
      expect(temp[2].locations.length).toBe(2);
      done();
    });
  });
});