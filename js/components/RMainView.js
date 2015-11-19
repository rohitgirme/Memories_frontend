/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react',
  'classnames',
  'models/MemoriesCollection',
  'jsx!components/RHeaderView',
  'jsx!components/RListView',
  'jsx!components/RFooterView',
  'jsx!components/RMemoryView',
  'jsx!components/WelcomeScreenView'
], function (
  React,
  classnames,
  MemoriesCollection,
  RHeaderView,
  RListView,
  RFooterView,
  RMemoryView,
  WelcomeScreenView) {

  'use strict';

  return React.createClass({
    displayName: 'MainView',

    getInitialState: function () {
      return {
        memoryId   : null,
        mode       : 'loading'
      };
    },

    componentWillMount: function () {
      this.memories = new MemoriesCollection();
    },

    componentDidMount: function () {
      var _this = this,
          domNode = $(this.getDOMNode());

      this.memories.on('reset', function () {
        setTimeout(function () {
          domNode.on('transitionend', function (evt) {
            if (evt.originalEvent.propertyName === 'transform') {
              evt.stopPropagation();
              domNode.off();

              _this.setState({
                mode: 'main'
              });
            }
          });
          domNode.addClass('slideUp');
        }, 1500);
      });

      this.memories.getTopMemories(5, {
        reset: true
      });
    },

    render: function () {
      switch (this.state.mode) {
        case 'loading':
          return (
            <div className="app-view">
              <WelcomeScreenView></WelcomeScreenView>
              <div className="main-view">
                <RHeaderView />
                <RListView model={this.memories} onClick={this.onMemoryClick}/>
                <RFooterView createNew={this.createNew}/>
              </div>
            </div>
          );
        case 'main':
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
        case 'memory':
          var model = this.memories.get(this.state.memoryId);
          return (
            <div className="app-view">
              <div className="main-view">
                <RHeaderView />
                <RListView model={this.memories} onClick={this.onMemoryClick}/>
                <RFooterView createNew={this.createNew}/>
              </div>
              <RMemoryView onClose={this.onClose} ref="memoryView" model={model} open={this.state.mode === 'memory'}/>
            </div>
          );
          break;
      }
    },

    createNew: function () {
      var domNode = $(this.getDOMNode());
      domNode.find('input').attr('tabindex', -1);
      this.setState({
        mode      : 'memory',
        memoryId  : null
      });
    },

    onMemoryClick: function (evt, memoryId) {
      var domNode = $(this.getDOMNode());
      domNode.find('input').attr('tabindex', -1);
      this.setState({
        mode      : 'memory',
        memoryId  : memoryId
      });
    },

    onClose: function (evt, dirtyModel) {
      if (this.state.mode !== 'memory') {
        return;
      }
      var options = {},
          domNode = $(this.getDOMNode());
      domNode.find('input').attr('tabindex', 1);

      if (this.state.memoryId) {
        _.extend(options, {
          merge: true
        });
      }
      this.memories.add(dirtyModel, options);
      dirtyModel.save();

      this.setState({
        mode      : 'main',
        memoryId  : null
      });
    },

    onDelete: function () {
      if (this.state.mode !== 'memory') {
        return;
      }
      this.memories.remove(this.state.memoryId);
      this.setState({
        mode      : 'main',
        memoryId  : null
      });
    }

  });
});
