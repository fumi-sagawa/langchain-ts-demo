import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

require("dotenv").config();

const run = async () => {
  const chat = new ChatOpenAI({ temperature: 0 });
  console.log("chat model loaded");
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  console.log(
    await chatPrompt.format({ input: "hi! whats up?", history: "historys" })
  );

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
  });

  const response = await chain.call({
    input: "hi! whats up?",
  });

  console.log(response);
};

run();
