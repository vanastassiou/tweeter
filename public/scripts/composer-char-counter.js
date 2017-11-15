$("document").ready(function() {
  const maxLength = 140;
  $(".new-tweet textarea").on("input", function () {
    const charsLeft = maxLength - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid")
    };
  });
});
