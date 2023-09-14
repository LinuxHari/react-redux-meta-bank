import { Link } from "react-router-dom"

const Content = () => {
  return (
    <section className="home">
        <div className="container">
            <h2>Your trusted partner in finance.</h2>
            <Link to="/login" className="link">Open an Account</Link>
        </div>
    </section>
  )
}

export default Content