/**
 * Created by rohitgirme on 10/18/15.
 */
define([
    'backbone',
    'models/MemoryModel',
    'utils/URLConstants'
  ], function (
    Backbone,
    MemoryModel,
    URLConstants) {

    return Backbone.Collection.extend({

      name: 'MemoriesCollection',

      model: MemoryModel,

      mode: null,

      number: null,

      getTopMemories: function (number, options) {
        this.mode = 'top';
        this.number = number;
        this.fetch(options);
        this.mode = null;
      },

      url: function () {
        switch (this.mode) {
          case 'top':
            return URLConstants.MEMORIES_TOP({
              number: this.number
            });
          default :
            return URLConstants.MEMORIES;
        }
      },

      getItems: function () {
        return this.models;
      }

    });

  }
);
