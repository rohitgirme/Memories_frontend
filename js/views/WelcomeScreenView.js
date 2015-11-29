/**
 * Created by rohitgirme on 11/24/15.
 */
define([
    'views/core/BaseView',
    'text!templates/WelcomeScreenView.html'],
  function (
    BaseView,
    template) {

    return BaseView.extend({

      className: 'welcome-view',

      render: function () {
        this.$el.html(template);
        return this;
      },

      hide: function () {
        var _this = this;
        this.$el.on('transitionend', function (evt) {
          if (evt.originalEvent.propertyName === 'transform') {
            evt.stopPropagation();
            _this.destroy();

          }
        });
        BaseView.prototype.hide.apply(this, arguments);
      }

    });
  }
);