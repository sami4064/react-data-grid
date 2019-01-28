import React from 'react';
import PropTypes from 'prop-types';
import ExcelColumn from 'common/prop-shapes/ExcelColumn';
import moment from 'moment';

class DateRangeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      value: this.props.filterTerm || ''
    };
  }

  componentDidMount() {
    const value = this.state.value;
    this.props.onChange({filterTerm: this.filterStringToDates(value), column: this.props.column, rawValue: value, filterValues: this.filterValues });
  }

  filterStringToDates = s => {
    let from = false;
    let to = false;
    const split = s.split(':')
    if(split.length === 2) {
      from = moment(split[0]);
      to = moment(split[1]);
    }
    return {
      from: from ? from : false,
      to: to ? to : false,
    }
  }

  filterValues(row, columnFilter, columnKey) {
    if (columnFilter.filterTerm == null) {
      return true;
    }

    // implement filter logic
    const candiDate = moment(row[columnKey]);
    if(!candiDate._isValid) {
      return false;
    }
    const { from, to } = columnFilter.filterTerm;

    if(from && candiDate.isBefore(from)) return false;
    if(to && candiDate.isAfter(to)) return false;

    return true;
  }

  handleKeyPress(e) { // Validate the input
    let regex = '-|:|([0-9])';
    let result = RegExp(regex).test(e.key);
    if (result === false) {
      e.preventDefault();
    }
  }

  handleChange(e) {
    e.preventDefault();
    const value = e.target.value;
    this.props.onChange({filterTerm: this.filterStringToDates(value), column: this.props.column, rawValue: value, filterValues: this.filterValues });
    this.setState({ value });
  }

  render() {
    let inputKey = 'header-filter-' + this.props.column.key;
    let columnStyle = {
      float: 'left',
      marginRight: 5,
      maxWidth: '80%'
    };

    //let tooltipText = 'Input Methods: ranges, {date}:{date}, :{date}, {date}:'

    return (
      <div>
        <div style={columnStyle}>
          <input key={inputKey} type="text" placeholder="e.g. 1970-01-01:" className="form-control input-sm" onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.state.value} />
        </div>
      </div>
    );
  }
}

DateRangeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  column: PropTypes.shape(ExcelColumn)
};
module.exports = DateRangeFilter;
