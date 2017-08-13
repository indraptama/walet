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
      <div className="">
        <section className="vh-25 vh-50-l cover z-1" style={`background:url("assets/images/sarang.jpg") center`}>

        </section>
        <section className="mw8 center bg-white ft--3-l pa4 z-3 cf bt bw2 b--primary">
          <div className="fl dib w-100 w-40-l">
            <div className="mb4 center w-40 w-100-l">
              <OwnerPicture pictures="assets/images/3-1.jpg" />
            </div>
          </div>
          <article className="fl dib lh-copy w-100 w-60-l pl4-l">
            <p>{this.state.content}</p>
          </article>
        </section>
      </div>);
  }
}
