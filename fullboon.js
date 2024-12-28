var firebaseConfig = {
        apiKey: "AIzaSyAtVvPjdsj84mWqaG4-7SyjbljCnslZ1SM",
        authDomain: "hendaa-1.firebaseapp.com",
        databaseURL: "https://hendaa-1-default-rtdb.firebaseio.com",
        projectId: "hendaa-1",
        storageBucket: "hendaa-1.appspot.com",
        messagingSenderId: "831134776479",
        appId: "1:831134776479:web:56cd7098fc69cd70a376aa"
    };
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const articleId = new URLSearchParams(window.location.search).get('id');
    const articleContainer = document.getElementById('article');

    async function getArticle() {
        try {
            const collections = ['articles', 'sports_news', 'family_news'];
            for (let collection of collections) {
                const doc = await db.collection(collection).doc(articleId).get();
                if (doc.exists) {
                    const article = doc.data();
                    const formattedDate = new Date(article.timestamp.seconds * 1000).toLocaleDateString();
                    const tags = article.tags.join(', ');

                    let imagesHTML = '';
                    if (article.imageUrls && article.imageUrls.length > 0) {
                        article.imageUrls.forEach(url => {
                            imagesHTML += `<img src="${url}" alt="Article Image">`;
                        });
                    }

                    articleContainer.innerHTML = `
                        ${imagesHTML}
        <div class="category">${article.categories.join(', ')}</div>

  
        <h1>${article.title}</h1>

        
        <div class="details">
            <span>Published on ${formattedDate}</span> | 
            <span>By ${article.author}</span>
        </div>

    
        <div class="social-icons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" class="facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/share?url=${encodeURIComponent(location.href)}" class="twitter" aria-label="Share on Twitter"><i class="fab fa-twitter" style="color:#fff;"></i></a>
            <a href="https://www.instagram.com/?url=${encodeURIComponent(location.href)}" class="pinterest" aria-label="Share on Pinterest"><i class="fab fa-instagram"></i></a>
            <a href="#" class="email" aria-label="Share via Email"><i class="fas fa-envelope"></i></a>
        </div>

    
        <img src="${article.featuredImage}" alt="Event Highlights" class="main-image" alt="${article.title}">

  
        <div class="text-content">
            <p>${article.content}</p>
        </div>
    </div>
        <div class="sponsored-content">Sponsored Content</div>


    <div class="social-icons">
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" class="facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/share?url=${encodeURIComponent(location.href)}" class="twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/?url=${encodeURIComponent(location.href)}" class="pinterest" aria-label="Pinterest"><i class="fab fa-instagram"></i></a>
        <a href="#" class="email" aria-label="Email"><i class="fas fa-envelope"></i></a>
    </div>

    
    <div class="related-topics">
        <span>RELATED TOPICS:</span>
        <a href="#">${tags}</a>
        
    </div>
    </div>
                        `;
                    return; // Exit loop once the document is found
                }
            }
            articleContainer.innerHTML = "<p>Article not found.</p>";
        } catch (error) {
            console.error("Error fetching article:", error);
            articleContainer.innerHTML = "<p>Failed to load article details.</p>";
        }
    }

    getArticle();
