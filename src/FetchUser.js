import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import {Button, Modal} from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'

class FetchUser extends Component {
    state = {
      loading: 'true',
      people: null,
      selected: null,
      visible:false,
      selectedDate:null,
      month: null,
      date: null,
      year: null,
      fullDate: null,
      startTime: null,
      endTime: null
    };

    handleDate = (date) => {
        this.setState({selectedDate: date});
        this.setState({date: date.getDate()});
        this.setState({month: date.toLocaleString('en-us', { month: 'short' })});
        this.setState({year: date.getFullYear()});
    }

    handleSubmit = () => {
        this.setState({fullDate: document.getElementById('picker').value});
        var k = document.getElementById('picker').value;
        this.setState({date: k.split('/')[1] });
        this.setState({startTime: ''});
        this.setState({endTime: ''});
        this.state.people.filter(person => person.real_name === this.state.selected).map(filteredPerson => (
            filteredPerson.activity_periods.map((obj) =>
               { if(obj.start_time.split(' ')[0] == this.state.month && obj.start_time.split(' ')[1] == this.state.date && obj.start_time.split(' ')[2] == this.state.year && obj.end_time.split(' ')[0] == this.state.month && obj.end_time.split(' ')[1] == this.state.date && obj.end_time.split(' ')[2] == this.state.year)
               {
                    this.setState({startTime: obj.start_time.split(' ')[4] });
                    this.setState({endTime: obj.end_time.split(' ')[3] });
                }
             }  
                 )
          ))
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({selected: event.target.innerText},
            () => console.log(this.state.selected),);
            this.setState({visible: true})
            let date = new Date(); 
            let shortMonth = date.toLocaleString('en-us', { month: 'short' });
            this.setState({month: shortMonth});
            let day = date.getDate();
            this.setState({date: day});
            let year = date.getFullYear();
            this.setState({year: year});
            this.setState({fullDate: day + '/' + shortMonth + '/' +year});
            this.setState({startTime: ''});
            this.setState({endTime: ''});
            this.state.people.filter(person => person.real_name === this.state.selected).map(filteredPerson => (
                filteredPerson.activity_periods.map((obj) =>
                   { if(obj.start_time.split(' ')[0] == this.state.month && obj.start_time.split(' ')[1] == this.state.date && obj.start_time.split(' ')[2] == this.state.year && obj.end_time.split(' ')[0] == this.state.month && obj.end_time.split(' ')[1] == this.state.date && obj.end_time.split(' ')[2] == this.state.year){
                        this.setState({startTime: obj.start_time.split(' ')[4] });
                        this.setState({endTime: obj.end_time.split(' ')[3] });
                    }
                    else{
                        this.setState({startTime: ''});
                        this.setState({endTime: ''});
                    }
                 }
                     )       
              ))
    }
    
    handleClose = () => {
        this.setState({visible: false})
    }
    
    async componentDidMount(){
        const url = "http://localhost:3333/members";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({people: data, loading: false });
    }

    render(){
        return(
            <div>
                {this.state.loading || !this.state.people ? (
                <div>loading...</div>
                 ) : (
                    <div>
                        {this.state.people.map(person => (
                        <div key={person.id}>
                            <div><a href="" onClick={this.handleClick}>{person.real_name}</a></div>
                        </div>
                        ))}
                {this.state.people.filter(person => person.real_name === this.state.selected).map(filteredPerson => (
                    <div>
                        <Modal show={this.state.visible}>
                            <Modal.Header><b>{filteredPerson.real_name}</b></Modal.Header>
                            <Modal.Body>
                                Month: {this.state.month}<br></br>
                                Date: {this.state.date}<br></br>
                                Year: {this.state.year}<br></br>
                                Location: {filteredPerson.tz}<br></br>
                                Time periods:<br></br>
                                Start Time: {this.state.startTime}<br></br>
                                End Time: {this.state.endTime}<br></br>
                            <DatePicker id='picker' selected={this.state.selectedDate} onChange={this.handleDate} showYearDropdown scrollableMonthYearDropdown/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick = {this.handleSubmit}>Submit</Button>
                                <Button onClick = {this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))}
                    </div>
                 )}
            </div>
        );
    }  
}
  export default FetchUser;
  