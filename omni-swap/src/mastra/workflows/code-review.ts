import { Workflow, Step } from '@mastra/core/workflows';
import { z } from 'zod';
import { softwareEngineerAgent } from '../agents/omni-swap/agent.js';

const codeReviewSchema = z.object({
  code: z.string(),
  language: z.string(),
  requirements: z.string().optional()
});

const analyzeCodeStep = new Step({
  id: 'analyze-code',
  description: 'Analyzes code for best practices and potential issues',
  inputSchema: codeReviewSchema,
  execute: async ({ context }) => {
    const response = await softwareEngineerAgent.generate([
      {
        role: 'user',
        content: `Please analyze this ${context.inputData.language} code and provide detailed feedback:\n${context.inputData.code}`
      }
    ]);
    return { analysis: response.text };
  }
});

const suggestImprovementsStep = new Step({
  id: 'suggest-improvements',
  description: 'Suggests specific improvements for the code',
  execute: async ({ context }) => {
    const response = await softwareEngineerAgent.generate([
      {
        role: 'user',
        content: `Based on the analysis, suggest specific improvements for this code:\n${context.inputData.code}`
      }
    ]);
    return { improvements: response.text };
  }
});

const generateDocumentationStep = new Step({
  id: 'generate-documentation',
  description: 'Generates documentation for the code',
  execute: async ({ context }) => {
    const response = await softwareEngineerAgent.generate([
      {
        role: 'user',
        content: `Please generate comprehensive documentation for this code:\n${context.inputData.code}`
      }
    ]);
    return { documentation: response.text };
  }
});

export const codeReviewWorkflow = new Workflow({
  name: 'code-review-workflow',
  triggerSchema: codeReviewSchema,
})
  .step(analyzeCodeStep)
  .then(suggestImprovementsStep)
  .then(generateDocumentationStep)
  .commit(); 