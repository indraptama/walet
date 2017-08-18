import {h, Component} from 'preact';
import fetch from 'unfetch';
import AgenCard from '../../components/AgenCard';
import ListToCard from '../../components/ListToCard';
import style from './style';

export default class Agen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHead: {},
      dataAgen: []
    }
  }

  componentDidMount() {
    fetch('assets/data/about.json')
      .then(resp => resp.json())
      .then(respData => {
        const dataAgent = respData.office.agent
        let agenArray = []
        const parsingDataAgent =
          Object.keys(respData.office.agent)
          .map(key => {
            agenArray.push(dataAgent[key])
          })
        this.setState({
          dataHead: respData.office.head,
          dataAgen: agenArray,
        })
      })
  }

  render() {
    const agens = this.state.dataAgen;
    const agenSortProv = agens.reduce(function(r,a) {
      r[a.provice] = r[a.provice] || [];
      r[a.provice].push(a);
      return r
    }, Object.create(null))

    console.log(agenSortProv);



    // result = cars.reduce(function (r, a) {
    //     r[a.make] = r[a.make] || [];
    //     r[a.make].push(a);
    //     return r;
    // }, Object.create(null));

    // console.log(result);


    // const agenProv = agens.map(agen => {
    //   agenSortProv[agen.provice] = agen;
    //   console.log(agenSortProv);
    // })

    const agenRender = Object.keys(agenSortProv).sort().map(prov => {
      return (
        <section className="mw8 center">
          <h4 className="f7 ttc fw6 primary ph2 pv2 bg-near-white bg-white-l">{prov}</h4>
          <div className="flex-l flex-wrap">
            {(agenSortProv[prov]).map(agen => {
              return (
                <div className="w-100 w-20-l pa2">
                  <ListToCard name={agen.name}
                    avatar={agen.avatar}
                    city={agen.city}
                    streetAddress={agen.address}
                    contact={agen.contact}
                    prov={agen.provice}/>
                </div>
              )
            })}
          </div>
        </section>
      )
    })


    return (
      <div>
        <div className="pt5" />
        <section className="bg-primary ph3 mb3">
          <div className="flex items-center mw8 center vh-50">
            <div className="measure-wide white">
              <h2 className="f3 f2-l fw6 white">Agen Resmi</h2>
              <p className="serif f5-l">Dapatkan produk-produk kami yang asli hanya di Agen-agen resmi terdekat di kota anda.</p>
            </div>
          </div>
        </section>

        {agenRender}
      </div>);
  }
}
// "name": "Akhmad Baihaqi",
// "address": "Jl. Pelita I No. 4 RT. 18 Kel. Kuala Pembuang 2",
// "city": "Seruyan ",
// "provice": "Kalimantan Tengah",
// "contact": "08125075650,085754953112"
