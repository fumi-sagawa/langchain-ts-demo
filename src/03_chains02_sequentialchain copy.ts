import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";

require("dotenv").config();

export const run = async () => {
  //1つ目のChain
  const outlinePromptTemplate = new PromptTemplate({
    inputVariables: ["title"],
    template: `あなたは脚本家です。劇のタイトルが与えられたら、そのタイトルの概要を書くのがあなたの仕事です。
 
    タイトル: {title}
    概要:`,
  });

  const outlineModel = new OpenAI();
  const outlineChain = new LLMChain({
    llm: outlineModel,
    prompt: outlinePromptTemplate,
  });

  //２つ目のChain
  const reviewPromptTemplate = new PromptTemplate({
    inputVariables: ["title"],
    template: `あなたはニューヨーク・タイムズの批評家です。劇のあらすじを聞いて、その劇の批評を書くのがあなたの仕事です。
 
    劇の概要: {title}
    批評:`,
  });
  const reviewModel = new OpenAI();
  const reviewChain = new LLMChain({
    llm: reviewModel,
    prompt: reviewPromptTemplate,
  });

  const overallChain = new SimpleSequentialChain({
    chains: [outlineChain, reviewChain],
    verbose: true,
  });

  const review = await overallChain.run("夕暮れ時のビーチで起こる悲劇");
  console.log(review);
};

run();
