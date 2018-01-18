import FontFaceObserver from "fontfaceobserver";

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const Fonts = () => {
  const loader = new FontFaceObserver("Open Sans");
  loader.load().then(() => {
    if (!document.documentElement.classList.contains("fonts-loaded")) {
      document.documentElement.classList.add("fonts-loaded");
    }
    setCookie("fonts-loaded", true, 365);
  });
};

export default Fonts;
