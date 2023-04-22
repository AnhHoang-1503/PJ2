import neo4j from "neo4j-driver";

async function connect() {
  const URI = "neo4j+s://104786b1.databases.neo4j.io";
  const USER = "neo4j";
  const PASSWORD = "YP1F2E4jGxS4sykxCWl6U9jOBhgveEARtJiIi_-ZrQI";
  let driver;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    console.log("Connection estabilished");
    return driver;
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
}

export { connect };
export default { connect };
