<script type="module">
  // Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  // Firebase configuration (Replace with your credentials)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Handle Form Submission
  document.querySelector(".button-submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form reload

    // Get input values
    let teamName = document.querySelector("input[type='text']").value.trim();
    let password = document.querySelector("input[type='password']").value.trim();

    // Validation
    if (teamName === "" || password === "") {
      alert("Please enter both Team Name and Password.");
      return;
    }

    // Check if Admin
    if (teamName === "Admin" && password === "Admin@123") {
      window.location.href = "Admin_dash.html";
    } else {
      // Store in Firebase
      let teamRef = ref(database, "teams/" + teamName);
      set(teamRef, { teamName: teamName, password: password })
        .then(() => {
          alert("Login Successful!");
          window.location.href = "Team_dash.html"; // Redirect
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  });
</script>
