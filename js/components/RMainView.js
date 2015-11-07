/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react',
  'models/MemoriesCollection',
  'jsx!components/RHeaderView',
  'jsx!components/RListView',
  'jsx!components/RFooterView',
  'jsx!components/RMemoryView'
], function (
  React,
  MemoriesCollection,
  RHeaderView,
  RListView,
  RFooterView,
  RMemoryView) {

  'use strict';

  return React.createClass({
    displayName: 'MainView',

    getInitialState: function () {
      return {
        memoryId   : null,
        memoryView : false
      };
    },

    componentWillMount: function () {
      this.memories = new MemoriesCollection();
    },

    componentDidMount: function () {
      this.memories.getTopMemories(5, {
        reset: true
      });
    },

    render: function () {
      switch (this.state.memoryView) {
        case false:
          return (
            <div className="app-view">
              <div className="main-view">
                <RHeaderView />
                <RListView model={this.memories} onClick={this.onMemoryClick}/>
                <RFooterView createNew={this.createNew}/>
              </div>
            </div>
          );
          break;
        case true:
          var model = this.memories.get(this.state.memoryId);
          return (
            <div className="app-view">
              <div className="main-view">
                <RHeaderView />
                <RListView model={this.memories} onClick={this.onMemoryClick}/>
                <RFooterView createNew={this.createNew}/>
              </div>
              <RMemoryView onClose={this.onClose} ref="memoryView" model={model} open={this.state.memoryView}/>
            </div>
          );
        break;
      }

    },

    createNew: function () {
      this.setState({
        memoryView: true,
        memoryId  : null
      });
    },

    onMemoryClick: function (evt, memoryId) {
      this.setState({
        memoryView: true,
        memoryId  : memoryId
      });
    },

    onClose: function (evt, dirtyModel) {
      if (!this.state.memoryView) {
        return;
      }
      var options = {};

      if (this.state.memoryId) {
        _.extend(options, {
          merge: true
        });
      }
      this.memories.add(dirtyModel, options);
      dirtyModel.save();

      this.setState({
        memoryView: false,
        memoryId  : null
      });
    }

  });
});
