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

  return ListView.extend({

    LOAD_MORE: 'load_more',

    ticking: false,

    container: null,

    initialize: function () {
      ListView.prototype.initialize.apply(this, arguments);
      this.model.setLimit(10);
      _.bindAll(this, 'onScroll');
    },

    render: function () {
      ListView.prototype.render.apply(this, arguments);
      this.container = this.$('.list-container');
      this.container.on('scroll', this.onScroll);
    },

    appendData: function () {
      var _this = this;
      this.container.append(triggerDiv);
      this.model.getNext({
        success: function (model) {
          _this.container.find('.trigger').remove();
          _this.container.append(_this.getListItems(model));
          // Resume scroll tracking
          _this.ticking = false;
        }
      });
    },

    onScroll: function () {
      var _this = this;
      if (!this.ticking) {
        // Throttling
        window.requestAnimationFrame(function() {
          if (_this.canTrigger()) {
            _this.appendData();
            _this.trigger(_this.LOAD_MORE);
            // Wait until we add more elements.
            _this.ticking = true;
            return;
          }
          _this.ticking = false;
        });
      }
      this.ticking = true;
    },

    canTrigger: function () {
      var containerEl = this.container[0];
      return containerEl.scrollTop + 50 >= containerEl.scrollHeight - containerEl.clientHeight;
    }
  });
});