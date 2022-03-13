import React, { Component } from 'react';
import ColumnChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class CommonOrganisms extends Component {

	render() {
		
		// Sort organism by number desc
    	var sortedOrganism = this.props.organism.sort(({['Number of isolates']: a }, {['Number of isolates']: b }) => b-a);
    	const organism = sortedOrganism.map((response) => {
			return response.Code;
		});

		// Generate color key 
	    var chartObj = [];
	    for (var i = 0; i < 10; i++) {
	      
	      chartObj.push({name: sortedOrganism[i].Code, y: sortedOrganism[i]['Number of isolates'], color: this.props.colors[1]})
	    }

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
	          categories: organism,
	        },
	        yAxis: {
		        min: 0,
		        title: {
		            text: '# of isolates'
		        }
		    },
	        title: {
	          text: '10 Most common organisms',
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
	          column: {
	                  allowPointSelect: false,
	                  cursor: 'pointer',
	                  dataLabels: {
	                      // verticalAlign: 'bottom',
	                      enabled: true,
	                      // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                      // format: '<b>{point.name}</b>'
	                  },
	                  showInLegend: false
	              }
	        },
	        series: [
	          {            
	            name: "Total organism",
	            data: chartObj
	          }
	        ]
	    };
		return <div>
			<ColumnChart highcharts={Highcharts} options={options}  />
		</div>;
	}	


}

export default CommonOrganisms;