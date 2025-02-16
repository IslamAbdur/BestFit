"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import UploadPage from "./components/wardrobe.jsx";
import { login } from "@/app/api/auth.js";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginUser = async () => {
      try {
        const loggedInUser = await login("dom@wsu.edu", "password");
        console.log(loggedInUser);
        setUser(loggedInUser); // Store user in state
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };

    loginUser();
  }, []);

  return (
    <div className={styles.page}>
      <UploadPage />
      {user ? <p>Welcome, {user.email}</p> : <p>Logging in...</p>}
    </div>
  );
}
