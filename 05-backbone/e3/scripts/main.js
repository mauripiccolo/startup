var MyMovies = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{},
};

MyMovies.Models.Movie = Backbone.Model.extend({});
MyMovies.Collections.Movies = Backbone.Collection.extend({
    model: MyMovies.Models.Movie,
    url: "scripts/data/movies.json",
    initialize: function(){
        console.log("Movies initialize");
    }
});

MyMovies.Templates.movies = _.template($("#tmplt-Movies").html());

MyMovies.Views.Movies = Backbone.View.extend({
    el: '#mainContainer',
    template: MyMovies.Templates.movies,
    events: {
      'click .addItem': 'addMovie',
    },


    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },

    render: function () {
        console.log("render");
        console.log(this.collection.length);
        $(this.el).html(this.template());
        this.addAll();
    },

    addAll: function () {
        console.log("addAll");
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne");
        var view = new MyMovies.Views.Movie({ model: model });
        $("ul", this.el).append(view.render());
    },

    addMovie: function(){
      var item = new MyMovies.Models.Movie();
      var data = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      item.set({
        title: data['title'], year:data['year'],duration: data['duration'], genre:data['genre'],
        rating: data['rating'], summary:data['summary'],director: data['director'], cast:data['cast'],
        poster:data['poster']
      });
      this.collection.add(item);
      //item.save(item.toJSON());
      //item.save();      
      console.log('New Movie');
      $('#title').val('');
      $('#year').val('');
      $('#duration').val('');
      $('#genre').val('');
      $('#rating').val('');
      $('#sum').val('');
      $('#dir').val('');
      $('#cast').val('');
      $('#poster').val('');
    }

});


MyMovies.Templates.movie = _.template($("#tmplt-Movie").html());
MyMovies.Views.Movie = Backbone.View.extend({
    tagName: "li",
    template: MyMovies.Templates.movie,
    events: {
      'click .getInfoItem': 'showMovieInf',
      'click .deleteItem': 'deleteMovie',
      'click .editItem': 'editMovie',
    },

    initialize: function () {
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return $(this.el).append(this.template(this.model.toJSON())) ;
    },

    showMovieInf: function () {
      console.log('Movie Inf');
      console.log(this.model.toJSON());
      var view = new MyMovies.Views.MovieInf({
        model: this.model
      });
      view.render();
    },

    deleteMovie: function(){
      console.log('Movie delete');
      $(this.el).remove();
      $(".infoItem").remove();
      $(".poster").remove();
    },

    editMovie: function(){
        console.log('Movie edit');
        $('#title').val(this.model.toJSON().title);
        $('#year').val(this.model.toJSON().year);
        $('#duration').val(this.model.toJSON().duration);
        $('#genre').val(this.model.toJSON().genre);
        $('#rating').val(this.model.toJSON().rating);
        $('#sum').val(this.model.toJSON().summary);
        $('#dir').val(this.model.toJSON().director);
        $('#cast').val(this.model.toJSON().cast);
        $('#poster').val(this.model.toJSON().poster);
    }
});
//**info

MyMovies.Templates.movieInf = _.template($("#tmplt-MovieInf").html());
MyMovies.Views.MovieInf = Backbone.View.extend({
    el: '#mainContainerInf',
    template: MyMovies.Templates.movieInf,

    render: function () {
        return $(this.el).html(this.template(this.model.toJSON()));
    }
});
//**
MyMovies.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        MyMovies.movies = new MyMovies.Collections.Movies();
        new MyMovies.Views.Movies({ collection: MyMovies.movies });
        MyMovies.movies.fetch();
        console.log(MyMovies.movies.length);
    }
});

var appRouter = new MyMovies.Router();
Backbone.history.start();
