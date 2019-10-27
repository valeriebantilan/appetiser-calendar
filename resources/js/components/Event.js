import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export const CheckBox = props => {
    return (
      <div style={{padding: '10px', display: 'inline-block'}}>
       <input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </div>
    )
}

export default class Event extends Component {
    

    constructor() {
        super();
        this.state = {
            eventName: '',
            eventStart: '',
            eventEnd: '',
            isLoading: false,
            days: [
                {id: 'monday', value: "Monday", isChecked: false},
                {id: 'tuesday', value: "Tuesday", isChecked: false},
                {id: 'wednesday', value: "Wednesday", isChecked: false},
                {id: 'thursday', value: "Thursday", isChecked: false},
                {id: 'friday', value: "Friday", isChecked: false},
                {id: 'saturday', value: "Saturday", isChecked: false},
                {id: 'sunday', value: "Sunday", isChecked: false}
              ],
            events: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
        this.renderEvents = this.renderEvents.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
            this.setState({
                isLoading: true
            })
            const {
                eventName,
                eventStart,
                eventEnd,
                days,
            } = this.state;

            console.log({eventName, eventStart, eventEnd, days});

            axios.post('api/event', {eventName, eventStart, eventEnd, days}, {
                headers: {
                    'Accept': 'application/json',
                }
            }).then(response => {
                this.setState({
                    events: [response.data, ...this.state.events]
                });
                
            }).catch(error => {
                console.log(error);
            });
    }

    componentWillMount() {
        axios.get('api/event').then( response => {
            this.setState({
                events: [...response.data],
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

      handleCheckChieldElement(event){
        let days = this.state.days
        days.forEach(day => {
           if (day.value === event.target.value)
              day.isChecked =  event.target.checked
        })
        this.setState({days: days})
      }

      renderEvents() {
        return this.state.events.map(event => (
            <div key={event.id} className="media">
                <div className="media-body">
                    <p>{event.event_name}</p>
                </div>
            </div>
        ));
    }
    
    
    render() {
        const {
            days,
        } = this.state; 

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Appetiser Calendar Event</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} method="post">
                                    <div className="form-group">
                                        <label htmlFor="eventName"> Event Name </label>
                                        <input type="text" name="eventName" className="form-control" placeholder="" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="eventStart"> From </label>
                                        <input type="date" name="eventStart" className="form-control" placeholder="" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="eventEnd"> To </label>
                                        <input type="date" name="eventEnd" className="form-control" placeholder="" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        {
                                            days.map((days) => {
                                              return (<CheckBox key={days.id} handleCheckChieldElement={this.handleCheckChieldElement}  {...days} />)
                                            })
                                          }
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Event
                                    </button>
                                </form>
                                <hr />
                                {this.renderEvents()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
