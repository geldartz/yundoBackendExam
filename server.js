const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const db = require("./models");
const app = express();
const port=  process.env.PORT || 5001;




app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use(errorHandler);

// db.sequelize.sync({force: true}).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



module.exports = app;