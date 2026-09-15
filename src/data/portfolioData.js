/* ============================================================
   Portfolio Data — Source of Truth
   All content grounded in Ramamoorthy S's real experience.
   NEVER invent metrics, projects, or technologies.
   ============================================================ */

export const Bio = {
  name: 'Ramamoorthy S',
  roles: ['Full-Stack AI Engineer', 'LLM Specialist', 'Cloud Engineer', 'Python Developer'],
  description:
    'Dedicated AI Engineer specializing in RAG pipelines, LLM application deployment, and agentic systems. 1+ year of Python experience building and deploying ML models and data-driven applications on AWS & Azure.',
  github: 'https://github.com/ramamoorthy07',
  linkedin: 'https://www.linkedin.com/in/ramamoorthy07/',
  resume: 'https://drive.google.com/file/d/1xG-eGfMfezA4AKiP6jPU6e78nm955kXg/view?usp=drive_link',
  email: 'kts.ramamoorthy07@gmail.com',
  location: 'India',
  status: 'Open to opportunities',
};

/* ── Engineering Philosophy ────────────────────────────────── */
export const philosophy = [
  {
    id: 'rag-first',
    title: 'RAG over fine-tuning by default',
    body: 'For domain adaptation, retrieval-augmented generation is faster to iterate, cheaper to maintain, and easier to debug than fine-tuning. Fine-tuning is reserved for when RAG genuinely cannot close the gap.',
    icon: 'database',
  },
  {
    id: 'agents-for-orchestration',
    title: 'Agents solve orchestration, not magic',
    body: 'Multi-agent systems are the right tool for parallel, multi-step workflows where specialized components outperform a single prompt. If a single prompt solves the problem, use a single prompt.',
    icon: 'cpu',
  },
  {
    id: 'cloud-native',
    title: 'Cloud-native from day one',
    body: 'Every system I build is designed for AWS and Azure from the start — not retrofitted. Deployment constraints shape architecture, and deferring that thinking leads to expensive rewrites.',
    icon: 'cloud',
  },
];

