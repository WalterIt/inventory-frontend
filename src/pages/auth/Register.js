import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function register(e) {
    e.preventDefault();
    // console.log(formData);
    if (!name || !email || !password) {
      return toast.error("All fields are required!");
    }
    if (!validateEmail(email)) {
      return toast.error("Please, enter a valid Email!");
    }
    if (password.length < 6) {
      return toast.error("Password must have at least 6 characters!");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match!");
    }

    const userData = { name, email, password };
    // console.log(userData);

    setLoading(true);

    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      {loading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              required
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp; </p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
