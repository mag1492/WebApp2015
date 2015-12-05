define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/watchlist/createOrEditTemplate.html',
    'models/watchlist',
    '../errorHandler'
], function($, _, Backbone, swal, CreateOrEditViewTemplate, Watchlist){
    var CreateNewWatchlistView = Backbone.View.extend({

        template : _.template(CreateOrEditViewTemplate),
        el: '.content',

        events:{
            "click .create-update-btn": "createOrUpdateWatchlist",
            "click .delete" : "deleteWatchlist"
        },

        initialize:function(options){
            this.idIsUndefined = 'false';
            this.watchlistOption= 'none';

            if(typeof options.id != 'undefined'){
                this.watchlistOption = options.id.toString();
                this.watchlist = new Watchlist({id: options.id});
            }
            else{
                this.idIsUndefined = 'true';
                this.watchlist = new Watchlist({id: null});
            }
        },

        render: function(){
            var that = this;
            if(this.idIsUndefined === 'false'){
                that.watchlist.fetch({
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    },
                    success: function(response){
                        that.$el.html(that.template({watchlist: response.toJSON()}));
                    },
                    error: function(ret, jqXHR){
                        showError(jqXHR.status);
                    }
                });
            }
            else{
                this.$el.html(this.template({watchlist: null}));
            }
        },

        createOrUpdateWatchlist: function(){
            var watchlistID = $("#id").val();

            if(this.watchlistNameisValid()){
                if (typeof watchlistID != 'undefined') {
                    var watchlist = {
                        name: $("#watchlistName").val().trim(),
                        id: watchlistID
                    };
                }
                else {
                    var watchlist = {
                        name: $("#watchlistName").val().trim()
                    };
                }

                var aWatchlist = new Watchlist();
                aWatchlist.save(watchlist, {
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    },
                    success: function () {
                        Backbone.history.navigate('watchlist', true);
                    },
                    error: function(ret, jqXHR){
                        showError(jqXHR.status);
                    }
                });
            }
        },

        deleteWatchlist: function(){
            this.confirmDelete();
        },

        confirmDelete: function(){
            var that = this;
            swal({   title: "Are you sure you want to delete this watchlist ?",
                text: "You will not be able to recover this watchlist!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E74C3C",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false },
                function() {
                    that.watchlist.destroy({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success: function () {
                            swal({
                                    title: "Deleted!",
                                    text: "Your watchlist has been successfully deleted!",
                                    type: "success"
                                },
                                function () {
                                    Backbone.history.navigate('watchlist', true);
                            });
                        }
                    });
            });
        },

        watchlistNameisValid: function(){

            if($("#watchlistName").val().length > 100){

                swal({   title: "The watchlist's name is too long.(" +  $("#watchlistName").val().length +")" ,
                    text: " Please enter a name with less than 100 characters." ,
                    type: "warning",
                    ButtonColor: "#E74C3C"
                });
                return false;
            }
            else if($("#watchlistName").val().trim().length <= 0 ){

                swal({   title: "The watchlist's name is empty !",
                    text: "Please enter a name." ,
                    type: "warning",
                    ButtonColor: "#E74C3C"
                });
                return false;
            }

            return true;
        }
    });

    return CreateNewWatchlistView;
});