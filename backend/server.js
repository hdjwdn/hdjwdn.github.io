const express = require('express');
const path = require('path');

const app = express();

// 存储留言的数组
let messages = [];

// 使用 body-parser 中间件来解析请求体
app.use(bodyParser.json());

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理 GET 请求，返回所有留言
app.get('/messages', (req, res) => {
    res.json(messages);
});

// 处理 POST 请求，接收新的留言
app.post('/messages', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        const newMessage = { name, message, date: new Date() };
        messages.push(newMessage);
        res.status(201).json(newMessage);
    } else {
        res.status(400).json({ error: '请填写名字和留言！' });
    }
});

module.exports = app;