import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      setError(true);
    }
  };
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"title"}>Dev Chat</span>
        <span className={"logo"}>Register</span>
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder={"email"} />
          <input type="text" placeholder={"password"} />
          <button>Sign in</button>
          {error && <span>Something went wrong..</span>}
        </form>
        <p>
          You don't have an account? <Link to={"/register"}>Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
