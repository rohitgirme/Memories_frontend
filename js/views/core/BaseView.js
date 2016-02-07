/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'backbone',
  'utils/AppUtil'
], function (
  Backbone,
  AppUtil) {

  var BaseView = Backbone.View.extend({

    whitespaceRegex: /\s+/,

    show: function (options) {
      if (options && options.remove) {
        this.$el.show();
        return;
      }

      this.$el.addClass('is-visible');
    },

    hide: function (remove) {
      if (remove) {
        this.$el.hide();
        return;
      }

      this.$el.removeClass('is-visible');
    },

    destroy: function () {
      this.undelegateEvents();
      this.undelegateModelEvents();

      this.$el.remove();
    },

    delegateModelEvents: function () {
      if (!this.model) {
        AppUtil.warn('No "model" property found!');
        return;
      }
      var eventsHash = this.modelEvents || {},
          _this = this;
      _.each(eventsHash, function (value, key) {
        var keys = key.split(_this.whitespaceRegex);
        (this[keys[0]]).on(keys[1], this[value], this);
      }, this);
    },

    undelegateModelEvents: function () {
      if (!this.model) {
        AppUtil.warn('No "model" property found!');
        return;
      }
      this.model.off();
    },

    startServices: function () {

    },

    stopServices: function () {

    }

  });

  return BaseView;

});
