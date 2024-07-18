const firebaseConfig = {
  apiKey: "AIzaSyBGXYL4ukjzxk-gR5i9HMgHDIVW6N4clzI",
  authDomain: "raw-pune.firebaseapp.com",
  projectId: "raw-pune",
  storageBucket: "raw-pune.appspot.com",
  messagingSenderId: "150425623882",
  appId: "1:150425623882:web:c8838ffa898a7a865df5b3"
};

firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Perform basic client-side validation
        if (username === '' || password === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        // Fetch user details from Firebase Realtime Database
        const dbRef = firebase.database().ref('users/' + username);
        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                const user = snapshot.val();
                if (user.password === password) { // Note: This is not secure in a real application
                    // Redirect to the dashboard or another page
                    localStorage.setItem("RAW", username);
                    window.location.href = 'verify_id.html';
                } else {
                    errorMessage.textContent = 'Invalid username or password.';
                }
            } else {
                errorMessage.textContent = 'User does not exist.';
            }
        }).catch((error) => {
            console.error(error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        });
    });
});
