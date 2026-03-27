// 🔥 ADVANCED QUESTION GENERATOR + STRICT AI EVALUATION

import Groq from "groq-sdk";

// ---------------- QUESTION ENGINE ---------------- //

const topics = {
  "Software Engineer": [
    "arrays", "linked lists", "stacks", "queues", "trees", "graphs",
    "hash tables", "sorting algorithms", "search algorithms",
    "recursion", "dynamic programming", "greedy algorithms",
    "REST APIs", "microservices", "databases", "SQL", "NoSQL",
    "indexing", "transactions", "operating systems",
    "process vs thread", "memory management", "deadlocks",
    "networking", "HTTP", "TCP/IP", "DNS",
    "JavaScript", "closures", "promises", "async/await",
    "React", "state management", "hooks", "Node.js",
    "event loop", "system design", "scalability", "caching"
  ],

  "Data Analyst": [
    "SQL", "joins", "data cleaning", "data visualization",
    "statistics", "mean vs median", "regression",
    "Excel", "Python", "pandas", "machine learning",
    "data pipelines", "ETL", "dashboards"
  ],

  "HR": [
    "conflict management", "recruitment", "employee engagement",
    "onboarding", "performance review", "leadership",
    "team management", "work culture", "hiring strategies"
  ]
};

const actions = [
  "Explain",
  "Describe",
  "How would you implement",
  "What is",
  "Why is",
  "Compare",
  "How does",
  "When would you use",
  "What are the advantages of",
  "What are the disadvantages of"
];

const contexts = [
  "with a real-world example",
  "in simple terms",
  "in a production system",
  "step by step",
  "for a beginner",
  "with advantages and disadvantages",
  "in detail",
  "with use cases",
  "in system design context"
];

const followUps = [
  "",
  "Give an example.",
  "Explain with code.",
  "Where is it used?",
  "Why is it important?"
];

// ---------------- GENERATE QUESTION ---------------- //

export const generateQuestion = async (req, res) => {
  try {
    const { role, previousQuestions = [] } = req.body;

    const roleTopics = topics[role] || ["programming"];

    let question = "";
    let attempts = 0;

    do {
      const topic = roleTopics[Math.floor(Math.random() * roleTopics.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const context = contexts[Math.floor(Math.random() * contexts.length)];
      const followUp = followUps[Math.floor(Math.random() * followUps.length)];

      question = `${action} ${topic} ${context}. ${followUp}`;
      attempts++;

    } while (previousQuestions.includes(question) && attempts < 20);

    res.json({ question });

  } catch (error) {
    res.status(500).json({ error: "Error generating question" });
  }
};

// ---------------- AI SETUP ---------------- //

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// ---------------- STRICT EVALUATION ---------------- //

export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // 🔥 HARD CHECK (NO ANSWER)
    if (!answer || answer.trim().length < 5 || answer === "No answer provided") {
      return res.json({
        score: 1,
        strengths: "No meaningful answer provided.",
        weaknesses: "Answer is missing or too short.",
        improved_answer: "Start with a definition, explain clearly, and give an example."
      });
    }

    // 🔥 STRICT PROMPT
    const prompt = `
You are a STRICT technical interviewer.

Question: ${question}
Answer: ${answer}

Rules:
- If answer is weak, give LOW score
- If answer is strong, give HIGH score
- Do NOT assume anything not written
- Do NOT be polite
- Be realistic like real interviews

Return ONLY JSON:
{
  "score": number (0-10),
  "strengths": "...",
  "weaknesses": "...",
  "improved_answer": "..."
}
`;

    const chat = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile"
    });

    const text = chat.choices[0].message.content;

    console.log("AI RAW RESPONSE:", text);

    let result;

    try {
      // 🔥 SAFE JSON EXTRACTION
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      if (!result) throw new Error("Invalid JSON");

    } catch (err) {
      result = {
        score: 6,
        strengths: "Partial understanding shown.",
        weaknesses: "Could not fully evaluate answer.",
        improved_answer: "Explain clearly with structured points and examples."
      };
    }

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI evaluation failed" });
  }
};