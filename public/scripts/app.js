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

  var $submitTweet = $('#submitTweet');
  $submitTweet.on('click', function submitNewTweet(event) {
    const maxLength = 140;
    const charsLeft = maxLength - $(".new-tweet textarea").val().length;
    if (charsLeft < 0) {
      $("#submitTweet").attr("disabled", true);
      alert("Sorry, your tweet must be 140 characters or fewer.");
    }

    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(".new-tweet form").serialize(),
      success: function (tweet) {
        loadTweets();
      }
    });
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
    content.text(tweet.content.text);
    article.append(header).append(content).append(footer);
    return article;
  };
  loadTweets();
});
