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
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(".new-tweet form").serialize(),
      success: function () {
        delete data;
        renderTweets(data);
      }
    });
  });

  function createTweetElement(tweet) {
    const date = new Date(tweet.created_at);
    return $(`<article>
      <header>
        <span class="avatar"><img src="${tweet.user.avatars.small}"></span>
        <h1 class="heading name">${tweet.user.name}</h1>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <main class="content">${tweet.content.text}</main>
      <footer>
        <span class="timestamp">${date}</span>
      </footer>
    </article>`);
  };
  loadTweets();
});
