const express = require('express');
const cors = require('cors');
const LMStudioClient = require("@lmstudio/sdk").LMStudioClient;
const client = new LMStudioClient();
const app = express();
app.use(express.json());
app.use(cors());

let llama3;

client.llm.load("TheBloke/Mistral-7B-Instruct-v0.2-GGUF", { config: { gpuOffload: "max" } })
  .then(model => {
    llama3 = model;
    app.listen(3000, () => console.log('Server running on port 3000'));
  });

app.post('/api/predict', async (req, res) => {
  if (!llama3) {
    return res.status(500).send('Model not loaded');
  }

  const prediction = llama3.respond(req.body);

  let responseText = '';
  for await (const text of prediction) {
    responseText += text;
  }

  const { stats } = await prediction;
  res.json({ response: responseText, stats });
});