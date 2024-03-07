import fs from "fs";
import chalk from "chalk";

const getNotes = () => {
    loadNotes().forEach((note) => console.log(note.title));
};

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    debugger;

    if (duplicateNote) console.log(chalk.red.inverse("Title already exists"));
    else {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Note added"));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    const resultNote = notes.filter((note) => {
        return note.title !== title;
    });

    if (resultNote.length === notes.length)
        console.log(chalk.bgRedBright.bold(`"${title}" not found`));
    else {
        saveNotes(resultNote);
        console.log(chalk.green(`"${title}" deleted`));
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync("./notes.json", JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("./notes.json").toString());
    } catch (err) {
        return [];
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const requiredNote = notes.find((note) => note.title === title);
    if (requiredNote) {
        console.log(`Title: ${requiredNote.title}\nBody: ${requiredNote.body}`);
    } else console.log(chalk.redBright.inverse("Note doesnot exist"));
};

export { getNotes, addNote, removeNote, readNote };
