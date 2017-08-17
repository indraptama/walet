import {h, Component} from 'preact';
import fetch from "unfetch";
import ProductCard from '../../components/ProductCard';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    fetch('assets/data/product.json')
      .then(resp => resp.json())
      .then(respData => {
        this.setState({
          data: respData.product,
        })
      })
      .catch(err => console.error(err));


  }
  render() {
    const dataBook= this.state.data.books;
    const dataAudio= this.state.data.audios;
    const dataAudioSystem= this.state.data.audiosystem;



    const test = dataBook;
    const Data = this.state.data;
    const renderProduct = Object.keys(Data).
      map(key => {
        return (
          <section className="pv3 pv4-l ph3-l b--primary relative">
            <div className="mw8 center bg-white">
              <h2 className="f7 fw6 ttu tl tracked primary mb2 relative z-2 pl3 pl0-l">
                {Data[key].title}
              </h2>
              <p className="ph3 ph0-l mb3 measure-wide f5-l serif">{Data[key].desc}</p>
            <div className="overflow-x-scroll overflow-x-visible-l nowrap ws-normal-l bg-near-white bg-white-l pv3">
              <div className="cf ml3 ml0-l">
                  {Data[key].products.map(product => (
                    <div className="dib fl-l w5 w-third-l pr3">
                      <ProductCard image={product.images}
                        title={product.title}
                        price={product.price}/>
                      </div>


                  ))}



              </div>
            </div>
          </div>
          </section>
        )
      });



    return (
    <div className="pt5 pt6-l">
      {renderProduct}
    </div>);
  }
}
