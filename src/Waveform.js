import React, { useState } from "react";
import Box from '@mui/material/Box';
import './waveform.css'; 
//import WaveFetcher from './WaveFetcher.js';

export default function Waveform() {
  const [waveScript, setWaveScript] = useState()

  React.useEffect(() => {
    fetch("http://localhost:8081/getWaveNumber")
    .then((response) => {
      return response.json();
    })
    .then((num) => {
      let script = {}
      script.signal = []
      for (let i = 0; i < num; i++) {
        script.signal.push({name: "c", wave: "p"})
      }
      setWaveScript(`<script type="WaveDrom">${JSON.stringify(script)}</script>`)
      eval("WaveDrom.ProcessAll()")
    });
    const interval = setInterval(()=>{
      let promises = []
      promises.push(fetch("http://localhost:8081/getWaveInfo")
      .then((response) => {
        return response.json();
      }))
      .then((json) => {
        console.log(json)
      })

      // setWaveScript(`
      //   <script type="WaveDrom">
      //     { signal : [
      //       { name: "clk",  wave: "p......" },
      //       { name: "bus",  wave: "x.34.5x",   data: "head body tail" },
      //       { name: "wire", wave: "0.1..0." },
      //     ]}
      //   </script>
      // `)
      eval("WaveDrom.ProcessAll()")
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <Box
      position="relative"
      sx={{
      width: "100%",
      height: "100%",
      }}>
      <div dangerouslySetInnerHTML={{__html: waveScript}}/>
    </Box>
  );
}