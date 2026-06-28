
export const CATS: Record<string, {
  fill: string;
  border: string;
  text: string;
  chip?: string;
  accent?: string;
  tag?: string;
}> = {
  root: {
    fill: "#16151F",
    border: "#16151F",
    text: "#FFFFFF",
    chip: "#16151F",
  },
  step: {
    fill: "#FFFFFF",
    border: "#D9D5E8",
    text: "#1F1B2E",
    accent: "#6D5BD0",
  },
  prereq: {
    fill: "#EEF2FF",
    border: "#6366F1",
    text: "#312E81",
    tag: "#4F46E5",
  },
  core: { fill: "#ECFDF5", border: "#10B981", text: "#065F46", tag: "#059669" },
  path: { fill: "#FAF5FF", border: "#A855F7", text: "#581C87", tag: "#9333EA" },
  practice: {
    fill: "#FFF7ED",
    border: "#F59E0B",
    text: "#92400E",
    tag: "#D97706",
  },
};

export interface Node {
  id: string;
  cat: string;
  x: number;
  y: number;
  w: number;
  badge?: string;
  title: string;
  body: string;
  step?: string;
  tag?: string;
}

export const NODES: Node[] = [
  {
    id: "root",
    cat: "root",
    x: 600,
    y: 40,
    w: 260,
    badge: "🎯 Core Concept",
    title: "Neural Networks",
    body: "Foundation of deep learning",
  },
  {
    id: "step1",
    cat: "step",
    x: 600,
    y: 200,
    w: 280,
    step: "STEP 1",
    title: "Why Neural Networks Matter",
    body: "Understand the shift from rule-based logic to learned representations, and why this architecture underlies modern AI.",
  },
  {
    id: "step2",
    cat: "step",
    x: 600,
    y: 340,
    w: 280,
    step: "STEP 2",
    title: "Core Building Blocks",
    body: "Four pillars to evaluate first: neurons & weights, activation functions, layers, and the forward pass.",
  },
  {
    id: "prereq",
    cat: "prereq",
    x: 140,
    y: 500,
    w: 220,
    tag: "PREREQUISITE",
    title: "Linear Algebra & Calculus",
    body: "Vectors, matrices, dot products, and derivatives — the math forward/back-prop runs on.",
  },
  {
    id: "perceptron",
    cat: "core",
    x: 400,
    y: 500,
    w: 220,
    tag: "A-TIER",
    title: "Perceptron & Activation",
    body: "Single-unit model, weighted sums, and why nonlinear activations (ReLU, sigmoid) matter.",
  },
  {
    id: "backprop",
    cat: "core",
    x: 640,
    y: 500,
    w: 220,
    tag: "A-TIER",
    title: "Backpropagation",
    body: "Chain rule applied across layers. Strong demand for engineers who can reason about gradients directly.",
  },
  {
    id: "architectures",
    cat: "core",
    x: 880,
    y: 500,
    w: 220,
    tag: "B-TIER",
    title: "CNNs & RNNs",
    body: "Specialized layouts for spatial and sequential data. Useful but narrower than transformer-based roles.",
  },
  {
    id: "optimizer",
    cat: "path",
    x: 1120,
    y: 500,
    w: 220,
    tag: "STEP 3 OF 8",
    title: "Optimization & Training",
    body: "Loss landscapes, learning rate schedules, regularization — where most real-world tuning happens.",
  },
  {
    id: "practice1",
    cat: "practice",
    x: 520,
    y: 660,
    w: 230,
    title: "Build From Scratch",
    body: "Implement a 2-layer net in NumPy before reaching for a framework. Cements intuition fastest.",
  },
  {
    id: "practice2",
    cat: "practice",
    x: 780,
    y: 660,
    w: 230,
    title: "Apply With PyTorch",
    body: "Re-implement the same network in PyTorch to see what the framework automates for you.",
  },
];

export const EDGES: [string, string][] = [
  ["root", "step1"],
  ["step1", "step2"],
  ["step2", "prereq"],
  ["step2", "perceptron"],
  ["step2", "backprop"],
  ["step2", "architectures"],
  ["step2", "optimizer"],
  ["perceptron", "practice1"],
  ["backprop", "practice1"],
  ["backprop", "practice2"],
];



export interface EdgeAnchor {
  x: number;
  y: number;
  w: number;
  h: number;
}
