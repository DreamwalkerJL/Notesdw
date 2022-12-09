import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { reset as noteReset, } from "../features/notes/noteSlice";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  async function navDashboard() {
    await dispatch(noteReset());
   return navigate("/");
  }

  return (
    <header className="header">
      <div className="logo cursor-pointer" onClick={navDashboard}>
        <p >Notes</p>
      </div>
      <ul>
        {user ? (
          <li>
            <Link>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Sign Out
              </button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}