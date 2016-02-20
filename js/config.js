/**
 * Created by rohitgirme on 9/27/15.
 */
require.config({
  baseUrl: 'js',
  paths: {

    jquery    : '../node_modules/jquery/dist/jquery',
    underscore: '../node_modules/underscore/underscore',
    backbone  : '../node_modules/backbone/backbone',
    text      : '../node_modules/requirejs/text',

    dateformat : '../node_modules/dateformat/lib/dateformat'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});
