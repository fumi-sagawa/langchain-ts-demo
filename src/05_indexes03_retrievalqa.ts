import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

require("dotenv").config();

const run = async () => {
  const vectorStore = await HNSWLib.load("store", new OpenAIEmbeddings());
  const model = new OpenAI({});
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: "アレックスは何者？",
  });
  console.log({ res });
};

run();
