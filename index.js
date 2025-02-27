function isMobile() {
  // add code to try and access the motion
  return screen.width < 768;
}

let speed = 0;
let lastTime = Date.now();
// DeviceMotion listener to control playing/pausing based on movement.

const loading = document.querySelector(".loading");
const desktop = document.querySelector(".desktop");
const mobile = document.querySelector(".mobile");

if (isMobile()) {
  mobile.classList.toggle("hidden");
  loading.classList.toggle("hidden");

  function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", (event) => {
              const acc = event.acceleration || { x: 0, y: 0 };
              const currentTime = Date.now();
              const deltaTime = currentTime - lastTime;
              speed += acc.y * deltaTime;
              mobile.innerHTML = `Speed: ${speed}
                <br>Acceleration: ${acc.y} 
                <br>Time: ${deltaTime}`;
              lastTime = currentTime;
            });
            console.log("Motion access granted!");
          } else {
            console.log("Motion access denied.");
          }
        })
        .catch(console.error);
    } else {
      populateVideos();
      console.log("Motion permissions not required on this browser.");
    }
  }
  document
    .querySelector(".btn")
    .addEventListener("click", requestMotionPermission);
} else {
  desktop.classList.toggle("hidden");
  loading.classList.toggle("hidden");
}
