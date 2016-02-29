/**
 * Created by rohitgirme on 11/8/15.
 */
define([
  'views/core/BaseView',
  'utils/Constants',
  'text!templates/PanelView.html'
], function (
  BaseView,
  Constants,
  viewTemplate) {

  viewTemplate = _.template(viewTemplate);

  return BaseView.extend({

    ACTION: 'action',

    events: {
      'click .action-icon'  : 'handleAction',
      'click .photo-target' : 'takePicture',
      'change .take-picture': 'displayPicture'
    },

    render: function () {
      this.$el.html(viewTemplate({
        Constants: Constants
      }));
      return this;
    },

    handleAction: function (evt) {
      evt.stopPropagation();
      var action = $(evt.currentTarget).data('action');

      if (action) {
        this.trigger(this.ACTION, {
          type: action,
          evt : evt
        });
      }
    },

    takePicture: function (evt) {
      evt.stopPropagation();
      this.$('.take-picture').click();
    },

    displayPicture: function (evt) {
      evt.stopPropagation();
      var imageFile = $(evt.currentTarget)[0].files[0];
      this.trigger(this.ACTION, {
        type: Constants.PHOTO,
        file: imageFile
      });
    }
  });

});
