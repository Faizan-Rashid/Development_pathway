import { useState, useEffect } from "react";
import { create, getAll, update } from "./services/notes";

const Note = ({ text, id, important, notes, setNotes }) => {
  return (
    <div>
      <span>{text}</span> &nbsp;
      <button
        onClick={() => {
          const updatedNote = {
            ...notes.find((note) => note.id === id),
            important: important ? false : true,
          };

          update(updatedNote).then((noteUpdated) => {
            setNotes(
              notes.map((note) =>
                note.id === noteUpdated.id ? noteUpdated : note
              )
            );
          });
        }}
      >
        {important ? "make not important" : "make important"}
      </button>
    </div>
  );
};

const AddNote = ({ setNotes, setNewNote, newNote, notes }) => {
  const addNote = () => {
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    create(newNoteObject).then((addedNote) => {
      setNotes(notes.concat(addedNote));
      setNewNote("");
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNote();
      }}
    >
      <input
        type="text"
        placeholder="Enter note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit">add note</button>
    </form>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  return (
    <div>
      {notes.map((note) => {
        const { id, important, content } = note;

        return (
          <Note
            key={id}
            text={content}
            id={id}
            important={important}
            notes={notes}
            setNotes={setNotes}
          />
        );
      })}

      {/* CREATE A NOTE */}
      <AddNote
        setNotes={setNotes}
        setNewNote={setNewNote}
        newNote={newNote}
        notes={notes}
      />
    </div>
  );
};

export default App;
