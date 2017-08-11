import { h, Component } from 'preact';
import AgenCard from '../../components/AgenCard';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<AgenCard name="Indra Pratama Putra" address="Jl. Pangeran kuning gang rukun no. 39 Tanjung Puri Sintang"/>
			</div>
		);
	}
}
