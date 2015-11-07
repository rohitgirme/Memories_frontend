/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react'
], function (React) {

  return React.createClass({
    displayName: 'HeaderView',
    
    render: function () {
      return (
        <header className="app-header row">
          <div className="app-menu col-xs-2">
            <span className="glyphicon glyphicon-th-list" aria-hidden="true">
            </span>
          </div>

          <div className="app-search-entry col-xs-8">
            <input className="search-input" placeholder="Search memories..." />
          </div>

          <div className="app-search-icon col-xs-2">
            <span className="glyphicon glyphicon-search" aria-hidden="true">
            </span>
          </div>
        </header>
      );
    }
  });
});
