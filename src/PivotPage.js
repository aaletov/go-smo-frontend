import React, { Component, useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import getPivot from './utils/pivotutil';

export default function PivotPage() {
  const [sourceRows, setSourceRows] = useState([])
  const [deviceRows, setDeviceRows] = useState([])
  const sourceColumns = [
    {field: 'name', headerName: 'Name'}, 
    {field: 'reqCount', headerName: 'Requests Count'},
    {field: 'rejChance', headerName: 'Reject Chance'},
    {field: 'waitTime', headerName: 'Wait Time'},
    {field: 'sysTime', headerName: 'System Time'},
    {field: 'procTime', headerName: 'Processing Time'},
    {field: 'waitTimeDispertion', headerName: 'Wait Time Dispertion'},
    {field: 'procTimeDispertion', headerName: 'Processing Time Dispertion'},
  ];

  const deviceColumns = [
    {field: 'name', headerName: 'Name'},
    {field: 'usageCoef', headerName: 'Usage'},
  ];

  useEffect(() => {
    async function updatePage() {
      const pivotInfo = await getPivot()
      setSourceRows(pivotInfo.sourceRows)
      setDeviceRows(pivotInfo.deviceRows)
    }
    updatePage()
  }, [])
  

  return (
    <Box
      position="relative"
      sx={{
      width: "100%",
      height: "85vh",
      }}>
      <DataGrid
      rows={sourceRows}
      columns={sourceColumns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      />
      <DataGrid
      rows={deviceRows}
      columns={deviceColumns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      />
    </Box>
  );
}