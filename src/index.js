const express = require('express');
const app = express();
const PORT = 8001;
const cors = require('cors');
const UrlRoutes = require('./routes/url')
const MongoCon = require('./connection/MongoCon');
const UserRoutes = require('./routes/user')
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "https://65f0404739a18cb28db93f92--jade-otter-068067.netlify.app",
    methods: ["GET", "POST"] ,
    credentials  :true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/url" , UrlRoutes)
app.use("/api/v1/user", UserRoutes)

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    MongoCon(`mongodb+srv://Rajan:Rajan099r@rajanapi.tc4qy7c.mongodb.net/UrlShortner?retryWrites=true&w=majority`)
        .then(() => console.log("MongoDb Connected"))
        .catch((err) => console.log(err))
    console.log(`Server started on ${PORT}`);
});
