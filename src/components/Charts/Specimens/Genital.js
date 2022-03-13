import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import Highcharts from "highcharts/highstock";
import ColumnChart from "highcharts-react-official";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class Genital extends Component {
  
  render() {
    const genital = this.props.genital.map((response) => {
      return response.Code;
    });

    // Sort spcimen by desc
    var sortedSpecimen = this.props.genital.sort(({ ['Number of isolates']: a }, {['Number of isolates']: b }) => b-a);

    // Generate color key 
    var chartObj = [];
    for (var i = 0; i < 5; i++) {
      if (typeof sortedSpecimen[i] != 'undefined') { 
        chartObj.push({name: sortedSpecimen[i].Code, y: sortedSpecimen[i]['Number of isolates'], color: this.props.colors[3]})
      }
    }
    // Calculate total isolates
    var totalIsolates = chartObj.reduce(function(sum, current) {
      return sum + current.y;
    }, 0);

    const options = {
        chart: {
          type: "column"
        },
        credits: {
          enabled: false
        },
        legend: {
          margin: 5,
          itemDistance: 10,
          enabled: false
        },
        xAxis: {
          categories: genital,
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of isolates'
            }
        },
        title: {
          text: 'Genital',
          style: {
              fontSize: '14px' 
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
          bar: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                      // verticalAlign: 'bottom',
                      enabled: true,
                      //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                      format: '<b>{point.name}</b>'
                  },
                  showInLegend: false
              }
        },
        series: [
          {
            name: "Total patients: ",
            data: chartObj
          }
        ]
    };
    return <div>
      <ColumnChart highcharts={Highcharts} options={options} containerProps={{ style: { height: "200px", width: "200px" } }} />
    </div>;
  } 


}

export default Genital;