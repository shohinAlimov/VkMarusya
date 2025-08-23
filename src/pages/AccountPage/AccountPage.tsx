import { useDispatch } from "react-redux";
import "./AccountPage.scss";
import { clearUser } from "../../store/authSlice";
import { authApi } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе", error);
    } finally {
      dispatch(clearUser());
    }
  };

  return (
    <div>
      <h2>Account</h2>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default AccountPage;
