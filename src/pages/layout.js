import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="nav-box">
                <nav className="container-fluid navbar navbar-expand-sm bg-white justify-content-between px-5 shadow-sm ">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link fs-4 ms-3" to="/home">Scottish Representatives</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ">

                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sp">Scottish Parliament</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/up">UK Parliament</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/info">Parliament Info</Link>
                        </li>

                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;