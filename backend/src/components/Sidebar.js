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
						<li key={'prakerin'} className="nav-item">
							<Link to={'/admin/prakerin'} className={location.pathname.indexOf('/prakerin') > -1 ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-briefcase"></i>
								<p>
									Prakerin
								</p>
							</Link>
						</li>
						<li key={'laporan'} className="nav-item">
							<a className={location.pathname.indexOf('/laporan-siswa') + location.pathname.indexOf('/laporan-pembimbing') > -2 ? 'nav-link active' : 'nav-link'}>
								<i className="nav-icon fas fa-envelope"></i>
								<p>
									Laporan
									<i className="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li key={'laporan-siswa'} className="nav-item">
									<Link to={'/admin/laporan-siswa'} className={location.pathname.indexOf('/laporan-siswa') > -1 ? "nav-link active" : "nav-link"}>
										<i className="fas fa-children nav-icon"></i>
										<p>Laporan Siswa</p>
									</Link>
								</li>
								<li key={'laporan-pembimbing'} className="nav-item">
									<Link to={'/admin/laporan-pembimbing'} className={location.pathname.indexOf('/laporan-pembimbing') > -1 ? 'nav-link active' : 'nav-link'}>
										<i className="fas fa-user nav-icon"></i>
										<p>Laporan Pembimbing</p>
									</Link>
								</li>
							</ul>
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
								<li key={'siswa'} className="nav-item">
									<Link to={'/admin/siswa'} className={location.pathname.indexOf('/siswa') > -1 ? "nav-link active" : "nav-link"}>
										<i className="far fa-circle nav-icon"></i>
										<p>Siswa</p>
									</Link>
								</li>
								<li key={'kelas'} className="nav-item">
									<Link to={'/admin/kelas'} className={location.pathname.indexOf('/kelas') > -1 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Kelas</p>
									</Link>
								</li>
								<li key={'perusahaan'} className="nav-item">
									<Link to={'/admin/perusahaan'} className={location.pathname.indexOf('/perusahaan') + location.pathname.indexOf('/bidang') > -2 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Perusahaan</p>
									</Link>
								</li>
								<li key={'pembimbing-perusahaan'} className="nav-item">
									<Link to={'/admin/pembimbing-perusahaan'} className={location.pathname.indexOf('/pembimbing-perusahaan') > -1 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Pembimbing Perusahaan</p>
									</Link>
								</li>
								<li key={'pembimbing-sekolah'} className="nav-item">
									<Link to={'/admin/pembimbing-sekolah'} className={location.pathname.indexOf('/pembimbing-sekolah') > -1 ? 'nav-link active' : 'nav-link'}>
										<i className="far fa-circle nav-icon"></i>
										<p>Pembimbing Sekolah</p>
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