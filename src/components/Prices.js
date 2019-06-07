import React, {Component} from 'react';

class Prices extends Component {

  renderDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  render() {
    const daysNumber = this.props.days.length;
    const lastDay = this.props.days[daysNumber - 1] + 86400000;

    return(
      <div className="list" id={this.props.id} >
        <p style={{textAlign: 'center'}}>Days: {daysNumber}</p>
        <p style={{textAlign: "center"}}>from {this.renderDate(this.props.days[0])}</p>
        <p style={{textAlign: "center"}}>to {this.renderDate(lastDay)}</p>
        <input id="ad" type="number" value={this.props.value.ad} onChange={this.props.updatePrices}/>
        <input id="ad34" type="number" value={this.props.value.ad34} onChange={this.props.updatePrices}/>
        <input id="chd3" type="number" value={this.props.value.chd3} onChange={this.props.updatePrices}/>
        <input id="chd4" type="number" value={this.props.value.chd4} onChange={this.props.updatePrices}/>
        <input id="inf" type="number" value={this.props.value.inf} onChange={this.props.updatePrices}/>
        <input id="animal" type="number" value={this.props.value.animal} onChange={this.props.updatePrices}/>
        <input id="culla" type="number" value={this.props.value.culla} onChange={this.props.updatePrices}/>
        <input id="sing" type="number" value={this.props.value.sing} onChange={this.props.updatePrices}/>
      </div>
    );
  }
}

export default Prices;
