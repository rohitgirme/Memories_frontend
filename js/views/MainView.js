/**
 * Created by rohitgirme on 11/22/15.
 */
define([
  'classnames',
  'models/MemoriesCollection',
  'utils/Constants',
  'utils/SubViewHelper',
  'views/core/BaseView',
  'views/HeaderView',
  'views/ListView',
  'views/FooterView',
  'text!templates/MainView.html'
], function (
  classnames,
  MemoriesCollection,
  Constants,
  SubViewHelper,
  BaseView,
  HeaderView,
  ListView,
  FooterView,
  viewTemplate) {

  'use strict';

  viewTemplate = _.template(viewTemplate);

  return BaseView.extend({

    className: 'main-view',

    modelEvents: {
      'model reset': '_addListItems'
    },

    initialize: function () {
      this.model = new MemoriesCollection();
      this.subviewHelper = new SubViewHelper();
    },

    render: function () {
      this.$el.html(viewTemplate);
      this._renderSubViews();
      return this;
    },

    startServices: function () {
      this.delegateModelEvents();
      this.model.getTopMemories(5, {
        reset: true
      });
    },

    stopServices: function () {
      this.undelegateModelEvents();
    },
    
    _addListItems: function () {
      var listView = this.subviewHelper.getView(Constants.LIST_VIEW);
      listView.updateView(this.model);
    },

    _renderSubViews: function () {
      this.subviewHelper.register(
        Constants.HEADER_VIEW,
        new HeaderView({
          el: this.$('.header-view-container')
        })
      );

      this.subviewHelper.register(
        Constants.FOOTER_VIEW,
        new FooterView({
          el: this.$('.footer-view-container')
        })
      );

      this.subviewHelper.register(
        Constants.LIST_VIEW,
        new ListView({
          el   : this.$('.list-view-container'),
          model: this.model
        })
      );

      this.subviewHelper.iterate('render');
      this.subviewHelper.iterate('startServices');
    }

  });
});
