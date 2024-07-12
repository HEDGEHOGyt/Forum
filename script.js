document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');

    // Load messages from localStorage
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    // Function to render messages
    const renderMessages = () => {
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = message.text;
            messagesContainer.appendChild(messageElement);
        });
    };

    // Function to add a new message
    const addMessage = (text) => {
        const timestamp = Date.now();
        const message = { text, timestamp };
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        renderMessages();

        // Set timeout to delete the message after 1 hour (3600000 ms)
        setTimeout(() => {
            messages = messages.filter(msg => msg.timestamp !== timestamp);
            localStorage.setItem('messages', JSON.stringify(messages));
            renderMessages();
        }, 3600000);
    };

    // Event listener for the form submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText) {
            addMessage(messageText);
            messageInput.value = '';
        }
    });

    // Remove old messages on load
    const now = Date.now();
    messages = messages.filter(msg => now - msg.timestamp < 3600000);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Render messages on load
    renderMessages();
});

