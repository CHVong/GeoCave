const path = require("path");
module.exports = {
  getIndex: async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "..", "Views", "index.html"));
    } catch (error) {
      console.log(error);
    }
  },
};
