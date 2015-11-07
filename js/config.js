/**
 * Created by rohitgirme on 9/27/15.
 */
require.config({
  baseUrl: 'js',
  paths: {
    templates : '../templates',

    jquery    : '../node_modules/jquery/dist/jquery',
    underscore: '../node_modules/underscore/underscore',
    backbone  : '../node_modules/backbone/backbone',
    text      : '../node_modules/requirejs/text',

    react     : '../node_modules/react/dist/react',
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