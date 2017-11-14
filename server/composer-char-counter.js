$("document").ready(function() {
    console.log( "ready!" );
});

Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.

$("textarea").addEventListener("focus", function () {
  console.log("Focus!");
});

$(.new-tweet textarea).focus(function() {
  alert("Focus?");
});
