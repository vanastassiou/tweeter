$(function() {
  const $tweetContainer = $("#tweets-container");

  function renderTweets(tweetData) {
    tweetData.forEach(function (tweet) {
      $tweetContainer.prepend(createTweetElement(tweet));
    });
  };

  function loadTweets() {
    $.getJSON("/tweets", renderTweets);
  };

  $('#submitTweet').on('click', function submitNewTweet(event) {
    event.preventDefault();
    const noticeElement = $(this).parent().find('.notice');
    const maxLength = 140;
    const charsLeft = maxLength - $(".new-tweet textarea").val().length;
    if (charsLeft < 0) {
      // Implement timer that clears text after n sec?
      noticeElement.text("Sorry, your tweet must be 140 characters or fewer.");
    } else if (charsLeft === 140) {
      noticeElement.text("Sorry, you can't submit an empty tweet.");
    } else {
      noticeElement.text("");
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(".new-tweet form").serialize(),
        success: function (uselessData) {
          loadTweets();
        }
      });
    }
  });

  function createTweetElement(tweet) {
    const date = new Date(tweet.created_at);
    const article = $("<article></article>");
    const header = $(`
      <header>
        <span class="avatar"><img src="${tweet.user.avatars.small}"></span>
        <h1 class="heading name">${tweet.user.name}</h1>
        <span class="handle">${tweet.user.handle}</span>
      </header>
    `);
    const content = $("<main class='content'></main>");
    const footer = $(`
      <footer>
      <span class="timestamp">${date}</span>
      </footer>
    `);
    content.text(tweet.content.text); // Preventing XSS via form
    article.append(header).append(content).append(footer);
    return article;
  };
  loadTweets();
});
