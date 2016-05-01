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

      url: URLConstants.MEMORIES

    });

  }
);
