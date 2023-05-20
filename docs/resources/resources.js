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
      var videoCard = createResource(video);
      videoContainer.appendChild(videoCard);
    });

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
      var courseCard = createResource(course);
      videoContainer.appendChild(courseCard);
    });
  }

  function createResource(resource) {
    var resourceImage = document.createElement('img');
    var resourcePath = '../src/img/brands/' + resource.brand + '.png';
    resourceImage.src = resourcePath;
    resourceImage.classList.add('resource-img');

    var resourceTitle = document.createElement('h3');
    resourceTitle.textContent = resource.title;

    var resourceAudience = document.createElement('h4');
    resourceAudience.textContent = "Best for " + resource.audience;

    var resourceDesc = document.createElement('p');
    resourceDesc.textContent = resource.description;

    var resourceLink = document.createElement('a');
    resourceLink.href = resource.link;

    var flex1 = document.createElement('div');
    flex1.classList.add('resource-flex')

    var flex2 = document.createElement('div');
    flex2.classList.add('resource-flex')

    var resourceCard = document.createElement('div');
    resourceCard.classList.add('resource');
    resourceCard.classList.add('grow');

    flex1.appendChild(resourceTitle);
    flex1.appendChild(resourceAudience);
    flex1.appendChild(resourceImage);
    flex2.appendChild(resourceDesc);
    resourceLink.appendChild(flex1);
    resourceLink.appendChild(flex2);
    resourceCard.appendChild(resourceLink);

    return resourceCard;
  }



})();
