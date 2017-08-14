import {h, Component} from 'preact';
import fetch from 'unfetch';
import AgenCard from '../../components/AgenCard';
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
      <div className={style.AP}>
        <section className={style.AP_Search}>
          <div className={style.AP_SearchContainer}>
            <p>Dapatkan Produk-produk asli kami hanya di agen-agen resmi di dekat anda</p>
          </div>
        </section>
        <section className={style.AP_Section}>
            {agens.map(agen => {
              const address = `${agen.city} - ${agen.provice}`;
              return(
                <div className={style.APL}>
                  <AgenCard name={agen.name} address={address} avatar={agen.avatar} contact={agen.contact}>
                  </AgenCard>
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
