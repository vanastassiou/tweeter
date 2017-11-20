$(function() {
  const $tweetContainer = $("#tweets-container");

  function loadTweets() {
    $.getJSON("/tweets", renderTweets);
  };

  function renderTweets(tweetData) {
    tweetData.forEach(function (tweet) {
      $tweetContainer.prepend(createTweetElement(tweet));
    });
    $("time.timeago").timeago();
    $(".oldtweet").mouseover(function() {
      $(this).addClass("hover");
    });
    $(".oldtweet").mouseout(function() {
      $(this).removeClass("hover");
    });
  };

// New tweet conditional event handler

  $("#submitTweet").on("click", function submitNewTweet(event) {
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


// New tweet element generator

  function createTweetElement(tweet) {
    const date = new Date(tweet.created_at);
    // ISO datestamp needed for timeago() to work
    const dateISO = date.toISOString();
    const article = $("<article class='oldtweet'></article>");
    const header = $(`
      <header>
        <span class="userinfo">
          <span class="avatar"><img src="${tweet.user.avatars.small}"></span>
          <span class="name">${tweet.user.name}</span>
        </span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
    `);
    const content = $("<main class='content'></main>");
    const footer = $(`
      <footer>
      <span><time class="timeago" datetime="${dateISO}"></time></span>
      <span class="icons">
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-flag"></i>
        </span>
      </footer>
    `);
    content.text(tweet.content.text); // Preventing XSS via form
    article.append(header).append(content).append(footer);
    return article;
  };


  $("#compose").click(function() {
    $(".new-tweet").slideToggle( "fast", function() {
    });
    $("#tweetField").focus();
  });


  loadTweets();
});
