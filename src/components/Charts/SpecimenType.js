import React, { Component } from 'react';
import Blood from './Specimens/Blood';
import Respiratory from './Specimens/Respiratory';
import Softtissue from './Specimens/Softtissue';
import Stool from './Specimens/Stool';
import Urine from './Specimens/Urine';

import Genital from './Specimens/Genital';
import OtherSpecimen from './Specimens/OtherSpecimen';

import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class SpecimenType extends Component {
  
  render() {
    const specimen = this.props.specimen.map((response) => {

      //var num = response['Number of patients'];
      //console.log({num});
      return response['Number of patients'];
    });

    // Sort spcimen by desc
    var sortedSpecimen = this.props.specimen.sort(({['Number of patients']:a}, {['Number of patients']:b}) => b-a);

    // Generate color key 
    var chartObj = [];
    for (var i = 0; i < sortedSpecimen.length; i++) {
      
      chartObj.push({name: sortedSpecimen[i].Specimen, y: sortedSpecimen[i]['Number of patients'], color: this.props.colors[i]})
    }
    // Calculate total isolates
    var totalIsolates = chartObj.reduce(function(sum, current) {
      return sum + current.y;
    }, 0);

    const optionsSpecimenTypes = {
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
          text: 'Types of specimen'
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

    // Custom area
    /*function sortDesc(a,b) { //sort in descending order
        return b[0] - a[0];
    }
    var sortedSpecimenAll = this.props.allSpecimens.sort(sortDesc);
    // console.log("All specimens: ", this.props.allSpecimens);

    var allSpecObj1 = [];
    for (var i = 0; i < this.props.allSpecimens.length; i++) {
      var allSpecObj2 = [];

      var totalPatients = this.props.allSpecimens[i].reduce(function(sum, current) {
        return sum + current.Number_of_patients;
      }, 0);

      var individualArrSpecimen = this.props.allSpecimens[i];

      allSpecObj2.push({individualArrSpecimen, totalPatients});       
      allSpecObj1.push(allSpecObj2);
    }

    function sortDesc1(a,b) { //sort in descending order
        return b[0] - a[0];
    }
    // var sortedSpecimenArr = allSpecObj1.sort(sortDesc1);
    var sortedSpecimenArr = allSpecObj1.sort(({totalPatients: a }, {totalPatients: b }) => b-a);
    // console.log(sortedSpecimenArr);

    allSpecObj1.map((result)=>{
      console.log("result: ",  result);
      // console.log("totalPatients: ",  result[0].totalPatients);
      var sortedSpecimenArr = result.sort(({totalPatients: a }, {totalPatients: b }) => b-a);
      // var sortedSpecimenArr = result.sort(({ total: a}, { total: b}) => b-a);
      // console.log("sortedSpecimenArr: ",sortedSpecimenArr);
    });*/
    
    // console.log(this.props.genital[0]['Number of isolates']);

    var bl =this.props.blood;
    // Specimen types and organism
    var chartDisplay = this.props.allSpecimens.reduce(function(index, current) {
      // console.log(current);

      return <Blood blood = {bl} colors = {chartObj[0].color}/>;
    }, 0);

    //containerProps={{ style: { height: "550px", width: "600px" } }}
    return <div>
      
    <div className="col-4 OrgColumn">
        <PieChart highcharts={Highcharts} options={optionsSpecimenTypes} containerProps={{ style: { minHeight: "450px" } }}/>
      </div>
      <div className="col-8 OrgColumn StgIndicator">
          <table className="table">
              <tbody>
                <tr>
                    { this.props.blood && this.props.blood.length > 0 ? (
                      
                      <td>{chartDisplay}</td>
                    ) : (
                      ''
                    )}

                    { this.props.respiratory && this.props.respiratory.length > 0 ? (
                      
                      <td><Respiratory respiratory = {this.props.respiratory} colors = {this.props.colors}/> </td>
                    ) : (
                      ''
                    )}

                    { this.props.softtissue && this.props.softtissue.length > 0 ? (
                      
                      <td><Softtissue softtissue = {this.props.softtissue} colors = {this.props.colors}/></td>
                    ) : (
                      ''
                    )}                 
                  
                  
                </tr>
                <tr>
                    { this.props.genital && this.props.genital.length > 0 ? (
                      
                      <td><Genital genital = {this.props.genital} colors = {this.props.colors}/> </td>
                    ) : (
                      ''
                    )}
                    { this.props.urine && this.props.urine.length > 0 ? (
                      
                      <td><Urine urine = {this.props.urine}  colors = {this.props.colors}/> </td>
                    ) : (
                      ''
                    )}
                    { this.props.stool && this.props.stool.length > 0 ? (
                      
                      <td><Stool stool = {this.props.stool} colors = {this.props.colors}/> </td>
                    ) : (
                      ''
                    )}
                  
                  
                  
                </tr>
                <tr>
                    { this.props.othersSpec && this.props.othersSpec.length > 0 ? (
                      
                      <td> <OtherSpecimen othersSpec = {this.props.othersSpec} colors = {this.props.colors}/> </td>
                    ) : (
                      ''
                    )}
                  
                </tr>           
                
              </tbody>
            </table> 
      </div>
    </div>;
  } 


}

export default SpecimenType;