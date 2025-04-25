// Sound Effects
const clickSound = new Audio("click.wav");
const successSound = new Audio("success.wav");
const challengeSound = new Audio("challenge.wav");
const errorSound = new Audio("error.wav");

// --- Feature 1: Topic Classifier Tool ---
function classifyTopic() {
  const input = document.getElementById("topicInput").value.toLowerCase();
  const result = document.getElementById("classificationResult");

  // Play click sound if nothing is entered
  if (!input.trim()) {
    result.textContent = "Please enter one question.";
    clickSound.play();
    return;
  }

  const keywords = {
    Remember: ["define", "specify"],
    Understand: ["identify", "debreif", "explain", "summarize", "describe"],
    Apply: [
      "solve",
      "use",
      "demonstrate",
      "implement",
      "perform",
      "discover",
      "divide",
      "conduct",
    ],
    Analyze: [
      "compare",
      "contrast",
      "analyze",
      "examine",
      "differentiate",
      "classify",
      "make a list",
      "describe",
    ],
    Evaluate: [
      "judge",
      "critique",
      "justify",
      "defend",
      "argue",
      "measure",
      "comparison",
    ],
    Create: [
      "design",
      "create",
      "invent",
      "develop",
      "construct",
      "build up",
      "make up",
    ],
  };

  let detected = "Not detected";
  for (const level in keywords) {
    for (const word of keywords[level]) {
      if (input.includes(word)) {
        detected = level;
        break;
      }
    }
    if (detected !== "Not detected") break;
  }

  // Play success sound if Bloom's level is detected, else play error sound
  if (detected !== "Not detected") {
    result.textContent = `Bloom’s Level: ${detected}`;
    successSound.play();
  } else {
    result.textContent = "Bloom’s Level: Not detected";
    errorSound.play();
  }
}

// --- Feature 2: Thinking Strategy Generator ---
function generateStrategy() {
  clickSound.play();
  const level = document.getElementById("levelSelector").value;
  const output = document.getElementById("strategyOutput");

  const strategies = {
    Remember: [
      "Make a flashcard for each key term.",
      "List the key facts from memory.",
      "Use a memory game to recall terms.",
    ],
    Understand: [
      "Summarize the topic in your own words.",
      "Draw a diagram explaining the concept.",
      "Teach someone else the idea.",
    ],
    Apply: [
      "Solve a real-world problem using this concept.",
      "Demonstrate the process step-by-step.",
      "Apply the rule to a different scenario.",
    ],
    Analyze: [
      "Break the topic into parts and explain each.",
      "Compare it to a similar idea.",
      "Create a chart showing causes and effects.",
    ],
    Evaluate: [
      "Make a pros and cons list.",
      "Critique a decision and suggest improvements.",
      "Justify your opinion with evidence.",
    ],
    Create: [
      "Invent a new way to explain the idea.",
      "Design a project that uses this concept.",
      "Write a story or draw something based on it.",
    ],
  };

  if (!strategies[level]) {
    output.innerHTML = "<em>Please select a Bloom level above.</em>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * strategies[level].length);
  output.textContent = `💡 Strategy: ${strategies[level][randomIndex]}`;
}

// --- Feature 3: Random Bloom Challenge ---
function generateChallenge() {
  challengeSound.play();
  const levels = [
    "Remember",
    "Understand",
    "Apply",
    "Analyze",
    "Evaluate",
    "Create",
  ];
  const actions = {
    Remember: "List 5 key terms from your current topic.",
    Understand: "Summarize your lesson in 3 sentences.",
    Apply: "Solve a sample question using what you’ve learned.",
    Analyze: "Compare today’s topic with a previous one.",
    Evaluate: "Give your opinion about this topic and justify it.",
    Create: "Design something creative based on your lesson.",
  };

  const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  document.getElementById(
    "challengeOutput"
  ).innerHTML = `<strong>${randomLevel} Challenge:</strong> ${actions[randomLevel]}`;
}

// --- Feature 4: Thinking Progress Tracker ---
let progressData = {
  Remember: 1,
  Understand: 1,
  Apply: 1,
  Analyze: 1,
  Evaluate: 1,
  Create: 1,
};

function updateProgress() {
  clickSound.play();
  for (let key in progressData) {
    progressData[key] += Math.floor(Math.random() * 3); // Simulate progress
  }
  drawChart();
}

function resetProgress() {
  clickSound.play();
  progressData = {
    Remember: 1,
    Understand: 1,
    Apply: 1,
    Analyze: 1,
    Evaluate: 1,
    Create: 1,
  };
  drawChart();
}

function drawChart() {
  const canvas = document.getElementById("progressChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const levels = Object.keys(progressData);
  const values = Object.values(progressData);
  const max = Math.max(...values);
  const barWidth = 40;
  const gap = 20;

  levels.forEach((level, index) => {
    const x = index * (barWidth + gap) + 40;
    const height = (values[index] / (max + 2)) * 150;

    // Draw bars
    ctx.fillStyle = "#7f5af0";
    ctx.fillRect(x, 180 - height, barWidth, height);

    // Labels
    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.fillText(level, x - 5, 195);
  });
}

// Log animation load
window.addEventListener("DOMContentLoaded", () => {
  console.log("Animations loaded 🚀");
});

function goBack() {
  window.history.back();
}
