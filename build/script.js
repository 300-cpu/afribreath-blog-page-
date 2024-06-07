const apiKey = 'pub_45812c190494a7f3d76bc877dcd779ccb5bf9';
const blogContainer = document.getElementById("blog-container");
const placeholderContainer = document.getElementById("placeholder-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const blogCardTemplate = document.getElementById("blog-card-template").content;

const staticArticles = [
  {
    title: "afribreath's latest signing",
    description: "This is a description for static article 1.",
    url: "https://example.com/static-article-1",
    urlToImage: "https://media-lhr6-2.cdn.whatsapp.net/v/t61.24694-24/418066390_820934989595335_5477352834134966101_n.jpg?ccb=11-4&oh=01_Q5AaIKnT2J6xWlHbqXfkXhg3XsSCcdKgUaj0qsmwsnQU4nh5&oe=666EFA07&_nc_sid=e6ed6c&_nc_cat=109"
  },
  {
    title: "afribreath to launch soon",
    description: "This is a description for static article 2.",
    url: "https://afribreath.com",
    urlToImage: "https://afribreath.com/images/7.png"
  }
];

async function fetchNews(query = '') {
    try {
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}`;
        console.log(`Fetching news from URL: ${apiUrl}`);
        const response = await fetch(apiUrl);
        
        if (response.status === 401) {
            throw new Error(`Unauthorized: ${response.status}`);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        return data.results;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function createBlogCard(article) {
    const blogCard = blogCardTemplate.cloneNode(true);
    const link = blogCard.querySelector("a");
    const img = blogCard.querySelector("img");
    const title = blogCard.querySelector("h2");
    const description = blogCard.querySelector("p");

    link.href = article.url || article.link;
    link.target = "_blank";  // Open link in a new tab
    link.onclick = () => {
        window.location.reload();
    };
    img.src = article.urlToImage || article.image_url || 'https://via.placeholder.com/1500x600';
    img.alt = article.title;
    title.textContent = article.title;
    description.textContent = article.description;

    return blogCard;
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    
    if (articles.length === 0) {
        placeholderContainer.style.display = 'block';
        return;
    } else {
        placeholderContainer.style.display = 'none';
    }
    
    articles.forEach((article) => {
        const blogCard = createBlogCard(article);
        blogContainer.appendChild(blogCard);
    });
}

// Fetch and display news on page load
(async () => {
    try {
        const articles = staticArticles.concat(await fetchNews());
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs", error);
    }
})();

// Add event listener to search button
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const articles = await fetchNews(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news", error);
        }
    }
});
