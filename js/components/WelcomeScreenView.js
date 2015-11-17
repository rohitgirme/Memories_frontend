/**
 * Created by rohitgirme on 11/8/15.
 */
define([
  'react',
  'jsx!lib/Spinkit'
], function (
  React,
  Spinkit) {

  return React.createClass({

    displayName: 'WelcomeScreenView',

    render: function () {

      return (
        <div className="welcome-view">
          <div className="centering-wrapper">
            <div className="app-icon">
              <div className="right_1"></div>
              <div className="left_1"></div>
              <div className="right_2"></div>
              <div className="left_2"></div>
            </div>
            <Spinkit className="loader" spinnerName="wave"></Spinkit>
          </div>
        </div>
      );
    }
  });
});