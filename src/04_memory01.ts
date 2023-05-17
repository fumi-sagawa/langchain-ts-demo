import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

require("dotenv").config();

export const run = async () => {
  const model = new OpenAI({});
  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory: memory });

  const res1 = await chain.call({ input: "こんにちは！ サガワです。" });
  console.log({ res1 });

  const res2 = await chain.call({ input: "私の名前はなんですか？" });
  console.log({ res2 });
};

run();
