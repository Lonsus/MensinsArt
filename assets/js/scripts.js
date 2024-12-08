function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

function showSection(target) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden-section'));
    const targetSection = document.getElementById(target);
    if (targetSection) {
        targetSection.classList.remove('hidden-section');
    }
}


        // Generate a unique ID for each post
        function generateUUID() {
            return 'xxxx-xxxx-4xxx-yxxx-xxxx-yyyyyyyyxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        // Load saved posts on page load
        document.addEventListener("DOMContentLoaded", loadPosts);

        // Function to save posts to localStorage
        function savePostsToLocalStorage() {
            const posts = Array.from(document.querySelectorAll('.blog-post')).map(post => {
                const id = post.dataset.id; // Primary Key
                const img = post.querySelector('img')?.src || '';
                const title = post.querySelector('h3').textContent;
                const content = post.querySelector('p.blog-post-content').textContent;
                return { id, img, title, content };
            });
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }

        // Function to load posts from localStorage
        function loadPosts() {
            const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
            const postsContainer = document.getElementById('blog-posts');
            const existingIds = new Set();

            posts.forEach(postData => {
                if (!existingIds.has(postData.id)) {
                    const post = document.createElement('div');
                    post.classList.add('blog-post');
                    post.dataset.id = postData.id;
                    post.innerHTML = `
                        ${postData.img ? `<img src="${postData.img}" alt="Blog Image">` : ''}
                        <h3>${postData.title}</h3>
                        <p class="blog-post-content">${postData.content}</p>
                        <button class="delete-btn" onclick="deletePost(this)">Eliminar</button>
                    `;
                    postsContainer.appendChild(post);
                    existingIds.add(postData.id);
                }
            });
        }

        // Function to add a new post
        function addPost(event) {
            event.preventDefault();

            const id = generateUUID(); // Assign a unique ID to the post
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const imageInput = document.getElementById('image');
            const postsContainer = document.getElementById('blog-posts');
            const post = document.createElement('div');
            post.classList.add('blog-post');
            post.dataset.id = id; // Store the ID in a data attribute

            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    post.innerHTML = `
                        <img src="${e.target.result}" alt="Blog Image">
                        <h3>${title}</h3>
                        <p class="blog-post-content">${content}</p>
                        <button class="delete-btn" onclick="deletePost(this)">Eliminar</button>
                    `;
                    postsContainer.appendChild(post);
                    savePostsToLocalStorage();
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                post.innerHTML = `
                    <h3>${title}</h3>
                    <p class="blog-post-content">${content}</p>
                    <button class="delete-btn" onclick="deletePost(this)">Eliminar</button>
                `;
                postsContainer.appendChild(post);
                savePostsToLocalStorage();
            }

            // Clear form fields
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            document.getElementById('image').value = '';
        }

        // Function to delete a post
        function deletePost(button) {
            const post = button.parentElement;
            post.remove();
            savePostsToLocalStorage();
        }
 

// Load posts on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    showSection('inicio');
});


