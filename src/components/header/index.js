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
	constructor(props) {
		super(props);
		this.state={
			sideOpen: false,
		}
	}

	handleSideBar(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
		this.setState({
			sideOpen: !this.state.sideOpen,
		})
	}

	handleMainNav(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
	}

	render() {
		const Style = {
			isActive: {
				transform: 'translate3d(0,0,0)',
			},
			isClosed: {
				transform: 'translate3d(100%,0,0)',
			}
		}
		const sidebarOpen = this.state.sideOpen ? Style.isActive : Style.isClosed;


		return (
      <div>
				{console.log(this.state.sideOpen)}
  			<header className={style.MH}>
          <div className="dn flex-l items-center justify-between h2 f7 ph3 bb b--primary">
						<div className="lift primary">
							<p>
								<span className="mr3">
									<i className="icon icon-envelope mr2"></i>
									arief.walet@gmail.com
								</span>
								<span className="mr3">
									<i className="icon icon-whatsapp mr2"></i>
									082138388899
								</span>
								<span className="mr3">
									<i className="icon icon-phone mr2"></i>
									082138388899
								</span>
							</p>
						</div>
						<div className="right">
							<div className="f7">
								<div className="social-icon-top">
	  							<a className="link dib ml3 primary" href="">
	  								<i className="icon icon-facebook" />
	  							</a>
	  							<a className="link dib ml3 primary" href="">
	  								<i className="icon icon-twitter" />
	  							</a>
	  							<a className="link dib ml3 primary" href="">
	  								<i className="icon icon-instagram" />
	  							</a>
	  							<a className="link dib ml3 primary" href="">
	  								<i className="icon icon-youtube-play" />
	  							</a>
	  						</div>
							</div>
						</div>
					</div>
          <div className="flex items-center justify-between h3 f6 ph3">
							<div className="left">
								<Link className="link primary db" activeClassName={style.active} href="/">
									<img src="assets/logo-side.svg" alt="" className="h2"/>
								</Link>
							</div>
							<div className="right">
								<nav className="dn db-l fw4 f7 tracked">
	                <Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/">Home</Link>
	                <Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/profile">Profil</Link>
	                <Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/produk">Produk</Link>
									<Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/pemesanan">Pemesanan</Link>
	                <Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/article">Article</Link>
									<Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/agen">Agen Resmi</Link>
                  <Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/kontak">Kontak</Link>
									<Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/member">Member</Link>
									<Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/gallery">Galeri</Link>
									<Link onClick={this.handleMainNav.bind(this)} className="link gray dim dib ml3" activeClassName="current" href="/csr">CSR</Link>
	              </nav>
							</div>
							<a href="#" onClick={this.handleSideBar.bind(this)} className="link primary f2  dn-l bn bg-transparent"><i className="icon icon-menu"></i></a>
					</div>
        </header>

        <aside className={style.MS} style={sidebarOpen} onClick={this.handleSideBar.bind(this)}>
          <div className={style.MS_C} style={sidebarOpen}>
            <div className={style.MS_C_L}>
              <img src="assets/logo.svg" alt=""/>
            </div>
            <div className={style.MS_NAV}>
              <nav onClick={this.handleSideBar.bind(this)}>
                <Link onClick={this.handleSideBar.bind(this)} href="/">Home</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/profile">Profil</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/produk">Produk</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/article">Article</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/pemesanan">Pemesanan</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/kontak">Kontak</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/agen">Agen Resmi</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/member">Member</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/gallery">Galeri</Link>
                <Link onClick={this.handleSideBar.bind(this)} href="/csr">CSR</Link>
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
