jQuery(document).ready(function(){
  
  // Enable caching
  jQuery.ajaxSetup({ cache: true });
  
  // Loading and parsing Twitter search results      
  jQuery.getJSON('http://search.twitter.com/search.json?q=clairvoyance&callback=?',
    function(data) {    
      var result = '';
      
      // Processing Twitter data
      if (data) {                
      
        // The array storing tweet publishing dates in hours ago
        // This array will help drawing the chart
        var hoursAgo = new Array();
        
        // Looping through the tweets
        jQuery.each(data.results, function(i, tweet) { 
          // Saving tweet publishing date
          var hours = tweetHoursAgo(tweet);
          hoursAgo.push(hours);
          
          // Generating the HTML for each tweet  
          result += parseTweet(tweet, hours);          
        });
        
        // Drawing the chart
        chart = chartDraw(hoursAgo);
        jQuery("#chart").append(chart);
        
      } else {
        result = "Could not load Twitter search results";
      }
      
      // Displaying tweets in the browser
      jQuery('#tweets').append(result);
    }
  );
  
  
  // Parsing tweets
  //
  // tweet - the tweet in JSONP
  // hours - the hours ago the tweet was published
  // 
  // Each tweet will be coloured differently based on its publish date
  //
  // Returns the tweet transforemed into HTML
  function parseTweet(tweet, hours) {
    var html = "<div id='tweet' class='block color-" + tweetColour(hours) +  "'>";
    
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
  // Returns integer
  function tweetColour(hour) {
    var color = 0;
    
    if (hour >= 1 && hour < 2) {
      color = 1;
    } else if (hour >= 2 && hour < 4) {
      color = 2;
    } else if (hour >= 4) {
      color = 3;
    }
    
    return color;
  }  
  
  
  // Draw the chart using only CSS
  //
  // hours - an array of hours each tweet was published ago
  //
  // Returns HTML
  function chartDraw(hours) {
    var html = "";
   
    // Create an array to store the frequency of tweets posted in <1 hours, 1 hours, 2 hours, 4 hours ago
    // This will display the chart
    var chart = new Array(0, 0, 0, 0);    
    
    var len = hours.length;
    for (var i=0; i<len; i++) {
      chart[tweetColour(hours[i])] += 1;           
    }
    
    
    // Display the chart 
    html += '<ul>';
    var len = chart.length;
    for (var i=0; i<len; i++) {
      html += "<li>";
      for (var j=0; j<chart[i]; j++)  {
        html += "<span class='color-" + i + "'>&nbsp;</span> ";
      }
      html += chart[i] + "</li>";
    }
    html += "</ul>";
    
    return html;
  }
});
