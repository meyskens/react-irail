import React, { Component } from 'react';
import Axios from 'axios'
import Moment from 'react-moment';
import './css/liveboard.css'

const messages = {
    "nl": {
        "canceled": "afgeschaft",
    },
    "en": {
        "canceled": "canceled",
    },
    "fr": {
        "canceled": "annulé",
    },
}

class Liveboard extends Component {
    static defaultProps = {
        lang: 'en'
     };

    constructor(props) {
        super(props)

        this.state = { departures: [], stationName: props.station }

        this.fetchInfo = this.fetchInfo.bind(this)
        this.onInfo = this.onInfo.bind(this)
    }

    componentDidMount() {
        this.fetchInfo()
    }

    fetchInfo() {
        Axios.get("https://api.irail.be/liveboard/", { 
            params: {
                format: "json",
                station: this.props.station,
                time: this.props.time,
                date: this.props.date,
                lang: this.props.lang,
            } 
        }).then(this.onInfo)
    }

    onInfo(res) {
        this.setState({ departures: res.data.departures.departure, stationName: res.data.stationinfo.name })
    }

    render() {
        const rows = this.state.departures.slice(0,(this.props.max || this.state.departures.length)).map((i,j) => {
            return (
                <tr key={j}>
                    <td className="departure-time">
                        <Moment format="HH:mm" unix>{i.time}</Moment>
                    </td>
                    <td className="delay">
                        {i.delay > 0 ? `+${i.delay}` : ""}
                        {i.canceled > 0 ? `${messages[this.props.lang].canceled}` : ""}
                    </td>
                    <td className="vehicle">
                        {i.vehicle.split(".").slice(-1).pop()}
                    </td>
                    <td className="station">
                        {i.stationinfo.name}
                    </td>
                    <td className="platform">{i.platform}</td>
                </tr>)
        })

        return (
            <div>
                <h2>{this.state.stationName}</h2>
                <table>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}
export default Liveboard;