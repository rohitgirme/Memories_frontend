/**
 * Created by rohitgirme on 9/27/15.
 */
require.config({
  baseUrl: 'js',
  paths: {
    jquery    : '../node_modules/jquery/dist/jquery.min',
    underscore: '../node_modules/underscore/underscore-min',
    backbone  : '../node_modules/backbone/backbone-min',
    text      : '../node_modules/requirejs/text',

    react     : '../node_modules/react/dist/react.min',
    JSXTransformer: '../node_modules/react/dist/JSXTransformer',
    jsx       : '../node_modules/react/dist/jsx'
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
