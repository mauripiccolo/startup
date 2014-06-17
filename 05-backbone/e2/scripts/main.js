var MyMovies = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{},
}

MyMovies.Models.Movie = Backbone.Model.extend({})
MyMovies.Collections.Movies = Backbone.Collection.extend({
    model: MyMovies.Models.Movie,
    url: "scripts/data/movies.json",
    initialize: function(){
        console.log("Movies initialize")
    }
});

MyMovies.Templates.movies = _.template($("#tmplt-Movies").html())

MyMovies.Views.Movies = Backbone.View.extend({
    el: $("#mainContainer"),
    template: MyMovies.Templates.movies,

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
        view = new MyMovies.Views.Movie({ model: model });
        $("ul", this.el).append(view.render());
    }

})


MyMovies.Templates.movie = _.template($("#tmplt-Movie").html())
MyMovies.Views.Movie = Backbone.View.extend({
    tagName: "li",
    template: MyMovies.Templates.movie,    

    initialize: function () {
        //_.bindAll(this, 'render', 'test');
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
//**info
MyMovies.Templates.moviesInf = _.template($("#tmplt-MoviesInf").html())

MyMovies.Views.MoviesInf = Backbone.View.extend({
    el: $("#mainContainer"),
    template: MyMovies.Templates.movies,    

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
        view = new MyMovies.Views.Movie({ model: model });
        $("ul", this.el).append(view.render());
    }

})

MyMovies.Templates.movieInf = _.template($("#tmplt-MovieInf").html())
MyMovies.Views.MovieInf = Backbone.View.extend({
    tagName: "li",
    template: MyMovies.Templates.movie,

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
//**
MyMovies.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        MyMovies.movies = new MyMovies.Collections.Movies()
        new MyMovies.Views.Movies({ collection: MyMovies.movies }); 
        MyMovies.movies.fetch();
        console.log(MyMovies.movies.length)        
    }
})

var appRouter = new MyMovies.Router();
Backbone.history.start();

$("infoItem").click(null, function () {
    var movie = new MyMovies.Models.Movie(
        {          
          "year": "",
          "duration": "",
          "genre": "",
          "rating": "",
          "resume": "",
          "director": "",
          "cast": ""
        }
    )

    MyMovies.movies.add(movie);
    console.log(MyMovies.movies.length)
})
