/**
 * Created by rohitgirme on 3/24/16.
 */
define([
  'views/ListView'
], function (
  ListView) {

  'use strict';

  var triggerDiv =
    '<div class="trigger">Loading...</div>';

  var batchContainerTmpl =
    '<div class="batch-container container-fluid"></div>';

  return ListView.extend({

    LOAD_MORE: 'load_more',

    pending: false,

    container: null,

    lastScrollTop: 0,

    initialize: function () {
      ListView.prototype.initialize.apply(this, arguments);
      this.model.setLimit(10);
      _.bindAll(this, 'onScroll');
    },

    render: function () {
      ListView.prototype.render.apply(this, arguments);
      this.container = this.$('.list-container');
      this.container.on('scroll', _.throttle(this.onScroll, 100));
    },

    appendBefore: function () {
      var _this = this;
      this.container.prepend(triggerDiv);
      this.model.getPrevious({
        success: function (model) {
          _this.container.find('.trigger').remove();

          var batchContainer = $(batchContainerTmpl);
          batchContainer.append(_this.getListItems(model));

          _this.container.prepend(batchContainer);
          // Resume scroll tracking
          _this.pending = false;
        }
      });
    },

    appendAfter: function () {
      var _this = this;
      this.container.append(triggerDiv);
      this.model.getNext({
        success: function (model) {
          _this.container.find('.trigger').remove();

          var batchContainer = $(batchContainerTmpl);
          batchContainer.append(_this.getListItems(model));

          _this.container.append(batchContainer);
          // Resume scroll tracking
          _this.pending = false;
        }
      });
    },

    onScroll: function () {
      var _this = this;
      var containerEl = _this.container[0];
      var scrollTop = containerEl.scrollTop;

      if (scrollTop >= _this.lastScrollTop) {
        if(_this.shouldLoadAfter(scrollTop)) {
          // Wait until we add more elements.
          _this.pending = true;
          _this.appendAfter();
          return;
        }

        if (_this.shouldDeleteBefore(scrollTop)) {
          _this.$('.batch-container:first-of-type').remove();
        }
      }

      if (scrollTop < _this.lastScrollTop) {
        if (_this.shouldLoadBefore(scrollTop)) {
          // Wait until we add more elements.
          _this.pending = true;
          _this.appendBefore();
          return;
        }

        if (_this.shouldDeleteAfter(scrollTop)) {
          _this.$('.batch-container:last-of-type').remove();
        }
      }

      _this.lastScrollTop = scrollTop;
    },

    getContainerHeight: function () {
      if (!this.containerHeight) {
        this.containerHeight = this.container.height();
      }

      return this.containerHeight;
    },

    shouldDeleteBefore: function () {
      var containerEl = this.container[0];
      var scrollTop = containerEl.scrollTop;
      return scrollTop > (this.containerHeight * 1.5);
    },

    shouldDeleteAfter: function () {
      var containerEl = this.container[0],
          containerHeight = this.getContainerHeight(),
          scrollTop = containerEl.scrollTop,
          scrollBottom =
            containerEl.scrollHeight - (containerHeight + scrollTop);

      return scrollBottom > (this.containerHeight * 1.5);
    },

    shouldLoadBefore: function () {
      var containerEl = this.container[0];
      var scrollTop = containerEl.scrollTop;
      // Don't do anything if data is being fetched.
      return ((scrollTop - 10) <= 0) && !this.pending;
    },

    shouldLoadAfter: function () {
      var containerEl = this.container[0];
      var scrollTop = containerEl.scrollTop;
      // Don't do anything if data is being fetched.
      return !this.pending && ((scrollTop + 10) >= (containerEl.scrollHeight - containerEl.clientHeight));
    }
  });
});