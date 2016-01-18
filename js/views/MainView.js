/**
 * Created by rohitgirme on 11/22/15.
 */
define([
  'models/MemoriesCollection',
  'models/MemoryModel',
  'utils/AppEvents',
  'utils/Constants',
  'utils/SubViewHelper',
  'views/core/BaseView',
  'views/HeaderView',
  'views/ListView',
  'views/FooterView',
  'text!templates/MainView.html'
], function (
  MemoriesCollection,
  MemoryModel,
  AppEvents,
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
      this._listenToAppEvents();
      _.bindAll(
        this,
        'handleMemoryClicked'
      );
    },

    render: function () {
      this.$el.html(viewTemplate);
      this._renderSubViews();
      return this;
    },

    startServices: function () {
      this._listenToSubViews();
      this.delegateModelEvents();
      this.model.getTopMemories(5, {
        reset: true
      });
    },

    stopServices: function () {
      this._stopListeningToSubViews();
      this.undelegateModelEvents();
    },

    _listenToAppEvents: function () {
      AppEvents.listenToAppEvent(AppEvents.MEMORY_EVENT, _.bind(this.handleMemoryEvents, this));
    },

    _listenToSubViews: function () {
      var listView = this.subviewHelper.getView(Constants.LIST_VIEW);
      listView.on(listView.ITEM_CLICKED, this.handleMemoryClicked);

      var footerView = this.subviewHelper.getView(Constants.FOOTER_VIEW);
      footerView.on(footerView.CREATE_NEW, this.handleMemoryClicked);
    },

    _stopListeningToSubViews: function () {
      var listView = this.subviewHelper.getView(Constants.LIST_VIEW);
      listView.off();
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

      var listView = new ListView({
        el   : this.$('.list-view-container'),
        model: this.model
      });
      this.subviewHelper.register(
        Constants.LIST_VIEW,
        listView
      );

      this.subviewHelper.iterate('render');
      this.subviewHelper.iterate('startServices');
    },

    handleMemoryClicked: function (data) {
      data = data || {};
      this.$el.find('input').attr('tabindex', -1);
      var model = this.model.get(data.itemId);
      if (!model) {
        var createDate = new Date();
        model = new MemoryModel();
        model.set(Constants.CREATE_DATE, createDate.getTime());
        this.model.add(model, {silent: true});
      }

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MEMORY_VIEW,
          model : model
        }
      );
      // fire event using AppEvents to display memoryview
      // arguments are model, id
      // add model to collection
      // save id as state
    },

    handleMemoryEvents: function (evt, data) {
      switch (data.type) {
        case Constants.UPDATE_MEMORY:
          this.handleMemoryUpdated(data);
          break;
        case Constants.DELETE_MEMORY:
          this.handleMemoryDeleted(data);
          break;
      }
    },

    handleMemoryDeleted: function (data) {
      this.$el.find('input').attr('tabindex', 1);
      var model = this.model.get(data.itemId);
      this.model.remove(model);
      model.destroy();

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MAIN_VIEW
        }
      );
    },

    handleMemoryUpdated: function (data) {
      this.$el.find('input').attr('tabindex', 1);
      var dirtyModel = this.model.get(data.itemId);

      var updateDate = new Date();
      dirtyModel.set(Constants.UPDATE_DATE, updateDate.getTime());

      this.model.add(dirtyModel, {merge: true});
      dirtyModel.save();

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MAIN_VIEW
        }
      );
    }

  });
});
