/**
 * Created by rohitgirme on 11/29/15.
 */
define([
  'classnames',
  'views/core/BaseView',
  'views/PanelView',
  'utils/Constants',
  'utils/AppEvents',
  'text!templates/MemoryView.html'
], function (
  classnames,
  BaseView,
  PanelView,
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

  return BaseView.extend({

    className: 'memory-view',

    events: {
      'keypress .tags-container': '_createTag',
      'click .save-icon'        : 'saveMemory',
      'click .edit-icon'        : 'editMemory',
      'click .close-icon'       : 'closeMemory',
      'click .left-icon'        : 'openPalette'
    },

    initialize: function (options) {
      this.model = options.model;
      this.panelView = new PanelView();
      this.panelView.on(this.panelView.DELETE, _.bind(this.deleteMemory, this));
    },

    render: function (options) {
      var editMode = this.model.isNew();
      if (options && options.editMode) {
        editMode = true;
      }

      this.$el.html(viewTemplate({
        title  : this.model.get(Constants.TITLE) || Constants.UNTITLED_TITLE(),
        content: this.model.get(Constants.CONTENT),
        tags   : this.model.get(Constants.TAGS),
        showInputTag: editMode
      }));
      this.$el.append(this.panelView.render().el);

      // add or remove class based on editMode.
      if (editMode) {
        this.$el.addClass('edit-mode');
      } else {
        this.$el.removeClass('edit-mode');
      }

      return this;
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
      }
    },

    editMemory: function () {
      this.render({
        editMode: true
      });
    },

    saveMemory: function (evt, silent) {
      var domNode = this.$el,
          title = domNode.find('.title:visible'),
          content = domNode.find('.content:visible'),
          tagContainer = domNode.find('.tags-container'),
          tags;

      tags = _.map(tagContainer.children(':not(:last-child)'), function (tag) {
        return $(tag).text();
      });
      this.model.set(Constants.TITLE, title.val() || title.text());
      this.model.set(Constants.CONTENT, content.val() || content.text());
      this.model.set(Constants.TAGS, tags);

      if (!silent) {
        this.render();
      }
    },

    openPalette: function () {
      this.panelView.showPanel();
    },

    deleteMemory: function (evt) {
      this.panelView.closePanel(evt);
      var itemId = this.model.id || this.model.cid;
      AppEvents.triggerAppEvent(
        AppEvents.MEMORY_EVENT,
        {
          type  : Constants.DELETE_MEMORY,
          itemId: itemId
        }
      );
    },

    closeMemory: function () {
      this.saveMemory(null, true);
      var itemId = this.model.id || this.model.cid;
      AppEvents.triggerAppEvent(
        AppEvents.MEMORY_EVENT,
        {
          type  : Constants.UPDATE_MEMORY,
          itemId: itemId
        }
      );
    }

  });
});