const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTBjYzhkNTQyZTg4YTNiYjQwMmVlZDUiLCJpYXQiOjE1Nzc4OTYxNDl9.xNzrRbNWL5ZKiHLSI3EApUm99Zh2AKrmkABwwpSfYaU'

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    console.log(authorization);
    const token = authorization.replace('Bearer ', '');
    // jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => { // not work
    jwt.verify(token, Buffer.from('MY_SECRET_KEY', 'utf8'), async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};