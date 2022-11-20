import { Utils } from 'react-chartjs-2';

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
  const dotNum = 50
  const startX = toInt(waveInfo.startTime)
  const endX = toInt(waveInfo.endTime)
  const stepX = (endX - startX) / dotNum
  console.log(startX)
  console.log(endX)
  console.log(stepX)
  const gridX = [startX]
  for (let i = 1; i < dotNum - 1; i++) {
    gridX.push(i * stepX)
  }
  gridX.push(endX)
  console.log(waveInfo)
  
  const sources = []
  waveInfo.sources.forEach((apiSource) => {
    sources.push({
      name: `Source #${apiSource.sourceNum}`,
      dots: getSourceWave(apiSource, dotNum, stepX),
    })
  })

  const buffers = []
  waveInfo.buffers.forEach((apiBuffer) => {
    buffers.push({
      name: `Buffer #${apiBuffer.bufNum}`,
      dots: getBufferWave(apiBuffer, dotNum, stepX)
    })
  })

  const devices = []
  waveInfo.devices.forEach((apiDevice) => {
    devices.push({
      name: `Device #${apiDevice.devNum}`,
      dots: getDeviceWave(apiDevice, dotNum, stepX)
    })
  })

  const scales = {}
  const datasets = []
  new Array(sources, buffers, devices).forEach((cat) => {
    cat.forEach((comp) => {
      console.log(comp.dots)
      scales[comp.name] = {
        type: 'category',
        labels: [comp.name, ''],
        offset: true,
        position: 'left',
        stack: 'demo',
        stackWeight: 1,
        grid: {
          borderColor: CHART_COLORS.blue
        }
      }
      datasets.push({
        label: comp.name,
        data: comp.dots,
        borderColor: CHART_COLORS.red,
        backgroundColor: CHART_COLORS.red,
        stepped: true,
        yAxisID: comp.name,
      },)
    })
  })

  return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: scales
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
  const dots = new Array(dotNum).fill('')
  apiSource.generated.forEach((rwt) => {
    console.log(toInt(rwt.time))
    console.log(step)
    const intTime = toInt(rwt.time)
    const genDot = Math.floor(intTime / step)
    dots[genDot] = `Source #${apiSource.sourceNum}`
  })

  return dots
}

function getBufferWave(apiBuffer, dotNum, step) {
  const dots = new Array(dotNum).fill('')
  apiBuffer.processed.forEach((rwse) => {
    const startTime = toInt(rwse.start)
    const endTime = toInt(rwse.end)
    let startDot = Math.floor(startTime / step)
    const endDot = Math.floor(endTime / step)
    for (; startDot <= endDot; startDot++) {
      dots[startDot] = `Buffer #${apiBuffer.bufNum}`
    }
  })

  return dots
}

function getDeviceWave(apiDevice, dotNum, step) {
  const dots = new Array(dotNum).fill('')
  apiDevice.done.forEach((rwse) => {
    const startTime = toInt(rwse.start)
    const endTime = toInt(rwse.end)
    let startDot = Math.floor(startTime / step)
    const endDot = Math.floor(endTime / step)
    for (; startDot <= endDot; startDot++) {
      dots[startDot] = `Device #${apiDevice.devNum}`
    }
  })

  return dots
}