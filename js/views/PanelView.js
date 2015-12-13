/**
 * Created by rohitgirme on 11/8/15.
 */
define([
  'views/core/BaseView',
  'text!templates/PanelView.html'
], function (
  BaseView,
  viewTemplate) {

  return BaseView.extend({

    DELETE: 'delete',
    PHOTO : 'photo',

    className: 'panel-view',

    events: {
      'click .delete-icon'  : 'onDelete',
      'click .photo-icon'   : 'onAddPhoto',
      'click .close-icon'   : 'closePanel'
    },

    render: function () {
      this.$el.html(viewTemplate);
      return this;
    },

    showPanel: function () {
      this.show();
    },

    closePanel: function (evt) {
      evt.stopPropagation();
      this.hide();
    },

    onDelete: function (evt) {
      evt.stopPropagation();
      this.trigger(this.DELETE, evt);
    },

    onAddPhoto: function (evt) {
      evt.stopPropagation();
      this.trigger(this.PHOTO, evt);
    }
  });

});
