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

    render: function () {
      this.$el.html(listViewTemplate);
    },

    updateView: function (model) {
      var listItems = model.map(function (item) {
        return listItemTemplate({
          id: item.get(item.idAttribute),
          title: item.get(Constants.TITLE),
          date: item.get(Constants.DATE),
          content: item.get(Constants.CONTENT),
          image: item.get(Constants.PHOTOS)
        });
      });
      this.$('.list-container').append(listItems);
    }

  });

});
