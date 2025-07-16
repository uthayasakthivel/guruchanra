require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get(
  "/api/secure-data",
  require("./middleware/verifyFirebaseToken"),
  (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}` });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
