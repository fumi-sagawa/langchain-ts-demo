import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorStore } from "langchain/dist/vectorstores/base";

require("dotenv").config();

const run = async () => {
  const vectorStore = await HNSWLib.load("store", new OpenAIEmbeddings());
  const result = await vectorStore.similaritySearch("アレックスの冒険", 1);
  console.log(result);
};

run();