/* ── Skills ────────────────────────────────────────────────── */
export const skillCategories = [
  {
    id: 'core-ai',
    label: 'Core AI',
    color: '#7B68EE',
    skills: [
      { name: 'LangChain',  usedIn: ['city-360', 'ai-chatbot'] },
      { name: 'LangGraph',  usedIn: [] },
      { name: 'CrewAI',     usedIn: ['city-360'] },
      { name: 'GraphRAG',   usedIn: [] },
      { name: 'RAG',        usedIn: ['city-360'] },
      { name: 'NLP',        usedIn: ['spam-detection', 'ai-chatbot'] },
    ],
  },
  {
    id: 'ml',
    label: 'ML / Models',
    color: '#FFB347',
    skills: [
      { name: 'TensorFlow',       usedIn: ['face-mask'] },
      { name: 'Hugging Face',     usedIn: ['ai-chatbot'] },
      { name: 'OpenAI GPT',       usedIn: [] },
      { name: 'Scikit-Learn',     usedIn: ['spam-detection'] },
      { name: 'XGBoost',          usedIn: ['spam-detection'] },
      { name: 'OpenCV / YOLO',    usedIn: ['face-mask'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#3DDC84',
    skills: [
      { name: 'Python',   usedIn: ['city-360', 'ai-chatbot', 'spam-detection', 'face-mask'] },
      { name: 'FastAPI',  usedIn: [] },
      { name: 'Flask',    usedIn: ['ai-chatbot'] },
      { name: 'Node.js',  usedIn: [] },
      { name: 'MySQL',    usedIn: [] },
      { name: 'Neo4j',    usedIn: [] },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud / Infra',
    color: '#00D4FF',
    skills: [
      { name: 'Azure',     usedIn: [] },
      { name: 'AWS',       usedIn: ['city-360'] },
      { name: 'Docker',    usedIn: [] },
      { name: 'Git',       usedIn: ['city-360', 'ai-chatbot', 'spam-detection', 'face-mask'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#FF6B35',
    skills: [
      { name: 'React',      usedIn: [] },
      { name: 'JavaScript', usedIn: ['ai-chatbot'] },
      { name: 'HTML/CSS',   usedIn: ['ai-chatbot'] },
    ],
  },
];

/* ── Experiences ───────────────────────────────────────────── */
export const experiences = [
  {
    id: 'postqode',
    role: 'AI Engineer',
    company: 'Postqode',
    companyLogo: null,
    startDate: '2024-07-15',
    endDate: null,
    status: 'active',
    description:
      'Engineered the Postqode Extension and developed autonomous multi-agent AI systems on Microsoft Azure using LangGraph, LangChain, FastAPI, and Python. Owned the end-to-end engineering pipeline from initial requirements gathering and solution architecture to cloud deployment and shipping production systems.',
    skills: [
      'Postqode Extension',
      'LangGraph',
      'LangChain',
      'FastAPI',
      'Python',
      'Microsoft Azure',
      'AI Agents',
      'Solution Architecture',
      'Cloud Deployment',
    ],
  },
  {
    id: 'freelance-ai',
    role: 'Freelancer — AI Engineer',
    company: 'Self-employed',
    companyLogo: null,
    startDate: '2024-07-01',
    endDate: null,
    status: 'active',
    description:
      'Working on OS platforms, building LLM applications, deploying on cloud services, and maintaining technical documentation.',
    skills: [
      'TensorFlow', 'PyTorch', 'Keras', 'Pandas',
      'Matplotlib', 'Hugging Face', 'OpenAI GPT',
      'AWS', 'Flask', 'Git', 'SQL', 'GraphRAG', 'LangChain',
    ],
  },
  {
    id: 'databels',
    role: 'Python Developer',
    company: 'Databels Solutions Pvt. Ltd.',
    companyLogo: null,
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    status: 'completed',
    description:
      'Built and optimised Python applications. Applied AI/ML techniques to real problems. Focused on clean, maintainable code in a production environment.',
    skills: ['Python', 'HTML', 'CSS', 'JavaScript'],
  },
];

/* ── Education ─────────────────────────────────────────────── */
export const education = [
  {
    id: 'krct',
    institution: 'K.Ramakrishnan College of Technology',
    location: 'Trichirappalli, Tamil Nadu',
    degree: 'Bachelor of Technology — Computer Science & Engineering',
    grade: '8.23 CGPA',
    startYear: 2019,
    endYear: 2024,
  },
  {
    id: 'campion',
    institution: 'Campion Anglo-Indian Higher Secondary School',
    location: 'Tiruchirappalli, Tamil Nadu',
    degree: 'Higher Secondary — Computer Science',
    grade: null,
    startYear: 2017,
    endYear: 2019,
  },
  {
    id: 'rc',
    institution: 'R.C Higher Secondary School',
    location: 'Tiruchirappalli, Tamil Nadu',
    degree: 'Secondary School',
    grade: null,
    startYear: 2012,
    endYear: 2017,
  },
];

/* ── Projects / Deployed Systems ───────────────────────────── */
export const projects = [
  {
    id: 'city-360',
    title: 'City 360',
    subtitle: 'Multi-agent AI for city services discovery',
    date: 'April 2024',
    status: 'shipped',
    description:
      'The Trichy City Services Finder uses a CrewAI multi-agent pipeline to help users locate services across Trichy — holy places, restaurants, courier services, entertainment, and more — through a single natural-language query.',
    tags: ['CrewAI', 'Python', 'AWS', 'APIs', 'Data Management'],
    category: 'agentic-ai',
    github: 'https://github.com/ramamoorthy07/CrewAI-City-360',
    live: null,
    featured: true,

    engineeringDepth: [
      { label: 'AI Architecture',  type: 'ai' },
      { label: 'Agentic System',   type: 'ai' },
      { label: 'Cloud (AWS)',      type: 'cloud' },
      { label: 'API Integration',  type: 'backend' },
    ],

    architecture: {
      description:
        'A CrewAI orchestrator coordinates three specialised agents. The Search Agent queries external APIs per service category. The Data Agent processes and filters results. The Response Agent synthesises a coherent reply. All components run on AWS.',
      diagram: `User Query
    │
    ▼
CrewAI Orchestrator
    ├──────────────┬──────────────┐
    ▼              ▼              ▼
Search Agent   Data Agent   Response Agent
    │              │              │
    ▼              ▼              ▼
External APIs  Processing    LLM Synthesis
                               │
                               ▼
                         AWS Deployment
                               │
                               ▼
                         User Response`,
    },

    decisions: [
      {
        question: 'Why a multi-agent architecture?',
        answer:
          'City service discovery spans multiple domains — restaurants, healthcare, entertainment — which benefit from parallel retrieval. A single sequential LLM call cannot efficiently cover all categories at once. CrewAI allows dedicated agents per domain to run concurrently and merge results.',
      },
      {
        question: 'Why CrewAI over a single prompt chain?',
        answer:
          "CrewAI's role-based primitives map cleanly to the domain model: SearchAgent fetches, DataAgent filters, ResponseAgent synthesises. This separation of concerns makes the system easier to extend (add a new service category = add a new agent) and easier to debug (each agent's output is inspectable independently).",
      },
      {
        question: 'How is failure handled?',
        answer:
          'Each agent returns a structured result object with a success flag. If a category search fails, the orchestrator marks it as unavailable and continues — users get partial results with a note rather than a full failure.',
      },
      {
        question: 'How is cost controlled?',
        answer:
          'Agents share a single LLM context pool. Search results are truncated to the top-5 most relevant before the response agent processes them, reducing token usage. Repeated queries for the same category within a session are cached.',
      },
    ],
  },

  {
    id: 'ai-chatbot',
    title: 'AI Chatbot Application',
    subtitle: 'Conversational AI using Microsoft DialoGPT',
    date: 'June 2024',
    status: 'shipped',
    description:
      'An advanced chatbot powered by Microsoft DialoGPT for natural, multi-turn conversation. Built with a Flask backend and a lightweight JavaScript frontend.',
    tags: ['Microsoft DialoGPT', 'Flask', 'HTML', 'CSS', 'JavaScript', 'jQuery'],
    category: 'nlp',
    github: 'https://github.com/ramamoorthy07/AI-Chatbot-Application.git',
    live: null,
    featured: false,

    engineeringDepth: [
      { label: 'LLM Integration', type: 'ai' },
      { label: 'NLP',             type: 'ai' },
      { label: 'Backend API',     type: 'backend' },
    ],

    architecture: {
      description:
        'A Flask server loads the DialoGPT model at startup and serves conversation turns via a REST endpoint. The frontend sends user messages and receives generated responses in real time.',
      diagram: `Browser (HTML/JS/jQuery)
    │
    ├─ POST /chat  { user_input, history }
    ▼
Flask Backend
    │
    ├─ DialoGPT tokenizer + model
    ├─ Generate response (greedy decode)
    └─ Return { response }
    │
    ▼
Browser renders response`,
    },

    decisions: [
      {
        question: 'Why DialoGPT over GPT-4?',
        answer:
          'DialoGPT can run locally without API costs, making it suitable for a self-hosted demo. GPT-4 would require a paid API key and server-side proxying — appropriate for production, but unnecessary for demonstrating conversational AI architecture.',
      },
      {
        question: 'Why Flask over FastAPI?',
        answer:
          'Flask was chosen for its simplicity and the fact that this was a focused ML integration project. The single endpoint has low concurrency needs, so Flask\'s synchronous handling is sufficient. FastAPI would be the choice for a production async API serving many concurrent users.',
      },
    ],
  },

  {
    id: 'spam-detection',
    title: 'IoT Spam Detection',
    subtitle: 'ML-based spam detection for IoT network traffic',
    date: 'Jan 2023 – May 2023',
    status: 'research',
    description:
      'Designed efficient spam detection for IoT devices using ML algorithms and deep learning to analyse network traffic and identify malicious behaviour. Includes data preprocessing, feature engineering, and model optimisation.',
    tags: ['Python', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'Pandas', 'MQTT'],
    category: 'machine-learning',
    github: null,
    live: null,
    featured: false,

    engineeringDepth: [
      { label: 'ML Model',       type: 'ml' },
      { label: 'Data Pipeline',  type: 'backend' },
      { label: 'NLP',            type: 'ai' },
    ],

    architecture: {
      description:
        'Network traffic is captured via MQTT, preprocessed into feature vectors, and passed through an XGBoost / LightGBM classifier. The pipeline includes feature engineering, cross-validation, and threshold tuning for precision-recall balance.',
      diagram: `IoT Devices → MQTT Broker
                      │
                      ▼
               Traffic Capture
                      │
                      ▼
           Feature Engineering (Pandas)
                      │
                      ▼
        XGBoost / LightGBM Classifier
                      │
                ┌─────┴─────┐
                ▼           ▼
              SPAM        CLEAN
               │
               ▼
            Alert / Block`,
    },

    decisions: [
      {
        question: 'Why XGBoost / LightGBM over a neural network?',
        answer:
          'For tabular network traffic features (packet size, timing, protocol flags), gradient-boosted trees consistently outperform neural networks on small-to-medium datasets. They also train faster, are more interpretable, and require no GPU.',
      },
    ],
  },

  {
    id: 'face-mask',
    title: 'Face Mask Object Detection',
    subtitle: 'YOLO-based mask detection with MobileFaceNet recognition',
    date: 'Oct 2021',
    status: 'shipped',
    description:
      'Mobile application that detects whether a person wears a mask using YOLO. When no mask is detected, MobileFaceNet performs face recognition and a Text-to-Speech API provides audio feedback.',
    tags: ['Python', 'TensorFlow/Keras', 'OpenCV', 'YOLO', 'LabelImg'],
    category: 'computer-vision',
    github: null,
    live: null,
    featured: false,

    engineeringDepth: [
      { label: 'Computer Vision',  type: 'ml' },
      { label: 'ML Model',         type: 'ml' },
    ],

    architecture: {
      description:
        'Live camera feed is processed by a YOLO detector. Detected faces are classified as masked or unmasked. Unmasked faces are passed to MobileFaceNet for recognition; the result is sent to a TTS API for audio output.',
      diagram: `Camera Feed
    │
    ▼
YOLO Detector (face + mask detection)
    │
    ├── Mask detected → OK
    │
    └── No mask
            │
            ▼
     MobileFaceNet (face recognition)
            │
            ▼
     TTS API (audio feedback)`,
    },

    decisions: [
      {
        question: 'Why YOLO for detection?',
        answer:
          'YOLO provides real-time detection in a single forward pass, which is essential for live video on a mobile device. Two-stage detectors like Faster R-CNN are more accurate but too slow for 30fps mobile inference.',
      },
    ],
  },
];

/* ── Live Stats (derived from real data — no invented numbers) ── */
export const getLiveStats = () => ({
  systemsDeployed: projects.filter(p => p.status === 'shipped').length,
  skillsMapped: skillCategories.reduce((acc, c) => acc + c.skills.length, 0),
  activeSince: 2023,
  cloudPlatforms: 'AWS · Azure',
  llmFrameworks: 'LangChain · LangGraph · CrewAI',
});

/* ── Boot Sequence Module Names ─────────────────────────────── */
export const bootModules = [
  { name: 'Engineering Profile', duration: 600 },
  { name: 'Deployed Systems',    duration: 700 },
  { name: 'Engineering Graph',   duration: 500 },
  { name: 'RAM Module',          duration: 400 },
];
