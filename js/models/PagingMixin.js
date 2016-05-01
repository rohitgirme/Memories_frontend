/**
 * Created by rohitgirme on 3/25/16.
 */
define([
  'backbone',
  'toastr'
], function (
  Backbone,
  Notifications) {

  'use strict';

  return {

    upper: 0,

    lower: 0,

    limit: 10,

    setLimit: function (limit) {
      this.limit = limit;
    },

    setRange: function (options) {
      if (!options) {
        return;
      }
      this.upper = _.isNumber(options.upper) ? options.upper : this.upper;
      this.lower = _.isNumber(options.lower) ? options.lower : this.lower;
    },

    reset: function () {
      this.limit = 10;
      this.upper = 0;
      this.lower = 0;
    },

    getTopItems: function (number, options) {
      this.setLimit(number);
      this.getNext(options);
    },

    getNextURL: function () {
      var url = _.result(this, 'url') + '?skip=' + this.upper +
        '&limit=' + this.limit;
      return url;
    },

    getNext: function (options) {
      var _this = this;

      this.fetch({
        url: this.getNextURL(),
        success: function (model) {
          _this.upper += _this.limit;
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

    getPrevURL: function () {
      var count = Math.max(0, this.lower - this.limit);
      var url = _.result(this, 'url') + '?skip=' + count +
        '&limit=' + this.limit;
      return url;
    },

    getPrevious: function (options) {
      var _this = this;

      this.fetch({
        url: this.getPrevURL(),
        success: function (model) {
          _this.lower += _this.limit;
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
    }

  };
});
