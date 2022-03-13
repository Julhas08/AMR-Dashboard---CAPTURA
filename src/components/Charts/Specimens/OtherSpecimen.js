import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import Highcharts from "highcharts/highstock";
import ColumnChart from "highcharts-react-official";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class OtherSpecimen extends Component {
  
  render() {
    const othersSpec = this.props.othersSpec.map((response) => {
      return response.Code;
    });

    // Sort organism by number desc
    var sortedOrganism = this.props.othersSpec.sort(({['Number of isolates']: a }, {['Number of isolates']: b }) => b-a);

    // Generate color key 
    var chartObj = [];
    for (var i = 0; i < 5; i++) {
      if (typeof sortedOrganism[i] != 'undefined') { 
        chartObj.push({name: sortedOrganism[i].Code, y: sortedOrganism[i]['Number of isolates'], color: this.props.colors[6]})
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
          categories: othersSpec,
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of isolates'
            }
        },
        title: {
          text: 'Others Spec',
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
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      // verticalAlign: 'bottom',
                      // enabled: true,
                      //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                      format: '<b>{point.name}</b>'
                  },
              }
        },
        series: [
          {
            colorByPoint: true,
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

export default OtherSpecimen;