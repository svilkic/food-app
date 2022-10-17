import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "/util/AuthContext";
import { SignIn } from "/util/firebase.config";
import styles from "/styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const { currentUser, login } = useAuth();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    try {
      const token = await SignIn(username, password);
      console.log(token);
      router.push("/admin");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, []);

  if (!currentUser)
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Admin Dashboard</h1>
          <input
            placeholder='username'
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder='password'
            type='password'
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} className={styles.button}>
            Sign In
          </button>
          {error && <span className={styles.error}>Wrong Credentials!</span>}
        </div>
      </div>
    );
  else return <></>;
}
