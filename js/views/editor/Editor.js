/**
 * Created by rohitgirme on 2/20/16.
 */
define([
  'views/core/BaseView',
  'views/editor/Label',
  'utils/editor/EditorConstants',
  'models/editor/TinyMCEEditorActions'
], function (
  BaseView,
  Label,
  EditorConstants,
  TinyMCEEditorActions) {

  'use strict';

  var Editor = BaseView.extend({

    initialize: function (options) {
      this.editor = options.editorInstance;
      this.container = options.container;
      this._addPlaceholder();
    },

    render: function () {
      this.editor.render();
    },

    setReadOnly: function (readOnly) {
      var _this = this;

      var domEl = _this.editor.getElement();
      $(domEl).attr('contenteditable', readOnly);
    },

    getContent: function () {
      // Raw content returns immediately.
      return _.escape(this.editor.getContent({
        format: 'raw'
      }));
    },

    setContent: function (content) {
      var _this = this;

      if (_this.editor.getElement()) {
        _this.editor.setContent(_.unescape(content));
      }
    },

    _addPlaceholder: function () {
      var _this = this;
      // This has been taken from https://github.com/mohan999/tinymce-placeholder
      this.editor.on('init', function () {
        var label = new Label(_this.editor, $(_this.container)[0]);

        onBlur();

        label.el.click(function () {
          onFocus();
        });
        _this.editor.on('focus', onFocus);
        _this.editor.on('blur', onBlur);
        _this.editor.on('SetContent', onBlur);

        function onFocus() {
          label.hide();
          _this.editor.focus();
        }

        function onBlur() {
          var content = _this.editor.getContent();
          if(content === '') {
            label.show();
          }else{
            label.hide();
          }
        }
      });
    }

  });

  _.extend(Editor.prototype, TinyMCEEditorActions);

  return Editor;
});