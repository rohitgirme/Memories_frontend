/**
 * Created by rohitgirme on 10/4/15.
 */

define([
  'backbone',
  'utils/Constants'
], function (Backbone, Constants) {

  return Backbone.Router.extend({

    routes: {
      ''            : 'displayMainView',
      'memories'    : 'displayMainView',
      'memories/new': ''
    },

    initialize: function (options) {
      this.appView = options.appView;
    },

    start: function () {
      Backbone.history.start({
        pushState: true
      });
      this.navigate('memories', true);
    },

    displayMainView: function () {
      this.appView.displayView(Constants.MAIN_VIEW);
    }

  });

});
