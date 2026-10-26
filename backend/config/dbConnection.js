const cassandraClient = require("./db.js");

const connectToDB = async () => {
  try {
    await cassandraClient.connect();
    console.log("✅ Connected to cassandraDB successfull");
  } catch (error) {
    console.error("❌ Error in connecting to cassandra: ", error);
  }
};

module.exports = connectToDB;
