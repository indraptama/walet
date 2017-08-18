import {h, Component} from 'preact';
import fetch from 'unfetch';
import style from './style';

// Import Components
import NewsFeatured from '../../components/NewsFeatured';
import NewsThumb from '../../components/NewsThumb';
import SubscribeBox from '../../components/SubscribeBox';
import NewsList from '../../components/NewsList';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state= {
      dataArticle: [],
      headline:{},
      mostViewer:[],
      latest:[],

    }
  }

  componentWillMount() {
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
          dataArticle: aView,
          headline: respData["01"],
        })
      })
  }

  render() {
    // Render 5 latest post

    const LatestNews = this.state.dataArticle.slice(0,5).map(key => {
      return (
        <div className="fl w-100 w-third-l pa3 mb5-l">
          <NewsList
            title={key.title}
            imageThumb="assets/images/sarang.jpg"
            postDate={key.date}
            viewer={key.views}
            postLink="post"
            preview={key.preview}
           />
        </div>
      )
    })

    const MostView = this.state.dataArticle.slice(0,5).map(key => {
      return (
        <li className="dib fl w-100 pv2 mr3-l bb b--black-10">
          <NewsThumb
            title={key.title}
            imageThumb="assets/images/news1-s.jpg"
            postDate={key.date}
            viewer={key.views}
            postLink="post"
           />
        </li>
      )
    })

    // PRact Render
    return (
      <div className="pt5 pt5-l">
        <section className="bg-primary ph3">
          <div className="flex items-center mw8 center vh-50">
            <div className="measure-wide white">
              <h2 className="f3 f2-l fw6 white lh-title">Artikel, Tips & Trick</h2>
              <p className="serif f5-l">Kumpulan berita terkini, Tips & Trick dan tanya jawab seputar dunia sarang burung walet</p>
            </div>
          </div>
        </section>
        <div className="ft--4-l">
          <section className="mb4 mb5-l  ph3-l">
            <div className="mw8 center">
              <NewsFeatured image="assets/images/sarang.jpg"
                title="Sekat Gantung apa Sekat Full?"
                preview="Jika gedung walet anda ingin produktif, maka lakukan pengaturan …"/>
            </div>
          </section>

          <section className="mb4 mb0-l ph3-l ">
            <div className="mw8 center cf">
              <div className="fl w-100 w-third-l">
                <h4 className="f5-l primary ttu pa3 ph0-l tracked fw6">Latest News</h4>
              </div>
              {LatestNews}
            </div>
          </section>
          <div className="mw8 center cf ph3 ph5-l tc mb3">
            <button className="bg-primary white w-100 w-third-l tc pa3 ttu f7 bn fw6">Read More</button>
          </div>
        </div>
      </div>
    );
  }
}
