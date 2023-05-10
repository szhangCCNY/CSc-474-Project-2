const fs = require('fs');
const path = require('path');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
const server = app.listen(8000, () =>
console.log('Server ready'))

const jsonPath = "./json_files/"
const jsonList = ["strength.json", "weakness.json", "opportunity.json", "threat.json"]



app.get("/getdata", (req, res) => {
    console.log("in here");
    const dataList = []
    const handleAllProcessed = () => {
        console.log("all processed");
        res.send(dataList)
    } 
    for (let i = 0; i < 4; i += 1){
        const response = getFile(`${jsonPath}${jsonList[i]}`);
        response.then((data) => {dataList.push(data); if (dataList.length === jsonList.length) {return handleAllProcessed()}})
        .catch((err) => {dataList.push([]); if (dataList.length === jsonList.length) {return handleAllProcessed()}});
    }
})

function getFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    })
}

// -- tested out changing files, works when fetched
// setInterval(() => {
//     getFile("./json_files/strength.json").then((data) => console.log(data))
// }, 5000)

// for (let i = 0; i < 4; i += 1){
//     const path = `${jsonPath}${jsonList[i]}`
//     console.log(path)
//     const response = fetch(path)
//     const json = response.then((json) => {return json})
//     console.log(json)
// }
