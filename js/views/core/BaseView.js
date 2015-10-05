/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'backbone'
], function (Backbone) {

  var BaseView = Backbone.View.extend({

    show: function () {
      this.$el.show();
    },

    hide: function () {
      this.$el.hide();
    },

    destroy: function () {
      this.undelegateEvents();
      this.undelegateModelEvents();

      this.$el.empty();
    },

    delegateModelEvents: function () {
      if (!this.model) {
        throw new Error('No "model" property found!');
      }
      var eventsHash = this.modelEvents || {};
      _.each(eventsHash, function (value, key) {
        this.model.on(key, this[value], this);
      }, this);
    },

    undelegateModelEvents: function () {
      if (!this.model) {
        throw new Error('No "model" property found!');
      }
      this.model.off();
    }

  });

  return BaseView;

});
