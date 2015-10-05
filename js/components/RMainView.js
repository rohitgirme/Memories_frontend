/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react',
  'jsx!components/RHeaderView'
], function (
  React,
  RHeaderView) {

  return React.createClass({

    render: function () {
      return (
        <div className="app-main-view">
          <RHeaderView />
          <div className="app-lists-container" />

          <footer className="app-footer">
            <div className="app-create-new" />
          </footer>
        </div>
      );
    }

  });
});
