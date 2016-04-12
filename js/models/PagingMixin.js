/**
 * Created by rohitgirme on 3/25/16.
 */
define([
  'backbone',
  'toastr',
  'utils/URLConstants'
], function (
  Backbone,
  Notifications,
  URLConstants) {

  'use strict';

  var EVENTS = {
    NEW_PAGE: 'new_page'
  };

  return {

    count: 0,

    limit: 10,

    setLimit: function (limit) {
      this.limit = limit;
    },

    getNextURL: function () {
      var url = this.url() + '?count=' + this.count +
        '&limit=' + this.limit;
      return url;
    },

    getNext: function (options) {
      var _this = this;

      this.fetch({
        url: this.getNextURL(),
        success: function (model) {
          _this.count += _this.limit;
          _this.trigger(EVENTS.NEW_PAGE, {
            count: _this.count,
            limit: _this.limit
          });
          if (options && _.isFunction(options.success)) {
            options.success(model);
          }
        },
        error: function () {
          Notifications.error('Looks like the internet broke...');
          if (options && _.isFunction(options.error)) {
            options.error();
          }
        }
      });
    },

    getPrevious: function () {

    }

  };
});
