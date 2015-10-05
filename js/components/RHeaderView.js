/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react'
], function (React) {

  return React.createClass({
    
    render: function () {
      return (
        <header className="app-header">
          <div className="app-menu" />

          <div className="app-search-entry" />

          <div className="app-search-icon" />
        </header>
      );
    }
  });
});
