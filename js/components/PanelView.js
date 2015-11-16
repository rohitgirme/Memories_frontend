/**
 * Created by rohitgirme on 11/8/15.
 */
define([
  'react',
  'classnames'
], function (
  React,
  classnames) {

  return React.createClass({
    displayName: 'PanelView',

    render: function () {
      var classes = classnames({
        'panel-view': true,
        'hidePanel': !this.props.show,
        'showPanel': this.props.show
      });

      return (
        <div className={classes}>
          <span onClick={this.props.closeCallback} className="close-icon glyphicon glyphicon-remove" aria-hidden="true">
          </span>
          <div className='panel-content'>
            <ul>
              <li className="photo-icon">
                <span className="glyphicon glyphicon-camera" aria-hidden="true">
                </span>
              </li>
              <li className="delete-icon">
                <span className="glyphicon glyphicon-trash" aria-hidden="true">
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  });

});
