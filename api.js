const API_KEY = "d2798c8a9f55411d8333bfacb86f28ea"; // Replace with your own API key
const API_URL = "https://newsapi.org/v2/everything";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const newsContainer = document.getElementById("news-container");

// Fetch news articles from API
async function fetchNews(query = "latest") {
  try {
    // Construct API URL with query parameter
    const response = await fetch(
      `${API_URL}?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    const data = await response.json();

    // Clear previous results
    newsContainer.innerHTML = "";

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((article) => {
        // Create a news card
        const newsCard = document.createElement("div");
        newsCard.className = "news-card";

        newsCard.innerHTML = `
          <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
          <h3>${article.title}</h3>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(newsCard);
      });
    } else {
      newsContainer.innerHTML = "<p>No news found. Try another search.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Failed to fetch news. Please try again later.</p>";
  }
}

// Add event listener for search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  }
});

// Fetch default news on page load
fetchNews();
