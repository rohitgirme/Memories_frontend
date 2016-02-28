/**
 * Created by rohitgirme on 2/20/16.
 */
define([
    'models/editor/EditorActions',
    'utils/editor/EditorConstants'
  ], function (
    EditorActions,
    EditorConstants) {

    'use strict';

    return _.extend(EditorActions, {

      makeBold: function () {
        this.editor.formatter.toggle(EditorConstants.BOLD);
      },

      makeItalic: function () {
        this.editor.formatter.toggle(EditorConstants.ITALIC);
      },

      undo: function () {
        this.editor.undoManager.undo();
      },

      redo: function () {
        this.editor.undoManager.redo();
      }
    });
  }
);