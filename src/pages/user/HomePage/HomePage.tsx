import { Link } from "react-router-dom";
import style from '@/components/common/Header/style.module.css'

function HomePage() {

  return (
    <>
      <header className={style.header}>
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
      <h1>App tsx</h1>
    </>
  )
}

export default HomePage
