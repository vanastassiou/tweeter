$("document").ready(function() {
  const maxLength = 140;
  $(".new-tweet textarea").on("input", function () {
    const charsLeft = maxLength - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(charsLeft);
    if (charsLeft == 140) {
      $("#submitTweet").attr("disabled", true);
    } else {
      $("#submitTweet").attr("disabled", false);
    }
  });
});
