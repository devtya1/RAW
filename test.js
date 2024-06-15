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
                    window.location.href = 'loading.html';
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
