require("dotenv").config();
const app = require("./app");
const path = require("path");

const port = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
