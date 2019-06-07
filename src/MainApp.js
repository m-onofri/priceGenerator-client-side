import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dates from './components/Dates.js';
import SelectListini from './components/SelectListini.js';
import Rooming from './components/Rooming.js';
import PricesList from './components/PricesList.js';
import Table from './components/Table.js';
import TotalAmount from './components/TotalAmount.js';
import './App.css';

class MainApp extends Component {
  state = {
    data: {},
    loaded: false,
    arrival: undefined,
    departure: undefined,
    priceList: "ALL_INCLUSIVE",
    priceLists: [],
    rooming: {ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, animal: 0, culla: 0, sing: 0},
    days: [], //[["a", [timestamp1, timestamp2, ...], [...]]]
    prices: [] //[["a", {...}], ["b", {...}]]
  }

  //value: integer
  twoIntString = (value) => {
    let stringValue = value.toString();
    if (stringValue.length < 2) stringValue = "0" + stringValue;
    return stringValue;
  }

  //date, startDate, endDate: timestamps (ms)
  is_included = (date, startDate, endDate) => {
    if(date >= startDate && date <= endDate) return true;
    return false;
  }

  //rooming, price: objects
  dailyAmount = (rooming, price) =>{
    const total = (rooming.ad * price.ad +
                  rooming.ad34 * price.ad34 +
                  rooming.chd3 * price.chd3 +
                  rooming.chd4 * price.chd4 +
                  rooming.inf * price.inf +
                  rooming.animal * price.animal +
                  rooming.culla * price.culla +
                  rooming.sing * price.sing);
    return Math.round(total * 100) / 100;
  }

  totalAmount = () => {
    let totalAmount = [];
    let days = this.state.days;
    let rooming = this.state.rooming;
    let priceList = this.state.priceList;
    const data = this.state.data;

    for(let i = 0; i < days.length; i++) {
      for(let j = 0; j < days[i][1].length; j++) {
        totalAmount.push(this.dailyAmount(rooming, data[priceList][days[i][0]].prices));
      }
    }
    return (Math.ceil(totalAmount.reduce((a, b) => a + b, 0) * 100) /100);
  }

  //priceList: object {a: {}, b: {}, ...}
  //return {a: [], b: [], ...}
  selectPeriods = (priceList) => {
    return Object
                .keys(priceList)
                .reduce((obj, item) => {
                  obj[item] = [];
                  return obj;
                }, {});
  }

  //Return all days from arrival to departure
  //date, endDate: timestamps (ms)
  //priceList: object {a: {}, b: {}, ...}
  //return [["a", [timestamp1, timestamp2, ...], [...]]]
  manageDays = (date, endDate, priceList) => {
    const realEndDate = endDate - 86400000;
    let daysReservation = this.selectPeriods(priceList); //{a: [], b: [], ...}
    while(date <= realEndDate) {
      if(this.is_included(date, new Date(priceList.a.start).getTime(), new Date(priceList.a.end).getTime())) {
        daysReservation.a.push(date);
      } else if (this.is_included(date, new Date(priceList.b.start).getTime(), new Date(priceList.b.end).getTime())) {
        daysReservation.b.push(date);
      } else if (this.is_included(date, new Date(priceList.c.start).getTime(), new Date(priceList.c.end).getTime())) {
       daysReservation.c.push(date);
     } else if (this.is_included(date, new Date(priceList.d.start).getTime(), new Date(priceList.d.end).getTime())) {
        daysReservation.d.push(date);
      } else if (this.is_included(date, new Date(priceList.e.start).getTime(), new Date(priceList.e.end).getTime())) {
        daysReservation.e.push(date);
      } else if (this.is_included(date, new Date(priceList.f.start).getTime(), new Date(priceList.f.end).getTime())) {
        daysReservation.f.push(date);
      }
      date += 86400000;
    }
    return (Object.entries(daysReservation).filter( x => x[1].length > 0));
  }

