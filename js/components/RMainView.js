/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react',
  'models/MemoriesCollection',
  'jsx!components/RHeaderView',
  'jsx!components/RListView'
], function (
  React,
  MemoriesCollection,
  RHeaderView,
  RListView) {

  return React.createClass({
    displayName: 'MainView',

    componentWillMount: function () {
      this.memories = new MemoriesCollection();
    },

    componentDidMount: function () {
      this.memories.getTopMemories(5, {
        reset: true
      });
    },

    render: function () {
      return (
        <div className="app-main-view">
          <RHeaderView />
          <RListView model={this.memories} />

          <footer className="app-footer">
            <div className="app-create-new" />
          </footer>
        </div>
      );
    }

  });
});
