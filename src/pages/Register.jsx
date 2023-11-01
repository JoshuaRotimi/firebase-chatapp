import addImage from "../images/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (e) {
      setError(true);
    }
  };
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Dev Chat</span>
        <span className={"title"}>Register</span>
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder={"Display Name"} />
          <input type="email" placeholder={"email"} />
          <input type="password" placeholder={"password"} />
          <input style={{ display: "none" }} type="file" id={"file"} />
          <label htmlFor="file">
            <img src={addImage} alt="Add Avi" />
            <span>Add Avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        {error && <span>Something went wrong..</span>}
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
