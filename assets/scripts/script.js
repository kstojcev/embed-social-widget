let cardsContainer = document.getElementById("cardsContainer");
let modalsContainer = document.getElementById("modalsContainer");
let loadMoreBtn = document.getElementById("loadMoreBtn");

let last = 0;
let next = 0;

async function getPosts() {
  try {
    const response = await fetch("assets/data.json");
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
}

async function renderPosts() {
  const posts = await getPosts();

  last = next;
  next += 4;

  for (let current = last; current < next; current++) {
    if (current >= posts.length) {
      loadMoreBtn.style.display = "none";
      return;
    }

    let str = `${posts[current]["date"]}`;
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

    let card = `
    <div class="card" id="modal-btn-${current}">
    <div class="cardHeader">
    <div class="headerTitle">
        <img src="${posts[current]["profile_image"]}" alt="" />
    <div>
        <p>${posts[current]["name"]}</p>
        <p>${formattedDate}</p>
    </div>
    </div>
    <a href='${posts[current]["source_link"]}'>
        <img src="${sourceCheck(posts[current])}" alt="" />
    </a>
    </div>

    <div class="cardContent">
        <img src="${posts[current]["image"]}" alt="" />
        <p>${posts[current]["caption"]}</p>
    </div>

    <div class="cardFooter">
        <img src="./assets/icons/icons/heart.svg" alt="" />
        <p>${posts[current]["likes"]}</p>
    </div>
    </div>
    `;

    let modal = `
    <div class="modalContent" id="${current}">
        <img class="modalImage" src="${posts[current]["image"]}" alt="" />
      <div class="rightModal">
        <div class="cardHeader">
          <div class="headerTitle">
            <img src="${posts[current]["profile_image"]}" alt="" />
            <div>
              <p>${posts[current]["name"]}</p>
              <p>${formattedDate}</p>
            </div>
          </div>
          <a href="">
            <img src="${sourceCheck(posts[current])}" alt="" />
          </a>
        </div>
        <p class="modalText">
          ${posts[current]["caption"]}
        </p>
        <div class="modalFooter">
          <img src="./assets/icons/icons/heart.svg" alt="" />
          <p>${posts[current]["likes"]}</p>
        </div>
      </div>
    </div>
    `;

    cardsContainer.innerHTML += card;
    modalsContainer.innerHTML += modal;
  }
}

function loadMore() {
  renderPosts();
}

function sourceCheck(post) {
  if (post["source_type"] == "facebook") {
    return "./assets/icons/icons/facebook.svg";
  } else {
    return "./assets/icons/icons/instagram-logo.svg";
  }
}

loadMoreBtn.addEventListener("click", function (e) {
  loadMore();
});

renderPosts();
