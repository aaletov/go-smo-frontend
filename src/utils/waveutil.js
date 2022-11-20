import { Utils } from 'react-chartjs-2';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

export default async function getGrid() {
  let waveInfo = await fetch("http://localhost:8081/getWaveInfo")
  .then((r) => r.json())
  const approxDotNum = 50
  const startX = toInt(waveInfo.startTime)
  const endX = toInt(waveInfo.endTime)
  const stepX = Math.ceil(((endX - startX) / approxDotNum) / 10) * 10
  const dotNum = Math.ceil((endX - startX) / stepX)
  console.log(startX)
  console.log(endX)
  console.log(stepX)
  const gridX = [startX]
  for (let i = 1; i < dotNum; i++) {
    gridX.push(i * stepX)
  }
  //gridX.push(endX)
  console.log(waveInfo)
  
  const sourcesWave = []
  waveInfo.sources.forEach((apiSource) => {
    const wave = getSourceWave(apiSource, dotNum, stepX)
    sourcesWave.push({
      name: `Source #${apiSource.sourceNum}`,
      dots: wave.dots,
      labels : wave.labels,
    })
  })

  const buffersWave = []
  waveInfo.buffers.forEach((apiBuffer) => {
    const wave = getBufferWave(apiBuffer, dotNum, stepX)
    buffersWave.push({
      name: `Buffer #${apiBuffer.bufNum}`,
      dots: wave.dots,
      labels: wave.labels,
    })
  })

  const devicesWave = []
  waveInfo.devices.forEach((apiDevice) => {
    const wave = getDeviceWave(apiDevice, dotNum, stepX)
    devicesWave.push({
      name: `Device #${apiDevice.devNum}`,
      dots: wave.dots,
      labels: wave.labels,
    })
  })

  const scales = {}
  const datasets = []
  new Array(sourcesWave, buffersWave, devicesWave).forEach((cat) => {
    cat.forEach((comp) => {
      console.log(comp.dots)
      scales[comp.name] = {
        afterFit: function(scaleInstance) {
          scaleInstance.width = 70; // sets the width to 100px
        },
        type: 'category',
        labels: [comp.name, ''],
        offset: true,
        position: 'left',
        stack: 'demo',
        stackWeight: 1,
        grid: {
          borderColor: CHART_COLORS.red
        },
      }
      datasets.push({
        label: comp.name,
        data: comp.dots,
        borderColor: CHART_COLORS.red,
        backgroundColor: CHART_COLORS.red,
        stepped: true,
        yAxisID: comp.name,
        datalabels: {
          formatter: (val, ctx) => comp.labels[ctx.dataIndex],
          align: 'center',
          anchor: 'start',
          //offest: 3,
        },
      },)
    })
  })

  return {
    options: {
      layout: {
        padding: {
            left: 0
        }
      },
      //responsive: true,
      events: [],
      elements: {
        point:{
            radius: 0
        }
      },
      maintainAspectRatio: false,
      scales: scales,
      plugins: {
        datalabels: {
          backgroundColor: function(context) {
            return CHART_COLORS.blue;
          },
          borderRadius: 4,
          color: 'white',
          font: {
            weight: 'bold'
          },
          padding: 4
        },
        legend: {
          display: false,
        },
      },
    },
    data: {
      labels: gridX,
      datasets: datasets,
    },
  }
}

function toInt(timestamp) {
  return new Date(timestamp).valueOf()
}

function getSourceWave(apiSource, dotNum, step) {
  const wave = {
    dots: new Array(dotNum).fill(''), 
    labels: new Array(dotNum).fill(null),
  }
  apiSource.generated.forEach((rwt) => {
    console.log(toInt(rwt.time))
    console.log(step)
    const intTime = toInt(rwt.time)
    const genDot = Math.floor(intTime / step)
    wave.labels[genDot] = `${rwt.request.sourceNumber}.${rwt.request.requestNumber}`
    wave.dots[genDot] = `Source #${apiSource.sourceNum}`
  })

  return wave
}

function getBufferWave(apiBuffer, dotNum, step) {
  console.log(apiBuffer)
  const wave = {
    dots: new Array(dotNum).fill(''), 
    labels: new Array(dotNum).fill(null),
  }
  apiBuffer.processed.forEach((rwse) => {
    const startTime = toInt(rwse.start)
    const endTime = toInt(rwse.end)
    let startDot = Math.floor(startTime / step)
    const endDot = Math.floor(endTime / step)
    wave.labels[startDot] = `${rwse.request.sourceNumber}.${rwse.request.requestNumber}`
    for (; startDot <= endDot; startDot++) {
      wave.dots[startDot] = `Buffer #${apiBuffer.bufNum}`
    }
  })

  if ("current" in apiBuffer) {
    const rwt = apiBuffer.current
    let currentStartDot = Math.floor(toInt(rwt.time) / step)
    wave.labels[currentStartDot] = `${rwt.request.sourceNumber}.${rwt.request.requestNumber}`
    for (; currentStartDot < dotNum; currentStartDot++) {
      console.log(currentStartDot)
      wave.dots[currentStartDot] = `Buffer #${apiBuffer.bufNum}`
    }
  }

  return wave
}

function getDeviceWave(apiDevice, dotNum, step) {
  const wave = {
    dots: new Array(dotNum).fill(''), 
    labels: new Array(dotNum).fill(null),
  }
  apiDevice.done.forEach((rwse) => {
    const startTime = toInt(rwse.start)
    const endTime = toInt(rwse.end)
    let startDot = Math.floor(startTime / step)
    const endDot = Math.floor(endTime / step)
    wave.labels[startDot] = `${rwse.request.sourceNumber}.${rwse.request.requestNumber}`
    for (; startDot <= endDot; startDot++) {
      wave.dots[startDot] = `Device #${apiDevice.devNum}`
    }
  })

  if ("current" in apiDevice) {
    const rwt = apiDevice.current
    let currentStartDot = Math.floor(toInt(rwt.time) / step)
    wave.labels[currentStartDot] = `${rwt.request.sourceNumber}.${rwt.request.requestNumber}`
    for (; currentStartDot < dotNum; currentStartDot++) {
      wave.dots[currentStartDot] = `Device #${apiDevice.devNum}`
    }
  }

  return wave
}