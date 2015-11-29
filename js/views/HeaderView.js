/**
 * Created by rohitgirme on 11/28/15.
 */
define([
  'views/core/BaseView',
  'text!templates/HeaderView.html'
], function (
  BaseView,
  viewTemplate) {

  'use strict';

  return BaseView.extend({

    render: function () {
      this.$el.html(viewTemplate);
    }

  });

});
