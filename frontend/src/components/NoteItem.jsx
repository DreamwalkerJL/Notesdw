import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote, updateNote } from "../features/notes/noteSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
export default function NoteItem({ note }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function edit() {
    await dispatch(updateNote(note._id));
    navigate("/edit");
  }

  return (
    <div className="note">
      <div className="break-all p-4">
        {new Date(note.createdAt).toLocaleString("de-CH")}
      </div>
      <h2 className="break-all  pt-0 font-bold text-[22px]">{note.title}</h2>
      <h2 className="break-all p-4 pt-0">{note.text}</h2>
      <div className="">
        <button
          className="close"
          onClick={() => dispatch(deleteNote(note._id))}
        >
          <FaTrash />
        </button>
        <button
          className="absolute left-[13px] top-[10px]"
          onClick={() => edit()}
        >
          <FaEdit />
        </button>
      </div>
    </div>
  );
}
