import { Project, Experience, Technology, Language } from './types';

export const SKILLS: Technology[] = [
  { name: 'React', category: 'Frontend', practical: 95, theory: 90 },
  { name: 'TypeScript', category: 'Frontend', practical: 90, theory: 85 },
  { name: 'Next.js', category: 'Frontend', practical: 85, theory: 80 },
  { name: 'Node.js', category: 'Backend', practical: 88, theory: 85 },
  { name: 'PostgreSQL', category: 'Backend', practical: 80, theory: 75 },
  { name: 'Go', category: 'Backend', practical: 70, theory: 65 },
  { name: 'Docker', category: 'DevOps', practical: 75, theory: 70 },
  { name: 'AWS', category: 'DevOps', practical: 65, theory: 60 },
  { name: 'TensorFlow', category: 'AI', practical: 40, theory: 75 },
  { name: 'Gemini API', category: 'AI', practical: 85, theory: 60 },
  { name: 'CSS/Tailwind', category: 'Frontend', practical: 98, theory: 85 },
  { name: 'Redis', category: 'Backend', practical: 75, theory: 60 },
  { name: 'K8s', category: 'DevOps', practical: 50, theory: 80 },
  { name: 'GraphQL', category: 'Backend', practical: 82, theory: 88 },
];

const EXPERIENCE_EN: Experience[] = [
  {
    company: 'TechFlow Systems',
    role: 'Senior Software Engineer',
    period: '2021 - Present',
    highlights: [
      'Architected a micro-frontend solution reducing build times by 40%.',
      'Led the migration of legacy REST APIs to GraphQL, improving data fetching efficiency.',
      'Mentored 3 junior developers to mid-level roles.'
    ]
  },
  {
    company: 'Creative Loops',
    role: 'Frontend Developer',
    period: '2019 - 2021',
    highlights: [
      'Built a real-time collaboration tool using WebSockets and CRDTs.',
      'Implemented a custom design system used across 5 internal products.',
      'Optimized core web vitals, boosting SEO ranking by 15 positions.'
    ]
  }
];

const EXPERIENCE_ZH: Experience[] = [
  {
    company: 'TechFlow Systems',
    role: '資深軟體工程師',
    period: '2021 - 目前',
    highlights: [
      '架構微前端解決方案，將構建時間縮短了 40%。',
      '主導將舊有 REST API 遷移至 GraphQL，提升資料獲取效率。',
      '指導 3 名初階工程師晉升至中階職位。'
    ]
  },
  {
    company: 'Creative Loops',
    role: '前端工程師',
    period: '2019 - 2021',
    highlights: [
      '使用 WebSockets 和 CRDTs 建構即時協作工具。',
      '實作客製化設計系統，應用於 5 個內部產品。',
      '優化 Core Web Vitals，將 SEO 排名提升 15 位。'
    ]
  }
];

const PROJECTS_EN: Project[] = [
  {
    id: 'proj_1',
    title: 'Nebula Stream',
    shortDescription: 'High-throughput data ingestion pipeline visualization.',
    fullDescription: 'Nebula Stream is a dashboard for visualizing real-time data ingestion pipelines. It handles thousands of events per second and renders them using WebGL for performance. The core challenge was managing memory usage in the browser while maintaining 60fps animations during high-load spikes.',
    techStack: ['React', 'WebGL', 'WebSockets', 'Go', 'Redis'],
    featured: true,
    challenges: [
      'Visualizing 10k+ nodes without DOM lag',
      'Handling backpressure from the WebSocket stream',
      'State synchronization across multiple clients'
    ],
    repoUrl: 'https://github.com/example/nebula',
    liveUrl: 'https://nebula.example.com',
    mermaidCode: `graph LR
    Source[Data Sources] -->|TCP| Ingest[Go Ingest Service]
    Ingest -->|Pub/Sub| Redis[(Redis Stream)]
    Redis -->|Read Group| Worker[Worker Nodes]
    Worker -->|WS Push| WS[WebSocket Gateway]
    WS -->|Binary Proto| Client[Browser/WebGL]
    Client -->|Action| API[REST API]
    API --> DB[(Postgres)]
    style Ingest fill:#1e293b,stroke:#22d3ee,stroke-width:2px
    style Redis fill:#1e293b,stroke:#c084fc,stroke-width:2px
    style Client fill:#1e293b,stroke:#4ade80,stroke-width:2px`
  },
  {
    id: 'proj_2',
    title: 'CodeSynth AI',
    shortDescription: 'IDE extension for natural language code generation.',
    fullDescription: 'CodeSynth is a VS Code extension that uses LLMs to generate boilerplate code and unit tests. It contextually understands the file structure and dependencies to provide relevant suggestions, minimizing context switching for developers.',
    techStack: ['TypeScript', 'VS Code API', 'Gemini API', 'Node.js'],
    featured: true,
    challenges: [
      'Reducing latency for real-time code completion',
      'Prompt engineering for consistent JSON output',
      'Securely managing user API keys'
    ],
    repoUrl: 'https://github.com/example/codesynth',
    mermaidCode: `sequenceDiagram
    participant Dev as Developer
    participant Ext as VS Code Ext
    participant LSP as Language Server
    participant AI as Gemini API
    
    Dev->>Ext: Types Trigger (// generate...)
    Ext->>LSP: Request Context (AST/Imports)
    LSP-->>Ext: Return Code Structure
    Ext->>AI: Send Prompt + Context
    activate AI
    AI-->>Ext: Stream Generated Code
    deactivate AI
    Ext->>Dev: Inline Suggestion (Ghost Text)
    Dev->>Ext: Accepts Suggestion (Tab)`
  },
  {
    id: 'proj_3',
    title: 'Orbit UI',
    shortDescription: 'Headless component library for internal tools.',
    fullDescription: 'A headless, accessible UI library built on Radix primitives. It provides the behavioral logic for complex components like Data Grids and Kanbans while allowing complete styling freedom via Tailwind CSS.',
    techStack: ['React', 'Radix UI', 'Tailwind', 'Storybook', 'Vitest'],
    featured: false,
    challenges: [
      'Ensuring full WAI-ARIA compliance',
      'Designing a flexible API for compound components',
      'Automated visual regression testing'
    ],
    mermaidCode: `graph TD
    Core[Core Logic / State] -->|Provides Context| Root[Root Component]
    Root -->|Compound Pattern| Trigger
    Root -->|Compound Pattern| Content
    Root -->|Compound Pattern| Item
    
    subgraph "Headless Layer"
    Core
    Root
    end
    
    subgraph "Presentation Layer"
    Trigger -->|Styles via ClassName| Render1[DOM Node]
    Content -->|Styles via ClassName| Render2[DOM Node]
    end
    
    style Core fill:#1e293b,stroke:#22d3ee,stroke-width:2px
    style Root fill:#1e293b,stroke:#22d3ee,stroke-width:2px`
  }
];

