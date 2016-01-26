/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'views/core/BaseView',
  'utils/Constants',
  'text!templates/ListItemTemplate.html'
], function (
  BaseView,
  Constants,
  listItemTemplate) {

  'use strict';

  var listViewTemplate =
    '<div class="list-container">' +
    '</div>';
  
  listItemTemplate = _.template(listItemTemplate);

  return BaseView.extend({

    ITEM_CLICKED: 'itemClicked',

    events: {
      'click .list-container': 'onItemClick'
    },

    render: function () {
      this.$el.html(listViewTemplate);
    },

    updateView: function (model) {
      var listItems = model.map(function (item) {
        var photos = item.get(Constants.PHOTOS);
        return listItemTemplate({
          id: item.get(item.idAttribute),
          title: item.get(Constants.TITLE),
          date: item.get(Constants.CREATE_DATE),
          content: item.get(Constants.CONTENT),
          image: _.isEmpty(photos) ? null : photos[0]
        });
      });
      this.$('.list-container').append(listItems);
    },

    onItemClick: function (evt) {
      var item = $(evt.target).parents('[data-id]');
      this.trigger(this.ITEM_CLICKED, {
        itemId: item.attr('data-id')
      });
    }

  });

});
