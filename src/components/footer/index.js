import {h} from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

function MainFooter(props) {
  return(
    <footer className="bg-near-black">
    <div className="ph3">
      <div className="mw8 center pv5 cf f8 pr3 flex-l items-end">
        <div className="dib db-l fl w-100 w-third-l primary mb3 mb0-l">
          <img className="h3 tc mb3" src="assets/logo-white.svg" alt=""/>
          <p>Jl. Dr. Soetomo 41 Weleri – Kendal 51355<br />Jawa Tengah – Indonesia<br/><br/>
          <i className="icon icon-phone"/> 082138388899  -  <i className="icon icon-whatsapp"/> 085729486688<br/>arief.walet@gmail.com<br/><br/>(Senin - Sabtu, Pukul 08.00 - 16.00 WIB)</p>
        </div>

        <div className="dib db-l fl w-100 w-two-thirds-l mb3 mb0-l tr-l">
          <div className="flex-l items-center">
            <nav className="dib column-2s tr-l w-80-l">
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/">Home</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/profile">Profil</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/produk">Produk</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/article">Article</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/pemesanan">Pemesanan</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/kontak">Kontak</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/agen">Agen Resmi</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/member">Member</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/gallery">Galeri</Link>
              <Link className="db dib-l pv2 pv0-l pr3-l link primary tracked f7" activeClassName={style.active} href="/csr">CSR</Link>
            </nav>
            <div className="social-icon-top f4 w-20-l">
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
    </div>
      <div className="tl pv3 bg-black ph3 ph0-l white f7">
        <div className="mw8 center primary f8">
          <span>{`© ${new Date().getFullYear()} All Rights Reserved  |  duniawallet.com`}</span>

        </div>
      </div>
    </footer>
  )
}

export default MainFooter
