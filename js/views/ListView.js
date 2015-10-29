/**
 * Created by rohitgirme on 10/18/15.
 */
define([
  'views/core/BaseView',
  'components/RListView'
], function (
  BaseView,
  RListView) {

  return BaseView.extend({

    events: {
      'reset model': 'render'
    },
    
    initialize: function (options) {
      this.model = options.model;
    },

    render: function () {
      React.render(
        <RListView model={this.model.getItems()}></RListView>,
        this.el[0]
      );
    }


    

  });

});
