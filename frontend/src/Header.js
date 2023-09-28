function Header() {
	return (
		<div className="card">
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img
							src="https://taskmasterstore.com/cdn/shop/files/STAMP-with-Alpha_180x180.png"
							alt="taskmaster logo"
						/>
						TaskMaster
					</a>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a
									className="nav-link active"
									aria-current="page"
									href="#"
								>
									Home
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Header;
