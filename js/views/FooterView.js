/**
 * Created by rohitgirme on 11/28/15.
 */
define([
  'views/core/BaseView',
  'text!templates/FooterView.html'
], function (
  BaseView,
  viewTemplate) {

  'use strict';

  return BaseView.extend({

    CREATE_NEW: 'createNew',

    events: {
      'click .app-create-new': '_createNewMemory'
    },

    render: function () {
      this.$el.html(viewTemplate);
    },

    _createNewMemory: function () {
      this.trigger(this.CREATE_NEW);
    }

  });

});
