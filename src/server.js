
import Express from "express";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";
import { config } from "./config/index.js";
import pino from "pino-http";
import { addTraceId } from "./middlewares/addTraceId.js";


const app = new Express();

app.use(Express.json());
app.use(addTraceId)
app.use(pino());

app.use("/auth", authRouter);
app.use('/user', userRouter); 

export async function startApp() {
  try {
    app.listen(config.PORT, () => {
      console.log(`Server abhi zinda hai is port pr ${config.PORT}`);
    })
  } catch (error) {
    console.error("Maa chud gyi server ki", error);
  }
}