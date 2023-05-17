import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

require("dotenv").config();

export const run = async () => {
  const prompt = new PromptTemplate({
    inputVariables: ["product"],
    template: "カラフルな{product}を作る会社の良い名前を考えてください。",
  });

  const model = new OpenAI();
  const chain = new LLMChain({ llm: model, prompt });

  const res = await chain.call({ product: "靴下" });
  console.log(res);
};

run();
