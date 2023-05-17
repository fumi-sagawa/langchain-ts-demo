import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

require("dotenv").config();

export const run = async () => {
  const model = new ChatOpenAI({ modelName: "gpt-4" });
  const tools = [new SerpAPI(), new Calculator()];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
    verbose: true,
  });
  console.log("エージェントが読み込まれました。");

  const input = `今日の東京の最高気温を摂氏で調べてください。またその数値を2倍した値はいくつですか？`;
  console.log(`次の処理を実行します："${input}"...`);

  const result = await executor.call({ input });
  console.log(`Got output ${result.output}`);
  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );
};

run();
