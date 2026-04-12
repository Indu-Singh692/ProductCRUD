const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'../data/products.json');

//read Data
const readData = ()=>{
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

//write data 
const writeData = (data)=>{
    fs.writeFileSync(filePath,JSON.stringify(data,null,2));
};

module.exports = {readData,writeData};