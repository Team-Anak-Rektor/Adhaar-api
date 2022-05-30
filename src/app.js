const express = require("express");
const cors = require("cors")
const foodsRouter = require("./routes/foods");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000
// const PORT = 3000;

app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/foods", foodsRouter);
app.get('/', function(req, res) {
    res.send('<h1>200</h1>');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});