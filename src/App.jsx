import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatorPage from "./Pages/Creator";

import { AuthContext } from "./context/AuthContext";
import ContentList from "./components/ContentList";
import "./App.css"

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContentList />} />
        {/* Protect your CreatorPage */}
        <Route
          path="/creator"
          element={user ? <CreatorPage user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
