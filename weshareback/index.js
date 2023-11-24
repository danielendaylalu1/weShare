require("dotenv").config();
const app = require("./app");

const port = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile("./dist/index.html");
});

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
