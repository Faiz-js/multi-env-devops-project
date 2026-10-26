const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: [process.env.CONTACTPOINTS],
  localDataCenter: process.env.LOCALDATACENTER,
  keyspace: process.env.KEYSPACE,
});

module.exports = client;
