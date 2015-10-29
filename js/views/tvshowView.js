var app = app || {};

$(function(){

    var TasksListView = Backbone.View.extend({

        el: ".notesApp",

        render: function(){
            var that = this;
            app.tasks.fetch({
                success: function(tasks){
                    var template = _.template($('#note-list-template').html(), {tasks: tasks.models});
                    that.$el.html(template);
                }
            });
        }

    });

    app.tasksListView = new TasksListView({collection: app.tasks});

});