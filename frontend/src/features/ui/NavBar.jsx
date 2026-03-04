export function LanguagesSelection() {
	return (
		<div className="lang">
			<section className="lang-sections">
				<header>
					<p>Norsk Bokmal</p>
				</header>
				<img
					className="h-country-flags"
					src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"
					alt="Flag of Norway"
				/>
			</section>
		</div>
	);
}
export function ProfileInformation({ username, role }) {
	return (
		<section className="h-profile-information">
			<img
				className="h-profile-image"
				src="https://avatars.githubusercontent.com/u/66054069"
				alt="Profile"
			/>

			<header>
				<p className="h-pname">{username}</p>
				<p className="h-pposition">{role || "Placeholder Position"}</p>{" "}
				{/* Will add a job title field in the users table */}
			</header>
		</section>
	);
}

export function NavBar({ user }) {
	return (
		<nav className="h-navbar">
			<div className="h-navbar-split">
				<ProfileInformation username={user.username} role={user.role} />
				<LanguagesSelection />
			</div>
		</nav>
	);
}
