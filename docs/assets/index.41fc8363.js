var style = "";
const url = "https://raw.githubusercontent.com/OpenXcom/OpenXcom/94640aab1279ae268e0420a7b5c99cc44eb09473/bin/common/SoldierName/Danish.nam";
const appHtml = document.querySelector("#app");
const fetchButton = appHtml.querySelector("#fetch");
const resultPre = appHtml.querySelector("#result");
fetchButton.addEventListener("click", () => {
  fetch(url, {
    headers: {
      range: "bytes=0-127"
    }
  }).then((response) => {
    response.text().then((text) => {
      resultPre.textContent = text;
    });
  }).catch((error) => {
    resultPre.textContent = `Error: ${error.message}`;
  });
});
