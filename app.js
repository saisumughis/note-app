const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes');

var user = os.userInfo();

fs.appendFile('greeting.txt', `Hello ${user.username}!`, (err) => {
    if(err) {
        console.log('Unable to write to file.');
    }
});