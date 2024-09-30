export async function connectWithOpenAI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Connected to OpenAI");
      resolve();
    }, 1);
  });
}
