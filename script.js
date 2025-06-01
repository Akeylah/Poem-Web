document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Sample poem data - in a real app, this would come from a database
    const poems = [
        {
            id: 1,
            title: "Whispers of the Wind",
            author: "Alex Johnson",
            excerpt: "The wind carries secrets from lands far away,\nWhispering tales of both night and day...",
            fullText: "The wind carries secrets from lands far away,\nWhispering tales of both night and day.\nThrough valleys deep and mountains high,\nIt sings its song as it passes by.\n\nOh, if only I could understand,\nThe stories told by this unseen hand.\nPerhaps the joy, perhaps the pain,\nWould help me see the world again.",
            date: "June 15, 2023",
            genre: "Nature",
            likes: 24,
            image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "Eternal Flame",
            author: "Alex Johnson",
            excerpt: "In the depths of my soul burns a fire so bright,\nA beacon of hope in the darkest night...",
            fullText: "In the depths of my soul burns a fire so bright,\nA beacon of hope in the darkest night.\nNo storm can quench its steady glow,\nNo wind can make its embers low.\n\nIt warms the heart and lights the way,\nThrough troubled times and disarray.\nThis eternal flame, so pure, so true,\nWas kindled the day I first met you.",
            date: "May 28, 2023",
            genre: "Love",
            likes: 42,
            image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            title: "The Clock's Lament",
            author: "Alex Johnson",
            excerpt: "Tick-tock, tick-tock, the clock does say,\nAs moments slip and fade away...",
            fullText: "Tick-tock, tick-tock, the clock does say,\nAs moments slip and fade away.\nEach second gone can't be reclaimed,\nEach hour lost can't be reframed.\n\nThe hands they turn without a pause,\nObeying time's relentless laws.\nSo use me well, don't let me be,\nJust background noise to life's debris.",
            date: "April 12, 2023",
            genre: "Life",
            likes: 18,
            image: "https://images.unsplash.com/photo-1528041112089-9a6bf0c46a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            title: "Dragon's Flight",
            author: "Alex Johnson",
            excerpt: "Above the clouds where eagles dare,\nThe dragon soars through misty air...",
            fullText: "Above the clouds where eagles dare,\nThe dragon soars through misty air.\nIts wings outstretched, a mighty span,\nA creature born of myth and man.\n\nBeneath its shadow kingdoms quake,\nFor fire and ruin in its wake.\nYet in its eye a wisdom deep,\nThat makes the strongest warriors weep.",
            date: "March 30, 2023",
            genre: "Fantasy",
            likes: 36,
            image: "https://images.unsplash.com/photo-1579972668140-f7da53ccc2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];
    
    // Display poems in the grid
    const poemGrid = document.querySelector('.poem-grid');
    
    function displayPoems(poemsToDisplay) {
        poemGrid.innerHTML = '';
        
        poemsToDisplay.forEach(poem => {
            const poemCard = document.createElement('div');
            poemCard.className = 'poem-card';
            poemCard.innerHTML = `
                <div class="poem-card-img" style="background-image: url('${poem.image}')"></div>
                <div class="poem-card-content">
                    <h3>${poem.title}</h3>
                    <p class="author">By ${poem.author}</p>
                    <p class="excerpt">${poem.excerpt}</p>
                    <div class="meta">
                        <span>${poem.date}</span>
                        <span>${poem.genre}</span>
                    </div>
                </div>
            `;
            
            poemCard.addEventListener('click', () => openPoemModal(poem));
            poemGrid.appendChild(poemCard);
        });
    }
    
    // Initially display all poems
    displayPoems(poems);
    
    // Load more poems button
    const loadMoreBtn = document.querySelector('.load-more');
    let displayedCount = 4; // Initial number of poems displayed
    
    loadMoreBtn.addEventListener('click', function() {
        // In a real app, this would load more poems from the server
        // For this demo, we'll just show a message
        this.textContent = 'No more poems to load';
        this.style.backgroundColor = '#ccc';
        this.style.cursor = 'not-allowed';
    });
    
    // Genre filtering
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            const genre = this.getAttribute('data-genre');
            
            if (genre === 'all') {
                displayPoems(poems);
            } else {
                const filteredPoems = poems.filter(poem => poem.genre.toLowerCase() === genre);
                displayPoems(filteredPoems);
            }
            
            // Update active state
            genreCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Poem Modal
    const modal = document.getElementById('poemModal');
    const closeModal = document.querySelector('.close-modal');
    
    function openPoemModal(poem) {
        document.querySelector('.poem-title').textContent = poem.title;
        document.querySelector('.poem-author').textContent = `By ${poem.author}`;
        document.querySelector('.poem-text').textContent = poem.fullText;
        document.querySelector('.poem-date').textContent = poem.date;
        document.querySelector('.poem-genre').textContent = poem.genre;
        document.querySelector('.like-count').textContent = poem.likes;
        
        // Clear previous comments
        document.querySelector('.comments-list').innerHTML = '';
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Like button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('like-btn') || e.target.closest('.like-btn')) {
            const likeCount = e.target.querySelector('.like-count') || e.target.closest('.like-btn').querySelector('.like-count');
            let currentLikes = parseInt(likeCount.textContent);
            likeCount.textContent = currentLikes + 1;
            
            // Change icon to solid heart
            const heartIcon = e.target.querySelector('i') || e.target.closest('.like-btn').querySelector('i');
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        }
    });
    
    // Comment form submission
    const commentForm = document.querySelector('.comment-form');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const textarea = this.querySelector('textarea');
        const commentText = textarea.value.trim();
        
        if (commentText) {
            const commentsList = document.querySelector('.comments-list');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="author">Anonymous Reader</div>
                <div class="date">Just now</div>
                <div class="text">${commentText}</div>
            `;
            
            commentsList.prepend(newComment);
            textarea.value = '';
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('messageForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this data to your server
        console.log('Message submitted:', { name, email, message });
        
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // In a real app, you would send this to your email service
        console.log('Newsletter subscription:', email);
        
        alert('Thank you for subscribing to my newsletter!');
        this.reset();
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            const filteredPoems = poems.filter(poem => 
                poem.title.toLowerCase().includes(searchTerm) || 
                poem.author.toLowerCase().includes(searchTerm) ||
                poem.genre.toLowerCase().includes(searchTerm) ||
                poem.fullText.toLowerCase().includes(searchTerm)
            );
            
            displayPoems(filteredPoems);
        } else if (searchTerm.length === 0) {
            displayPoems(poems);
        }
    });
});