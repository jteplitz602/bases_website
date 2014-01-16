(function(){
  "use strict";
  var validateForm;

  $(document).ready(function(){
    $("#contactForm").submit(validateForm);
  });

  validateForm = function(){
    var message = $("#contact_msg").val();
    if (message.trim() === ""){
      $("#contact_msg").parents(".form-group").addClass("has-error");
      $("#formError").removeClass("hidden");
      return false;
    }
    return true;
  };
}());
