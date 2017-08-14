import React from 'react';
import { Link } from 'preact-router/match';
import style from './style';

// "Jl. Dr. Soetomo 41 Weleri – Kendal 51355,
// Jawa Tengah – Indonesia",
// +6282138388899",
// 085729486688
// arief.walet@gmail.com",
// Senin - Sabtu, Pukul 08.00 - 16.00 WIB"

export default class Header extends React.Component {
	render() {
		return (
      <div>
  			<header className={style.MH}>
          <div className={style.MH_CS}></div>
          <div className={style.MH_CB}></div>
        </header>
        <aside className={style.MS}>
          <div className={style.MS_C}>
            <div className={style.MS_C_L}>
              <img src="assets/logo.svg" alt=""/>
            </div>
            <div className={style.MS_NAV}>
              <nav>
                <Link activeClassName={style.active} href="/">Home</Link>
                <Link activeClassName={style.active} href="/profile">Profil</Link>
                <Link activeClassName={style.active} href="/produk">Produk</Link>
                <Link activeClassName={style.active} href="/article">Article</Link>
                <Link activeClassName={style.active} href="/pemesanan">Pemesanan</Link>
                <Link activeClassName={style.active} href="/kontak">Kontak</Link>
                <Link activeClassName={style.active} href="/agen">Agen Resmi</Link>
                <Link activeClassName={style.active} href="/member">Member</Link>
                <Link activeClassName={style.active} href="/gallery">Galeri</Link>
                <Link activeClassName={style.active} href="/csr">CSR</Link>
              </nav>
            </div>


          </div>
        </aside>
      </div>
		);
	}
}

// {/* <Link activeClassName={style.active} href="/">Home</Link>
// <Link activeClassName={style.active} href="/profile">Me</Link>
// <Link activeClassName={style.active} href="/profile/john">John</Link> */}
