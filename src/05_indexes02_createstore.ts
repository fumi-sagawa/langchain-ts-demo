import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

require("dotenv").config();

export const run = async () => {
  const text = fs.readFileSync("materials/story_by_gpt.txt", "utf8");
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
  const docs = await textSplitter.createDocuments([text]);
  //ベクトルストアの作成
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  vectorStore.save("store");
};

run();
