import { h, Component } from 'preact';
import fetch from 'unfetch';
import NewsThumb from '../../components/NewsThumb';
import HeadlineNews from '../../components/HeadlineNews';
import ProductThumb from '../../components/ProductThumb';
import MessageBox from '../../components/MessageBox';
import OwnerPicture from '../../components/OwnerPicture';
import style from './style';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      about:"",
      news:[],
      headline:{},
      address:"",

    }
  }

  componentWillMount() {
    fetch('assets/data/about.json')
      .then(resp => resp.json())
      .then(respData => {
        this.setState({
          about: respData.about,
          address: respData.office.head,
        })
        console.log(this.state.address);
      })

    fetch('/assets/data/article-s.json')
      .then(resp => resp.json())
      .then(respData => {
        let aView =[]
        const arrayViewer = Object
          .keys(respData)
          .map(key => {
            aView.push(respData[key])
          })
        this.setState({
          news: aView,
          headline: respData["01"],
        })
      })
  }

	render() {
    const LatestNews = this.state.news.slice(0,3).map(key => {
      return (
        <li className="dib fl w-100 mb2 mr3-l">
          <NewsThumb
            title={key.title}
            imageThumb="assets/images/news1.jpg"
            postDate={key.date}
            viewer={key.views}
            postLink="post"
           />
        </li>
      )
    })

    const address = this.state.address;

    // PREACT RENDER
		return (
			<div>
				<section className="Hero mw9 center vh-75 bg-primary">
        </section>

        <sction>
          <div className="cf center mw8 ph3 pv4 pv0-l">
            <div className="fl dib w-100 w-30-l">
              <div className="w-40 w-100-l center mb3 pr4-l ft--3-l">
                <OwnerPicture pictures="assets/images/3-1.jpg" />
              </div>
            </div>
            <div className="fl dib w-100 w-70-l pv4-l f5-l lh-copy">
                <h3 className="ttu f6 fw6 tracked primary mb3 tc tl-l">Tentang Kami</h3>
                {this.state.about}
            </div>
          </div>
        </sction>

        <section>
          <div className="cf center mw8 ph3 pv4 pv4-l">
            <h3 className="ttu f6 fw6 tracked primary mb3">Produk kami</h3>
            <div className="overflow-x-scroll overflow-hidden-l">
              <div className="dt dt--fixed">
                <div className="dtc w5 w-third-l pb3 pr3">
                  <ProductThumb
                    title="Paket Suara Walet Original"
                    path="/product"
                    imageThumb="assets/images/paket-suara.jpg" />
                </div>
                <div className="dtc w5 w-third-l pb3 pr3">
                  <ProductThumb
                    title="Walet Audio System (WAS)"
                    path="/product"
                    imageThumb="assets/images/walet-audio-s.jpg" />
                </div>
                <div className="dtc w5 w-third-l pb3 pr3">
                  <ProductThumb
                    title="Buku Panduan Budidaya Walet"
                    path="/product"
                    imageThumb="assets/images/book.jpg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="cf center mw8 ph3 pv4 pv4-l">
            <div className="fl dib w-100 w-third-l mb4 pr3-l">
              <h3 className="ttu f6 fw6 tracked primary mb3">Highlight</h3>
              <HeadlineNews
                  title={this.state.headline.title}
                  imageThumb="assets/images/news1.jpg"
                  postDate={this.state.headline.date}
                  viewer={this.state.headline.views}
                  postLink="post"
                  link="#"
                  reviews={this.state.headline.preview}
                 />
            </div>
            <div className="fl dib w-100 w-third-l mb4 pr3-l">
              <h3 className="ttu f6 fw6 tracked primary mb3">Berita terbaru</h3>
              <ul>{LatestNews}</ul>
            </div>
            <div className="fl dib w-100 w-third-l mb4 pr3-l">
              <h3 className="ttu f6 fw6 tracked primary mb3">from our twitter</h3>
              <div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="cf center mw8 ph3 pv4 pv4-l">
            <h3 className="ttu f6 fw6 tracked primary mb3">Kontak Kami</h3>
            <div className="db cf flex-l items-center bg-primary-l">
              <div className="fl dib w-100 w-50-l lh-copy v-mid pa5-l white-l mb4 mb0-l">
                <div className="w4 mb3 center">
                  <img src="assets/logo.svg" alt=""/>
                </div>
                <ul>
                  <li className="mb2">{address.address}</li>
                  <li className="mb2"><i className="icon icon-phone mr2 dib"/>{address.phone}</li>
                  <li className="mb2"><i className="icon icon-whatsapp mr2 dib"/>{address.whatsapp}</li>
                  <li className="mb2"><i className="icon icon-envelope mr2 dib"/>{address.email}</li>
                  <li className="mb2">{`Jam Operasional : ${address.operationTime}`}</li>
                </ul>
              </div>
              <div className="fl dib w-100 w-50-l v-mid">
                <div className="mw6 center">
                  <div className="mw6 ba b--black-10 shadow-3">
                    <MessageBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
		);
	}
}
