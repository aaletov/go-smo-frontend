import React, { Component, useEffect, useState, useRef } from "react";
import Box from '@mui/material/Box';
import { Line } from 'react-chartjs-2';
import getGrid from './utils/waveutil';

export default function Stuff() {
  //const grid = await getGrid()
  const [grid, setGrid] = useState({
    data: {
      labels: [""],
      datasets: [{
        label: "",
        data: [""]
      }]
    }, 
    options: ""
  })
  useEffect(() => {
    async function updateGrid() {
      const newGrid = await getGrid()
      setGrid(newGrid)
    }
    updateGrid()
  }, [])

  const [width, setWidth] = useState("auto")
  // const ref = useRef(0)
  // const [plotLabels, setPlotLabels] = useState(new Array(100).fill(""));
  // const [setData, setSetData] = useState(new Array(100).fill(10));
  // const poptions = {
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     }
  //   }
  // };
  // let startWidth = 0

  // let interval = setInterval(() => {
  //   if (width == "auto") {
  //     startWidth = ref.current.width
  //   }
  //   const newSetData = setData.slice()
  //   const newPlotLabels = plotLabels.slice()
  //   for (let i = 0; i < 20; i++) {
  //     newSetData.push(10 + i)
  //     newPlotLabels.push("")
  //   }
  //   setSetData(newSetData);
  //   setPlotLabels(newPlotLabels);
  //   const intWidth = ref.current.width
  //   setWidth(String(intWidth + startWidth) + "px");
  // }, 2000);
  
  return (
    <Box sx={{
      overflowX: "scroll"
      }}
      height = "90vh"
      width = {width}
      >
      <Line
        //ref = {ref}
        type = "bar"
        // data = {{
        //   labels: plotLabels,
        //   datasets: [{
        //     label: '# of Votes',
        //     data: setData,
        //     borderWidth: 1
        //   }]
        // }}
        data = {grid.data}
        //data = {grid.data}
        options = {grid.options}
      />
    </Box>
  );
}
