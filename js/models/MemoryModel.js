/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'backbone',
  'utils/URLConstants',
  'utils/Constants'
], function (
  Backbone,
  URLConstants,
  Constants) {

  return Backbone.Model.extend({

    defaults: {
      title   : null,
      content : null,
      photos  : null,
      location: null,
      tags    : [],
      date    : null
    },

    urlRoot: URLConstants.MEMORIES,

    isNewMemory: function () {
      var isNew = this.get(Constants.TITLE) === null;
      isNew = isNew && this.get(Constants.CONTENT) === null;
      isNew = isNew && this.get(Constants.PHOTOS) === null;
      isNew = isNew && this.get(Constants.LOCATION) === null;
      isNew = isNew && _.isEmpty(this.get(Constants.TAGS));
      isNew = isNew && this.get(Constants.DATE) === null;

      return isNew;
    }

  });

});
