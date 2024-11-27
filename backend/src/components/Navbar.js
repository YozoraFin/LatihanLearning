import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Navbar() {
	const MySwal = withReactContent(Swal)
	const navigate = useNavigate()

	const logOut = () => {
		MySwal.fire({
			icon: 'question',
			title: 'Apakah anda yakin?',
			text: 'Setelah ini anda akan diarahkan menuju halaman login',
            confirmButtonText: 'Ya',
			showCancelButton: true,
			cancelButtonText: 'Tidak'
		}).then((res) => {
			if(res.isConfirmed) {
				localStorage.clear()
				sessionStorage.clear()
				navigate('/')
			}
		})
	}

	return (
		<nav className="main-header navbar navbar-expand navbar-white navbar-light">
			<ul className="navbar-nav">
				<li key={'pushmenu'} className="nav-item">
					<a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
				</li>
				<li key={'home'} className="nav-item d-none d-sm-inline-block">
					<Link to={'/'} className='nav-link'>Beranda</Link>
				</li>
			</ul>

			<ul className="navbar-nav ml-auto">
				<li key={'expand'} className="nav-item">
					<a className="nav-link" data-widget="fullscreen" href="#" role="button">
						<i className="fas fa-expand-arrows-alt"></i>
					</a>
				</li>
				<li key={'logout'} className="nav-item">
					<a className="nav-link" role="button" onClick={logOut}>
						<i className="fas fa-power-off"></i>
					</a>
				</li>
			</ul>
		</nav>
	)
}