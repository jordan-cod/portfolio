import { Link } from "react-router-dom";

export default function HeaderComponent() {
    return (
        <header>
            <nav>
                <Link to="/">
                    Gabriel <span>Jordan</span>
                </Link>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                </ul>
            </nav>
        </header>
    )
}
