import { set } from "mongoose";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNote, reset, updatedNote } from "../features/notes/noteSlice";

export default function NoteForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate("/");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const { notes, isLoading, isError, message, editNote } = useSelector(
    (state) => state.notes
  );

  async function onSubmit(e) {
    e.preventDefault();
    if (editNote) {
      await dispatch(updatedNote([editNote._id, { title, text }]));
      await dispatch(reset())
      return navigate("/");
    }
    dispatch(createNote({ title, text }));
    setTitle("")
    setText("");
  }

  useEffect(() => {
    if (editNote) {
      setText(editNote.text);
      setTitle(editNote.title)
    } 
  }, [editNote]);

  return (
    <div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text"></label>
            <textarea
            className="h-[50px]"
            placeholder="title"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
            className="h-[150px]"
            placeholder="notes"
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              {editNote ? 'Edit Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
