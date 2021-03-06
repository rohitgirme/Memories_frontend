/**
 * Created by rohitgirme on 11/22/15.
 */
define([
  'toastr',
  'models/MemoriesCollection',
  'models/PagingMixin',
  'utils/AppEvents',
  'utils/Constants',
  'utils/URLConstants',
  'utils/SubViewHelper',
  'views/core/BaseView',
  'views/HeaderView',
  'views/InfiniteListView',
  'views/FooterView',
  'text!templates/MainView.html'
], function (
  Notifications,
  MemoriesCollection,
  PagingMixin,
  AppEvents,
  Constants,
  URLConstants,
  SubViewHelper,
  BaseView,
  HeaderView,
  InfiniteListView,
  FooterView,
  viewTemplate) {

  'use strict';

  viewTemplate = _.template(viewTemplate);

  return BaseView.extend({

    className: 'main-view col-xs-12',

    initialize: function () {
      this.model = new MemoriesCollection();
      _.extend(this.model, PagingMixin);
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
      var _this = this;
      this._listenToSubViews();
      this.delegateModelEvents();

      this.model.reset();
      this.model.getTopItems(10, {
        reset: true,
        success: function () {
          _this._addListItems();
        },
        error: function () {
          Notifications.error('Looks like the internet broke...');
        }
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

      var listView = new InfiniteListView({
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

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MEMORY_VIEW,
          model : model
        }
      );
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
      this.model.remove(data.model);
      data.model.destroy();

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MAIN_VIEW
        }
      );
    },

    handleMemoryUpdated: function (data) {
      var _this = this;
      this.$el.find('input').attr('tabindex', 1);
      var dirtyModel = data.model;

      var updateDate = new Date();
      dirtyModel.set(Constants.UPDATE_DATE, updateDate.getTime());

      var newPhotos = dirtyModel.get(Constants.NEW_PHOTOS);
      if (newPhotos) {
        dirtyModel.unset(Constants.NEW_PHOTOS, {silent: true});
      }

      this.model.add(dirtyModel, {merge: true});
      dirtyModel.save(null, {
        success: function (model) {
          if (newPhotos) {
            var modelId = model.get(model.idAttribute);
            $.ajax({
              url: URLConstants.UPLOAD_IMAGE + '/' + modelId,
              type: 'POST',
              data: newPhotos,
              cache: false,
              processData: false, // Don't process the files
              contentType: false, // Set content type to false as jQuery will tell the server its a query string request
              success: function (data, textStatus, jqXHR) {
                _this.model.getTopMemories(5, {
                  reset: true
                });
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log('error');
              }
            });
          }
        },
        error: function () {

        }
      });

      AppEvents.triggerAppEvent(
        AppEvents.DISPLAY_VIEW,
        {
          viewId: Constants.MAIN_VIEW
        }
      );
    }

  });
});
