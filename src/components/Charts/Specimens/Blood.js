import React, { Component } from 'react';
import Highcharts from "highcharts/highstock";
import ColumnChart from "highcharts-react-official";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);


class Blood extends Component {

	render() {

		// X-Axis
		const blood = this.props.blood.map((response) => {
			return response.Code;
		});

		console.log({blood});

		// Sort organism by number desc
    	var sortedOrganism = this.props.blood.sort(({['Number of isolates']: a }, {['Number of isolates']: b }) => b-a);

		// Generate color key 
	    var chartObj = [];
	    for (var i = 0; i < 5; i++) {	      
	      if (typeof sortedOrganism[i] != 'undefined') { 
	      	chartObj.push({name: sortedOrganism[i].Code, y: sortedOrganism[i]['Number of isolates'], color: this.props.colors})
	    	}
	    }

	    // Chart option
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
	          categories: blood,
	        },
	        yAxis: {
		        min: 0,
		        title: {
		            text: '# of isolates'
		        }
		    },
	        title: {
	          text: 'Blood',
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

export default Blood;