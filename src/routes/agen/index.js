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
    return (
      <div>
        <div className="pt5" />
        <section className="bg-primary ph3">
          <div className="flex items-center mw8 center vh-50">
            <div className="measure-wide white">
              <h2 className="f3 f2-l fw6 white">Agen Resmi</h2>
              <p className="serif f5-l">Dapatkan produk-produk kami yang asli hanya di Agen-agen resmi terdekat di kota anda.</p>
            </div>
          </div>
        </section>
        <section className="flex flex-wrap mw8 center">
            {agens.map(agen => {
              return (
                <div className="w-100 w-25-l pa2">
                  <ListToCard name={agen.name}
                    avatar={agen.avatar}
                    city={agen.city}
                    contact={agen.contact}
                    prov={agen.provice}/>
                </div>
              )
            })}

        </section>
      </div>);
  }
}
// "name": "Akhmad Baihaqi",
// "address": "Jl. Pelita I No. 4 RT. 18 Kel. Kuala Pembuang 2",
// "city": "Seruyan ",
// "provice": "Kalimantan Tengah",
// "contact": "08125075650,085754953112"
