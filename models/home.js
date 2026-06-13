const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/pathUtil');

let homes = [];

exports.Home = class Home{
  constructor(hauseName , price , location , rating , image){
    this.hauseName = hauseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.image = image;
  }
  

  save(){
    homes.push(this);
    const filePath = path.join(rootDir,'data','homes.json');
    fs.writeFile(filePath,JSON.stringify(homes),(err)=>{
      if(err){
        console.log(err);
      }
    });
  }
  static fetchAll(callback){
  const filePath = path.join(rootDir,'data','homes.json');

  fs.readFile(filePath,(err,data)=>{
    if(err){
      return callback([]);  
    }

    try {
      const parsedData = JSON.parse(data);

      
      callback(Array.isArray(parsedData) ? parsedData : []);
    } catch (error) {
      callback([]); 
    }
  });
}
};

