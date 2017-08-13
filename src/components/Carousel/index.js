import 'wallop/css/wallop.css';
import './theme.css';


import {h, Component } from 'preact'


// Dependencies require Wallop.js
import Wallop from 'wallop'; //slider library
import wallopInit from './helper.js';
import fetch from 'unfetch';


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:[],
      loading: true
    }
  }

  // init Wallops

  componentDidMount() {
    fetch(this.props.Data)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        this.setState({
          image: data.image,
          loading:false
        })
      })
      .then(() => {
        setTimeout(() => {
          wallopInit();
        },500)
      })
      .catch(err => console.error(err));
  } //componentDidMount



  render() {
    const test = this.state.name;
    const images = this.state.image;
    const mapImage = images.map(image => <ImageCarouselItem imgLink={image} />);
    const pageination = images.map(image => <WallopDot imgLink={image} />);


    return (
      <div className="Wallop">
        <div className="Wallop-list">
          {mapImage}
        </div>
        <div className="Wallop-pagination">
          {pageination}
        </div>
        <button class="Wallop-buttonPrevious">Previous</button>
        <button class="Wallop-buttonNext">Next</button>
      </div>
    ); //return
  } //render function
};

const ImageCarouselItem = ({imgLink,current}) => (
  <div className="Wallop-item">
    <img src={imgLink} />
  </div>
);

const WallopDot= ({imgLink}) => (
    <a href="#" className="Wallop-dot">
      <img src={imgLink} />
    </a>
);
