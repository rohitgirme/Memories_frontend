/**
 * Created by rohitgirme on 10/4/15.
 */
define([

], function () {

  // Persistence is client side only.
  var titleGenerator = (function () {

    var index = 1;
    return function () {
      if (window.localStorage) {
        var localIndex = window.localStorage.getItem('titleIndex');
        var title = 'Untitled' + localIndex++;

        window.localStorage.setItem('titleIndex', localIndex);

        return title;
      } else {
        return 'Untitled' + index++;
      }
    }

  })();

  return {

    MAIN_VIEW: 'mainView',
    WELCOME_VIEW: 'welcomeView',
    HEADER_VIEW: 'headerView',
    FOOTER_VIEW: 'footerView',
    LIST_VIEW: 'listView',
    MEMORY_VIEW: 'memoryView',

    UPDATE_MEMORY: 'updateMemory',
    DELETE_MEMORY: 'deleteMemory',

    TITLE   : 'title',
    CONTENT : 'content',
    PHOTOS  : 'photos',
    LOCATION:'location',
    TAGS    : 'tags',
    CREATE_DATE : 'createDate',
    UPDATE_DATE : 'updateDate',
    NEW_PHOTOS  : 'newPhotos',

    UNTITLED_TITLE: titleGenerator,

    // ACTIONS
    PHOTO : 'photo',
    DELETE: 'delete',
    UNDO  : 'undo',
    REDO  : 'redo',
    BOLD  : 'bold',
    ITALIC: 'italic'

  }

});
