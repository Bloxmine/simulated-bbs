const LMStudioClient = require("@lmstudio/sdk").LMStudioClient;

const client = new LMStudioClient();

async function main() {
  const modelPath = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF";
  const llama3 = await client.llm.load(modelPath, { config: { gpuOffload: "max" } });
  const prediction = llama3.respond([
    { role: "system", content: "Always answer as a pirate" },
    { role: "user", content: "Please introduce yourself." },
  ]);

  for await (const text of prediction) {
    process.stdout.write(text);
  }

  const { stats } = await prediction;
  console.log(stats);
}

main();