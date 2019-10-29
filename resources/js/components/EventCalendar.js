import React, {Component} from "react";
import moment from "moment";
import moment_timezone from 'moment-timezone';
import { range } from "moment-range";
import  { Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment_timezone.tz.setDefault("Asia/Singapore")
const localizer = momentLocalizer(moment_timezone);
// console.log(moment_timezone.tz.guess(Boolean));
export default class EventCalendar extends Component {

    constructor (props) {
        super(props);
        this.state = {events: []
        };
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
        dates.push({fullDate: moment(currentDate).format('YYYY-MM-DD'), nameDay: moment(currentDate).format('dddd')});
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    };

    componentDidMount() {}

    render() {
       let sameDates = [];
        const {
          events
        } = this.props;

        const newData = events.map(data => {
          const strDayArray = data.event_day.split(',',);
          let getDay = this.getDates(new Date(data.event_start), new Date(data.event_end));
          const daysToDisplay =  strDayArray.map(arrayDay => {
            const here = getDay.map(day => {
                  if(arrayDay === day.nameDay) {
                    let startDate = moment(day.fullDate);
                    let endDate = moment(day.fullDate);
                    sameDates.push({title: data.event_name, start: new Date(startDate.year(), startDate.month(), startDate.date(), startDate.hour(), startDate.minute(), 0), end: new Date(endDate.year(), endDate.month(), endDate.date(), endDate.hour(), endDate.minute(), 0)});
                    return day;
                  }
            })
          });
        });

        return (
          <div style={{ height: '300pt', marginTop: '50px'}}>
          <h1> Calendar Show Events </h1>
          <Calendar
              events={sameDates}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
            />
      </div>
    );
  }
}