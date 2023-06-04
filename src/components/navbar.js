import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>Event Genie Admin</li>

				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<li>Hello , {user.displayName}</li>
						<li>
							<button className="btn" onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
