// Your web app's Firebase configuration
        var firebaseConfig = {
  apiKey: "AIzaSyDBAlpoNNrkWb8253avVqQnM-DLxU8lzEk",
  authDomain: "chats-51279.firebaseapp.com",
  databaseURL: "https://chats-51279-default-rtdb.firebaseio.com",
  projectId: "chats-51279",
  storageBucket: "chats-51279.appspot.com",
  messagingSenderId: "1030080536466",
  appId: "1:1030080536466:web:e335dc68be6f7cee7b6b4b"
};
        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        var messageCount = 0;

        function load() {
            localStorage.setItem("page_raw", "chat.html");
            const messagesRef = firebase.database().ref('messages');
            messagesRef.on('child_added', (snapshot) => {
                const message = snapshot.val();
                displayMessage(message.to, message.message, message.from);
            });
            const uploadsRef = firebase.database().ref('uploads');
            uploadsRef.on('child_added', (snapshot) => {
                const uploads = snapshot.val();
                displayMessage(uploads.to, uploads.message, uploads.from);
            });
        }
        
        function send() {
            const to = document.getElementById('chatTo').value;
            const from = localStorage.getItem("RAW");
            const message = document.getElementById('chatMessage').value;
            
            if (to && message && from) {
                const newMessage = {
                    to,
                    message,
                    from
                };
                
                firebase.database().ref('messages').push(newMessage);
                
                // Clear input fields
                document.getElementById('chatTo').value = '';
                document.getElementById('chatMessage').value = '';
            }
        }
        
        function displayMessage(to, message, from) {
            const messagesDiv = document.getElementById('chatBox');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = 'Message: ' + message + '<br> From: ' + from + ' &nbsp; to: ' + to;
            messagesDiv.appendChild(messageDiv);

            // Scroll to the bottom
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            // Increment message count
            messageCount++;
            
            // Delete all messages if there are three messages
            if (messageCount >= 3) {
                clearAllMessages();
            }
        }

        function clearAllMessages() {
            // Remove all messages from Firebase
            firebase.database().ref('messages').remove();
            firebase.database().ref('uploads').remove();

            // Refresh the webpage
            location.reload();
        }

        function uploadFiles() {
    const files = document.getElementById('upload').files;
    if (!files.length) return;

    const from = localStorage.getItem("RAW");
    const to = document.getElementById('chatTo').value;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(event) {
            const dataUri = event.target.result;
            console.log('File Data URI:', dataUri);

            const newMessage = {
                to,
                message: `File uploaded: <a href="${dataUri}" target="_blank">${file.name}</a>`, // Corrected string interpolation
                from
            };

            firebase.database().ref('uploads').push(newMessage);

            // Display the message
            displayMessage(newMessage.to, newMessage.message, newMessage.from);
        };

        reader.readAsDataURL(file);
    }
}
