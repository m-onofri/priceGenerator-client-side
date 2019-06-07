import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Resume extends Component {
  renderDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  dailyAmount = (rooming, price) => {
    const total = rooming
                    .map(r => r[1] * price[r[0]])
                    .reduce((a, b) => {
                      return a + b;
                    }, 0);
    return Math.round(total * 100) / 100;
  }

  renderTable = (days, prices, rooming) => {
    const roomingArr = Object.entries(rooming).filter(r => r[1] !== 0);
    let result = [];
    for(let i=0; i < days.length; i++) {
      for(let j=0; j < days[i][1].length; j++) {
        result.push(<tr>
                      <td>{this.renderDate(days[i][1][j])}</td>
                        {roomingArr.map(r => <td>{r[1]} x {prices[i][1][r[0]]} €</td>)}
                      <td>{this.dailyAmount(roomingArr, prices[i][1])} €</td>
                    </tr>);
      }
    }
    result.push(<tr>
                  <th>{result.length} days</th>
                    {roomingArr.map(r => <th>{r[1]}</th>)}
                  <th>{this.props.total} €</th>
                </tr>);
    return result;
  }

  render() {
    const {days, prices, rooming} = this.props;
    return(
      <>
        {this.renderTable(days, prices, rooming)}
      </>
    );
  }
}

Resume.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.object.isRequired
}

export default Resume;
