const {getDb} = require('../utils/databaseUtils');
module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }
  static addToFavourite(homeId, callback) {
    const db = getDb();
    db.collection('favourites').insertOne({ houseId: homeId }, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }



   save() {
    const db = getDb();
    return db.collection('favourites').findOne({houseId: this.houseId}).then(existingFav => {
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
  }

   static getFavourites(callback){
    const db = getDb();
    return db.collection('favourites').find().toArray();
  }; 

    static deleteById(delhomeId) {
    const db = getDb();
    return db.collection('favourites').deleteOne({houseId: delhomeId}); 

  } 

};

