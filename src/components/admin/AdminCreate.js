import React, {Component} from 'react';
import Periods from './Periods';

class AdminCreate extends Component {
    state = {
        priceList: [],
        name: "new price list",
        periods: 1,
        success: true,
        message: "",
        loaded: true
    }

    priceListNameHandler = (e) => {
        const name = e.target.value;
        this.setState({name});
    }

    priceListPeriodsHandler = (e) => {
        const periods = parseInt(e.target.value);
        this.setState({periods});
    }

    //value: integer
    twoIntString = (value) => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = `0${stringValue}`;
        return stringValue;
    }

    buttonClickHandler = () => {
        let priceList = [];
        const {periods, name} = this.state;
        const todayDate = new Date();
        const todayString = `${todayDate.getFullYear()}-${this.twoIntString(todayDate.getMonth() + 1)}-${this.twoIntString(todayDate.getDate())}`;
        for (let j = 0; j < periods; j++) {
            const periodName = String.fromCharCode(97 + j);
            priceList.push([periodName, {
                name: name,
                period: periodName,
                start: todayString,
                end: todayString,
                ad: 0,
                ad34: 0,
                chd3: 0,
                chd4: 0,
                inf: 0,
                animal: 5,
                culla: 10,
                sing: 15}]);
        }
        this.setState({priceList});
    }

    addNewValuesHandler = (event) => {
        const priceList = [...this.state.priceList];
        const section = event.target.parentNode.id.split('-')[1];
        const id = event.target.name;
        const value = event.target.value;
        for(let i=0; i < priceList.length; i++) {
            if (priceList[i][0] === section) {
                priceList[i][1][id] = value;
            }
        }
        this.setState({priceList});
    }

    submitHandler = () => {
        this.setState({
            loaded: false,
          });
        
        fetch('http://localhost:9000/priceList/createPriceList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({priceList: JSON.stringify(this.state.priceList)})
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

    displayFeedback = () => {
        const {message, success} = this.state;
        if (message) {
            return (
                <div className={success ? "success" : "error"}>
                    <p>{message}</p>
                </div>
            );
        }
    }

    render() {
        const {loaded, name, periods} = this.state;
        if (loaded) {
            return(
                <div id="admin_section">
                    <h2 className="center">Create Price Lists</h2>
                    <div className="selector">
                        <div className="priceList-name">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => this.priceListNameHandler(e)}/>
                        </div>
                        <div className="priceList-name">
                            <label>Periods</label>
                            <input type="number" value={periods} onChange={(e) => this.priceListPeriodsHandler(e)}/>
                        </div>
                        <button onClick={this.buttonClickHandler}>Go!</button>
                    </div>
                    { this.displayFeedback() }
                    <div className="container">
                        <div className="header">
                            <p>Name</p>
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
                        {this.state.priceList.map( (item, index) => {
                            return(<Periods
                                    key={index} 
                                    index={item[0]}
                                    data={item[1]}
                                    addNewValuesHandler={this.addNewValuesHandler}/>
                            );
                     })}
                    </div>
                    <button className="btn btn-add createNewPlaylist" onClick={this.submitHandler}>Add</button>
                </div>
            );  
        } else {
            return "Wait...";
        }
        
    }
}

export default AdminCreate;
