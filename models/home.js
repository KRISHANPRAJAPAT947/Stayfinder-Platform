const {getDb} = require('../utils/databaseUtils'); 
const { ObjectId } = require('mongodb');
const Favourite = require("./favourite");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl,description,_id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this._id = _id;
  }

  save() {
     const db = getDb();
     const update = {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      photoUrl: this.photoUrl,
      description: this.description
     }
    if (this._id) {
      const homeId = new ObjectId(String(this._id));
      return db.collection('homes').updateOne({ _id: homeId }, { $set: update });
    } else {
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();
   
  }

  static findById(homeId) {
    const db = getDb();
    return db.collection('homes').findOne({_id: new ObjectId(String(homeId))});
  }
  
  static deleteById(homeId) { 
    const db = getDb();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});

  } 

};  

