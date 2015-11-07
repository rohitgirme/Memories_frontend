/**
 * Created by rohitgirme on 10/28/15.
 */
define([
  'react'
], function (React) {

  'use strict';

  return React.createClass({
    displayName: 'ListItem',

    render: function () {
      // TODO: trim the content to few lines
      return (
        <div onClick={this.props.onClick} data-id={this.props.id} className="list-item row">
          <div className="item-text col-xs-10">
            <div className="item-header row">
              <div className="item-title col-xs-8">
                {this.props.title}
              </div>
              <div className="item-date col-xs-4">
                {this.props.date}
              </div>
            </div>
            <div className="item-content">
              {this.props.content}
            </div>
          </div>
          <div className="item-image col-xs-2">
            {this.props.image}
          </div>
        </div>
      );
    }

  });

});
