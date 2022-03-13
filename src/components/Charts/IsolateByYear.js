import React, { Component } from 'react';
import Highcharts from "highcharts/highstock";
import ColumnChart from "highcharts-react-official";
import { saveAs } from 'file-saver';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);



class IsolateByYear extends Component {

	render() {

		const date = this.props.isolatesYearly.map((response) => {
			return response.date;
		});
		const number = this.props.isolatesYearly.map((response) => {
			return response.number;
		});

		// Dynamic color picker by year
		var bgColArray = [];           
		for (var i = 0; i < this.props.isolatesYearly.length; i++) {
			if (this.props.isolatesYearly.length <= this.props.colors.length) {
				bgColArray.push(this.props.colors[i]);
			}			
		}

		var myObj = this.props.isolatesYearly;
	    var chartObj = [];
	    for (var i = 0; i < this.props.isolatesYearly.length; i++) {	      
	      chartObj.push({name: this.props.isolatesYearly[i].date, y: this.props.isolatesYearly[i].number, color: bgColArray[i]})
	    }

	    // console.log({chartObj});


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
	          categories: date,
	        },
	        yAxis: {
		        min: 0,
		        title: {
		            text: '# of isolates'
		        }
		    },
	        title: {
	          text: 'Number of isolates by year',
	          style: {
	              fontSize: '14px' 
	          }
	        },
	        tooltip: {
	          pointFormat: '{series.name}: <b>{point.y}</b>'
	        },
	        
		      boost: {
		        enabled: true
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
	            name: "Total isolates: ",
	            data: chartObj
	          }
	        ],
	        responsive: {
		        rules: [{
		            condition: {
		                maxWidth: 500
		            },
		            chartOptions: {
		                legend: {
		                    align: 'center',
		                    verticalAlign: 'bottom',
		                    layout: 'horizontal'
		                }
		            }
		        }]
		    }
	    };
		return <div>		
			
		<ColumnChart highcharts={Highcharts} options={options} containerProps={{ style: { height: "300px" } }} />
			
		</div>;
	}	


}

export default IsolateByYear;