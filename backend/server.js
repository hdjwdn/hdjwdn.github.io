const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  // 用于解析请求体
const app = express();
const port = process.env.PORT || 3000;

// 中间件：解析 JSON 请求体
app.use(bodyParser.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, '../')));

// 存储留言的内存数据库
let messages = [];

// 发表留言
app.post('/messages', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const newMessage = {
        id: messages.length + 1,
        name,
        message,
        timestamp: new Date().toISOString()
    };

    messages.push(newMessage);
    res.status(201).json(newMessage);
});

// 查看历史留言
app.get('/messages', (req, res) => {
    res.status(200).json(messages);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
