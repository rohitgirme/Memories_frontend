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

    MAIN_VIEW: 'main_view',

    TITLE   : 'title',
    CONTENT : 'content',
    PHOTOS  : 'photos',
    LOCATION:'location',
    TAGS    : 'tags',
    DATE    : 'date',

    UNTITLED_TITLE: titleGenerator

  }

});
