import React, {useState } from 'react';
import * as XLSX from 'xlsx';
import MalesPie from './components/MalesPie';

const App = () => {
    const [males, setMales] = useState([]);

      const readExcel = (file) =>{

        const promise  = new Promise((resolve, reject) => {

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (ei) =>{
          const bufferArray = ei.target.result;
          const wb = XLSX.read(bufferArray, {type: "buffer"});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname]; 

          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);

        }

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((d)=> {
        setMales(d);
      })  
    }
  
  return (
    <div className="container">
       <input type="file" onChange = {(ef)=> {
        const file = ef.target.files[0];
        readExcel(file);
      }} />
      <table className="table">

        <thead>
          <tr>
            <th scope="col">Age</th>
            <th scope="col">Patients</th>
          </tr>
        </thead>
        <tbody>
          {males.map((d) => (
            <tr key={d.Age}>
              <td>{d.Age}</td>
              <td>{d.Number_of_isolates}</td>
            </tr>
          ))}
          
          
        </tbody>
      </table> 
       <MalesPie /> 
    </div>
  );
}

export default App;
