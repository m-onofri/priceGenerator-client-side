import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Resume extends Component {
  renderDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  dailyAmount = (rooming, price) => {
    const total = rooming
                    .map(([category, number]) => number * price[category])
                    .reduce((a, b) => {
                      return a + b;
                    }, 0);
    return Math.round(total * 100) / 100;
  }

  renderTable = (days, prices, rooming) => {
    let result = [];
    for(let i=0; i < days.length; i++) {
      for(let j=0; j < days[i][1].length; j++) {
        result.push(<tr>
                      <td>{this.renderDate(days[i][1][j])}</td>
                        {rooming.map(([category, number]) => <td>{number} x {prices[i][1][category]} €</td>)}
                      <td>{this.dailyAmount(rooming, prices[i][1])} €</td>
                    </tr>);
      }
    }
    result.push(<tr>
                  <th>{result.length} days</th>
                    {rooming.map(([category, number]) => <th>{number} {category}</th>)}
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
  rooming: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
}

export default Resume;
