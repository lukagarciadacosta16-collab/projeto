document.addEventListener("DOMContentLoaded", () => {
    // Elementos do login
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginForm && emailInput && passwordInput) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Pega usuários salvos no localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Verifica se o e-mail e senha conferem
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("loggedIn", email); // salva o e-mail do usuário logado
                window.location.href = "home.html";
            } else {
                alert("E-mail ou senha inválidos!");
            }
        });
    }

    // Exemplo: cadastro de usuários (em uma página de registro)
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        const regEmail = document.getElementById("reg-email");
        const regPassword = document.getElementById("reg-password");

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Verifica se já existe o e-mail
            if (users.some(u => u.email === regEmail.value.trim())) {
                alert("E-mail já cadastrado!");
                return;
            }

            // Salva novo usuário
            users.push({
                email: regEmail.value.trim(),
                password: regPassword.value.trim()
            });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Cadastro realizado! Faça login.");
            registerForm.reset();
        });
    }

    // CHECAR LOGIN NA PÁGINA HOME
    if (window.location.pathname.includes("home.html")) {
        if (!localStorage.getItem("loggedIn")) {
            window.location.href = "index.html";
        }
    }

    // PLAYER E MÚSICAS
    const musicList = document.getElementById("music-list");
    const audioPlayer = document.getElementById("audio-player");
    const playBtn = document.getElementById("play");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    if (musicList && audioPlayer && playBtn && nextBtn && prevBtn) {
        let currentTrackIndex = 0;
        let tracks = [];

        async function loadSongs(genre) { /* ... */ }
        function playTrack(index) { /* ... */ }

        playBtn.addEventListener("click", () => {
            if (audioPlayer.paused) audioPlayer.play();
            else audioPlayer.pause();
        });
        nextBtn.addEventListener("click", () => {
            if (currentTrackIndex < tracks.length - 1) playTrack(currentTrackIndex + 1);
        });
        prevBtn.addEventListener("click", () => {
            if (currentTrackIndex > 0) playTrack(currentTrackIndex - 1);
        });

        if (window.location.pathname.includes("home.html")) loadSongs("pop");

        const genreButtons = document.querySelectorAll(".genre-btn");
        genreButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const genre = btn.dataset.genre;
                loadSongs(genre);
            });
        });
    }
});
