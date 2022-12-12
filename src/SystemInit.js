import React, { Component, useEffect, useState, useRef } from "react";
import { Box, FormGroup, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";

export default function SystemInit() {
  let sourcesCountRef = useRef()
  let buffersCountRef = useRef()
  let devicesCountRef = useRef()
  let sourcesLambdaRef = useRef()
  let devARef = useRef()
  let devBRef = useRef()
  let iterationsCountRef = useRef()
  let stepModeRef = useRef()

  return (
    <Box
      position="relative"
      sx={{
      width: "100%",
      height: "85vh",
      }}>
        <FormGroup 
          width = "100px"
          >
          <TextField id = "sourcesCount" label="Sources Count" variant="outlined" inputRef={sourcesCountRef}/>
          <TextField id = "buffersCount" label="Buffers Count" variant="outlined" inputRef={buffersCountRef}/>
          <TextField id = "devicesCount" label="Devices Count" variant="outlined" inputRef={devicesCountRef}/>
          <TextField id = "sourcesLambda" label="Sources Lambda (in seconds)" variant="outlined" inputRef={sourcesLambdaRef}/>
          <TextField id = "devA" label="Device A (in ms)" variant="outlined" inputRef={devARef}/>
          <TextField id = "devB" label="Device B (in ms)" variant="outlined" inputRef={devBRef}/>
          <TextField id = "iterCount" label="Iterations count" variant="outlined" inputRef={iterationsCountRef}/>
          <FormControlLabel control={<Checkbox inputRef={stepModeRef}/>} label="Step mode" />
          <Button variant="contained"
            onClick={async () => {
              await fetch(
                "http://localhost:8081/initSystem", {
                  method: "POST",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sourcesCount: parseInt(sourcesCountRef.current.value) || 0,
                    buffersCount: parseInt(buffersCountRef.current.value) || 0,
                    devicesCount: parseInt(devicesCountRef.current.value) || 0,
                    sourcesLambda: sourcesLambdaRef.current.value + "ms",
                    devA: devARef.current.value + "ms",
                    devB: devBRef.current.value + "ms",
                    stepMode: stepModeRef.current.checked,
                    iterationsCount: parseInt(iterationsCountRef.current.value) || 0,
                  })
                }
              );
            }}
          >Initialize</Button>
          <Button variant="contained"
          onClick={async () => {
            await fetch(
              "http://localhost:8081/doStep", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
            }
          );
        }}>=></Button>
        </FormGroup>
    </Box>
  );
}