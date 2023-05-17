import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

require("dotenv").config();

export const run = async () => {
  const prompt = new PromptTemplate({
    inputVariables: ["product"],
    template: "カラフルな{product}を作る会社の良い名前を考えてください。",
  });
  console.log(await prompt.format({ product: "靴下" }));

  const model = new OpenAI();
  const res = await model.call(await prompt.format({ product: "靴下" }));
  console.log(res);
};

run();
