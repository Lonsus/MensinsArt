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
         // Check admin status on page load
         function checkAdminStatus() {
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            const adminForm = document.getElementById('admin-form');
            const loginButton = document.getElementById('login-btn');
            const logoutButton = document.getElementById('logout-btn');
            if (isAdmin) {
                adminForm.classList.remove('hidden');
                loginButton.classList.add('hidden');
                logoutButton.classList.remove('hidden');
            } else {
                adminForm.classList.add('hidden');
                loginButton.classList.remove('hidden');
                logoutButton.classList.add('hidden');
            }
        }

        // Admin login function
        function adminLogin() {
            const username = prompt('Ingrese el nombre de usuario:');
            const password = prompt('Por favor, ingrese la contraseña de administrador:');
            const storedUsername = 'admin'; // Replace with username stored in config or database
            const storedPassword = '123'; // Replace with password stored in config or database

            if (username === storedUsername && password === storedPassword) {
                localStorage.setItem('isAdmin', 'true');
                alert('Bienvenido, Admin');
                checkAdminStatus();
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        }
// Admin logout function
function adminLogout() {
    localStorage.removeItem('isAdmin');
    alert('Sesión cerrada');
    checkAdminStatus();
}
        // Load saved posts on page load
        document.addEventListener('DOMContentLoaded', () => {
            checkAdminStatus();
            loadPosts();
        });
        // Function to save posts to localStorage
        function savePostsToLocalStorage() {
            const posts = Array.from(document.querySelectorAll('.blog-post')).map(post => {
                const id = post.dataset.id;
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
        posts.forEach(postData => {
            const post = document.createElement('div');
            post.classList.add('blog-post');
            post.dataset.id = postData.id;
            post.innerHTML = `
                ${postData.img ? `<img src="${postData.img}" alt="Blog Image">` : ''}
                <h3>${postData.title}</h3>
                <p class="blog-post-content">${postData.content}</p>
                <button class="delete-btn hidden" onclick="deletePost(this)">Eliminar</button>
            `;
            if (localStorage.getItem('isAdmin') === 'true') {
                post.querySelector('.delete-btn').classList.remove('hidden');
            }
            postsContainer.appendChild(post);
        });
    }


        // Function to add a new post
        function addPost(event) {
            event.preventDefault();
            const id = Date.now().toString();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const imageInput = document.getElementById('image');
            const postsContainer = document.getElementById('blog-posts');
            const post = document.createElement('div');
            post.classList.add('blog-post');
            post.dataset.id = id;

            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    post.innerHTML = `
                        <img src="${e.target.result}" alt="Blog Image">
                        <h3>${title}</h3>
                        <p class="blog-post-content">${content}</p>
                        <button class="delete-btn hidden" onclick="deletePost(this)">Eliminar</button>
                    `;
                    if (localStorage.getItem('isAdmin') === 'true') {
                        post.querySelector('.delete-btn').classList.remove('hidden');
                    }
                    postsContainer.appendChild(post);
                    savePostsToLocalStorage();
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                post.innerHTML = `
                    <h3>${title}</h3>
                    <p class="blog-post-content">${content}</p>
                    <button class="delete-btn hidden" onclick="deletePost(this)">Eliminar</button>
                `;
                if (localStorage.getItem('isAdmin') === 'true') {
                    post.querySelector('.delete-btn').classList.remove('hidden');
                }
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


