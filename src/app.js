const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const foodsRouter = require("./routes/foods.route");
const ingredientsRouter = require("./routes/ingredients.route");
const bodyParser = require("body-parser");
require("./middlewares/passport");

const app = express();
const PORT = process.env.PORT || 3000
// const PORT = 3000;

app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/foods", foodsRouter);
app.use("/api/v1/ingredients", ingredientsRouter);
app.get('/', function(req, res) {
    res.send('hello word');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});