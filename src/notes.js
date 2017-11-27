const fs = require('fs');
const _ = require('lodash');
const filePath = '../resources/notes-data.json';

var addNote = (title, body) => {
    var notes = readFromFile();
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length == 0) {
        notes.push(note);
        writeToFile(notes);
        return note;
    }
}

var removeNote = (title) => {
    var notes = readFromFile();
    var uniqueNotes = notes.filter((note) => note.title !== title);
    writeToFile(uniqueNotes);
    return notes.length !== uniqueNotes.length;

}

var getAll = () => {
    console.log('Getting all notes...');
    var notes = readFromFile();
    console.log(`Total: ${notes.length} notes.`);
    _.forEach(notes, (note) => {
        printNote(note);
    });
}

var readNote = (title) => {
    var notes = readFromFile();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

var readFromFile = () => {
    try {
        var notesString = fs.readFileSync(filePath);
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var writeToFile = (notes) => {
    fs.writeFileSync(filePath, JSON.stringify(notes));
}

var printNote = (note) => {
    console.log('----');
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    printNote
}

