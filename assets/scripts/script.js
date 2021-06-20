fetch("assets/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("DATA", data);
    let cardInfo = data;
    let cardsContainer = document.getElementById("cardsContainer");
    let loadMoreBtn = document.getElementById("loadMoreBtn");

    var currentindex = 0;
    function loadmore() {
      function sourceCheck() {
        if (cardInfo[i + currentindex]["source_type"] == "facebook") {
          return "./assets/icons/icons/facebook.svg";
        } else {
          return "./assets/icons/icons/instagram-logo.svg";
        }
      }

      let maxresult = 4;
      for (var i = 0; i < maxresult; i++) {
        if (currentindex >= cardInfo.length) {
          loadMoreBtn.style.display = "none";
          return;
        }
        let str = `${cardInfo[i + currentindex]["date"]}`;
        let strSplit = str.split(" ");
        let neededString = strSplit[0];

        let date = new Date(neededString);

        let formattedDate = date
          .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, " ");

        let html = `
        <div class="card" id="modalBtn">
        <div class="cardHeader">
        <div class="headerTitle">
            <img src="${cardInfo[i + currentindex]["profile_image"]}" alt="" />
        <div>
            <p>${cardInfo[i + currentindex]["name"]}</p>
            <p>${formattedDate}</p>
        </div>
        </div>
        <a href='${cardInfo[i + currentindex]["source_link"]}'>
            <img src="${sourceCheck()}" alt="" />
        </a>
        </div>

        <div class="cardContent">
            <img src="${cardInfo[i + currentindex]["image"]}" alt="" />
            <p>${cardInfo[i + currentindex]["caption"]}</p>
        </div>

        <div class="cardFooter">
            <img src="./assets/icons/icons/heart.svg" alt="" />
            <p>${cardInfo[i + currentindex]["likes"]}</p>
        </div>
        </div>
        `;
        cardsContainer.innerHTML += html;
      }
      currentindex += maxresult;
    }
    loadmore();
    loadMoreBtn.addEventListener("click", function (e) {
      loadmore();
    });
  })
  .catch(function (err) {
    console.log("ERROR", err);
  });
