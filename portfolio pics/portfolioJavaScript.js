/* For the proper transition to the anchores regarding fixed navigation bar */
var shiftWindow = function() { scrollBy(0, -30) };
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);