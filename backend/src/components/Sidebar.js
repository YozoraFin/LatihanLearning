import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
	const location = useLocation()

	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed">
			<Link to="../admin" className="brand-link">
				<span className="brand-text font-weight-light ml-2">Admin {"Latihan Learning"}</span>
			</Link>

			<div className="sidebar">
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="bg-white d-flex align-items-center justify-content-center p-2 rounded-circle">
						<i className="fa fa-user"></i>
					</div>
					<div className="info">
						<Link to={'/admin/user'} className="d-block">{"Ageng Pratama"}</Link>
					</div>
				</div>

				<nav className="mt-2">
					<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
						<li key={'admin'} className="nav-item">
							<Link to="/admin" className={location.pathname === "/admin" ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-tachometer-alt"></i>
								<p>
									Dashboard
								</p>
							</Link>
						</li>
						<li key={'user'} className="nav-item">
							<Link to={'/admin/user'} className={location.pathname.indexOf('/user') > -1 ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-briefcase"></i>
								<p>
									User
								</p>
							</Link>
						</li>
						<li key={'dataa'} className="nav-item">
							<a className={location.pathname.indexOf('/siswa') + location.pathname.indexOf('/perusahaan') + location.pathname.indexOf('/pembimbing-perusahaan') + location.pathname.indexOf('/pembimbing-sekolah') + location.pathname.indexOf('/kelas') + location.pathname.indexOf('/bidang') > -6 ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-table"></i>
								<p>
									Data
									<i className="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li key={'produk'} className="nav-item">
									<Link to={'/admin/produk'} className={location.pathname.indexOf('/produk') > -1 ? "nav-link active" : "nav-link"}>
										<i className="far fa-circle nav-icon"></i>
										<p>Produk</p>
									</Link>
								</li>
								<li key={'kategori'} className="nav-item">
									<Link to={'/admin/kategori'} className={location.pathname.indexOf('/kategori') > -1 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Kategori</p>
									</Link>
								</li>
								<li key={'sub-kategori'} className="nav-item">
									<Link to={'/admin/sub-kategori'} className={location.pathname.indexOf('/sub-kategori') > -2 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Sub-kategori</p>
									</Link>
								</li>
							</ul>
						</li>
						<li key={'siteconfig'} className="nav-item">
							<Link to={'/admin/siteconfig'} className={location.pathname.indexOf('/siteconfig') > -1 ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-gear"></i>
								<p>
									Siteconfig
								</p>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	)
}