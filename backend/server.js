const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 启用 CORS
app.use(cors());

// 使用 body-parser 处理 JSON 数据
app.use(bodyParser.json());

// 存储留言的数组
let messages = [];

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../')));

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

// 处理根路径请求，返回首页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 处理所有其他请求，返回 404 错误
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});


module.exports = app;
