/**
 * Created by rohitgirme on 10/3/15.
 */

define([
  'react',
  'views/core/BaseView',
  'jsx!components/RMainView'
], function (
  React,
  BaseView,
  RMainView) {

  return BaseView.extend({

    render: function () {
      React.render(<RMainView></RMainView>, this.$el[0]);
    }
  });
});