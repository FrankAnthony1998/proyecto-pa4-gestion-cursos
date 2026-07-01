import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Cursos from "./pages/Cursos";
import Estudiante from "./pages/Estudiante";
import CourseDetail from "./pages/CourseDetail";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route
                        path="/cursos"
                        element={
                            <PrivateRoute>
                                <Cursos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cursos/:id"
                        element={
                            <PrivateRoute>
                                <CourseDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/estudiante"
                        element={
                            <PrivateRoute>
                                <Estudiante />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
