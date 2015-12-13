/**
 * Created by rohitgirme on 12/3/15.
 */
define(function () {
  return {

    DISPLAY_VIEW : 'displayView',
    MEMORY_EVENT : 'memoryEvent',

    triggerAppEvent: function (eventName, data) {
      $('body').trigger(eventName, data);
    },

    listenToAppEvent: function (eventName, callback) {
      $('body').on(eventName, callback);
    },

    stopListeningToAppEvent: function (eventName, callback) {
      $('body').off(eventName, callback);
    }

  };
});
