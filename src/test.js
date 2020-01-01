const jwt = require('jsonwebtoken');

const SECRET = 'My_SECRET_KEY';

const token = jwt.sign({ userId: 'asd8123nvasi' }, SECRET);
jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
        throw err;
    }
    console.log(payload);
});