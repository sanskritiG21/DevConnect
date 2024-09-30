import { boot } from "./boot.js";
import { startApp } from "./server.js";

boot().then(() => {
  startApp();
});