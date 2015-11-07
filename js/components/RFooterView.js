/**
 * Created by rohitgirme on 10/29/15.
 */
define([
  'react'
], function (React) {

  'use strict';

  return React.createClass({
    displayName: 'FooterView',

    render: function () {
      return (
        <footer className="app-footer">
          <div {...this.getEvents()} className="app-create-new">
            <span className="glyphicon glyphicon-plus" aria-hidden="true">
            </span>
          </div>
        </footer>
      );
    },

    getEvents: function () {
      return {
        onClick: this.props.createNew
      }
    }

  });

});

