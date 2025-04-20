// src/mastra/agents/omni-swap/agent.ts
import { Agent } from "@mastra/core/agent";
import { groq } from "@ai-sdk/groq";
import { Memory } from "@mastra/memory";
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Create memory system
const memory = new Memory();

// Define coding tools
const codeAnalysisTool = createTool({
  id: 'analyzeCode',
  description: 'Analyzes code snippets for best practices and potential improvements',
  inputSchema: z.object({
    code: z.string().describe('Code to analyze'),
    language: z.string().describe('Programming language of the code')
  }),
  execute: async ({ context }) => {
    // Add code analysis logic here
    return {
      suggestions: [],
      bestPractices: [],
      potentialIssues: []
    };
  }
});

const debuggingTool = createTool({
  id: 'debugCode',
  description: 'Helps identify and fix bugs in code',
  inputSchema: z.object({
    code: z.string().describe('Code with potential bugs'),
    error: z.string().optional().describe('Error message if available')
  }),
  execute: async ({ context }) => {
    // Add debugging logic here
    return {
      diagnosis: '',
      suggestedFix: '',
      explanation: ''
    };
  }
});

// Define the system prompt for the Software Engineering Agent
const instructions = `
You are an expert Software Engineering Assistant with deep knowledge of programming languages, 
software architecture, and best practices. You operate under the Model Context Protocol (MCP) 
framework to provide precise, contextual assistance in software development tasks.

Your capabilities include:
1. Code Analysis & Review
2. Debugging Assistance
3. Architecture Design Recommendations
4. Best Practices Guidance
5. Performance Optimization Suggestions

When interacting:
- Always ask clarifying questions when requirements are ambiguous
- Provide explanations along with your suggestions
- Use concrete examples to illustrate concepts
- Reference industry standards and best practices
- Maintain awareness of security implications

You have access to specialized tools for code analysis and debugging. Use them when appropriate 
to provide more accurate assistance.

Remember to maintain a professional tone while being approachable and helpful.
`;

// Create the Software Engineering Agent

export const softwareEngineerAgent = new Agent({
  name: "Software Engineering Assistant",
  instructions,
  model: groq('llama-3.3-70b-versatile'), // Using Groq's Llama model
  memory,
  tools: {
    analyzeCode: codeAnalysisTool,
    debugCode: debuggingTool
  }
});