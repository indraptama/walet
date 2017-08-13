import {h, Component} from 'preact';
import fetch from 'unfetch';
import AgenCard from '../../components/AgenCard';

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
      <div className="Agen bg-near-white">

        <section>
        </section>
        <section className="mw8 center ph3 flex-l flex-wrap justify-center">

            {agens.map(agen => {
              const address = `${agen.address} ${agen.city}\n${agen.provice}\n${agen.contact}`;
              return(
                <div className="flex ma1"><AgenCard name={agen.name} address={address}></AgenCard></div>
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
