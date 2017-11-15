$("document").ready(function() {
  const maxLength = 140;
  $(".new-tweet textarea").on("input", function () {
    const charsLeft = maxLength - $(this).val().length;
    $(this).parent().find('.counter').text(charsLeft);
  });
});
