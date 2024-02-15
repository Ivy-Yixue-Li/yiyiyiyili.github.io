    const audio = document.getElementById('myAudio');

    function playPause() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    // YouTube Video Functions 
    function init() {
        console.log("Inside my init function"); 
        console.log("Setting API Key");
        gapi.client.setApiKey("AIzaSyAOIwgXD4h50ys5EHkMuhInTdOZZyFDFS0"); 
        gapi.client.load("youtube", "v3", onYouTubeApiLoad);
    }

    function onYouTubeApiLoad() {
        const keywords = "funny cats"; 
        searchVideos(keywords);  
        console.log("YouTube API Loaded");
    }

    function searchVideos(keywords) { 
        const request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video", 
            q: keywords,
        });
    
        request.execute(function(response) {
            // Check if the API call was successful and if there are items in the response
            if (response.error) {
                console.error("API Error:", response.error.message);
                return;
            }
    
            const results = response.result.items;
            if (!results || results.length === 0) {
                console.log("No videos found for the search query.");
                return;
            }
    
            const randomIndex = Math.floor(Math.random() * results.length);
            const videoId = results[randomIndex].id.videoId;
            embedVideo(videoId); 
        });
    }
    

    function embedVideo(videoId) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '560');
        iframe.setAttribute('height', '315');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`; // Direct assignment is okay for standard attributes like src.
        iframe.setAttribute('allowfullscreen', ''); // Indicates true.
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin'); // Customize the value based on your needs.

        const container = document.getElementById('random-video-container');
        container.innerHTML = ''; 
        container.appendChild(iframe); 
    }