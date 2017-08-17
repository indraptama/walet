import {h,Component} from 'preact';
import fetch from 'unfetch';

import OwnerPicture from '../../components/OwnerPicture';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: "",
    }
  }

  componentWillMount() {
    fetch('assets/data/about.json')
      .then(resp => resp.json())
      .then(respData => {
        let article = respData.profile.split('\n').map(p => {
          return (
            <p className="mb4">{p}</p>
          )
        });
        console.log(article)
        this.setState({
          content: article,
        })
      })
  }

  render() {
    return (
      <div className="mt4 mt5-l">
        <section className="bg-primary ph3">
          <div className="flex items-center mw8 center vh-50">
            <div className="measure-wide white">
              <h2 className="f3 f2-l fw6 white">Drs. Arief Budiman</h2>
              <p className="serif f5-l">Konsultan Walet Asia Tenggara</p>
            </div>
          </div>
        </section>
        <section className="cf mw8 center ph3 ph4-l pv4 bg-white-l ft--4-l elevation-10">
          <div className="fl dib w-100 w-40-l">
            <div className="center w-40 w-100-l mb3 mb0-l">
              <OwnerPicture pictures="assets/images/3-1.jpg" />
            </div>
          </div>
          <article className="fl dib w-100 w-60-l pl4-l lh-copy">
            <p>{this.state.content}</p>
          </article>
        </section>
      </div>);
  }
}
