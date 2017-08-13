import {h,Component} from 'preact';
import twitterFetcher from './twitterFetcher';



export default class TwitFetch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var config1 = {
      "id": '347099293930377217',
      "maxTweets": 6,
      "enableLinks": true,
      "showUser": true,
      "showTime": true,
      "lang": 'en'
    };

    // twitterFetcher.fetch(config1);
    console.log(twitterFetcher.fetch(config1))
  }

  render() {
    return (<div>TwitFetch</div>);
  }
}
