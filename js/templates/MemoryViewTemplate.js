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

      var tags = _.map(data.tags, function (tag) {
        return (<div className="tag">{tag}</div>);
      });
      tags.push((
        <div className="tag">
          <input placeholder="tag" />
        </div>));

      //var touchstart = function (evt) {
      //  evt.preventDefault();
      //  //target.clientWidth is total width.
      //  // use to detect right edge
      //  //relative to 0 is for left edge
      //  console.log('touch start', evt.touches[0]);
      //};
      //
      //var touchend = function (evt) {
      //  evt.preventDefault();
      //  console.log('touch end', evt.touches[0]);
      //};

      return (
        <div className="memory-view-container" /*onTouchStart={touchstart} onTouchEnd={touchend}*/>
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
            <div id="show-picture" ></div>
            <input onChange={data.onChange} type="file" id="take-picture" accept="image/*" />

            <div className="tags-container" onKeyPress={data.createTag}>
              {tags}
            </div>
          </div>
          <span onClick={data.openPanelCallback} className={panelOpenerClasses} aria-hidden="true">
          </span>
          <PanelView show={data.showPanel} closeCallback={data.closePanelCallback} deleteCallback={data.deleteCallback}></PanelView>
        </div>
      );
    }
  }
});