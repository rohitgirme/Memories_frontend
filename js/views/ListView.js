/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'dateformat',
  'views/core/BaseView',
  'utils/Constants',
  'text!templates/ListItemTemplate.html'
], function (
  dateformat,
  BaseView,
  Constants,
  listItemTemplate) {

  'use strict';

  var listViewTemplate =
    '<div class="list-container">' +
    '</div>';

  var batchContainerTmpl =
    '<div class="batch-container container-fluid"></div>';
  
  listItemTemplate = _.template(listItemTemplate);

  return BaseView.extend({

    ITEM_CLICKED: 'itemClicked',

    events: {
      'click .list-container': 'onItemClick'
    },

    render: function () {
      this.$el.html(listViewTemplate);
    },

    getListItems: function (model) {
      var listItems = model.map(function (item) {
        var photos = item.get(Constants.PHOTOS),
          formattedDate =
            dateformat(
              item.get(Constants.CREATE_DATE),
              "ddd, mmm d, yyyy, h:MM tt"
            );

        return listItemTemplate({
          id: item.get(item.idAttribute),
          title: item.get(Constants.TITLE),
          date: formattedDate,
          content: item.get(Constants.CONTENT),
          image: _.isEmpty(photos) ? null : photos[0]
        });
      });
      return listItems;
    },

    updateView: function (model) {
      var batchContainer = $(batchContainerTmpl);
      var listItems = this.getListItems(model);

      batchContainer.append(listItems);
      this.$('.list-container').html(batchContainer);
    },

    onItemClick: function (evt) {
      var item = $(evt.target).parents('[data-id]');
      this.trigger(this.ITEM_CLICKED, {
        itemId: item.attr('data-id')
      });
    }

  });

});
