import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectListini from './components/SelectListini';

class AdminUpdate extends Component {
    state = {
        loaded: false,
        newPeriod: false,
        data: undefined,
        priceList: "ALL_INCLUSIVE",
        priceLists: [],
        updatedPeriodsNames: []
    }

    twoIntString = (value) => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = "0" + stringValue;
        return stringValue;
    }

    dateValue = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${this.twoIntString(date.getMonth() + 1)}-${this.twoIntString(date.getDate())}`;
      }

    updatePriceList = (event) => {
        const priceList = event.target.value;
        const updatedPeriodsNames = Object.keys(this.state.data[priceList]);
        this.setState({
            priceList,
            updatedPeriodsNames
        });
    }

    displayNewPeriodForm = () => {
        this.setState({newPeriod: true});
    }

    hideNewPeriodForm = (event) => {
        event.preventDefault();
        this.setState({newPeriod: false});
    }

    valueUpdateHandler = (event, period, isPrices) => {
        const newData = {...this.state.data};
        const name = event.target.name;
        const value = event.target.value;
        if (isPrices) {
            newData[this.state.priceList][period]["prices"][name] = value;
        }
        newData[this.state.priceList][period][name] = value;
        this.setState({data: newData});
    }

    displayPriceLists = () => {
        const periods = this.state.updatedPeriodsNames;
        const priceLists = Object.values(this.state.data[this.state.priceList]);
        return priceLists.map((priceList, i) => {
            return (
                <form key={i} method="post" action="http://localhost:9000/priceList/manage">
                    <input type="text" value={priceList.period} name="period" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={this.dateValue(priceList.start)} name="start" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={this.dateValue(priceList.end)} name="end" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="number" value={priceList.prices.ad} name="ad" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.ad34} name="ad34" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.chd3} name="chd3" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.chd4} name="chd4" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.inf} name="inf" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.culla} name="culla" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.animal} name="animal" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={priceList.prices.sing} name="sing" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="hidden" value={priceList._id} name="id" />
                    <input className="btn btn-update" type="submit" value="Update" name="update" id={priceList._id} onClick={(e) => this.submitHandler(e, i)}/>
                    <input className="btn btn-delete" type="submit" value="Delete" name="delete"/>
                </form>
            );
        });
    }

    addNewPeriod = () => {
        if (this.state.newPeriod) {
            return(
                <form method="post" action="http://localhost:9000/priceList/addNewPeriod">
                    <input type="text" name="period" required/>
                    <input type="date" name="start" required/>
                    <input type="date"  name="end" required/>
                    <input type="number" name="ad" step="0.01" required min="0"/>
                    <input type="number" name="ad34" step="0.01" required min="0"/>
                    <input type="number" name="chd3" step="0.01" required min="0"/>
                    <input type="number" name="chd4" step="0.01" required min="0"/>
                    <input type="number" name="inf" step="0.01" required min="0"/>
                    <input type="number" name="culla" step="0.01" defaultValue={10} required min="0"/>
                    <input type="number" name="animal" step="0.01" defaultValue={5} required min="0"/>
                    <input type="number" name="sing" step="0.01" defaultValue={15} required min="0"/>
                    <input className="btn btn-add" type="submit" value="Add" name="add_period"/>
                    <input className="btn btn-cancel" type="submit" value="Cancel" onClick={(e) => this.hideNewPeriodForm(e)} />
                </form>
            );
        }
    }

    componentDidMount() {
        const data = this.props.data;
        const priceLists = Object.keys(data);
        const updatedPeriodsNames = Object.keys(data[this.state.priceList]);
        this.setState({
            loaded: true,
            data,
            priceLists,
            updatedPeriodsNames
        });
    }

    displayFeedback = () => {
        if (this.state.message) {
            return (
                <div className={this.state.success ? "success" : "error"}>
                    <p>{this.state.message}</p>
                </div>
            );
        }
    }

    submitHandler = (e, i) => {
        e.preventDefault();

        const updatedPeriod = Object.values(this.state.data[this.state.priceList]).filter(p => p._id === e.target.id)[0];
        
        this.setState({
            loaded: false,
          });
        
        fetch('http://localhost:9000/priceList/manage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({priceList: JSON.stringify(updatedPeriod), update: "Update"})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    success: true,
                    message: json.message,
                    loaded: true
                });
            } else {
                this.setState({
                    success: false,  
                    message: json.message,
                    loaded: true,
                });
            }
        });
    }

    render() {
        if (this.state.loaded) {
            return(
                <div id="admin_section">
                    <h2 className="center">Update Price Lists</h2>
                    <div className="selector">
                        <SelectListini 
                            priceLists={this.state.priceLists}
                            value={this.state.priceList}
                            updatePriceList={this.updatePriceList}
                        />
                        <button onClick={this.displayNewPeriodForm}>New Period</button>
                    </div>
                    { this.displayFeedback() }
                    <div className="container">
                        <div className="header">
                            <p>Period</p>
                            <p>Start</p>
                            <p>End</p>
                            <p>ad</p>
                            <p>ad34</p>
                            <p>chd3</p>
                            <p>chd4</p>
                            <p>Infant</p>
                            <p>Cot</p>
                            <p>Animal</p>
                            <p>Single room</p>
                        </div>
                        {this.displayPriceLists()}
                        {this.addNewPeriod()}
                    </div>
                </div>
             );
        } else {
            return "Wait...";
        }
    }
}

AdminUpdate.propTypes = {
    data: PropTypes.object.isRequired
}

export default AdminUpdate;