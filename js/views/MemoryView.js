/**
 * Created by rohitgirme on 11/29/15.
 */
define([
  'views/core/BaseView',
  'views/PanelView',
  'models/MemoryModel',
  'utils/Constants',
  'utils/AppEvents',
  'text!templates/MemoryView.html'
], function (
  BaseView,
  PanelView,
  MemoryModel,
  Constants,
  AppEvents,
  viewTemplate) {

  'use strict';

  viewTemplate = _.template(viewTemplate);

  var tagTemplate = _.template(
    '<div class="tag">' +
      '<%= tagValue %>' +
    '</div>'
  );

  var imageTemplate = _.template(
    '<img class="image" src="<%= imgPath %>">'
  );

  return BaseView.extend({

    images: null,

    className: 'memory-view col-xs-12',

    events: {
      'keypress .tags-container': '_createTag',
      'click .save-icon'        : 'saveMemory',
      'click .edit-icon'        : 'editMemory',
      'click .close-icon'       : 'closeMemory',
      'click .left-icon'        : 'openPalette',
      'click .upload'           : 'upload'
    },

    _getMemoryModel: function (options) {
      var model = options.model;
      if (!model) {
        var createDate = new Date();
        model = new MemoryModel();
        model.set(Constants.CREATE_DATE, createDate.getTime());
      }
      return model;
    },

    initialize: function (options) {
      this.images = [];
      this.model = this._getMemoryModel(options);
    },

    render: function () {
      var isNew = this.model.isNew(),
          editMode = isNew,
          _this = this,
          location = this.model.get(Constants.LOCATION);

      if (isNew && !location && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          if (_this.model) {
            _this.model.set(Constants.LOCATION, {
              latitude : position.coords.latitude,
              longitude: position.coords.longitude
            });
          }
        });
      }

      this.updateView({
        editMode: editMode
      });

      this._renderPanelView();

      return this;
    },

    updateView: function (options) {
      var editMode = false;

      // Override with options if any are sent.
      if (options && !_.isUndefined(options.editMode)) {
        editMode = options.editMode;
      }

      // Redrawing everything to avoid complication of keeping track\state.
      this.$el.html(viewTemplate({
        title  : this.model.get(Constants.TITLE) || Constants.UNTITLED_TITLE(),
        content: this.model.get(Constants.CONTENT),
        tags   : this.model.get(Constants.TAGS)
      }));

      this._appendImages(this.model.get(Constants.PHOTOS));

      // add or remove class based on editMode.
      if (editMode) {
        this.$el.addClass('edit-mode');
      } else {
        this.$el.removeClass('edit-mode');
      }
    },

    show: function (options) {
      if (options) {
        this.model = this._getMemoryModel(options);
      }
      this.render();
      BaseView.prototype.show.apply(this, arguments);
    },

    _appendImages: function (images) {
      var allImages = "";

      if (_.isArray(images)) {
        _.each(images, function (image) {
          allImages += imageTemplate({
            imgPath: image
          })
        });
      }

      this.$('.scrolling-panel').html(allImages);
    },

    displayUploadedImage: function (evt) {
      var imageFile = evt.file,
          reader = new FileReader(),
          _this = this;

      this.images.push(imageFile);

      reader.onload = function (e) {
        _this.$('.scrolling-panel').append(
          imageTemplate({
            imgPath: e.target.result
          })
        );
      };

      reader.readAsDataURL(imageFile);
    },

    editMemory: function () {
      this.updateView({
        editMode: true
      });
    },

    saveMemory: function (evt, silent) {
      var domNode = this.$el,
          title = domNode.find('.title:visible'),
          content = domNode.find('.content:visible'),
          tagContainer = domNode.find('.tags-container'),
          tags;

      tags = _.map(tagContainer.children(), function (tag) {
        return $(tag).text();
      });

      tags = _.compact(tags);

      this.model.set(Constants.TITLE, title.val() || title.text());
      this.model.set(Constants.CONTENT, content.val() || content.text());
      this.model.set(Constants.TAGS, tags);

      // Switch to display mode after saving in edit mode.
      if (!silent) {
        this.updateView({
          editMode: false
        });
      } else {
        var formData = new FormData();
        _.each(this.images, function (image) {
          formData.append('images', image);
        });
        if (this.images.length > 0) {
          this.model.set(Constants.NEW_PHOTOS, formData);
        }
      }
    },

    openPalette: function () {
      this.panelView.showPanel({
        isNew: this.model.isNew()
      });
    },

    deleteMemory: function (evt) {
      this.panelView.closePanel(evt);
      AppEvents.triggerAppEvent(
        AppEvents.MEMORY_EVENT,
        {
          type  : Constants.DELETE_MEMORY,
          model : this.model
        }
      );
    },

    closeMemory: function () {
      this.saveMemory(null, true);
      this.images = [];
      AppEvents.triggerAppEvent(
        AppEvents.MEMORY_EVENT,
        {
          type  : Constants.UPDATE_MEMORY,
          model : this.model
        }
      );
    },

    _renderPanelView: function () {
      this.panelView = new PanelView();
      this.panelView.on(this.panelView.DELETE, _.bind(this.deleteMemory, this));
      this.panelView.on(this.panelView.PHOTO, _.bind(this.displayUploadedImage, this));
      this.$el.append(this.panelView.render().el);
    },

    _createTag: function (evt) {
      var target = $(evt.target);

      if (evt.which === 13) {
        var tag = target.val(),
          tags = this.model.get(Constants.TAGS);

        tags.push(tag);
        target.val('');
        $(evt.currentTarget).prepend(
          tagTemplate({
            tagValue: tag
          })
        );
        evt.stopPropagation();
      }
    }

  });
});