const PROJECTS_ZH: Project[] = [
  {
    id: 'proj_1',
    title: 'Nebula Stream',
    shortDescription: '高吞吐量資料攝取流程視覺化儀表板。',
    fullDescription: 'Nebula Stream 是一個用於視覺化即時資料攝取流程的儀表板。它每秒處理數千個事件，並使用 WebGL 進行渲染以確保效能。核心挑戰在於瀏覽器中的記憶體管理，並在高負載峰值期間維持 60fps 的動畫流暢度。',
    techStack: ['React', 'WebGL', 'WebSockets', 'Go', 'Redis'],
    featured: true,
    challenges: [
      '在無 DOM 延遲的情況下視覺化 10k+ 節點',
      '處理來自 WebSocket 串流的背壓 (Backpressure)',
      '多客戶端的狀態同步'
    ],
    repoUrl: 'https://github.com/example/nebula',
    liveUrl: 'https://nebula.example.com',
    mermaidCode: `graph LR
    Source[資料來源] -->|TCP| Ingest[Go 攝取服務]
    Ingest -->|Pub/Sub| Redis[(Redis Stream)]
    Redis -->|Read Group| Worker[工作節點]
    Worker -->|WS Push| WS[WebSocket 閘道]
    WS -->|Binary Proto| Client[瀏覽器/WebGL]
    Client -->|Action| API[REST API]
    API --> DB[(Postgres)]
    style Ingest fill:#1e293b,stroke:#22d3ee,stroke-width:2px
    style Redis fill:#1e293b,stroke:#c084fc,stroke-width:2px
    style Client fill:#1e293b,stroke:#4ade80,stroke-width:2px`
  },
  {
    id: 'proj_2',
    title: 'CodeSynth AI',
    shortDescription: '用於自然語言程式碼生成的 IDE 擴充套件。',
    fullDescription: 'CodeSynth 是一個 VS Code 擴充套件，使用 LLM 生成樣板程式碼和單元測試。它能根據上下文理解檔案結構和依賴關係，提供相關建議，減少開發者的切換成本。',
    techStack: ['TypeScript', 'VS Code API', 'Gemini API', 'Node.js'],
    featured: true,
    challenges: [
      '降低即時程式碼補全的延遲',
      '提示工程 (Prompt Engineering) 以確保 JSON 輸出一致',
      '安全地管理使用者 API 金鑰'
    ],
    repoUrl: 'https://github.com/example/codesynth',
    mermaidCode: `sequenceDiagram
    participant Dev as 開發者
    participant Ext as VS Code 擴充
    participant LSP as 語言伺服器
    participant AI as Gemini API
    
    Dev->>Ext: 輸入觸發詞 (// generate...)
    Ext->>LSP: 請求上下文 (AST/Imports)
    LSP-->>Ext: 回傳程式碼結構
    Ext->>AI: 發送提示詞 + 上下文
    activate AI
    AI-->>Ext: 串流生成程式碼
    deactivate AI
    Ext->>Dev: 行內建議 (Ghost Text)
    Dev->>Ext: 接受建議 (Tab)`
  },
  {
    id: 'proj_3',
    title: 'Orbit UI',
    shortDescription: '用於內部工具的 Headless 元件庫。',
    fullDescription: '建立在 Radix 原語之上的 Headless、無障礙 UI 庫。它提供了 Data Grids 和 Kanbans 等複雜元件的行為邏輯，同時允許透過 Tailwind CSS 進行完全的樣式自由化。',
    techStack: ['React', 'Radix UI', 'Tailwind', 'Storybook', 'Vitest'],
    featured: false,
    challenges: [
      '確保完全符合 WAI-ARIA 規範',
      '為複合元件設計靈活的 API',
      '自動化視覺回歸測試'
    ],
    mermaidCode: `graph TD
    Core[核心邏輯 / State] -->|提供 Context| Root[根元件]
    Root -->|Compound Pattern| Trigger
    Root -->|Compound Pattern| Content
    Root -->|Compound Pattern| Item
    
    subgraph "Headless 層"
    Core
    Root
    end
    
    subgraph "表現層"
    Trigger -->|樣式 ClassName| Render1[DOM Node]
    Content -->|樣式 ClassName| Render2[DOM Node]
    end
    
    style Core fill:#1e293b,stroke:#22d3ee,stroke-width:2px
    style Root fill:#1e293b,stroke:#22d3ee,stroke-width:2px`
  }
];

