const  Mongoose  = require("mongoose")

 const MongoCon = async(url) => {
    return Mongoose.connect(url)
}

module.exports = MongoCon ;