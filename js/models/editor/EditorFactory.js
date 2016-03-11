/**
 * Created by rohitgirme on 2/27/16.
 */
define([
  'views/editor/Editor'
], function (Editor) {

  'use strict';

  return {

    initialize: function () {
    },

    createEditor: function (id, container) {
      var editor = tinyMCE.EditorManager.createEditor(
        id,
        {
          inline       : true,
          menubar      : false,
          toolbar      : false,
          statusbar    : false,
          hidden_input : false,
          mode         : 'none'
        }
      );
      return new Editor({
        editorInstance: editor,
        container     : container
      });
    }

  };

});
