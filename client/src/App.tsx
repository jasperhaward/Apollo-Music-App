import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Login from "./pages/Login/LoginPage";

function App() {
    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
