/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'views/core/BaseView',
  'utils/Constants',
  'utils/AppUtil',
  'utils/AppEvents'
], function (
  BaseView,
  Constants,
  AppUtil,
  AppEvents) {

  'use strict';

  return BaseView.extend({

    currentView: null,

    initialize: function () {
      this.views = {};
      _.bindAll(this, 'handleDisplayEvent');
      AppEvents.listenToAppEvent(AppEvents.DISPLAY_VIEW, this.handleDisplayEvent);
    },

    render: function () {
    },

    start: function () {
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
          case Constants.MEMORY_VIEW:
            this.loadView('views/MemoryView', viewId, options);
            break;
        }
      } else {
        this._showView(viewToDisplay, options);
      }
    },

    handleDisplayEvent: function (evt, data) {
      this.displayView(data.viewId, data);
    },

    loadView: function (ViewClassModule, identifier, options) {
      var _this = this;
      require([ViewClassModule], function (ViewClass) {
        var viewClass = new ViewClass(options);
        _this.$el.append(viewClass.render().el);
        viewClass.postRender();
        _this.currentView = viewClass;
        _this.views[identifier] = viewClass;

        viewClass.startServices();
        BaseView.prototype.show.apply(viewClass, arguments);
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

    _showView: function (view, options) {
      if (!view) {
        AppUtil.warn('"view" is required parameter.');
        return;
      }

      this.currentView = view;
      view.startServices();
      view.show(options);
    }
  });
});
