document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');

    // 加载留言历史
    fetch('/messages')
        .then(response => response.json())
        .then(data => {
            data.forEach(msg => {
                const div = document.createElement('div');
                div.textContent = `${msg.name}: ${msg.message}`;
                messageList.appendChild(div);
            });
        });

    // 处理留言提交
    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message })
        })
        .then(response => response.json())
        .then(data => {
            const div = document.createElement('div');
            div.textContent = `${data.name}: ${data.message}`;
            messageList.appendChild(div);
            form.reset();
        });
    });
});
