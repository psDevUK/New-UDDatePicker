import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';
class <%=$PLASTER_PARAM_ControlName%> extends React.Component {

  // state is for keeping control state before or after changes.
 constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

   onIncomingEvent(eventName, event) {
    if (event.type === "requestState") {
      var data = {
        attributes: {
          from: this.state.from.toDateString(),
          to: this.state.to.toDateString()
        }
      };
      UniversalDashboard.post(
        `/api/internal/component/element/sessionState/${event.requestId}`,
        data
      );
    }
  }

  onChange(e) {
    this.setState({ value: e, from: e });
    this.setState({ value: e, to: e });
    if (this.props.activeOnChange) {
      UniversalDashboard.publish("element-event", {
        type: "clientEvent",
        eventId: this.props.id + "onChange",
        eventName: "onChange",
        eventData: e.toDateString()
      });
    }
  }

  onDayClick(e) {
    this.setState({ value: e, from: e });
    this.setState({ value: e, to: e });
    console.log(this.state.from.toDateString());
    if (this.props.activeOnDayClick) {
      UniversalDashboard.publish("element-event", {
        type: "clientEvent",
        eventId: this.props.id + "onDayClick",
        eventName: "onDayClick",
        eventData: e.toDateString()
      });
    }
  }
    componentWillMount() {
    this.pubSubToken = UniversalDashboard.subscribe(this.props.id, this.onIncomingEvent.bind(this));
  }

  componentWillUnmount() {
    console.log("Unmounted")
    UniversalDashboard.unsubscribe(this.pubSubToken);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          onChange={this.onChange.bind(this)}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
          onChange={this.onChange.bind(this)}
          onDayClick={this.onDayClick.bind(this)}

        />{' '}
        &emsp;{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}

export default <%=$PLASTER_PARAM_ControlName%>