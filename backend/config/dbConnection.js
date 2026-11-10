const db = require("./db.js");

const connectToDB = async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connected to MySQL database successfully");
  } catch (error) {
    console.error("❌ Error in connecting to MySQL: ", error);
  }
};

module.exports = connectToDB;