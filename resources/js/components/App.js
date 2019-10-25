import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                           <Event/>
                        {/* <div className="card">
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

