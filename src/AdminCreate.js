import React, {Component} from 'react';
import Periods from './components/Periods';

class AdminCreate extends Component {
    state = {
        priceList: [],
        name: "new price list",
        periods: 1
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
        if (stringValue.length < 2) stringValue = "0" + stringValue;
        return stringValue;
    }

    buttonClickHandler = () => {
        let priceList = [];
        const todayDate = new Date();
        const todayString = `${todayDate.getFullYear()}-${this.twoIntString(todayDate.getMonth() + 1)}-${this.twoIntString(todayDate.getDate())}`;
        for (let j = 0; j < this.state.periods; j++) {
            const periodName = String.fromCharCode(97 + j);
            priceList.push([periodName, {
                name: this.state.name,
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
                sing: 15}])
        }
        this.setState({priceList});
    }

    addNewValuesHandler = (event) => {
        const priceList = [...this.state.priceList];
        const section = event.target.parentNode.id.split('-')[1];
        const id = event.target.name;
        const value = event.target.value;
        for(let i=0; i < priceList.length; i++) {
            if(priceList[i][0] === section) {
                priceList[i][1][id] = value;
            }
        }
        this.setState({priceList: priceList});
    }

    render() {
        return(
            <div id="admin_section">
                <h2 className="center">Create Price Lists</h2>
                <div className="selector">
                    <div className="priceList-name">
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={(e) => this.priceListNameHandler(e)}/>
                    </div>
                    <div className="priceList-name">
                        <label>Periods</label>
                        <input type="number" value={this.state.periods} onChange={(e) => this.priceListPeriodsHandler(e)}/>
                    </div>
                    <button onClick={this.buttonClickHandler}>Go!</button>
                </div>
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
                <form className="createButton" method="post" action="http://localhost:9000/priceList/createPriceList">
                    <input type="hidden" value={JSON.stringify(this.state.priceList)} name="pricelist"/>
                    <input className="btn btn-add" type="submit" value="Add" name="add_list"/>
                </form>
            </div>
        );  
    }
}

export default AdminCreate;
