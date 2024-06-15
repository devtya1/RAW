var firebaseConfig = {
    apiKey: "AIzaSyDN7r1ikI-ylmx4rtYMf6g-G2uYtsFxIUg",
    authDomain: "chat-raw.firebaseapp.com",
    databaseURL: "https://chat-raw-default-rtdb.firebaseio.com",
    projectId: "chat-raw",
    storageBucket: "chat-raw.appspot.com",
    messagingSenderId: "762895654305",
    appId: "1:762895654305:web:76a3989d55f196806fbfe0"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref('messages');

// DOM elements
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Listen for incoming messages
messagesRef.on('child_added', function(snapshot) {
    const message = snapshot.val();
    displayMessage(message.sender, message.text);
});

// Function to send message to Firebase
sendButton.addEventListener('click', function() {
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        sendMessage('User123', messageText); // Replace 'User123' with authenticated user ID or name
        messageInput.value = ''; // Clear the message input field
    } else {
        alert('Please enter a message.');
    }
});

// Function to send message to Firebase
function sendMessage(sender, messageText) {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    messagesRef.push({
        sender: sender,
        text: messageText,
        timestamp: timestamp
    });
}

// Function to display message in chat box
function displayMessage(sender, messageText) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');

    if (sender === 'User123') {
        messageDiv.classList.add('sent');
        messageDiv.innerHTML = `<p>${messageText}</p>`;
    } else {
        messageDiv.classList.add('received');
        messageDiv.innerHTML = `<p>${messageText}</p>`;
    }

    chatBox.appendChild(messageDiv);

    // Automatically scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}
