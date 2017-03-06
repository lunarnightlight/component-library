import React, { PropTypes, Component } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import d3 from 'd3';

// Creating an animated bar chart–bars "grow":

// Each bar will be a year

// Each bar's height will be a sum of all the amounts of
// each transaction for a particular year.
// (dataByYear[year].amount)

function makeDataByYear(jsondata) {
  // converts jsondata (array of objects) into a hashmap (object
  // with years as keys with values that are an array of
  // transaction/record objects)
  const dataByYear = {};
  jsondata.forEach((t) => {
    const year = t.tran_date.substring(0, 4);
    // assigns the year part of the tran_date string to 'year'
    const yearToUpdate = dataByYear[year];
    if (yearToUpdate) {
      dataByYear[year].push(t);
    } else {
      dataByYear[year] = [t];
    }
  });
  return dataByYear;
  // Type: OBJECT
}

// function sumContributions(dataByYear) {
//   Object.keys(dataByYear).forEach(function)
// }

export default class BarData extends Component {
  static displayName = 'BarData';
  constructor(props) {
    super(props);
    // some local state to manage passing data
    this.state = {
      // data: [],
      // Before the component renders, it hasn't reached out to
      // the API yet, so we write a placeholder for the data first,
      // and later update it with a life cycle method.
      // Not sure if I need this for the bar chart.
      dataByYear: '',
      totalContributions: '',
    };
  }

  componentDidMount = () => {
    require('es6-promise').polyfill();
    require('isomorphic-fetch');
    // console.log('fired?');
    fetch('http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/5591/')
      .then(response => response.json())
      .then((jsondata) => {
        // console.log(jsondata);
        // console.log(this, " this");
        const dataByYear = makeDataByYear(jsondata);
        this.setState({ dataByYear });
        console.log(dataByYear);
      });
      // .then(console.log(this.state.dataByYear));
  }

  render() {
    return (
      <p>{console.log(this.dataByYear, ' dataByYear')}</p>
    );
  }
}
