import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";

export default function useRedirectLoggedOutUser(path) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function redirectLoggedOutUser() {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Session expired. Please, login to continue!");
        navigate(path);
        return;
      }
    }

    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
}
