define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/userResultTemplate.html',
    'collections/searchResult/userResult'
], function($, _, Backbone, UserResultTemplate, UserResult){
    var userSearchView = Backbone.View.extend({
        template : _.template(UserResultTemplate),

        initialize: function(options){
            this.users = new UserResult(options);
            if(options.isGeneral == true){
                this.setElement(options.el);
            }else{
                this.setElement(".content");
            }

        },

        render: function(){
            var that = this;
            this.users.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response) {
                    that.$el.html(that.template({users: response.toJSON(), searchField : that.users.searchField, isGeneral : that.users.isGeneral}));
                }
            });
        }
    });
    return userSearchView;
});