export const CONTENT = {
  en: {
    heroIntro: `> Initializing developer profile...
> Loading modules: React, TypeScript, Node.js...
> System ready.

Hello. I'm Alex Dev.
I build scalable distributed systems and interactive frontend experiences.
Focus: Performance, Accessibility, and Developer Experience.`,
    nav: {
      home: 'README.md',
      projects: 'Modules',
      stack: 'Dependencies',
      log: 'Changelog',
    },
    sections: {
      intro: 'Introduction',
      introText: 'I treat infrastructure as code and frontend as an art form. My philosophy is simple: build tools that empower other developers and interfaces that delight users.',
      coreFocus: 'Core Focus',
      coreFocusText: 'Distributed Systems, Real-time Data Visualization, DX Tools',
      currentStatus: 'Current Status',
      currentStatusText: 'Building next-gen CI/CD pipelines at TechFlow.',
      modules: './modules',
      featuredOnly: '--featured-only',
      dependencies: './dependencies',
      stackText: 'A visual mapping of my technological proficiency: Practical Execution vs. Conceptual Understanding.',
      changelog: './changelog',
      changelogText: 'Professional history and career milestones.',
      footer: 'Built with React, Tailwind & Gemini 2.5 Flash',
    },
    ui: {
      featured: 'featured',
      projectSpecs: 'Project Specs',
      keyChallenges: 'Key Challenges',
      architecture: 'System Architecture',
      askAi: 'Ask the AI',
    },
    projects: PROJECTS_EN,
    experience: EXPERIENCE_EN,
    chatInit: 'Hello. I am the portfolio assistant. Ask me about the stack, architecture choices, or experience.',
    categories: {
      Frontend: 'Frontend',
      Backend: 'Backend',
      DevOps: 'DevOps',
      AI: 'AI',
    },
    chartLabels: {
      xAxis: 'Practical Experience',
      yAxis: 'Conceptual Understanding',
      high: 'High',
      low: 'Low',
      legend: 'Tech Category'
    }
  },
  zh: {
    heroIntro: `> 初始化開發者設定檔...
> 載入模組: React, TypeScript, Node.js...
> 系統就緒。

你好。我是 Alex Dev。
我構建可擴展的分散式系統和互動式前端體驗。
專注於：效能、無障礙設計 (Accessibility) 和開發者體驗 (DX)。`,
    nav: {
      home: 'README.md',
      projects: '模組 (Modules)',
      stack: '技術堆疊 (Stack)',
      log: '經歷 (Changelog)',
    },
    sections: {
      intro: '介紹',
      introText: '我將基礎設施視為程式碼，將前端視為藝術形式。我的理念很簡單：構建賦予開發者能力的工具，以及讓使用者愉悅的介面。',
      coreFocus: '核心焦點',
      coreFocusText: '分散式系統、即時資料視覺化、DX 工具',
      currentStatus: '目前狀態',
      currentStatusText: '正在 TechFlow 建構下一代 CI/CD 流程。',
      modules: './模組',
      featuredOnly: '--精選',
      dependencies: './技術依賴',
      stackText: '技術能力視覺化分佈：實務操作經驗 vs 設計原理理解。',
      changelog: './變更日誌',
      changelogText: '職業歷史與里程碑。',
      footer: '使用 React, Tailwind & Gemini 2.5 Flash 構建',
    },
    ui: {
      featured: '精選',
      projectSpecs: '專案規格',
      keyChallenges: '關鍵挑戰',
      architecture: '系統架構',
      askAi: '詢問 AI',
    },
    projects: PROJECTS_ZH,
    experience: EXPERIENCE_ZH,
    chatInit: '你好。我是作品集助理。歡迎詢問關於技術堆疊、架構選擇或工作經歷的問題。',
    categories: {
      Frontend: '前端',
      Backend: '後端',
      DevOps: '維運',
      AI: '人工智慧',
    },
    chartLabels: {
      xAxis: '實務操作經驗',
      yAxis: '設計/原理理解',
      high: '高',
      low: '低',
      legend: '技術分類'
    }
  }
};