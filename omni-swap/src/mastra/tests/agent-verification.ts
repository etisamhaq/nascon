import { softwareEngineerAgent } from '../agents/omni-swap/agent.js';

async function verifyAgent() {
  const testCases = [
    {
      task: "Code Review",
      input: `
        function calculateTotal(prices) {
          let total = 0;
          for(let i = 0; i < prices.length; i++) {
            total += prices[i];
          }
          return total;
        }
      `
    },
    {
      task: "Debugging",
      input: `
        function fetchUserData() {
          fetch('api/users')
            .then(response => response.json())
            .catch(error => console.log(error));
        }
      `
    }
  ];

  for (const test of testCases) {
    const response = await softwareEngineerAgent.generate([
      { 
        role: "user", 
        content: `Please analyze this code and provide improvements:\n${test.input}` 
      }
    ], {
      resourceId: "test_verification",
      threadId: `verify_${test.task.toLowerCase()}`
    });

    console.log(`\n=== ${test.task} Test ===`);
    console.log("Response:", response.text);
  }
}

verifyAgent();