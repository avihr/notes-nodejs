import { getNotes, addNote, removeNote, readNote } from "./notes.js";
import yargs from "yargs";
import { readFile } from "fs";

yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Contents of the note",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        addNote(argv.title, argv.body);
    },
});

yargs.command({
    command: "delete",
    describe: "Delete a new note",
    builder: {
        title: {
            describe: "Title of the note to remove",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        removeNote(argv.title);
    },
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => {
        getNotes();
    },
});

yargs.command({
    command: "open",
    describe: "Read a note",
    builder: {
        title: {
            describe: " title of the note to open",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        readNote(argv.title);
    },
});

yargs.parse();
