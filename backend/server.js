const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// 启用 CORS
app.use(cors());

// 存储留言的数组
let messages = [];

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理 GET 请求，返回所有留言
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// 处理 POST 请求，接收新的留言
app.post('/api/messages', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        const newMessage = { name, message, date: new Date() };
        messages.push(newMessage);
        res.status(201).json(newMessage);
    } else {
        res.status(400).json({ error: 'Name and message are required.' });
    }
});

module.exports = app;
