import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

require("dotenv").config();

export const run = async () => {
  const model = new OpenAI({});
  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory: memory });

  const res = await chain.call({ input: "こんにちは！ サガワです。" });
  console.log({ res });
};

run();
