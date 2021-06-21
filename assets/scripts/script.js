let cardsContainer = document.getElementById("cardsContainer");
let modalsContainer = document.getElementById("modalsContainer");
let loadMoreBtn = document.getElementById("loadMoreBtn");

async function getPosts() {
  try {
    const response = await fetch("assets/data.json");
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
}
