/**
 * Created by rohitgirme on 10/4/15.
 */
define([
  'views/core/BaseView',
  'utils/Constants',
  'jsx!views/MainView'
], function (
  BaseView,
  Constants,
  MainView) {

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
            this.loadView('jsx!views/MainView', Constants.MAIN_VIEW);
            break;
        }
      }
    },

    loadView: function (ViewClassModule, identifier) {
      var _this = this;
      require([ViewClassModule], function (ViewClass) {
        var instance = new ViewClass();
        _this.register(instance, identifier);

        instance.render();
        $('.app-container').append(instance.el.children);
      });
    },

    register: function (view, identifier) {
      this.views[identifier] = view;
    }
  });
});
