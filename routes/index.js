(function(){
  "use strict";
  
  var conf      = require('nconf').argv().env().file({file: __dirname + '/../config.json'}),
      sendgrid  = require("sendgrid")(conf.get("sendgrid:email"), conf.get("sendgrid:password"));
  /*
   * GET home page.
   */

  exports.index = function(req, res){
    res.render('index');
  };

  exports.branding = function(req,res) {
    res.render('programs/branding');
  };

  exports.eChallenge = function(req, res) {
    res.render('programs/eChallenge');
  };

  exports.socialEChallenge = function(req, res) {
    res.render('programs/socialEChallenge');
  };

  exports.productShowCase = function(req, res) {
    res.render('programs/productShowCase');
  };

  exports.eBootCamp = function(req, res) {
    res.render('programs/eBootCamp');
  };
  exports.etl = function(req, res) {
    res.render('programs/etl');
  };
  exports.hackspace = function(req, res) {
    res.render('programs/hackspace');
  };
  exports.profDev = function (req, res) {
    res.render('programs/profDev');
  };
  exports.core = function (req, res) {
    res.render('programs/core');
  };
  exports.freshmanBat = function (req, res) {
    res.render('programs/freshmanBat');
  };
  exports.internship = function (req, res) {
    res.render('programs/internship');
  };
  exports.pastWinners = function (req, res) {
    res.render('history/pastWinners');
  };
  exports.alumni = function (req, res) {
    res.render ('history/alumni');
  };
  exports.careerFairs = function (req, res) {
    res.render ('getInvolved/careerFairs');
  };
  exports.digest = function (req, res) {
    res.render ('getInvolved/digest');
  };
  exports.registration = function (req, res) {
    res.render('getInvolved/registration');
  };

  exports.events = function (req, res) {
    res.render('media/events');
  };

  exports.inTheNews = function (req, res) {
    res.render('media/inTheNews');
  };
  exports.brandingGuideLines = function (req, res) {
    res.render('media/brandingGuideLines');
  };

  exports.sponsors = function (req, res) {
    res.render('partners/sponsors');
  };

  exports.boardOfAdvisors = function (req, res) {
    res.render('partners/boardOfAdvisors');
  };

  exports.contactPage = function(req, res){
    res.render("contact/contact_us");
  };

  exports.sendContactEmail = function(req, res){
    var subject;
    if (req.body.hasOwnProperty("name")){
      subject = "Message from " + req.body.name;
    } else {
      subject = "Anonymous message";
    }

    sendgrid.send({
      to: conf.get("contact_email"),
      from: req.body.email || conf.get("contact_from_email"),
      subject: subject,
      text: req.body.message
    }, function(err){
      if (err){
        console.log(err);
      }
      res.render("contact/thanks");
    });
  };
}());
