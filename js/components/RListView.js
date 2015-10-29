/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'react',
  'utils/Constants',
  'jsx!components/RListItem'
], function (
  React,
  Constants,
  RListItem) {

  return React.createClass({
    displayName: 'ListView',

    componentDidMount: function () {
      var _this = this;
      this.props.model.on('reset', function () {
        _this.forceUpdate();
      });
    },

    render: function () {
      var items = this.props.model.map(function (item) {
        return (
          <RListItem
            title={item.get(Constants.TITLE)}
            date={item.get(Constants.DATE)}
            content={item.get(Constants.CONTENT)}
            image={item.get(Constants.PHOTOS)}
          >
          </RListItem>
        );
      });

      return (
        <div className="list-container">
          {items}
        </div>
      );
    }

  });

});
