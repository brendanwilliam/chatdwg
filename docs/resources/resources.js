/*
 * Date: May 19, 2023
 * Author: Brendan Keane (github: @brendanwilliam)
 * Purpose: Interactivity for the resources page
 */



// Global variables
var resources = new Object();
var videos = [];
var blogs = [];
var courses = [];

(function() {

  window.addEventListener('load', init);

  /**
   * Initializes the page
   * @return {void}
   */
  function init() {

    fetch('../src/data/resources.json')
      .then(response => response.json())
      .then(data => {
        resources = data;
        resources.forEach(function(resource) {
          if (resource.category == 'Video') {
            videos.push(resource);
          } else if (resource.category == 'Blog') {
            blogs.push(resource);
          } else if (resource.category == 'Course') {
            courses.push(resource);
          }
        });
        loadVideos();
        loadBlogs();
        loadCourses();
      });
  }

  function loadVideos() {
    var videoContainer = document.getElementById('video-list');
    videos.forEach(function(video) {
      var videoCard = createVideoCard(video);
      videoContainer.appendChild(videoCard);
    });

  }

  function createVideoCard(video) {
    var videoTitle = document.createElement('h3');
    videoTitle.textContent = video.title;

    var videoAudience = document.createElement('h4');
    videoAudience.textContent = video.audience;

    var videoDesc = document.createElement('p');
    videoDesc.textContent = video.description;

    var videoLink = document.createElement('a');
    videoLink.href = video.link;

    var flex1 = document.createElement('div');
    flex1.classList.add('resource-flex')

    var flex2 = document.createElement('div');
    flex2.classList.add('resource-flex')

    var videoCard = document.createElement('div');
    videoCard.classList.add('video');
    videoCard.classList.add('grow');

    flex1.appendChild(videoTitle);
    flex1.appendChild(videoAudience);
    flex2.appendChild(videoDesc);
    videoLink.appendChild(flex1);
    videoLink.appendChild(flex2);
    videoCard.appendChild(videoLink);

    return videoCard;
  }


  function loadBlogs() {
    var videoContainer = document.getElementById('blog-list');
    blogs.forEach(function(blog) {
      var blogCard = createResource(blog);
      videoContainer.appendChild(blogCard);
    });
  }

  function loadCourses() {
    var videoContainer = document.getElementById('course-list');
    courses.forEach(function(course) {
      var courseCard = createVideoCard(course);
      videoContainer.appendChild(courseCard);
    });
  }



})();
