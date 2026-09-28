const input = document.getElementById("urlInput");
const button = document.getElementById("launchButton");
const status = document.getElementById("status");

/*
  Put YOUR authorized proxy endpoint here.

  Example:

  const PROXY_URL =
    "https://your-worker.your-subdomain.workers.dev/?url=";
*/

const PROXY_URL = "";


function launch() {

  const value = input.value.trim();

  status.textContent = "";

  if (!value) {
    status.textContent = "Enter a URL first.";
    input.focus();
    return;
  }

  let destination;

  try {
    destination = new URL(value);

    if (
      destination.protocol !== "http:" &&
      destination.protocol !== "https:"
    ) {
      throw new Error();
    }

  } catch {
    status.textContent = "Please enter a valid http:// or https:// URL.";
    return;
  }


  /*
    If you haven't configured a backend yet,
    this simply opens the authorized destination.

    Once you have your proxy endpoint, it will
    automatically use it instead.
  */

  if (!PROXY_URL) {

    status.textContent = "Opening destination...";

    setTimeout(() => {
      window.open(
        destination.href,
        "_blank",
        "noopener,noreferrer"
      );
    }, 250);

    return;
  }


  const proxiedURL =
    PROXY_URL +
    encodeURIComponent(destination.href);

  status.textContent = "Connecting...";

  setTimeout(() => {
    window.open(
      proxiedURL,
      "_blank",
      "noopener,noreferrer"
    );
  }, 250);
}


button.addEventListener("click", launch);


input.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    launch();
  }

});
