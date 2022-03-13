import React, { Component } from 'react';
import '../../App.css';
import { Doughnut } from 'react-chartjs-2';
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class Glass extends Component {

	render() {
		// Specimen types
		const specimen = this.props.specimen.map((response) => {
      return response.Specimen;
    });

    // Sort spcimen by desc
    var sortedSpecimen = this.props.specimen.sort(({['Number of patients']:a}, {['Number of patients']:b}) => b-a);

    // Generate color key 
    var chartObj = [];
    for (var i = 0; i < this.props.specimen.length; i++) {
      
      if (this.props.specimen[i].Specimen == "BLOOD" || this.props.specimen[i].Specimen == "URINE" || this.props.specimen[i].Specimen == "STOOL" || this.props.specimen[i].Specimen == "GENITAL") {
      	chartObj.push({name: this.props.specimen[i].Specimen, y: this.props.specimen[i]['Number of patients'], color: this.props.colors[i]})
      }	
      
    }
    // Calculate total isolates
    var totalIsolates = chartObj.reduce(function(sum, current) {
      return sum + current.y;
    }, 0);

    const optionsSpecimenType = {
        chart: {
          type: "pie"
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: specimen,
        },
        title: {
          text: 'SPECIMEN TYPE'
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
          pie: {
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
        legend: {
            borderWidth: 0,
            floating: 0,
            layout: 'vertical',
            align: 'center',
            // verticalAlign: 'left',
            labelFormatter: function() {
              return this.name + " (" + (this.y/totalIsolates*100).toFixed(2) + "%)";
            }
        },
        series: [
          {
            colorByPoint: true,
            data: chartObj
          }
        ]
    };
		return <div>
			<h5 className="WHOGlassTitle"> WHO GLASS INDICATORS <img src='/glass-logo.png' className="GLASS-logo" /></h5>
			<div className="OrgColumn GlassTablePropertyBlood">
				<table className="table">
	        <thead>
	        	<tr>
	        		<td colSpan='4' className="GlassTableName">Blood</td>
	        	</tr>
	          <tr>
	            <th scope="col">Pathogen</th>
	            <th scope="col">Antibiotic</th>
	            <th scope="col"># of tested </th>
	            <th scope="col">% Resistance</th>
	          </tr>
	        </thead>
	        <tbody>
	          {this.props.glass.map((d) => (
	            <tr key={d.SN }>
	              <td>{d.Pathogen}</td>
	              <td>{d.Antibiotic}</td>
	              <td>{d['Numbe tested']}</td>
	              <td>{d['%Resistant']}</td>
	            </tr>
	          ))}          
	          
	        </tbody>
	      </table> 
      </div>
      <div className="OrgColumn">
      	<div className="GlassTableProperty">
					<table className="table">
		        <thead>
		        	<tr>
		        		<td colSpan='4' className="GlassTableName">Urine</td>
		        	</tr>
		          <tr>
		            <th scope="col">Pathogen</th>
		            <th scope="col">Antibiotic</th>
		            <th scope="col"># of tested </th>
		            <th scope="col">% Resistance</th>
		          </tr>
		        </thead>
		        <tbody>
		          {this.props.glass.map((d) => (
		            <tr key={d.SN }>
		              <td>{d.Pathogen}</td>
		              <td>{d.Antibiotic}</td>
		              <td>{d['Numbe tested']}</td>
	              	  <td>{d['%Resistant']}</td>
		            </tr>
		          ))}		          
		          
		        </tbody>
		      </table> 
	      </div>
	      <div className="GlassTableProperty">
		      <table className="table GlassTableProperty">
		        <thead>
		        	<tr>
		        		<td colSpan='4' className="GlassTableName">Stool</td>
		        	</tr>
		          <tr>
		            <th scope="col">Pathogen</th>
		            <th scope="col">Antibiotic</th>
		            <th scope="col"># of tested </th>
		            <th scope="col">% Resistance</th>
		          </tr>
		        </thead>
		        <tbody>
		          {this.props.glass.map((d) => (
		            <tr key={d.SN }>
		              <td>{d.Pathogen}</td>
		              <td>{d.Antibiotic}</td>
		              <td>{d['Numbe tested']}</td>
	                  <td>{d['%Resistant']}</td>
		            </tr>
		          ))}		          
		          
		        </tbody>
		      </table> 
		    </div>
		    <div className="GlassTableProperty">  
		      <table className="table GlassTableProperty">
		        <thead>
		        	<tr>
		        		<td colSpan='4' className="GlassTableName">Genital</td>
		        	</tr>
		          <tr>
		            <th scope="col">Pathogen</th>
		            <th scope="col">Antibiotic</th>
		            <th scope="col"># of tested </th>
		            <th scope="col">% Resistance</th>
		          </tr>
		        </thead>
		        <tbody>
		          {this.props.glass.map((d) => (
		            <tr key={d.Resistant }>
		              <td>{d.Pathogen}</td>
		              <td>{d.Antibiotic}</td>
		              <td>{d['Numbe tested']}</td>
	                  <td>{d['%Resistant']}</td>
		            </tr>
		          ))}		          
		          
		        </tbody>
		      </table> 
	      </div>	      	
      </div>
      <div className="col-6 OrgColumn">
    		<PieChart highcharts={Highcharts} options={optionsSpecimenType} />
    	</div>
    	<div className="col-5 OrgColumn StgIndicator">
    		<h5 className="WHOGlassTitle"> SDG INDICATORS <img src='/sdg-logo.png'className='GLASS-logo' /></h5>
	    		<table className="table">
			        <tbody>
			          <tr>
			          	<td>
			          	<Doughnut 
										
										data = {{
											labels: [
										    'Test1',
										    'Test2',
										  ],
										  datasets: [{
										    label: 'My First Dataset',
										    data: [300, 50],
										    backgroundColor: [
										      'rgb(255, 99, 132)',
										      'rgb(54, 162, 235)',
										    ],
										    hoverOffset: 4
										  }]
											
										}}

										height  = {150}
										width   = {250}
										options = {{
											maintainAspectRatio: false,
											scales: {
									            y: {
									                beginAtZero: true
									            }
									        }
										}}
									/>
			          	</td>
			          	<td>_% MRSA in Blood</td>
			          </tr>
			          <tr>
			          	<td><Doughnut 
										
										data = {{
											labels: [
										    'Test1',
										    'Test2',
										  ],
										  datasets: [{
										    label: 'My First Dataset',
										    data: [170, 450],
										    backgroundColor: [
										      'rgb(255, 99, 132)',
										      'rgb(54, 162, 235)',
										    ],
										    hoverOffset: 4
										  }]
											
										}}

										height  = {150}
										width   = {250}
										options = {{
											maintainAspectRatio: false,
											scales: {
									            y: {
									                beginAtZero: true
									            }
									        }
										}}
									/></td>
			          	<td>_% Resistant to 3rd Generation Cephalosporin</td>
			          </tr>	          
			          
			        </tbody>
			      </table> 
    	</div>
		</div>;
	}	


}

export default Glass;