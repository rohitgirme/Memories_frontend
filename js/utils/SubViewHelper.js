/**
 * Created by rohitgirme on 11/22/15.
 */
define([
  'backbone'],

  function (Backbone) {

    return Backbone.Model.extend({

      _subViews: null,

      initialize: function () {
        this._subViews = {};
      },

      register: function (id, view) {
        this._subViews[id] = view;
      },

      iterate: function (functionName, args) {
        _.each(this._subViews, function (subView, key) {
          if (subView[functionName]) {
            (subView[functionName]).apply(subView, args);
          }
        });
      },

      getView: function (id) {
        return this._subViews[id];
      }
    });
});