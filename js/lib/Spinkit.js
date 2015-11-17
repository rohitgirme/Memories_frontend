define([
  'react'
], function (React) {

  return React.createClass({

    displayName: "SpinKit",

    propTypes: {
      spinnerName: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
      return {
        spinnerName: 'three-bounce'
      };
    },

    render: function() {

      switch (this.props.spinnerName) {
        case "three-bounce":
          return (
            <div className={"three-bounce" + this.props.className}>
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          );
        case "double-bounce":
          return (
            <div className="double-bounce">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          );
        case "rotating-plane":
          return ( <div className="rotating-plane"></div> );
        case "wave":
          return (
            <div  className={"wave " + this.props.className}>
              <div className="rect rect1"></div>
              <div className="rect rect2"></div>
              <div className="rect rect3"></div>
              <div className="rect rect4"></div>
              <div className="rect rect5"></div>
            </div>
          );
        case "wandering-cubes":
          return (
            <div  className="wandering-cubes">
              <div className="cube1"></div>
              <div className="cube2"></div>
            </div>
          );
        case "pulse":
          return ( <div className="pulse"></div> );
        case "chasing-dots":
          return (
            <div className="chasing-dots">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          );
        case "circle":
          return (
            <div  className="circle-wrapper">
              <div className="circle1 circle"></div>
              <div className="circle2 circle"></div>
              <div className="circle3 circle"></div>
              <div className="circle4 circle"></div>
              <div className="circle5 circle"></div>
              <div className="circle6 circle"></div>
              <div className="circle7 circle"></div>
              <div className="circle8 circle"></div>
              <div className="circle9 circle"></div>
              <div className="circle10 circle"></div>
              <div className="circle11 circle"></div>
              <div className="circle12 circle"></div>
            </div>
          );
        case "cube-grid":
          return (
            <div  className="cube-grid">
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
              <div className="cube"></div>
            </div>
          );
        case "wordpress":
          return (
            <div className="wordpress">
              <span className="inner-circle"></span>
            </div>
          );
      }
    }

  });
});

