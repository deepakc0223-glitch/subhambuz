---

📘 QuickBuzz – Web-Based Real-Time Buzzer System


---

📌 Abstract

QuickBuzz is a web-based, real-time buzzer system designed to facilitate quiz competitions without the need for physical hardware. It provides millisecond-level precision using Socket.io for real-time data transmission and Firebase for secure authentication. The system includes a Team Dashboard for participants and an Admin Dashboard for monitoring buzzer events and resetting rounds. This project aims to deliver an accurate, accessible, and hardware-free solution for competitive events.


---

🎯 Objective

To develop a fully web-based buzzer system that:

Captures buzzer presses in real-time with millisecond accuracy.

Displays a live leaderboard for teams and admins.

Provides a secure registration and authentication system using Firebase.

Enables the admin to manage rounds and reset the system.

Eliminates the need for physical buzzer hardware, making the system accessible from any device.



---

🌟 Features

✅ Real-Time Precision: Captures buzzer presses with millisecond accuracy.
✅ Live Leaderboard: Displays dynamic rankings based on buzzer order.
✅ Team Registration: Secure login and registration system with Firebase.
✅ Admin Dashboard: Provides full control to reset buzzers and monitor connectivity.
✅ Dynamic UI: Responsive design with real-time updates.
✅ Cross-Origin Support (CORS): Ensures multi-device accessibility.
✅ Hardware-Free: 100% web-based—works on any internet-enabled device.


---

📊 System Architecture

Here's a visual representation of the QuickBuzz architecture:

┌─────────────────────────────────────────────────────────┐
│                         Users                           │
│                (Participants & Admins)                  │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Client)                     │
│      - HTML, CSS, Vanilla JavaScript (Team/Admin UI)     │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Node.js + Express.js)              │
│      - Handles authentication, event tracking, API       │
│      - Socket.io for real-time buzzer updates            │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Firebase Services (Firestore)            │
│     - User Authentication (Email/Google Sign-In)         │
│     - Team Data Storage                                  │
└─────────────────────────────────────────────────────────┘


---

🔧 Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript

Backend: Node.js with Express.js

Real-Time Communication: Socket.io

Database & Authentication: Firebase (Firestore, Auth)

Cross-Origin Support: CORS



---

🛠️ Methodology

The QuickBuzz development process followed a structured Software Development Life Cycle (SDLC):

1. Requirement Analysis

Identified core features (buzzer accuracy, admin controls).

Studied Socket.io for real-time event management.



2. System Design

Designed UI wireframes for Team and Admin dashboards.

Architected the system with Firebase for authentication and Socket.io for real-time events.



3. Development

Implemented the backend using Node.js with Express.js.

Developed real-time communication using Socket.io.

Created secure authentication via Firebase.



4. Testing & Validation

Simulated multiple users pressing the buzzer simultaneously.

Verified real-time updates and precision.

Tested the admin reset functionality.





---

📸 Screenshots

1. Team Dashboard:

Displays team name.

Buzzer button (disabled after pressing).

Shows "Buzzer pressed at {timestamp}".



2. Admin Dashboard:

Displays live leaderboard with positions and timestamps.

✅ Indicator for active team connections.

Reset button for new rounds.



3. Registration Page:

Secure team registration.

Admin bypass for exclusive access.





---

📥 Installation & Setup

1. Clone the Repository:

git clone https://github.com/your-username/quickbuzz.git
cd quickbuzz


2. Install Dependencies:

npm install


3. Set Up Firebase:

Create a Firebase project and enable Firestore & Authentication.

Add credentials to .env file:


FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id


4. Start the Server:

node server.js




---

🔍 How It Works

1. Team Registration:

Teams sign up with a name, member details, and password.

Admin logs in using Admin and Admin@123.



2. Buzzer Press:

Timestamp is captured in milliseconds and sent to the admin.



3. Live Leaderboard:

Displays team rankings instantly based on the buzzer press time.



4. Admin Control:

Admin can monitor live connections and reset the buzzer for new rounds.





---

🧪 Testing & Results

1. Precision Testing:

Verified timestamp accuracy within milliseconds by simulating simultaneous buzzer presses.



2. Scalability:

System successfully handled 50+ concurrent users without performance issues.



3. Cross-Device Compatibility:

Tested across browsers (Chrome, Firefox, Edge) and devices (PC, mobile).





---

🔍 Challenges & Solutions


---

🚀 Future Scope

1. Multi-Round Support: Add multi-round quizzes with cumulative scoring.


2. Admin Analytics: Provide insights like average response time.


3. Mobile App Integration: Expand to native iOS/Android apps.




---

🧑‍💻 Contributing

1. Fork the Repository:

git clone https://github.com/your-username/quickbuzz.git


2. Create a Branch:

git checkout -b feature-name


3. Commit Changes:

git commit -m "Add new feature"


4. Push & Open PR:

git push origin feature-name




---

📄 License

This project is licensed under the MIT License—free to modify and distribute with attribution.


---

📧 Contact

For queries or support, reach out to:
📩 kunal.r.0223@inspiria.edu.in


---

