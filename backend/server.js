const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

const messagesFile = path.join(__dirname, 'messages.json');

// 获取所有留言
app.get('/api/messages', (req, res) => {
    fs.readFile(messagesFile, (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(JSON.parse(data));
    });
});

// 发送留言
app.post('/api/messages', (req, res) => {
    const newMessage = req.body;
    fs.readFile(messagesFile, (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        const messages = JSON.parse(data);
        messages.push(newMessage);
        fs.writeFile(messagesFile, JSON.stringify(messages), (err) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.status(201).send('Message added');
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
