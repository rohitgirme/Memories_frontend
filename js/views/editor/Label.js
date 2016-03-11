// This has been taken from https://github.com/mohan999/tinymce-placeholder
define([], function () {

  'use strict';

  var Label = function(editor, container) {
    // Create label el
    this.text = editor.getElement().getAttribute('data-placeholder');

    this.contentAreaContainer = container;

    $(this.contentAreaContainer).css({
      position: 'relative'
    });

    var attrs = {
      position: 'absolute',
      top:'5px',
      left:0,
      color: '#888',
      padding: '1%',
      width:'98%',
      overflow: 'hidden'
    };
    this.el = $('<label>');
    $(this.contentAreaContainer).append(this.el);
    this.el.css(attrs).text(this.text);
  };

  Label.prototype.hide = function(){
    this.el.css({display: 'none'});
  };

  Label.prototype.show = function(){
    this.el.css({display: ''});
  };

  return Label;
});