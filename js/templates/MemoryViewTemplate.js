/**
 * Created by rohitgirme on 11/8/15.
 */
define([
  'react',
  'classnames',
  'jsx!components/PanelView'
], function (
  React,
  classnames,
  PanelView) {

  'use strict';

  return {
    template: function (data) {

      var containerClasses = classnames({
        'memory-view' : true,
        'edit-mode'   : data.editMode,
        'display-mode': !data.editMode
      });

      var panelOpenerClasses = classnames({
        'panel-open glyphicon glyphicon-chevron-left': true,
        'hide'  : data.showPanel
      });

      return (
        <div className="memory-view-container">
          <div className= {containerClasses}>
            <header className="title-container">
              <span className="title display">{data.title}</span>
              <input className="title edit" value={data.title} />
            </header>
            <span onClick={data.closeCallback} className="close-icon glyphicon glyphicon-remove" aria-hidden="true">
            </span>
            <div className="content-container">
              <span className="content display">
                {data.content}
              </span>
              <textarea className="content edit"
                placeholder={data.content ? "" : "Once upon a time..."}
                value={data.content}>
              </textarea>
            </div>
            <div className="photos"></div>
            <div className="actions"></div>
            <div className="edit-icon-container round-shape" onClick={data.editSaveCallback}>
              <span className="display edit-icon glyphicon glyphicon-pencil" aria-hidden="true">
              </span>
              <span className="edit edit-icon glyphicon glyphicon-save" aria-hidden="true">
              </span>
            </div>
            <div>
            </div>
          </div>
          <span onClick={data.openPanelCallback} className={panelOpenerClasses} aria-hidden="true">
          </span>
          <PanelView show={data.showPanel} closeCallback={data.closePanelCallback}></PanelView>
        </div>
      );
    }
  }
});