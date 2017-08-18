import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import MainFooter from './footer';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Article from '../routes/article';
import Agen from '../routes/agen';
import Product from '../routes/product';
import Kontak from '../routes/kontak';
import ErrorPage from '../routes/errorpage';


// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
          <Article path="/article/" />
          <Agen path="/agen/" />
          <Product path="/produk/" />
          <Kontak path="/kontak/" />
          <ErrorPage path="/gallery/"/>
          <ErrorPage path="/csr/"/>
          <ErrorPage path="/member/"/>
					<ErrorPage path="/pemesanan/"/>
					<Profile path="/profile/:user" />
				</Router>
				<MainFooter />
			</div>
		);
	}
}
