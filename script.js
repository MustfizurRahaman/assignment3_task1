require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home) {
  var scene = new WebScene({
    portalItem: {
      id: "8046207c1c214b5587230f5e5f8efc77"
    }
  });
  
  var cameraBU = new Camera({
    position: [
      -71.0995, // Longitude of Boston University
      42.3496, // Latitude of Boston University
      2500 // elevation in meters
    ],
    tilt: 0,
    heading: 0
  });

  var cameraPark = new Camera({
    position: [
      -71.056, // Longitude of Boston Common (approximate center)
      42.366, // Latitude of Boston Common (approximate center)
      2500 // elevation in meters
    ],
    tilt: 0,
    heading: 0
  });

  var cameraDowntown = new Camera({
    position: {
      x: -71.050362, // Longitude for a view from the Atlantic towards downtown
      y: 42.3554,   // Latitude
      z: 1500       // Elevation in meters for a closer view
    },
    tilt: 60,       // Tilt down towards the ground
    heading: 45     // Facing direction towards downtown
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    viewingMode: "global",
    camera: cameraBU, // Setting initial camera to Boston University
    environment: {
      lighting: {
        date: new Date(),
        directShadowsEnabled: true,
        cameraTrackingEnabled: false
      }
    },
  });
  
  var homeBtn = new Home({
    view: view
  });
  view.ui.add(homeBtn, "top-left");
  
  var bostonBtn = document.getElementById("v1");
  var bostonParkBtn = document.getElementById("v2");
  var downtownBtn = document.getElementById("v3"); 

  // Update button text if needed
  bostonBtn.textContent = "Boston University";
  bostonParkBtn.textContent = "Boston Common";
  downtownBtn.textContent = "Downtown"; 

  // Ensure the buttons are displayed and added to the UI correctly
  [bostonBtn, bostonParkBtn, downtownBtn].forEach(function(button) {
    button.style.display = 'flex';
    view.ui.add(button, 'top-right');
  });

  bostonParkBtn.addEventListener('click', function() {
    view.goTo(cameraPark);
  });
  
  bostonBtn.addEventListener('click', function() {
    view.goTo(cameraBU);
  });

  downtownBtn.addEventListener('click', function() {
    view.goTo({
      target: cameraDowntown.position,
      tilt: cameraDowntown.tilt,
      heading: cameraDowntown.heading
    });
  });
})
