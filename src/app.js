import { create } from "venom-bot";
import { start } from "./venom_bot/Start.js";

//client whatsapp web
create({
  session: "BOTsecretary",
})
  .then((client) => {
    start(client);
  })
  .catch((error) => {
    console.log(error);
  });