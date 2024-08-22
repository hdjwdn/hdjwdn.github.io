const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // 使用 Vercel 提供的环境变量 PORT

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

const messagesFile = path.join(__dirname, 'messages.json');

// 读取历史留言
app.get('/messages', (req, res) => {
    if (fs.existsSync(messagesFile)) {
        fs.readFile(messagesFile, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read messages' });
            }
            res.json(JSON.parse(data));
        });
    } else {
        res.json([]);
    }
});

// 提交新的留言
app.post('/messages', (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const newMessage = { name, message };
    
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, 'utf8');
        messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save message' });
        }
        res.json(newMessage);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Vercel 处理端口和域名
});
