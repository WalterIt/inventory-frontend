import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function getPassword(e) {
    e.preventDefault();
    // console.log(formData);
    if (!email) {
      return toast.error("Email field is required!");
    }
    if (!validateEmail(email)) {
      return toast.error("Please, enter a valid Email!");
    }

    const userData = { email };
    // console.log(userData);

    await forgotPassword(userData);
    // console.log(data);
    setEmail("");
    // navigate("/dashboard");
    // setLoading(false);
  }
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={getPassword}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
