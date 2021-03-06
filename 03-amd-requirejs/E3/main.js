require(['movie','movieObserver','downloadable','social', 'actor'], function(Movie, MovieObserver, Downloadable, Social, Actor) {
  var terminator = new Movie();
  var alien = new Movie();
  var obs= new MovieObserver();
  terminator.set("title","Terminator");
  alien.set("title","Alien");
  var ironman= new Social();
  var batman= new Downloadable();
  ironman.set("title","Iron Man");
  batman.set("title","Batman Begins");
  terminator.addObserver(obs);
  ironman.addObserver(obs);
  batman.addObserver(obs);
  terminator.play();
  ironman.play();
  batman.play();
  terminator.stop();
  batman.download();
  ironman.like();
  ironman.share("V. Rivas");
  var actor1= new Actor();
  actor1.set("name","Christian Bale");
  var actor2= new Actor();
  actor2.set("name","Michael Caine");
  batman.addActor(actor1);
  batman.addActor(actor2); 
});