  //days: array [["a", {...}], ["b", {...}]]
  //priceList: string
  //data: object {priceList1: {a: {prices: {}, ...}, b: {prices: {}, ...}, ...}, ...}
  //Return prices of the selected periods: array [["a", {...}], ["b", {...}]]
  selectPrices = (days, priceList, data) => days.map(x => [x[0], data[priceList][x[0]].prices]);


  componentDidMount() {
    const today = new Date();
    const todayTimestamp = today.getTime();
    const tomorrowTimestamp = todayTimestamp + 86400000;
    const data = this.props.data;
    const priceLists = Object.keys(data);
    const selectedDays = this.manageDays(todayTimestamp, tomorrowTimestamp, data[this.state.priceList]);
    this.setState({
      data: data,
      loaded: true,
      arrival: todayTimestamp,
      departure: tomorrowTimestamp,
      days: selectedDays,
      priceLists: priceLists,
      prices: this.selectPrices(selectedDays, this.state.priceList, data)
    });
  }

  getTimestamp = (event) => {
    console.log(event.target.value);
    const date = event.target.value.split("-");
    date[1] = (date[1] - 1).toString();
    return new Date(...date).getTime();
  }

  updateArrival = (event) => {
    const startDate = this.getTimestamp(event);
    if (startDate < this.state.departure) {
      let days = this.manageDays(startDate, this.state.departure, this.state.data[this.state.priceList]);
      this.setState({
        arrival: startDate,
        days: days,
        prices: this.selectPrices(days, this.state.priceList, this.state.data)
      });
    } else {
      this.setState({arrival: startDate});
    }
  }

  updateDeparture = (event) => {
    const endDate = this.getTimestamp(event);
    if (this.state.arrival < endDate) {
      let days = this.manageDays(this.state.arrival, endDate, this.state.data[this.state.priceList]);
      this.setState({
        departure: endDate,
        days: days,
        prices: this.selectPrices(days, this.state.priceList, this.state.data)
      });
    } else {
      this.setState({departure: endDate});
    }
  }

  //timestamp: timestamp (ms)
  //return: formatted datastring "yyyy-mm-dd"
  dateValue = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${this.twoIntString(date.getMonth() + 1)}-${this.twoIntString(date.getDate())}`;
  }

  updatePriceList = (event) => {
    const priceList = event.target.value;
    this.setState({
      priceList: priceList,
      prices: this.selectPrices(this.state.days, priceList, this.state.data)
    });
  }

  updateRooming = (event) => {
    const rooming = {...this.state.rooming};
    const id = event.target.id;
    const value = parseInt(event.target.value);
    rooming[id] = value;
    this.setState({rooming: rooming});
  }

  updatePrices = (event) => {
    const prices = [...this.state.prices];
    const section = event.target.parentNode.id;
    const id = event.target.id;
    const value = event.target.value;
    for(let i=0; i < prices.length; i++) {
      if(prices[i][0] === section) {
        prices[i][1][id] = value;
      }
    }
    this.setState({prices: prices});
  }

  render() {
    if(this.state.loaded) {
      return (
        <div className="App">
          <div id="first_section">
            <Dates
              updateArrival={this.updateArrival}
              updateDeparture={this.updateDeparture}
              valueArr={this.dateValue(this.state.arrival)}
              valueDep={this.dateValue(this.state.departure)}/>
            <SelectListini
              priceLists={this.state.priceLists}
              value={this.state.priceList}
              updatePriceList={this.updatePriceList}/>
            <TotalAmount total={this.totalAmount()}/>
          </div>
          <div id="second_section">
            <Rooming
              value={this.state.rooming}
              updateRooming={this.updateRooming}/>
            <PricesList
              prices={this.state.prices}
              days={this.state.days}
              updatePrices={this.updatePrices}/>
          </div>
          <div id="resumeTable">
            <h2>Resume Table</h2>
            <Table 
              days={this.state.days}
              prices={this.state.prices}
              rooming={this.state.rooming}
              total={this.totalAmount()}/>
          </div>
        </div>
      );
    } else  {
      return "Wait...";
    }
  }
}

MainApp.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired  
}

export default MainApp;
