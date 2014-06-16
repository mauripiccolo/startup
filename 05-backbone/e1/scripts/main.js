
var myMovies = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

myMovies.Models.Movie = Backbone.Model.extend({})
myMovies.Collections.Movies = Backbone.Collection.extend({
    model: myMovies.Models.Movie,
    url: "scripts/data/movies.json",
    initialize: function(){
        console.log("Movies initialize")
    }
});

myMovies.Templates.movies = _.template($("#tmplt-Movies").html())

myMovies.Views.Movies = Backbone.View.extend({
    el: $("#mainContainer"),
    template: myMovies.Templates.movies,

    initialize: function () {        
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },

    render: function () {
        console.log("render")
        console.log(this.collection.length);
        $(this.el).html(this.template());
        this.addAll();
    },

    addAll: function () {
        console.log("addAll")
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne")
        view = new myMovies.Views.Movie({ model: model });
        $("ul", this.el).append(view.render());
    }

})


myMovies.Templates.movie = _.template($("#tmplt-Movie").html())
myMovies.Views.Movie = Backbone.View.extend({
    tagName: "li",
    template: myMovies.Templates.movie,    

    initialize: function () {        
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return $(this.el).append(this.template(this.model.toJSON())) ;
    },

    removeItem: function (model) {
        console.log("Remove - " + model.get("Name"))
        this.remove();
    }
})
//info

//
myMovies.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute" 
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        myMovies.movies = new myMovies.Collections.Movies()
        new myMovies.Views.Movies({ collection: myMovies.movies }); 
        myMovies.movies.fetch();
        console.log(myMovies.movies.length)
    }
})

var appRouter = new myMovies.Router();
Backbone.history.start();
