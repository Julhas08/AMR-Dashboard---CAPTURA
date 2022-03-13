import React, { Component } from 'react';
// import { Bar } from 'react-chartjs-2';
import ColumnChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class Gender extends Component {

	render() {

		// Female age group modification
    	var femaleSingleObj = this.props.female.filter(function( obj ) {
		  return obj.Age == "<1";
		});
    	var femaleWithoutSingleObj = this.props.female.filter(function( obj ) {
		  return obj.Age !== "<1";
		});
    	var femaleAgeGroup = femaleSingleObj.concat(femaleWithoutSingleObj); 
		const age = femaleAgeGroup.map((response) => {
			return response.Age;
		});

		// Male age group modification
    	var maleSingleOnj = this.props.male.filter(function( obj ) {
		  return obj.Age == "<1";
		});
    	var maleWithoutSingleObj = this.props.male.filter(function( obj ) {
		  return obj.Age !== "<1";
		});
    	var maleAgeGroup = maleSingleOnj.concat(maleWithoutSingleObj); 
    	
    	// Chart female object
	    var chartFemaleObj = [];
	    for (var i = 0; i < 11; i++) {	  
	    	if (typeof femaleAgeGroup[i] != 'undefined') {     
	        chartFemaleObj.push({ y: femaleAgeGroup[i]['Number of patients'], color: this.props.colors[1]})
	    	}
	    }

		// Chart male object
		var chartMaleObj = [];
	    for (var i = 0; i < 11; i++) {	  
	    	if (typeof femaleAgeGroup[i] != 'undefined') {     
	      	chartMaleObj.push({name: maleAgeGroup[i]['Number of patients'], y: maleAgeGroup[i]['Number of patients'], color: this.props.colors[0]})
	    	}
	    }	    

		const options = {
	        chart: {
	          type: "column"
	        },
	        credits: {
	          enabled: false
	        },
	        legend: {
	          enabled: true,
	          layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
	        },
	        xAxis: {
	          categories: age,
	        },
	        yAxis: {
		        min: 0,
		        title: {
		            text: '# of patients'
		        }
		      },
	        title: {
	          text: 'Number of patients by age',
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
	                  allowPointSelect: true,
	                  cursor: 'pointer',
	                  dataLabels: {
	                      verticalAlign: 'bottom',
	                      enabled: true,
	                      //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                      format: '<b>{point.name}</b>'
	                  },
	                  showInLegend: true
	              }
	        },
	        series: [
	          {            
	            name: "Male patients",
	            data: chartMaleObj,
	            color: this.props.colors[0]
	          }, 
	          {
	          	name: "Female patients",
	          	data: chartFemaleObj,
	          	color: this.props.colors[1]
	          }
	        ]
	    };
	    //containerProps={{ style: { height: "300px", width: "600px" } }}
		return <div>
			<ColumnChart highcharts={Highcharts} options={options}  />

		</div>;
	}	


}

export default Gender;