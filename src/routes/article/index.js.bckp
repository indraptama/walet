import {h, Component} from 'preact';
import fetch from 'unfetch';
import style from './style';

// Import Components
import HeadlineNews from '../../components/HeadlineNews';
import NewsThumb from '../../components/NewsThumb';
import SubscribeBox from '../../components/SubscribeBox';

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
    const HighlightsNews = this.state.dataArticle.slice(0,2).map(key => {
      return (
        <div className="dib fl w-100 w-50-l mr3-l">
          <NewsThumb
            title={key.title}
            imageThumb="assets/images/news1.jpg"
            postDate={key.date}
            viewer={key.views}
            postLink="post"
            reviews={key.preview}
           />
        </div>
      )
    })

    const LatestNews = this.state.dataArticle.map(key => {
      return (
        <li className={style.LNW_li}>
          <NewsThumb
            title={key.title}
            imageThumb="assets/images/news1.jpg"
            postDate={key.date}
            viewer={key.views}
            postLink="post"
            reviews={key.preview}
           />
        </li>
      )
    })

    const MostView = this.state.dataArticle.slice(0,5).map(key => {
      return (
        <li className="dib fl w-100 pv2 mr3-l bb b--black-10">
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

    // PRact Render
    return (
      <div className={style.AP}>
        <div className="mw8 center mt4">
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

        <div className="cf mw8 center">
          <div className="dib fl w-100 w-two-thirds-l mb4 mb0-l">
            <h3 className={style.T_s}>Latest News</h3>
            <ul className="LNW">
              {LatestNews}
            </ul>
          </div>
          <div className="dib fl w-100 w-third-l">
            <div className="mb4">
              <h3 className={style.T_s}>Follow Us</h3>
              <div className="social-icon-top">
  							<a className="link dib mr3 f3 black" href="">
  								<i className="icon icon-facebook" />
  							</a>
  							<a className="link dib mr3 f3 black" href="">
  								<i className="icon icon-twitter" />
  							</a>
  							<a className="link dib mr3 f3 black" href="">
  								<i className="icon icon-instagram" />
  							</a>
  							<a className="link dib mr3 f3 black" href="">
  								<i className="icon icon-youtube-play" />
  							</a>
  						</div>
            </div>

            <div className="mb4">
              <SubscribeBox />
            </div>

            <div className="mb4">
              <h3 className={style.T_s}>Artikel Populer</h3>
              <ul>{MostView}</ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
