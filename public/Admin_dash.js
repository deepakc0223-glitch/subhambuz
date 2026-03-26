// 🔌 Initialize Socket.IO Connection (Auto-detects current domain)
const socket = io();

const leaderboardBody = document.getElementById("leaderboardBody");
let buzzerData = [];
let buzzerActivated = false;

//////////////////////////////////////////////////////
// 🔔 SOCKET EVENTS
//////////////////////////////////////////////////////

socket.on("buzzerUpdate", (data) => {
    if (!buzzerData.some(item => item.teamName === data.teamName)) {
        buzzerData.push(data);
        updateLeaderboard();
        broadcastTeamPositions();
    }
});

socket.on("resetBuzzer", () => {
    buzzerData = [];
    updateLeaderboard();
});

//////////////////////////////////////////////////////
// 📊 LEADERBOARD
//////////////////////////////////////////////////////

function updateLeaderboard() {
    leaderboardBody.innerHTML = "";

    buzzerData.sort((a, b) => a.timestamp - b.timestamp);

    buzzerData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.teamName}</td>
            <td>⏱️ ${item.timestamp} ms</td>
        `;
        leaderboardBody.appendChild(row);
    });

    socket.emit("updateLeaderboard", buzzerData);
}

function broadcastTeamPositions() {
    if (!buzzerData.length) return;

    buzzerData.sort((a, b) => a.timestamp - b.timestamp);

    buzzerData.forEach((item, index) => {
        socket.emit('yourPosition', {
            teamName: item.teamName,
            position: index + 1
        });
    });
}

//////////////////////////////////////////////////////
// 🎮 BUZZER CONTROLS
//////////////////////////////////////////////////////

function resetBuzzer() {
    socket.emit("resetBuzzer");
    buzzerData = [];
    updateLeaderboard();
}

function activateBuzzer() {
    if (!buzzerActivated) {
        socket.emit("activateBuzzer");
        buzzerActivated = true;
        toggleBuzzerButtons(true);
    }
}

function deactivateBuzzer() {
    if (buzzerActivated) {
        socket.emit("deactivateBuzzer");
        buzzerActivated = false;
        toggleBuzzerButtons(false);
    }
}

function toggleBuzzerButtons(active) {
    document.getElementById("activateBuzzerButton").style.display =
        active ? "none" : "inline-block";

    document.getElementById("deactivateButton").style.display =
        active ? "inline-block" : "none";
}

function handleLogout() {
    window.location.href = "index.html";
}

//////////////////////////////////////////////////////
// 🎥 MEDIA HANDLING
//////////////////////////////////////////////////////

function createMediaElement(source) {
    const container = document.createElement("div");
    container.classList.add("media-wrapper");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    if (source.endsWith(".mp4")) {

        const video = document.createElement("video");
        video.src = source;
        video.controls = false;
        video.muted = true;
        video.preload = "auto";

        video.style.maxWidth = "75%";
        video.style.height = "30rem";
        video.style.borderRadius = "12px";
        video.style.border = "2px solid var(--accent-color)";
        video.style.cursor = "pointer";

        // Toggle play/pause on video click
        video.onclick = () => {
            if (video.paused) {
                video.muted = false;
                video.play();
            } else {
                video.pause();
            }
        };

        // 🎮 Controls
        const controls = document.createElement("div");
        controls.style.display = "flex";
        controls.style.gap = "10px";
        controls.style.marginTop = "10px";

        const playBtn = document.createElement("button");
        playBtn.innerText = "▶ Play";

        const pauseBtn = document.createElement("button");
        pauseBtn.innerText = "⏸ Pause";

        const fullscreenBtn = document.createElement("button");
        fullscreenBtn.innerText = "⛶ Fullscreen";

        [playBtn, pauseBtn, fullscreenBtn].forEach(btn => {
            btn.style.padding = "8px 16px";
            btn.style.borderRadius = "6px";
            btn.style.border = "none";
            btn.style.cursor = "pointer";
        });

        playBtn.style.background = "#4CAF50";
        playBtn.style.color = "#fff";

        pauseBtn.style.background = "#f44336";
        pauseBtn.style.color = "#fff";

        fullscreenBtn.style.background = "#2196F3";
        fullscreenBtn.style.color = "#fff";

        playBtn.onclick = () => {
            video.muted = false;
            video.play();
        };

        pauseBtn.onclick = () => {
            video.pause();
        };

        fullscreenBtn.onclick = () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        };

        controls.appendChild(playBtn);
        controls.appendChild(pauseBtn);
        controls.appendChild(fullscreenBtn);

        container.appendChild(video);
        container.appendChild(controls);

    } else {
        const img = document.createElement("img");
        img.src = source;
        img.style.maxWidth = "75%";
        container.appendChild(img);
    }

    return container;
}

//////////////////////////////////////////////////////
// 🧠 QUIZ DATA
//////////////////////////////////////////////////////

const quizData = [
    { image: "/1.mp4" },
    { image: "/2.mp4" },
    { image: "/3.mp4" },
    { image: "/4.mp4" },
    { image: "/5.mp4" },
    { image: "/6.mp4" }
];

let currentQuestionIndex = 0;

//////////////////////////////////////////////////////
// 🚀 INIT
//////////////////////////////////////////////////////

window.onload = function () {
    showQuestion(currentQuestionIndex);
    updateButtons();
};

//////////////////////////////////////////////////////
// ❗ FINAL FIXED SHOW QUESTION
//////////////////////////////////////////////////////

function showQuestion(index) {
    const question = quizData[index];
    const container = document.querySelector(".question-image-container");

    // 🔥 REMOVE old static image (ONLY ONCE)
    const staticImg = container.querySelector("img#questionImage");
    if (staticImg) {
        staticImg.remove();
    }

    // 🔥 REMOVE old dynamic media
    const existingMedia = container.querySelector(".media-wrapper");
    if (existingMedia) {
        existingMedia.remove();
    }

    // ✅ Add new media
    const newElement = createMediaElement(question.image);

    // Insert before next button
    const nextBtn = container.querySelector(".next-btn");
    container.insertBefore(newElement, nextBtn);

    document.querySelector(".question-number").textContent =
        `Question ${index + 1}/${quizData.length}`;

    updateButtons();
}

//////////////////////////////////////////////////////
// ⏭ NAVIGATION
//////////////////////////////////////////////////////

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

//////////////////////////////////////////////////////
// 🔘 BUTTON STATE
//////////////////////////////////////////////////////

function updateButtons() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
}