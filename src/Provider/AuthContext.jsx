import { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase.config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./Context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Backend  user data fetch
          const res = await fetch(`https://course-master-server.onrender.com/user?email=${currentUser.email}`);
          const data = await res.json();
          if (data.success) {
            // Firebase user + backend role merge
            setUser({ ...currentUser, role: data.user.role });
          } else {
            setUser({ ...currentUser, role: "student" }); // default role
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setUser({ ...currentUser, role: "student" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth functions
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
