/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'views/core/BaseView',
  'utils/Constants',
  'utils/AppUtil'
], function (
  BaseView,
  Constants,
  AppUtil) {

  return BaseView.extend({

    currentView: null,

    initialize: function () {
      this.views = {};
    },

    render: function () {
    },

    start: function () {
      var _this = this;
      setTimeout(function () {
        _this.displayView(Constants.MAIN_VIEW);
      }, 1500);
      this.displayView(Constants.WELCOME_VIEW);
    },

    displayView: function (viewId, options) {
      this._hideView(this.currentView);

      var viewToDisplay = this.views[viewId];
      if (!viewToDisplay) {
        switch (viewId) {
          case Constants.MAIN_VIEW:
            this.loadView('views/MainView', viewId, options);
            break;
          case Constants.WELCOME_VIEW:
            this.loadView('views/WelcomeScreenView', viewId, options);
            break;
        }
      } else {
        this._showView(viewToDisplay);
      }
    },

    loadView: function (ViewClassModule, identifier, options) {
      var _this = this;
      require([ViewClassModule], function (ViewClass) {
        var viewClass = new ViewClass({
          options: options
        });
        _this.$el.append(viewClass.render().el);
        _this.currentView = viewClass;
        _this._showView(viewClass);
      });
    },

    _hideView: function (view) {
      if (!view) {
        AppUtil.warn('"view" is required parameter.');
        return;
      }

      view.stopServices();
      view.hide();
    },

    _showView: function (view) {
      if (!view) {
        AppUtil.warn('"view" is required parameter.');
        return;
      }

      view.startServices();
      view.show();
    }
  });
});
