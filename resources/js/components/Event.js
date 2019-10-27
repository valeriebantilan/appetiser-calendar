import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



export default class Event extends Component {

    constructor() {
        super();
        this.state = {
            events: [],
            name: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(event.target.elements.eventName.value);
        console.log(event.target.elements.eventStart.value);
        console.log(event.target.elements.eventEnd.value);
        // this.setState({
        //     name: e.target.value
        // });
        // console.log('onChange', this.state.name);
    }

    componentWillMount() {
        axios.get('api/event').then( response => {
            this.setState({
                events: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }
    
    render() {
        const {
            events
        } = this.state; 

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Appetiser Calendar Event</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label for="eventName"> Event Name </label>
                                        <input type="text" name="eventName" class="form-control" placeholder=""/>
                                    </div>
                                    <div className="form-group">
                                        <label for="eventName"> From </label>
                                        <input type="date" name="eventStart" class="form-control" placeholder=""/>
                                    </div>
                                    <div className="form-group">
                                        <label for="eventName"> To </label>
                                        <input type="date" name="eventEnd" class="form-control" placeholder=""/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Event
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
