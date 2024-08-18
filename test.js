// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBGXYL4ukjzxk-gR5i9HMgHDIVW6N4clzI",
  authDomain: "raw-pune.firebaseapp.com",
  databaseURL: "https://raw-pune-default-rtdb.firebaseio.com",
  projectId: "raw-pune",
  storageBucket: "raw-pune.appspot.com",
  messagingSenderId: "150425623882",
  appId: "1:150425623882:web:c8838ffa898a7a865df5b3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Basic client-side validation
        if (username === '' || password === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        // Hardcoded username and password for testing
        if (username === "rag0730" && password === "test@123") {
            localStorage.setItem("RAW", username);
            window.location.href = 'dashboard.html';
            return;
        }

        // Fetch user details from Firebase Realtime Database
        const dbRef = firebase.database().ref('users/' + username);
        dbRef.get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    console.log(snapshot.val());

                    // Compare passwords (Insecure for real-world use, consider Firebase Auth)
                    if (user.password === password) {
                        localStorage.setItem("RAW", username);
                        console.log(user.password());
                        window.location.href = 'verify_id.html';
                    } else {
                        errorMessage.textContent = 'Invalid username or password.';
                    }
                } else {
                    errorMessage.textContent = 'User does not exist.';
                }
            })
            .catch((error) => {
                console.error('Firebase Error:', error);
                errorMessage.textContent = 'An error occurred. Please try again.';
            });
    });
});

function load(){
            localStorage.setItem("page_raw", "test.html");
        }
