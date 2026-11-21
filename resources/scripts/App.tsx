import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
    return (
        <div className="app-shell">
            <header className="header">
                <Link to="/" className="brand">
                    Site Template
                </Link>
                <nav>
                    <Link to="/">Início</Link>
                </nav>
            </header>
            <main className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}
