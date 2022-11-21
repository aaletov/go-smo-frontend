export default async function getPivot() {
  let pivotInfo = await fetch("http://localhost:8081/getPivotInfo")
  .then((r) => r.json())
  console.log(pivotInfo)
  let id = 0
  pivotInfo.sourcesPivotInfo.forEach((row) => {
    row["id"] = id
    id++
  })
  id = 0
  pivotInfo.devicesPivotInfo.forEach((row) => {
    row["id"] = id
    id++
  })

  return {
    sourceRows: pivotInfo.sourcesPivotInfo,
    deviceRows: pivotInfo.devicesPivotInfo
  }
}