const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');
const notes = require('./notes');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const argv = yargs.command('add', 'Add a new note', {
    title: titleOptions,
    body: {
        describe: 'Content of note',
        demand: true,
        alias: 'b'
    }
}).command('list', 'List all saved notes')
.command('read', 'Read a note', {
    title: titleOptions
}).command('remove', 'Remove a note', {
    title: titleOptions
})
.help()
.argv;
const command = argv._[0];

if(command == "add") {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
       notes.printNote(note);
    }else {
        console.log('Title already exists');
    }
}else if(command == "remove") {
    var isRemoved = notes.removeNote(argv.title);
    var message = isRemoved ? 'Note is removed' : 'Note not found';
    console.log(message);
}else if(command == "list") {
   notes.getAll();
}else if(command == "read") {
  var note = notes.readNote(argv.title);
  if(note) {
     notes.printNote(note);
  }else {
      console.log('Note not found');
  }
}else {
    console.log('Command not recognized');
}