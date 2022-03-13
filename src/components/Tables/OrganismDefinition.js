import React, { Component } from 'react';
import '../../App.css';

class OrganismDefinition extends Component {

	render() {
		// Sort organism

    	var sortedOrganism = this.props.organism.sort(function(a, b){
		    if(a.Code < b.Code) { return -1; }
		    if(a.Code > b.Code) { return 1; }
		    return 0;
		});
		var arrLength = sortedOrganism.length;
		var middleVal = Math.round((sortedOrganism.length - 1) / 2);
		var firstArr  = sortedOrganism.slice(0, middleVal);
		var secondArr = sortedOrganism.slice(middleVal);

		return <div className="TableProperty">
			<h5> INDEX/ LEGEND for Organism Names</h5>
			<div className="OrgDefinition">
				<table className="table">
					<thead>
					  <tr>
					    <th scope="col">Organism code</th>
					    <th scope="col">Abbreviation</th>
					  </tr>
					</thead>
					<tbody>
					  {firstArr.map((d) => (
					    <tr key={d.Code } width="15%">
					      <td>{d.Code}</td>
					      <td>{d.Organism}</td>
					    </tr>
					  ))}		          
					  
					</tbody>
				</table> 
			</div>
			<div className="OrgDefinition">
				<table className="table">
					<thead>
					  <tr>
					    <th scope="col">Organism code</th>
					    <th scope="col">Abbreviation</th>
					  </tr>
					</thead>
					<tbody>
					  {secondArr.map((d) => (
					    <tr key={d.Code } width="15%">
					      <td>{d.Code}</td>
					      <td>{d.Organism}</td>
					    </tr>
					  ))}		          
					  
					</tbody>
				</table> 
			</div>
		</div>;
	}	


}

export default OrganismDefinition;