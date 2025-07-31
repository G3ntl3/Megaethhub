import React, { createContext, useEffect, useState } from "react";
import { auth, provider } from "../Firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

//  Named export
export const AuthContext = createContext();
import { useContext } from "react";
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("megaeth-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginWithTwitter = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      setUser(userData);
      localStorage.setItem("megaeth-user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("megaeth-user");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("megaeth-user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("megaeth-user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithTwitter, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
