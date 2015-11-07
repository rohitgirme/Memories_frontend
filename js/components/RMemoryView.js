/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'react',
  'models/MemoryModel',
  'utils/Constants'
], function (
  React,
  MemoryModel,
  Constants) {

  'use strict';

  return React.createClass({
    //TODO: dont need props.open

    getInitialState: function () {
      return {
        editMode: false
      };
    },

    render: function () {
      if (this.props.model &&
        this.props.model instanceof MemoryModel) {
        var title = this.props.model.get(Constants.TITLE),
            content = this.props.model.get(Constants.CONTENT);

        return (
          <div className= {this.state.editMode ? "memory-view edit-mode" : "memory-view display-mode"}>
            <header className="title">
              <span className="display">{title}</span>
              <input className="edit" value={title} />
            </header>
            <span onClick={this.updateModel} className="close-icon glyphicon glyphicon-remove" aria-hidden="true">
            </span>
            <div className="content">
              <span className="display">
                {content}
              </span>
              <textarea className="edit">
                {content}
              </textarea>
            </div>
            <div className="photos"></div>
            <div className="actions"></div>
            <div className="edit-icon-container round-shape" onClick={this.editSaveMemory}>
              <span className="display edit-icon glyphicon glyphicon-pencil" aria-hidden="true">
              </span>
              <span className="edit edit-icon glyphicon glyphicon-save" aria-hidden="true">
              </span>
            </div>
            <div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="memory-view">
            <header className="title-container">
              <input className="title" placeholder="Title..."/>
            </header>
            <span onClick={this.updateModel} className="close-icon glyphicon glyphicon-remove" aria-hidden="true">
            </span>
            <div className="content-container">
              <textarea className="content" placeholder="Once upon a time..."/>
            </div>
            <div className="photos"></div>
            <div className="actions"></div>
          </div>
        );
      }

    },

    editSaveMemory: function (evt) {
      this.setState({
        editMode: !this.state.editMode
      });
    },

    updateModel: function (evt) {
      var domNode = $(this.getDOMNode()),
          title = domNode.find('.title'),
          content = domNode.find('.content'),
          model,
          _this = this;

      model = this.props.model || new MemoryModel();
      model.set(Constants.TITLE, title.val());
      model.set(Constants.CONTENT, content.val());

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
      }, 50);
    }

  });
});