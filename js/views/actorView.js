/**
 * Created by Gabriel on 2015-10-27.
 */
$(function() {
    var chuckNorris = new Actor({"id" : "129377537"});


    ActorView = Backbone.View.extend({
        template : _.template($('#actor-info-template').html()),
        el: '.actor-info',
        model : chuckNorris,
        render: function () {
            var that = this;
            chuckNorris.fetch({
                success: function (ret) {
                    that.$el.html(that.template({actor: ret.toJSON()}));
                }
            })
        }
    });


});