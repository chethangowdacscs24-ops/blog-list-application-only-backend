const app = require("./app");
const config = require("./utils/config");

// start the HTTP server and listen on the configured port
app.listen(config.PORT, () => {
  console.log(`server listening at PORT ${config.PORT}`);
});
