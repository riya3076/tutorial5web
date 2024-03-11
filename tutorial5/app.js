const express = require('express');
const app = express();
const uuid = require('uuid'); 

app.use(express.json());

let users = [
    { email: "abc@abc.ca", firstName: "ABC", id: "5abf6783" },
    { email: "xyz@xyz.ca", firstName: "XYZ", id: "5abf674563" }
  ];

app.get('/users', (req, res) => {
    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users
    });
});

app.post('/add', (req, res) => {
    const { email, firstName } = req.body;
    if (!email || !firstName) {
        return res.status(400).json({
            message: "Missing email or firstName",
            success: false
        });
    }
    const newUser = { id: uuid.v4(), email, firstName };
    users.push(newUser);
    res.status(201).json({
        message: "User added",
        success: true
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, firstName } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    if (email) users[userIndex].email = email;
    if (firstName) users[userIndex].firstName = firstName;

    res.status(200).json({
        message: "User updated",
        success: true
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    res.status(200).json({
        success: true,
        user: user
    });
});

module.exports = app;
