        // Initialize Socket.IO Connection
        const socket = io(
            window.location.hostname === 'localhost'
                ? 'http://localhost:3000'  // Local development
                : 'https://quickbuzz-dtle.onrender.com'  // Deployed backend
        );

        const leaderboardBody = document.getElementById("leaderboardBody");
        let buzzerData = [];
        let buzzerActivated = false; // Track buzzer state

        // ✅ Listen for buzzer press event
 socket.on("buzzerUpdate", (data) => {
    console.log("🔔 Buzzer Data Received:", data);

    // Avoid duplicate entries by checking teamName
    if (!buzzerData.some(item => item.teamName === data.teamName)) {
        buzzerData.push(data);
        updateLeaderboard();

        // Calculate and send individual team positions
        broadcastTeamPositions();
    }
});

        // ✅ Listen for reset event
        socket.on("resetBuzzer", () => {
            console.log("🔄 Buzzers Reset");
            buzzerData = [];
            updateLeaderboard();
        });

        // 📊 Update the leaderboard with position tracking
function updateLeaderboard() {
    leaderboardBody.innerHTML = "";

    // Sort teams by buzzer press time (ascending)
    buzzerData.sort((a, b) => a.timestamp - b.timestamp);

    buzzerData.forEach((item, index) => {
        const { teamName, timestamp } = item;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td> <!-- Position starts from 1 -->
            <td>${teamName}</td>
            <td>⏱️ ${timestamp} ms</td>
        `;
        leaderboardBody.appendChild(row);
    });

    // Emit updated leaderboard to all clients
    socket.emit("updateLeaderboard", buzzerData);
}

// 📢 Broadcast team positions to each client
// 📢 Broadcast team positions to each client
// 📊 Broadcast team positions to each client
function broadcastTeamPositions() {
  if (!buzzerData.length) return; // Ensure there's data to process

  try {
    // Sort teams by their timestamp (ascending order means fastest first)
    buzzerData.sort((a, b) => a.timestamp - b.timestamp);

    buzzerData.forEach((item, index) => {
      if (item.teamName) {
        console.log(`📤 Sending position: ${index + 1} to ${item.teamName}`);
        io.emit('yourPosition', { teamName: item.teamName, position: index + 1 });
      }
    });
  } catch (error) {
    console.error("❌ Error broadcasting positions:", error);
  }
}


// 🛑 Reset Buzzer (admin control)
function resetBuzzer() {
    socket.emit("resetBuzzer");
    buzzerData = [];
    updateLeaderboard();
    console.log("📣 Reset event sent to server.");
}

// 🚨 Activate Buzzer (enable for teams)
function activateBuzzer() {
    if (!buzzerActivated) {
        socket.emit("activateBuzzer");
        buzzerActivated = true;
        toggleBuzzerButtons(true);
        console.log("📣 Buzzer activated for teams.");
    }
}

// 🛑 Deactivate Buzzer (disable for teams)
function deactivateBuzzer() {
    if (buzzerActivated) {
        socket.emit("deactivateBuzzer");
        buzzerActivated = false;
        toggleBuzzerButtons(false);
        console.log("📣 Buzzer deactivated.");
    }
}

// 🔘 Toggle Buzzer Activation/Deactivation Buttons
function toggleBuzzerButtons(active) {
    document.getElementById("activateBuzzerButton").style.display = active ? "none" : "inline-block";
    document.getElementById("deactivateButton").style.display = active ? "inline-block" : "none";
}

// 🔐 Handle Admin Logout
function handleLogout() {
    window.location.href = "index.html";
}
// Quiz Data with Question Images
// 🔹 Quiz Data with Question Images
const quizData = [

    {
        question: "What event/ocassion was this Amul ad made for ?",
        image: "amul.png",
        
    },
        {
        question: "Who are these people ?",
        image: "men.jpeg",
        
    },
        {
        question: "Who is the Author of this book ?",
        image: "book.jpeg",
        
    },
    
    {
        question: "Which city is the Starbucks in ?",
        image: "starbucks.png",
        
    },
    {
        question: "Guess the Brand ?",
        image: "gum.mp4",
        
    },
    {
        question: "Guess the Brand ?",
        image: "kj.mp4",
        
    },
        {
        question: "Guess the Brand ?",
        image: "colgate.mp4",
        
    },
    {
        question: "What is common in these restaurants ?",
        image: "crab.jpeg",
        
    }
    
];

let currentQuestionIndex = 0;
//let isBuzzerActive = true; // Change this if needed

// 🔹 Initialize Quiz
window.onload = function () {
    showQuestion(currentQuestionIndex);
    updateButtons();
};

// 🔹 Show Question & Options
function showQuestion(index) {
    const question = quizData[index];

    document.getElementById("questionImage").src = question.image;
    document.querySelector(".question-text").textContent = question.question;
    document.querySelector(".question-number").textContent = `Question ${index + 1}/${quizData.length}`;


    const mediaElement = document.getElementById("questionImage");
    mediaElement.parentNode.replaceChild(createMediaElement(question.image), mediaElement);

    updateButtons();

    // 🔹 Create Image or Video Element
function createMediaElement(source) {
    if (source.endsWith(".mp4")) {
        const video = document.createElement("video");
        video.src = source;
        video.controls = true;
        video.id = "questionImage"; // Ensure we preserve the ID
        // ✅ Increase video size
        video.style.width = "800px";  // Set desired width
        video.style.height = "450px"; // Set desired height (optional)
        video.style.borderRadius = "12px";
        video.style.border = "2px solid var(--accent-color)";
        return video;
    } else {
        const img = document.createElement("img");
        img.src = source;
        img.id = "questionImage"; // Ensure we preserve the ID
        return img;
    }
}

 

    updateButtons();
}

// 🔹 Next & Previous Buttons
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

// 🔹 Update Next/Prev Button States
function updateButtons() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
}
