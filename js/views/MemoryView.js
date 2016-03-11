/**
 * Created by rohitgirme on 11/29/15.
 */
define([
  'views/core/BaseView',
  'views/PanelView',
  'models/MemoryModel',
  'models/editor/EditorFactory',
  'utils/Constants',
  'utils/AppEvents',
  'text!templates/MemoryView.html'
], function (
  BaseView,
  PanelView,
  MemoryModel,
  EditorFactory,
  Constants,
  AppEvents,
  viewTemplate) {

  'use strict';

  viewTemplate = _.template(viewTemplate);

  var titleTemplate = _.template(
    '<span class="title display"><%= title %></span>' +
    '<input class="title edit" value="<%= title %>" />'
  );

  var tagsTemplate = _.template(
    '<% _.each(tags, function(tag) { %>' +
    '<div class="tag"><%= tag %></div>' +
    '<% }); %>' +
    '<div class="tag newTag"><input placeholder="tag" /></div>'
  );

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
      'click .close-icon'       : 'closeMemory'
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
      this.editor = EditorFactory.createEditor(
        'text-editor',
        '.editor-container'
      );
    },

    _saveLocation: function () {
      var _this = this;

      navigator.geolocation.getCurrentPosition(function (position) {
        if (_this.model) {
          _this.model.set(Constants.LOCATION, {
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
          });
        }
      });
    },

    render: function (updateView) {
      var isNew = this.model.isNew(),
          editMode = isNew,
          location = this.model.get(Constants.LOCATION);

      if (!updateView) {
        this.$el.html(viewTemplate);
        this._renderPanelView();
      }

      this.updateView({
        editMode: editMode
      });

      if (isNew) {
        this.$el.addClass('isNew');
        if (!location && navigator.geolocation) {
          this._saveLocation();
        }
      } else {
        this.$el.removeClass('isNew');
      }

      return this;
    },

    postRender: function () {
      this.editor.render();
      this.updateEditor();
    },

    updateEditor: function () {
      this.editor.setContent(this.model.get(Constants.CONTENT));
      this.editor.setReadOnly(this.editMode);
    },

    updateView: function (options) {
      var editMode = false;

      // Override with options if any are sent.
      if (options && !_.isUndefined(options.editMode)) {
        editMode = options.editMode;
        this.editMode = editMode;
      }

      this.$('.title-container').html(titleTemplate({
        title: this.model.get(Constants.TITLE) || Constants.UNTITLED_TITLE()
      }));

      this.$('.tags-container').html(tagsTemplate({
        tags: this.model.get(Constants.TAGS)
      }));

      this.updateEditor();

      this._appendImages(this.model.get(Constants.PHOTOS));

      // add or remove class based on editMode.
      if (editMode) {
        this.$el.addClass('edit-mode');
        this.panelView.show({
          remove: true
        });
      } else {
        this.$el.removeClass('edit-mode');
        this.panelView.hide({
          remove: true
        });
      }
    },

    show: function (options) {
      if (options) {
        this.model = this._getMemoryModel(options);
      }
      this.render(true);

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

    _gatherImages: function () {
      var formData = new FormData();
      _.each(this.images, function (image) {
        formData.append('images', image);
      });
      if (this.images.length > 0) {
        this.model.set(Constants.NEW_PHOTOS, formData);
      }
    },

    saveMemory: function (evt, silent) {
      var domNode = this.$el,
          title = domNode.find('.title:visible'),
          tagContainer = domNode.find('.tags-container'),
          tags;

      tags = _.map(tagContainer.children(), function (tag) {
        return $(tag).text();
      });

      tags = _.compact(tags);

      this.model.set(Constants.TITLE, title.val() || title.text());
      this.model.set(Constants.CONTENT, this.editor.getContent());
      this.model.set(Constants.TAGS, tags);

      // Switch to display mode after saving in edit mode.
      if (!silent) {
        this.updateView({
          editMode: false
        });
      } else {
        this._gatherImages();
      }
    },

    deleteMemory: function () {
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

    handleAction: function (evt) {
      switch (evt.type) {
        case Constants.DELETE:
          this.deleteMemory();
          break;
        case Constants.UNDO:
          this.editor.undo();
          break;
        case Constants.REDO:
          this.editor.redo();
          break;
        case Constants.BOLD:
          this.editor.makeBold();
          break;
        case Constants.ITALIC:
          this.editor.makeItalic();
          break;
        case Constants.PHOTO:
          this.displayUploadedImage();
          break;
      }
    },

    _renderPanelView: function () {
      this.panelView = new PanelView({
        el: this.$('.panel-view-container')
      });
      this.panelView.on(this.panelView.ACTION, _.bind(this.handleAction, this));

      this.panelView.render({
        isNew: this.model.isNew()
      });
    },

    _createTag: function (evt) {
      var target = $(evt.target);

      // Enter creates the tag.
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