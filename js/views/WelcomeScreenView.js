/**
 * Created by rohitgirme on 11/24/15.
 */
define([
    'views/core/BaseView',
    'utils/AppEvents',
    'utils/Constants',
    'text!templates/WelcomeScreenView.html'],
  function (
    BaseView,
    AppEvents,
    Constants,
    template) {

    return BaseView.extend({

      className: 'welcome-view',

      render: function () {
        this.$el.html(template);
        setTimeout(this.showLogin.bind(this), 1000);
        return this;
      },

      showLogin: function () {
        var auth2;
        this.$('#gSignInWrapper').show();
        this.$('.wave').hide();

        var onSuccess = function(user) {
          console.log('Signed in as ' + user.getBasicProfile().getName());
          var token = user.getAuthResponse().id_token;

          AppEvents.triggerAppEvent(
            AppEvents.DISPLAY_VIEW,
            {
              viewId: Constants.MAIN_VIEW
            }
          );
        };

        /**
         * Handle sign-in failures.
         */
        var onFailure = function(error) {
          console.log(error);
        };

        gapi.load('auth2', function(){
          /**
           * Retrieve the singleton for the GoogleAuth library and set up the
           * client.
           */
          auth2 = gapi.auth2.init({
            client_id: '759001062768-8ld4b2st1ckr8kd29b563dl9q8l2drr0.apps.googleusercontent.com'
          });

          // Attach the click handler to the sign-in button
          auth2.attachClickHandler('customBtn', {}, onSuccess, onFailure);
        });
      },

      hide: function () {
        var _this = this;
        this.$el.on('transitionend', function (evt) {
          if (evt.propertyName === 'transform') {
            evt.stopPropagation();
            _this.destroy();
          }
        });
        BaseView.prototype.hide.apply(this, arguments);
      }

    });
  }
);