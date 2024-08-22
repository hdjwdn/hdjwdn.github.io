const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 使用 body-parser 中间件来解析请求体
app.use(bodyParser.json());

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../')));

// 存储留言的数组
let messages = [];

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
        res.status(400).json({ error: 'Name and message are required.' });
    }
});

// 导出 app 对象，供 Vercel 使用
module.exports = app;
