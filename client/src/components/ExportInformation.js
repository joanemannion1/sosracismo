import React from 'react';
import ExportExcel from 'react-export-excel';
import { Button} from 'react-bootstrap';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const ExportInformation = ({data}) => {
    
    return (
      <>
        <ExcelFile element={<Button variant="primary" ><i class="fas fa-file-download"></i> Exportar</Button>} filename="sosRacismo">
          <ExcelSheet data={data} name={'Hoja1'}>
            <ExcelColumn label="Herrialdea / País" value="nacionalidad"/>
            <ExcelColumn label="Emakumeak / Mujeres" value="nombre"/>
            <ExcelColumn label="Gizonak / Hombres" value="apellido1"/>
          </ExcelSheet>
        </ExcelFile>
      </>
  
    );
  }
  
  export default ExportInformation;