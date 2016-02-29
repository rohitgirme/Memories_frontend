/**
 * Created by rohitgirme on 2/20/16.
 */
define([
  'views/core/BaseView',
  'utils/editor/EditorConstants',
  'models/editor/TinyMCEEditorActions'
], function (
  BaseView,
  EditorConstants,
  TinyMCEEditorActions) {

  'use strict';

  var Editor = BaseView.extend({

    initialize: function (options) {
      this.editor = options.editorInstance;
    },

    render: function () {
      this.editor.render();
    }

  });

  _.extend(Editor.prototype, TinyMCEEditorActions);

  return Editor;
});