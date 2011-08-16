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
  
  jQuery("#tweets #tweet").each(function() {
    var hour = jQuery(this).html();
    jQuery("#chart").append(hour);    
  });
  
  
  
  
  // Parsing tweets
  //
  // tweet - the tweet in JSONP
  //
  // Returns the tweet transforemed into HTML
  function parseTweet(tweet) {
    var hours = tweetHoursAgo(tweet);
  
    var html = "<div id='tweet' class='" + tweetColour(hours) +  "'>";
    
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
    
    html += tweetHoursAgo(tweet) + " hours ago.";
    html += "</div>";
      
    return html;
  }
  
  // Calculate how many hours ago was the tweet posted
  //
  // tweet - the tweet
  //
  // Returns an integer
  function tweetHoursAgo(tweet) {    
    var date_tweet = new Date(tweet.created_at);
    var date_now   = new Date();
    var date_diff  = date_now - date_tweet;
    var hours      = Math.round(date_diff/(1000*60*60));
    
    return hours;
  }
  
  // Colouring the tweet based on how many hours the tweet was posted
  //
  // hour - the tweet posted
  //
  // Returns string
  function tweetColour(hour) {
    var color = "hour-0";
    
    if (hour >= 1 && hour < 2) {
      color = "hour-1";
    } else if (hour >= 2 && hour < 4) {
      color = "hour-2";
    } else if (hour >= 4) {
      color = "hour-4";
    }
    
    return color;
  }  
  
});
