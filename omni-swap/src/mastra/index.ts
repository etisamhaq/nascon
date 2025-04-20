import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { codeReviewWorkflow } from './workflows/code-review.js';
import { softwareEngineerAgent } from './agents/index.js';
import { codeGenerationTool } from './tools/code-generation.js';


export const mastra = new Mastra({
  workflows: { 
    codeReviewWorkflow,
  },
  agents: { softwareEngineerAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
