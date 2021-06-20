fetch("assets/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("DATA", data);
    let cardInfo = data;
    let cardsContainer = document.getElementById("cardsContainer");

    for (let i = 0; i < cardInfo.length; i++) {
      str = `${cardInfo[i].date}`;
      strSplit = str.split(" ");
      strSlice = strSplit.slice();
      //   console.log(strSlice[0]);
      neededString = strSlice[0];

      function sourceCheck() {
        if (cardInfo[i].source_type == "facebook") {
          return "./assets/icons/icons/facebook.svg";
        } else {
          return "./assets/icons/icons/instagram-logo.svg";
        }
      }

      //   console.log(cardInfo[i].caption);
      let html = `<div class="card" id="modalBtn">
      <div class="cardHeader">
        <div class="headerTitle">
          <img src="${cardInfo[i].profile_image}" alt="" />
          <div>
            <p>${cardInfo[i].name}</p>
            <p>${cardInfo[i].date}</p>
          </div>
        </div>
        <a href='${cardInfo[i].source_link}'>
        <img src="${sourceCheck()}" alt="" />
        </a>
      </div>

      <div class="cardContent">
        <img src="${cardInfo[i].image}" alt="" />
        <p>
          ${cardInfo[i].caption}
        </p>
      </div>

      <div class="cardFooter">
        <img src="./assets/icons/icons/heart.svg" alt="" />
        <p>${cardInfo[i].likes}</p>
      </div>
    </div>`;

      cardsContainer.innerHTML += html;
    }
  })
  .catch(function (err) {
    console.log("ERROR", err);
  });
