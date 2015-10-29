/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'react',
  'views/core/BaseView',
  'utils/Constants'
], function (
  React,
  BaseView,
  Constants) {

  return BaseView.extend({

    currentView: null,

    initialize: function () {
      this.views = {};
    },

    render: function () {
    },

    start: function () {
      this.render();
    },

    showView: function (viewId) {
      if (this.currentView) {
        this.currentView.hide();
      }

      var viewToDisplay = this.views[viewId];
      if (viewToDisplay) {
        viewToDisplay.show();
      } else {
        switch (viewId) {
          case Constants.MAIN_VIEW:
            this.loadView('jsx!components/RMainView', Constants.MAIN_VIEW);
            break;
        }
      }
    },

    loadView: function (ViewClassModule, identifier) {
      var _this = this;
      require([ViewClassModule], function (ViewClass) {
        React.render(<ViewClass></ViewClass>, _this.$el[0]);
      });
    }
  });
});
