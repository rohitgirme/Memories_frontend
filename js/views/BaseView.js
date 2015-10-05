/**
 * Created by rohitgirme on 9/28/15.
 */
define([
  'backbone'
], function (Backbone) {
  
  return Backbone.View.extend({
    
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
  
});
