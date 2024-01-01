const express = require("express");
const cors = require("cors");

const app = express();
const port = 5001;

// middlewares
app.use(express.json());
app.use(cors());

// route included
app.use("/payment", require("./routes/payment"));

app.listen(port, () => console.log(`server started on port ${port}`));