export const dbConnector = async (primaryDbConnection) => {
  // Wait for the connection to be ready
  await new Promise((resolve, reject) => {
    primaryDbConnection.on("connected", () => {
      console.log("MongoDB connection established successfully");
      resolve();
    });

    primaryDbConnection.on("error", (err) => {
      reject(err);
    });
  });
};
