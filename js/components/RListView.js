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
      var _this = this;
      var items = this.props.model.map(function (item) {
        return (
          <RListItem
            title={item.get(Constants.TITLE)}
            date={item.get(Constants.DATE)}
            content={item.get(Constants.CONTENT)}
            image={item.get(Constants.PHOTOS)}
            key={item.get(item.idAttribute)}
            id={item.get(item.idAttribute)}
          >
          </RListItem>
        );
      });

      return (
        <div className="list-container" onClick={_this.onMemoryClick}>
          {items}
        </div>
      );
    },

    onMemoryClick: function (evt) {
      var memory = $(evt.target).parents('[data-id]');
      this.props.onClick(evt, memory.attr('data-id'));
    }


  });

});
