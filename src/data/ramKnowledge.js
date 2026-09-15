/**
 * RAM — Reasoning & Architecture Module
 * Deterministic knowledge base for Phase 1.
 * All responses reference only real portfolio data.
 */

export const ramIntents = {
  greeting:    ['hi', 'hello', 'hey', 'good morning', 'good evening', 'what are you'],
  projects:    ['project', 'system', 'built', 'deployed', 'city 360', 'chatbot', 'spam', 'face mask', 'work', 'portfolio'],
  rag:         ['rag', 'retrieval', 'retrieval augmented', 'vector', 'embedding', 'langchain', 'graphrag', 'knowledge base'],
  agents:      ['agent', 'crewai', 'langgraph', 'agentic', 'orchestrat', 'multi-agent', 'crew'],
  skills:      ['skill', 'know', 'framework', 'technology', 'tech stack', 'what can', 'use', 'language', 'python', 'azure', 'fastapi'],
  experience:  ['experience', 'work', 'company', 'postqode', 'databels', 'freelance', 'job', 'role', 'career', 'background'],
  education:   ['study', 'degree', 'college', 'university', 'education', 'cgpa', 'ramakrishnan', 'krct'],
  contact:     ['hire', 'available', 'email', 'reach', 'contact', 'opportunity', 'job offer', 'collaborate'],
  architecture:['architecture', 'design', 'how is', 'how does', 'how did', 'system design', 'database', 'backend'],
  decisions:   ['why', 'decision', 'choose', 'chose', 'trade-off', 'tradeoff', 'approach', 'reason', 'rationale'],
  cloud:       ['aws', 'azure', 'cloud', 'deploy', 'deployment', 'server', 'infra', 'infrastructure'],
  llm:         ['llm', 'language model', 'gpt', 'openai', 'hugging face', 'dialogpt', 'model'],
};

export const ramResponses = {
  greeting: `Hello! I'm **RAM** — the Reasoning & Architecture Module for this portfolio.

I can tell you about Ram's **projects**, **AI engineering decisions**, **Postqode experience**, **skills**, or help you **get in touch**.

What would you like to explore?`,

  projects: `Ram has shipped multi-agent and LLM production systems:

**Postqode Extension & Azure AI Agents** — Multi-agent systems built with LangGraph, LangChain, FastAPI, and Python on Azure.

**City 360** — Multi-agent CrewAI pipeline for Trichy city service discovery, deployed on AWS.

**AI Chatbot** — Conversational AI using Microsoft DialoGPT + Flask, with a JS frontend.

**IoT Spam Detection** — XGBoost/LightGBM classifier for IoT network traffic analysis.

**Face Mask Detector** — YOLO real-time detection + MobileFaceNet recognition with TTS feedback.

Each project has an Architecture view and Engineering Decisions breakdown. Want details on any specific one?`,

  rag: `Ram works with RAG (Retrieval-Augmented Generation) via LangChain and GraphRAG.

His approach: **RAG before fine-tuning**. For domain adaptation, retrieval is faster to iterate, cheaper to maintain, and easier to debug than fine-tuning a model.

GraphRAG extends this by grounding retrieval in a knowledge graph (Neo4j), which is better for relational queries than pure vector similarity.

Want to see the Engineering Decisions for a specific RAG project?`,

  agents: `Ram builds autonomous multi-agent systems using **LangGraph** and **CrewAI**.

At **Postqode**, he built multi-agent AI workflows on Microsoft Azure using LangGraph, LangChain, FastAPI, and Python — owning the process from initial requirements to architecture and shipping.

In **City 360**, CrewAI orchestrates dedicated Search, Data, and Response agents running concurrently.

His core principle: **agents solve orchestration problems, not magic**. If a single well-crafted prompt solves it, that's the right tool.`,

  skills: `Ram's core stack:

**AI/LLM** — LangChain, LangGraph, CrewAI, GraphRAG, RAG, NLP
**ML/Models** — TensorFlow, Hugging Face, OpenAI GPT, Scikit-Learn, XGBoost, OpenCV/YOLO
**Backend** — Python, FastAPI, Flask, Node.js, MySQL, Neo4j
**Cloud** — Azure, AWS
**Frontend** — React, JavaScript, HTML/CSS

Python is his primary language across every project.`,

  experience: `Ram has owned key AI & engineering roles:

**AI Engineer at Postqode** (July 2024 → Present): Worked on Postqode Extension. Built AI agents on Azure with LangGraph, LangChain, FastAPI, and Python — leading projects from requirements to solution architecture, cloud deployment, and shipping.

**Freelancer — AI Engineer** (July 2024 → Present): Building LLM applications, deploying on AWS, OS platform development.

**Python Developer at Databels Solutions Pvt. Ltd.** (June 2023 → June 2024): Production Python applications, AI/ML integration.`,

  education: `Ram holds a **B.Tech in Computer Science & Engineering** from K.Ramakrishnan College of Technology, Trichirappalli — graduated May 2024 with an **8.23 CGPA**.

Before that: Campion Anglo-Indian Higher Secondary School (Computer Science stream, 2017–2019).`,

  contact: `Ram is **open to opportunities** — AI/ML projects, full-time AI roles, and engineering leadership.

You can reach him via:
• **Email**: kts.ramamoorthy07@gmail.com
• **GitHub**: github.com/ramamoorthy07
• **LinkedIn**: linkedin.com/in/ramamoorthy07/
• **Contact form**: Use the Contact section in this portfolio

He responds promptly to serious enquiries.`,

  architecture: `Ram designs systems **cloud-native from day one** — every project is built with Azure and AWS deployment constraints in mind.

For AI systems, his typical architecture is:
User → API layer (FastAPI/Flask) → LLM / Agent layer (LangGraph/CrewAI) → Data / Vector store → Response

Check the **Architecture View** in the Deployed Systems section for deep dives.`,

  decisions: `The **Engineering Decisions** section is where Ram explains the *why* behind each technical choice — why CrewAI/LangGraph over single chains, why XGBoost over a neural network, why DialoGPT over GPT-4, how failure is handled, how cost is controlled.

Open any project in the Deployed Systems section and click the "Decisions" tab to read the full reasoning.`,

  cloud: `Ram deploys on **Microsoft Azure** and **AWS**. At Postqode, he architected and deployed AI agent workflows on Azure. City 360 runs on AWS.

He designs for cloud constraints from the start — not as an afterthought.`,

  llm: `Ram's LLM experience:
• **LangGraph & LangChain** — for multi-agent workflows and RAG at Postqode
• **Microsoft DialoGPT** — conversational AI (AI Chatbot project)
• **OpenAI GPT** — via API integration
• **Hugging Face** — model deployment and fine-tuning

He prefers RAG over fine-tuning for most domain-adaptation tasks.`,

  default: `I don't have specific information about that in my knowledge base.

For anything outside these topics, Ram can answer directly — use the **Contact** section or reach out on LinkedIn/Email (kts.ramamoorthy07@gmail.com).

I can tell you about: Postqode experience, projects, RAG, agents, skills, experience, education, architecture decisions, or how to get in touch.`,
};

export function matchIntent(message) {
  const lower = message.toLowerCase();

  const priorityOrder = [
    'rag', 'agents', 'decisions', 'architecture',
    'cloud', 'llm', 'contact', 'education',
    'experience', 'projects', 'skills', 'greeting',
  ];

  for (const intent of priorityOrder) {
    const keywords = ramIntents[intent];
    if (keywords.some(kw => lower.includes(kw))) {
      return intent;
    }
  }

  return 'default';
}
