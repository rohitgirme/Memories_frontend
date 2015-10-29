/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'backbone',
  'utils/URLConstants'
], function (
  Backbone,
  URLConstants) {

  return Backbone.Model.extend({

    defaults: {
      title   : null,
      content : null,
      photos  : null,
      location: null,
      tags    : null,
      date    : null
    },

    urlRoot: URLConstants.MEMORIES

  });

});
