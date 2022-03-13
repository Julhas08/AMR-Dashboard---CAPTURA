import React, {Component } from 'react';
import * as XLSX from 'xlsx';
import IsolateByMonth from './components/Charts/IsolateByMonth';
import IsolateByYear from './components/Charts/IsolateByYear';
import Gender from './components/Charts/Gender';
import CommonOrganisms from './components/Charts/CommonOrganisms';
import SpecimenType from './components/Charts/SpecimenType';
import OrganismDefinition from './components/Tables/OrganismDefinition';
import Glass from './components/Tables/Glass';
import './App.css';

import { saveAs } from 'file-saver';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isolates: [],
            isolatesYearly: [],
            female: [],
            male: [],
            gender: [],
            organism: [],
            specimen: [],
            blood: [],
            respiratory: [],
            softtissue: [],
            stool: [],
            urine: [],
            genital: [],
            othersSpec: [],
            glass: [],
            allSpecimensByOrgs: [],
            commonColors: [
              'rgb(0, 109, 1)',
              'rgb(249, 2, 3)',
              'rgb(38, 71, 131)',
              'rgb(255, 255, 0)',
              'rgb(122, 2, 106)',
              'rgb(207, 146, 70)',
              'rgb(147, 88, 241)',
              'rgb(135, 231, 19)',
              'rgb(54, 34, 86)',
              'rgb(138, 28, 180)'
            ],

        };
    }
    componentDidMount(){
        
      }
  
    render() {
      let self = this;
      // console.log("yearlyIsolates: ", this.state.yearlyIsolates); 
      
      // Excel file reader      
      
      const readExcel = (file) =>{

          //const promise  = new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (ei) => {
              const bufferArray = ei.target.result;
              const wb          = XLSX.read(bufferArray, {type: "buffer"});
              const isolateList = wb.SheetNames[0];
              const femaleList  = wb.SheetNames[1];
              const maleList    = wb.SheetNames[2];
              const commonOrganism = wb.SheetNames[3];
              const specimenType   = wb.SheetNames[4];              
              const bloodList      = wb.SheetNames[5];              
              const genitalList= wb.SheetNames[6];
              const respiratoryList = wb.SheetNames[7];
              const softtissueList  = wb.SheetNames[8]; 
              const stoolList  = wb.SheetNames[9];             
              const urineList  = wb.SheetNames[10];
              const othersSpecList = wb.SheetNames[11];
              const glassList      = wb.SheetNames[12]; 

              self.setState({
                isolates: XLSX.utils.sheet_to_json(wb.Sheets[isolateList]),
                female: XLSX.utils.sheet_to_json(wb.Sheets[femaleList]),
                male: XLSX.utils.sheet_to_json(wb.Sheets[maleList]),
                organism: XLSX.utils.sheet_to_json(wb.Sheets[commonOrganism]),
                specimen: XLSX.utils.sheet_to_json(wb.Sheets[specimenType]),
                blood: XLSX.utils.sheet_to_json(wb.Sheets[bloodList]),
                genital: XLSX.utils.sheet_to_json(wb.Sheets[genitalList]),
                respiratory: XLSX.utils.sheet_to_json(wb.Sheets[respiratoryList]),
                softtissue: XLSX.utils.sheet_to_json(wb.Sheets[softtissueList]),
                urine: XLSX.utils.sheet_to_json(wb.Sheets[urineList]),
                stool: XLSX.utils.sheet_to_json(wb.Sheets[stoolList]),
                othersSpec: XLSX.utils.sheet_to_json(wb.Sheets[othersSpecList]),
                glass: XLSX.utils.sheet_to_json(wb.Sheets[glassList]),
              });
              /*var excelData = this.state.isolates[0];
              console.log("isolates: ", excelData );
              var t = this.state.isolates.map(function (col, c) {
                  // For each column, iterate all rows
                  return this.state.isolates.map(function (row, r) { 
                      return this.state.isolates[r][c]; 
                  }); 
              });
              console.log("Transpose: ", t);*/
              this.state.allSpecimensByOrgs.push(this.state.blood, this.state.respiratory,this.state.softtissue, this.state.urine, this.state.stool, this.state.genital, this.state.othersSpec);

              // this.state.allSpecimensByOrgs.push({"BLOOD": this.state.blood}, {"RESPIRATORY": this.state.respiratory}, {"SOFTTISSUE": this.state.softtissue}, {"URINE": this.state.urine}, {"STOOL": this.state.stool}, {"GENITAL": this.state.genital}, {"OTHERS": this.state.othersSpec});
              // Prepare the number of isolates by year 

              // Split and unify the years
              var objIsolate = [];
              this.state.isolates.map((response) => {

                var data     = response.date + '';
                var dateYear = data.split("/");
                if (typeof dateYear[1] !== 'undefined' && typeof response.total !== 'undefined') {
                  objIsolate.push({ date: 20+dateYear[1], number: response.total });
                }

              });
              // Array group by year
              var yearGrouping = {};
              objIsolate.forEach(function(d) {
                if (yearGrouping.hasOwnProperty(d.date)) {
                  yearGrouping[d.date] = yearGrouping[d.date] + d.number;
                } else {
                  yearGrouping[d.date] = d.number;
                }
              });

              var yearlyIsolates = [];
              for (var prop in yearGrouping) {
                yearlyIsolates.push({ date: prop, number: yearGrouping[prop] });
              }
              if (yearlyIsolates.length > 0) {
                this.setState({
                  isolatesYearly: yearlyIsolates 
                }); 
              }

            }
            

            /*fileReader.onerror = (error) => {
              reject(error);
            };*/
          //});

          /*promise.then((response)=> {
            let newState = Object.assign({}, ...this.state,  {running: response});
            console.log({newState});
            this.state.setMales(response);
          })*/  
        }

        const fileSave = () =>{
          const content = document.cloneNode(true);
          saveAs(
            new Blob([content.documentElement.outerHTML], { type: "text/html;charset=utf-8"}),
            "dashboard.html"
          )
        }

        const saveCanvas = () => {
           const canvasSave = document.getElementById('IsolateByMonth');
           console.log(canvasSave);
           canvasSave.toBlob(function (blob) {
               saveAs(blob, "IsolateByMonth.png")
           })
        }
        // <button className="btn btn-primary"  onClick = {saveCanvas} type="submit" className="DashboardSavePage">Download</button>
        return (
            <div className = "container">
              <header className = "container App">
                <img src='/logo.png' className="App-logo" />
                <div className="Dashname"> AMR Dashboard </div>
              </header>             
              <main className="Main">
                <div className="row container">
                  <p> By uploading your own dataset, you can create your own dashboard. The Excel / CSV dataset must be prepared according to the instructions.  </p>
                  <input className="form-control" type="file" onChange = {(ef)=> {
                    const file = ef.target.files[0];
                    readExcel(file);
                  }} />
                </div>
                <div className="row DashTitle">
                    { this.state.isolates && this.state.isolates.length > 0 ? (
                      <div> Epidemiology Reports </div>
                       
                    ) : (
                      ''
                    )}
                    <div>
                    { this.state.isolates && this.state.isolates.length > 0 ? (
                      <button className="btn btn-primary" onClick = {fileSave} type="submit" className="DashboardSavePage">Save page</button>
                       
                    ) : (
                      ''
                    )}
                      
                    </div>

                </div>
                <div className="row">
                  
                  <div className="col ColPadding">
                    
                    { this.state.isolates && this.state.isolates.length > 0 ? (
                      
                      <div><IsolateByMonth isolates = {this.state.isolates} id="IsolateByMonth" colors = {this.state.commonColors} /> </div>
                    ) : (
                      ''
                    )}
                    
                  </div>
                  <div className="col ColPadding">
                    
                    { this.state.isolatesYearly && this.state.isolatesYearly.length > 0 ? (
                      
                      <div><IsolateByYear isolatesYearly = {this.state.isolatesYearly} id="IsolateByYear" colors = {this.state.commonColors} /> </div>
                    ) : (
                      ''
                    )}
                    
                  </div>
                  
                  
                </div>
                <div className="row">
                  <div className="col ColPadding">
                    { (this.state.female && this.state.female.length) > 0 ? (
                      <Gender female = {this.state.female} male = {this.state.male} colors = {this.state.commonColors} />
                    ) : (
                      ''
                    )}                  
                  </div>
                 <div className="col ColPadding">
                    { this.state.organism && this.state.organism.length > 0 ? (
                      <CommonOrganisms organism = {this.state.organism} colors = {this.state.commonColors} />
                    ) : (
                      ''
                    )}
                    
                  </div>

                </div>  
                <div className="row container">
                
                    <div className="col-12 ColPadding">

                      { this.state.specimen && this.state.specimen.length > 0 ? (

                        <SpecimenType specimen = {this.state.specimen} colors = {this.state.commonColors} blood = {this.state.blood} respiratory = {this.state.respiratory} softtissue = {this.state.softtissue} genital = {this.state.genital} urine = {this.state.urine} stool = {this.state.stool} othersSpec = {this.state.othersSpec} allSpecimens = {this.state.allSpecimensByOrgs} /> 
                      ) : (
                        ''
                      )}
                                       
                    </div>  
                  
                </div>
                <div className="row"> 
                  <div className="col-12 ColPaddingTable">
                    { this.state.organism && this.state.organism.length > 0 ? (
                        <OrganismDefinition organism = {this.state.organism} colors = {this.state.commonColors} />
                      ) : (
                        ''
                      )}
                  </div>  
                </div>  
                <div className="row">  
                  <div className="col-12 ColPaddingTable">
                    { this.state.glass && this.state.glass.length > 0 ? (
                      <Glass glass = {this.state.glass} specimen = {this.state.specimen} colors = {this.state.commonColors}/> 
                    ) : (
                      ''
                    )}                    
                    
                  </div>
                </div>  
              </main>
              <footer className = "FooterBG">                
                <div className="FooterLeft"> Created using data collected by the <a href="https://captura.ivi.int/" target="_blank">CAPTURA Consortium </a> </div>
                <div className="FooterRight"> Ⓒ 2022 CAPTURA </div>
              </footer> 
            </div>
        );
    }
    
}

export default App;
