const path = require("path");
module.exports = {
  getIndex: async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "..", "Views", "index.html"));
    } catch (error) {
      console.log(error);
    }
  },
  get404Page: async (req, res) => {
    try {
      res.status(404);
      res.sendFile(path.join(__dirname, "..", "Views", "404.html"));
    } catch (error) {
      console.log(error);
    }
  },
};
