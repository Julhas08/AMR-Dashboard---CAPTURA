import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
class IsolateByMonth extends Component {

	render() {

		const date = this.props.isolates.map((response) => {
			return response.date;
		});
		const total = this.props.isolates.map((response) => {
			return response.total;
		});

		// Dynamic color picker by year
		var bgColArray = [];
           
		for (var i = 0; i < total.length; i++) {

			for (var j = 0; j < 12; j++) {
				bgColArray.push(this.props.colors[i]);
			}	
				
		}

		return <div>		
			
			<Bar 
				id="IsolateByMonth"
				data = {{
					labels: date,
					datasets: [
						{
							label: 'Number of isolates by months',
							data: total,
							backgroundColor: bgColArray,
				            borderColor: bgColArray,
				            borderWidth: 1,
				            borderRadius: 2
						}
					]
					
				}}

				height  = {300}
				width   = {200}
				options = {{
					maintainAspectRatio: false,
					scales: {
			            y: {
			                beginAtZero: true
			            }
			        }
				}}
			/>
			
		</div>;
	}	


}

export default IsolateByMonth;