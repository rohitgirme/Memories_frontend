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

      url: URLConstants.MEMORIES,

      model: MemoryModel,

      mode: null,

      number: null,

      getTopMemories: function (number, options) {
        this.mode = 'top';
        this.number = number;
        this.fetch(options, this.getURL());
      },

      fetch: function (options, url) {
        this.url = url || this.url;
        Backbone.Collection.prototype.fetch.call(this, options);
      },

      getURL: function () {
        switch (this.mode) {
          case 'top':
            return URLConstants.MEMORIES_TOP({
              number: this.number
            });
        }
      },

      getItems: function () {
        return this.models;
      }

    });

  }
);
