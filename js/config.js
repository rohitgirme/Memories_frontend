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

    react     : '../node_modules/react/dist/react-with-addons',
    JSXTransformer: '../node_modules/react/dist/JSXTransformer',
    jsx       : '../node_modules/react/dist/jsx',

    classnames  : '../node_modules/classnames/index'
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
