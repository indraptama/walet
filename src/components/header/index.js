import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

// "Jl. Dr. Soetomo 41 Weleri – Kendal 51355,
// Jawa Tengah – Indonesia",
// +6282138388899",
// 085729486688
// arief.walet@gmail.com",
// Senin - Sabtu, Pukul 08.00 - 16.00 WIB"

export default class Header extends Component {
	render() {
		return (
			<header className="bg-white bb b--black-10">
				<div className="center bg-primary w-100 white">
					<div className="h2 mw9 ph3 center flex items-center justify-between">
						<nav className="f7">
							<div className="dib">
								<span className="mr3"><i className="icon icon-envelope" /> arief.walet@gmail.com </span>
                <span><i className="icon icon-phone" /> +6282138388899 </span>
							</div>
						</nav>
						<div className="social-icon-top">
							<a className="link dib mh2 white" href="">
								<i className="icon icon-facebook" />
							</a>
							<a className="link dib mh2 white" href="">
								<i className="icon icon-twitter" />
							</a>
							<a className="link dib mh2 white" href="">
								<i className="icon icon-instagram" />
							</a>
							<a className="link dib mh2 white" href="">
								<i className="icon icon-youtube-play" />
							</a>
						</div>
					</div>
				</div>
				<div className="h3 mw9 center flex items-center justify-between ph3">
					<Link className="ttu dib ph3 link near-black tracked f7 fw5" activeClassName={style.active} href="/">
						<img src="assets/logo.svg" alt="" className="h2"/>
					</Link>
					<nav className="dn db-l">
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/">Home</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/profile">Profil</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/produk">Produk</Link>
            <Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/article">Article</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/pemesanan">Pemesanan</Link>
            <Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/kontak">Kontak</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/agen">Agen Resmi</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/member">Member</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/gallery">Galeri</Link>
						<Link className="ttu dib ph3 link near-black tracked f7 fw6" activeClassName={style.active} href="/csr">CSR</Link>
					</nav>
					<div className="dn-l">
						<button className="bn flex items-center sans ttu tracked f7 fw5 pa2 bg-black white">
							Menu
						</button>
					</div>
				</div>
			</header>
		);
	}
}

// {/* <Link activeClassName={style.active} href="/">Home</Link>
// <Link activeClassName={style.active} href="/profile">Me</Link>
// <Link activeClassName={style.active} href="/profile/john">John</Link> */}
