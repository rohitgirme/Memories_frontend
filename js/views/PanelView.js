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
      'click .close-icon'   : 'closePanel',
      'click .photo-target' : 'takePicture',
      'change .take-picture': 'displayPicture'
    },

    render: function () {
      this.$el.html(viewTemplate);
      return this;
    },

    showPanel: function (options) {
      if (options && options.isNew) {
        this.$('.isNew').hide();
      } else {
        this.$('.isNew').show();
      }

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

    takePicture: function (evt) {
      evt.stopPropagation();
      this.$('.take-picture').click();
    },

    displayPicture: function (evt) {
      evt.stopPropagation();
      var imageFile = $(evt.currentTarget)[0].files[0];
      this.trigger(this.PHOTO, {
        file: imageFile
      });
    }
  });

});
