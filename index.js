 // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAtVvPjdsj84mWqaG4-7SyjbljCnslZ1SM",
        authDomain: "hendaa-1.firebaseapp.com",
        projectId: "hendaa-1",
        storageBucket: "hendaa-1.appspot.com",
        messagingSenderId: "831134776479",
        appId: "1:831134776479:web:56cd7098fc69cd70a376aa"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    function fetchAllNews() {
             var articlesSection = document.getElementById("articlesSection");
        var familyNewsSection = document.getElementById("familyNewsSection");
        var sportsNewsSection = document.getElementById("sportsNewsSection");

        var collections = [
            { name: "articles", section: articlesSection, template: fullCardTemplate },
            { name: "family_news", section: familyNewsSection, template: gridTemplate },
            { name: "sports_news", section: sportsNewsSection, template: sportsTemplate }
      

    ];


        collections.forEach(function(collection) {
            db.collection(collection.name).orderBy("timestamp", "desc").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var post = doc.data();
                    var postId = doc.id;
                    collection.section.innerHTML += collection.template(post, postId, collection.name);
                });
            });
        });
    }

    function fullCardTemplate(post, postId, collectionName) {
        return `
                <section class="article">
                  <img src="${post.featuredImage}" width="600" height="400"
                    alt="${post.title}">

<time>
${new Date(post.timestamp.toDate()).toDateString()}</time>
                          
                    <h2><a href="article.html?id=${postId}">${post.title}</a></h2>
                    
            `;
    }

    function gridTemplate(post, postId) {
        return `
                          
        <div class="news-item">
            <img src="${post.featuredImage}" alt="${post.title}">
            <div class="news-details">
                    <h2><a href="article.html?id=${postId}">${post.title}</a></h2>
            </div>
            
        </div>
      
        `;
    }

    function sportsTemplate(post, postId) {
        return `
                    <div class="news-item">
            <img src="${post.featuredImage}" alt="${post.title}">
            <div class="news-details">
                    <h2><a href="article.html?id=${postId}">${post.title}</a></h2>
            </div>
            
        </div>
        `;
    }


// 

    // Fetch all news articles on page load
    fetchAllNews();
