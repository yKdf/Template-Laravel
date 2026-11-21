import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <section className="card">
            <h1>404</h1>
            <p>Página não encontrada.</p>
            <Link to="/">Voltar</Link>
        </section>
    );
}
