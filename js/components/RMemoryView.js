/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'react',
  'models/MemoryModel',
  'utils/Constants',
  'jsx!templates/MemoryViewTemplate'
], function (
  React,
  MemoryModel,
  Constants,
  MemoryViewTemplate) {

  'use strict';

  return React.createClass({
    //TODO: dont need props.open

    getInitialState: function () {
      return {
        editMode : false,
        showPanel: false,
        tags     : []
      };
    },

    componentWillMount: function () {
      if (!this.props.model) {
        this.setState({
          editMode: true
        });
      } else {
        this.setState({
          tags: this.props.model.get(Constants.TAGS)
        });
      }
    },

    render: function () {
      var model = this.props.model,
          closeCallback;

      if (!model) {
        model = new MemoryModel();
      }
      closeCallback = _.bind(this.updateModel, this, model);

      var title = model.get(Constants.TITLE) || Constants.UNTITLED_TITLE(),
          content = model.get(Constants.CONTENT);

      return MemoryViewTemplate.template({
        editMode: this.state.editMode,
        title   : title,
        content : content,
        tags    : this.state.tags,
        closeCallback   : closeCallback,
        editSaveCallback: this.editSaveMemory,
        openPanelCallback: this.openPanelCallback,
        closePanelCallback: this.closePanelCallback,
        showPanel: this.state.showPanel,
        deleteCallback: this.deleteMemory,
        createTag: this.createTag
      });

    },

    createTag: function (evt) {
      var target = $(evt.target);

      if (evt.which === 13) {
        var tag = target.val(),
            tags = this.state.tags;

        tags.push(tag);
        this.setState({
          tags: tags
        });
      }
    },

    editSaveMemory: function () {
      this.setState({
        editMode: !this.state.editMode
      });
    },

    openPanelCallback: function () {
      this.setState({
        showPanel: true
      });
    },

    closePanelCallback: function () {
      this.setState({
        showPanel: false
      });
    },

    updateModel: function (model, e) {
      var domNode = $(this.getDOMNode()),
          title = domNode.find('.title:visible'),
          content = domNode.find('.content:visible'),
          tagContainer = domNode.find('.tags-container'),
          tags, _this = this;

      tags = _.map(tagContainer.children(':not(:last-child)'), function (tag) {
        return $(tag).text();
      });
      model.set(Constants.TITLE, title.val() || title.text());
      model.set(Constants.CONTENT, content.val() || content.text());
      model.set(Constants.TAGS, tags);

      domNode.on('transitionend', function (evt) {
        if (evt.originalEvent.propertyName === 'transform') {
          evt.stopPropagation();
          domNode.off();
          _this.props.onClose(e, model);
        }
      });
      $('#app-container').removeClass('is-visible');
    },

    deleteMemory: function () {
      var domNode = $(this.getDOMNode()),
          _this = this;

      $('#app-container').removeClass('is-visible');
      domNode.on('transitionend', function (evt) {
        if (evt.originalEvent.propertyName === 'transform') {
          evt.stopPropagation();
          domNode.off();
          _this.props.onDelete();
        }
      });
    },

    componentDidMount: function () {
      var _this = this;
      setTimeout(function () {
        if (_this.props.open) {
          $('#app-container').addClass('is-visible');
        }
      }, 5);
    }

  });
});