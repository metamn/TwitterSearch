jQuery(document).ready(function(){
  
  // Enable caching
  jQuery.ajaxSetup({ cache: true });
  
  // Loading Twitter search results      
  jQuery.getJSON('http://search.twitter.com/search.json?q=clairvoyance&callback=?',
    function(data) {    
      var result = '';
      
      // Creating the result
      if (data) {                
        
        // Looping through the tweets
        jQuery.each(data.results, function(i, tweet) { 
          result += parseTweet(tweet);
        });
        
      } else {
        result = "Could not load Twitter search results";
      }
      
      // Displaying results in the browser
      jQuery('#tweets').append(result);
    }
  );
  
  // Parsing tweets
  //
  // tweet - the tweet in JSONP
  //
  // Returns the tweet transforemed into HTML
  function parseTweet(tweet) {
    var html = "<div id='tweet'>";
    
    html += tweetAvatar(tweet);
    html += tweetBody(tweet);
    html += tweetDate(tweet);
    
    html += "</div>"
    
    return html;
  }
  
  
  // Generate HTML to display the profile image of a tweet
  //
  // tweet - the tweet
  //
  // Returns a HTML <img> tag
  function tweetAvatar(tweet) {
    var html = "<div id='avatar'>";
    
    html += "<img src='" + tweet.profile_image_url + "' alt='" + tweet.from_user + "'/>";
    html += "</div>";
      
    return html;
  }
  
  
  // Generate HTML to display the body of a tweet
  //
  // tweet - the tweet
  //
  // Returns a HTML <div> tag
  function tweetBody(tweet) {
    var html = "<div id='body'>";
    
    html += tweet.text;
    html += "</div>";
      
    return html;
  }
  
  // Generate HTML to display the date of a tweet
  //
  // tweet - the tweet
  //
  // Returns a HTML <div> tag
  function tweetDate(tweet) {
    var html = "<div id='date'>";
    
    // Calculate how many hours ago was the tweet posted
    var date_tweet = new Date(tweet.created_at);
    var date_now   = new Date();
    var date_diff  = date_now - date_tweet;
    var hours      = Math.round(date_diff/(1000*60*60));
    
    html += hours + " hours ago.";
    html += "</div>";
      
    return html;
  }
});
