(function(){
  "use strict";
  // functions
  var ready, interpret,
      terminalInit, typedMessage, typed,

  // globals
  greeting, aboutTxt, anim = false;

  terminalInit = function(term){
    var command = "about";
    typedMessage(term, command, 200, function(){
      term.echo(aboutTxt);
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
      this.echo(aboutTxt);
    }
  };

  ready = function(){
    $("#terminal").terminal(interpret, {
      prompt: "> ",
      name: "hackspace",
      greetings: greeting,
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

  typedMessage = typed(function(term, message, prompt){
    term.set_command('');
    term.echo(prompt + message);
    term.set_prompt(prompt);
  });

  greeting = " __    __       ___       ______  __  ___      _______..______      ___       ______  _______ \n" +
  "|  |  |  |     /   \\     /      ||  |/  /     /       ||   _  \\    /   \\     /      ||   ____|\n" +
  "|  |__|  |    /  ^  \\   |  ,----'|  '  /     |   (----`|  |_)  |  /  ^  \\   |  ,----'|  |__   \n" +
  "|   __   |   /  /_\\  \\  |  |     |    <       \\   \\    |   ___/  /  /_\\  \\  |  |     |   __|  \n" +
  "|  |  |  |  /  _____  \\ |  `----.|  .  \\  .----)   |   |  |     /  _____  \\ |  `----.|  |____ \n" +
  "|__|  |__| /__/     \\__\\ \\______||__|\\__\\ |_______/    | _|    /__/     \\__\\ \\______||_______|\n";
  aboutTxt = "Hackspace aims to accelerate the growth of the hacker community both within BASES and in the Stanford Community.";
}());
