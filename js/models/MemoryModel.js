/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'backbone',
  'utils/Constants',
  'utils/URLConstants'
], function (
  Backbone,
  Constants,
  URLConstants) {

  return Backbone.Model.extend({

    defaults: {
      title   : null,
      content : null,
      photos  : null,
      location: null,
      tags    : null,
      createDate    : null
    },

    urlRoot: URLConstants.MEMORIES,

    initialize: function () {
      this.set(Constants.TAGS, []);
    },

    get: function (attr) {
      var value = Backbone.Model.prototype.get.apply(this, arguments);
      if (attr === Constants.CONTENT) {
        return _.unescape(value);
      }
      return value;
    }
  });

});
