/*globals data*/
(function(){
  "use strict";
  // functions
  var ready, interpret,
      terminalInit, typedMessage, typed,
      addEvents, loadEventPage,

  // globals
  anim = false;

  terminalInit = function(term){
    var command = "about";
    typedMessage(term, command, 200, function(){
      term.echo(data.aboutTxt);
    });
  };

  interpret = {
    help: function(){
      this.echo("That's no fun");
    },
    emacs: function(){
      this.echo("&#10004;-");
    },
    vim: function(){
      this.echo("&#10004;+");
    },
    about: function(){
      this.echo(data.aboutTxt);
    },
    events: function(){
      for (var i = 0; i < data.events.length; i++){
        this.echo(data.events[i].name);
      }
    },
    "event": function(num){
      num--;
      if (num >= 0 && num < data.events.length){
        this.echo(data.events[num].name + ": " + data.events[num].details);
      }
    }
  };

  ready = function(){
    addEvents();
    $("#terminal").terminal(interpret, {
      prompt: "> ",
      name: "hackspace",
      greetings: data.greeting,
      onInit: terminalInit,
      keydown: function(e){
        if (anim){
          return false;
        }
      }
    });
  };

  $(document).ready(ready);

  typed = function(finish_typing){
    return function(term, message, delay, finish) {
      anim = true;
      var prompt = term.get_prompt();
      var c = 0;
      if (message.length > 0) {
        term.set_prompt('> ');
        var interval = setInterval(function() {
          term.insert(message[c++]);
          if (c === message.length) {
              clearInterval(interval);
              // execute in next interval
              setTimeout(function() {
                  // swap command with prompt
                  finish_typing(term, message, prompt);
                  anim = false;
                  if (finish){ finish() }
              }, delay);
          }
        }, delay);
      }
    };
  };

  addEvents = function(){
    for (var i = 0; i < data.events.length; i++){
      var e = data.events[i];
      interpret[e.name] = loadEventPage(e);
    }
  };

  /*
   * Returns a functino that loads an event page.
  */
  loadEventPage = function(e){
    return function(){
      window.location = window.location.origin + "/" + e.url;
    };
  };

  typedMessage = typed(function(term, message, prompt){
    term.set_command('');
    term.echo(prompt + message);
    term.set_prompt(prompt);
  });
}());
