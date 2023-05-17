import { OpenAI } from "langchain/llms/openai";

require("dotenv").config();

export const run = async () => {
  const model = new OpenAI();

  const res = await model.call(
    "カラフルな靴下を作る会社の良い名前を考えてください。"
  );
  console.log(res);
};

run();
