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
        showPanel: false
      };
    },

    componentWillMount: function () {
      if (!this.props.model) {
        this.setState({
          editMode: true
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
        closeCallback   : closeCallback,
        editSaveCallback: this.editSaveMemory,
        openPanelCallback: this.openPanelCallback,
        closePanelCallback: this.closePanelCallback,
        showPanel: this.state.showPanel
      });

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

    updateModel: function (model, evt) {
      var domNode = $(this.getDOMNode()),
          title = domNode.find('.title:visible'),
          content = domNode.find('.content:visible'),
          _this = this;

      model.set(Constants.TITLE, title.val() || title.text());
      model.set(Constants.CONTENT, content.val() || content.text());

      $('#app-container').toggleClass('is-visible');
      domNode.on('transitionend', function () {
        _this.props.onClose(evt, model);
      });
    },

    componentDidMount: function () {
      var _this = this;
      setTimeout(function () {
        if (_this.props.open) {
          $('#app-container').toggleClass('is-visible');
        }
      }, 5);
    }

  });
});