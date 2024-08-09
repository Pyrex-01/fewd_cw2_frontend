import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="nav-box">
                <nav className="navbar navbar-expand-lg bg-white justify-content-between px-5 shadow-sm sticky-top">
                    <div class="container-fluid">

                        <Link className="navbar-brand" to="/home">Representative Finder</Link>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
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
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;