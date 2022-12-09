import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "../components/NoteForm";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, editNote } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      return navigate("/login");
    }

    if (!editNote) {
      return navigate("/");
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1 className="break-all">'{editNote.text}'</h1>
        <p>Edit your Note</p>
      </section>

      <NoteForm />

      <section className="content"></section>
    </>
  );
}

export default Dashboard;
