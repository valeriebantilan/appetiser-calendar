import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EventCalendar from './EventCalendar';


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

    getDates(startDate, endDate) {
        let dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
            this.setState({
                isLoading: true
            });
            const {
                eventName,
                eventStart,
                eventEnd,
                days,
            } = this.state;

            axios.post('api/event', {eventName, eventStart, eventEnd, days}, {
                headers: {
                    'Accept': 'application/json',
                }
            }).then(response => {
                this.setState({
                    events: [response.data, ...this.state.events],
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
          if (this.state.events.length != 0) {
              let dates = this.getDates(new Date(this.state.events[0].event_start), new Date(this.state.events[0].event_end));                                                                                                           
              console.log('here');
              console.log(dates);
              dates.map(function(date) {
                  console.log(date);
              });
          }
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
            events,
            isLoading,
        } = this.state; 

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-start">
                        <div className="col-md-6">
                            <div className="card" style={{marginTop: '30px'}}>
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
                                        {
                                            isLoading ? (
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span class="sr-only">Loading...</span>
                                                </button>
                                            ) : (<button type="submit" className="btn btn-primary">
                                            Create Event
                                        </button>)
                                        }
                                    </form>
                                    <hr />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <EventCalendar events={events}/>    
                            </div>
                        </div>
                </div>
            </div>
        );
    }
};
