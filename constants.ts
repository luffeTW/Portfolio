import { Project, Experience, Technology, Language } from './types';

export const SKILLS: Technology[] = [
  { name: 'C#', category: 'Backend', practical: 90, theory: 85 },
  { name: 'ASP.NET / .NET Framework', category: 'Backend', practical: 85, theory: 75 },
  { name: '.NET MVC', category: 'Backend', practical: 80, theory: 80 },
  { name: '.NET Core', category: 'Backend', practical: 65, theory: 65 },
  { name: 'JavaScript', category: 'Frontend', practical: 70, theory: 60 },
  { name: 'TypeScript', category: 'Frontend', practical: 65, theory: 60 },
  { name: 'Entity Framework', category: 'Backend', practical: 75, theory: 70 },
  { name: 'MS SQL Server', category: 'Database', practical: 80, theory: 70 },
  { name: 'MySQL / PostgreSQL', category: 'Database', practical: 65, theory: 55 },
  { name: 'IIS', category: 'DevOps', practical: 75, theory: 65 },
  { name: 'Operations & Legacy Changes', category: 'DevOps', practical: 90, theory: 80 },
  { name: 'Report Export (PDF/Excel)', category: 'Tools', practical: 80, theory: 65 },
  { name: 'Visual Studio', category: 'Tools', practical: 90, theory: 65 },
  { name: 'Git', category: 'Tools', practical: 65, theory: 60 },
];

const EXPERIENCE_EN: Experience[] = [
  {
    company: 'SUMIRE Inc.',
    role: 'Backend Engineer',
    period: '2024/11 – 2026/02',
    highlights: [
      'Participated in government systems development and long-term maintenance.',
      'Implemented backend features, maintained legacy systems, and performed targeted refactoring.',
      'Collaborated with PM and frontend to deliver workflow-oriented features.',
      'Contributed to modules for certification, inspection, and reporting.'
    ]
  },
  {
    company: 'MASS Ltd.',
    role: 'Software Engineer',
    period: '2024/02 – 2024/07',
    highlights: [
      'Maintained internal enterprise systems and implemented feature extensions.',
      'Optimized existing business logic and added new features.',
      'Handled data integration, report export, and issue troubleshooting.',
      'Supported production ops and fixes.'
    ]
  },
  {
    company: 'BPS Inc.',
    role: 'Software Engineer',
    period: '2023/07 – 2023/12',
    highlights: [
      'Developed KIOSK application backends and operation flows.',
      'Integrated hardware devices and third-party services.',
      'Assisted with testing and deployment in real environments.'
    ]
  }
];

const EXPERIENCE_ZH: Experience[] = [
  {
    company: '澄凜企業股份有限公司',
    role: '後端工程師',
    period: '2024/11 – 2026/02',
    highlights: [
      '參與政府相關系統之開發與長期維運專案。',
      '負責後端功能開發、既有系統維護與局部重構。',
      '與 PM 與前端協作，完成流程型系統之功能實作。',
      '參與認證、稽查、報表等模組之開發與調整。'
    ]
  },
  {
    company: '麥斯科技有限公司',
    role: '軟體工程師',
    period: '2024/02 – 2024/07',
    highlights: [
      '維護企業內部系統並進行功能擴充。',
      '實作新功能並優化既有商業邏輯。',
      '協助資料介接、報表匯出與系統問題排除。',
      '參與正式環境系統維運與問題修正。'
    ]
  },
  {
    company: '松陽企業股份有限公司',
    role: '軟體工程師',
    period: '2023/07 – 2023/12',
    highlights: [
      '參與 KIOSK 應用系統開發，包含後端服務與操作流程實作。',
      '進行軟硬體整合與第三方服務串接。',
      '協助系統測試與實際環境部署。'
    ]
  }
];

const PROJECTS_EN: Project[] = [
  {
    id: 'proj_ecoschool',
    title: 'MOENV Taiwan–US Eco Schools — Certification Management System',
    shortDescription: 'Workflow-driven certification platform covering submission, review, and approval.',
    fullDescription: 'Provides complete submission, review, and certification flows for schools, partners, and reviewers with multi-role and multi-language support. Implemented backend logic for certification and review, data CRUD, report export, and email notifications.',
    techStack: ['C#', '.NET MVC', 'TypeScript', 'Entity Framework', 'React', 'MS SQL Server'],
    featured: true,
    challenges: [
      'Configurable multi-stage review process with access control',
      'PDF/Excel exports with multi-language support',
      'Email notifications triggered by workflow states',
      'Refactoring legacy structure to improve maintainability'
    ],
    mermaidCode: `
      flowchart TB
        subgraph Frontend_Framework[Vite + React]
          AdminUI[Frontend_Admin<br/>Admin Portal]
          ApplySite[Frontend_Apply<br/>Application Portal]
          PublicSite[Frontend_Official<br/>Public Website]
        end

        subgraph Backend_DotNet[Backend .NET 8]
          AdminApi[AdminApi<br/>CMS Admin API]
          ClientApi[ClientApi<br/>Public / Client API]
          Domain[Domain<br/>EF Models + Services]
          AdminApi --> Domain
          ClientApi --> Domain
        end

        subgraph Backend_Node[Backend Node.js]
          ApplyApi[ApplyAPI<br/>Application API]
        end 

        AdminUI -->|HTTP + RESTful| AdminApi
        PublicSite -->|HTTP| ClientApi
        ApplySite -->|HTTP| ApplyApi

        DB[(SQL Server<br/>Database)]
        Domain --> DB
        ApplyApi --> DB

        Uploads[(Static Files<br/>Static Assets)]
        AdminApi --> Uploads
        ClientApi --> Uploads
        ApplyApi --> Uploads
      `
  },
  {
    id: 'proj_elevator',
    title: 'Taoyuan City Building Management — Elevator Equipment System',
    shortDescription: 'Unified inspections and sampling management for inspectors, associations, and government.',
    fullDescription: 'Built modules for inspections/sampling, report import/export, backend APIs, and DB queries; maintained legacy .NET Framework for stability and security.',
    techStack: ['C#', '.NET Framework', 'TypeScript', 'SQL', 'IIS'],
    featured: true,
    challenges: [
      'Data correctness and consistency across inspection flows',
      'High-volume import/export performance and error handling',
      'Maintaining legacy framework stability and security'
    ]
  },
  {
    id: 'proj_travel_b2b',
    title: 'Kaishen Travel — B2B Travel Management',
    shortDescription: 'Internal B2B management and itinerary website maintenance.',
    fullDescription: 'Maintained existing features, integrated and processed travel data, implemented reporting, and troubleshot production issues to ensure system stability and data consistency.',
    techStack: ['C#', '.NET Framework', 'JavaScript', 'SQL', 'AJAX'],
    featured: false,
    challenges: [
      'Integrating and cleansing data from multiple sources',
      'Optimizing business logic and error control',
      'Investigating and fixing production incidents'
    ]
  },
  {
    id: 'proj_kiosk',
    title: 'Self-service Mahjong Hall — KIOSK Launch System',
    shortDescription: 'Self-service system integrating KIOSK UI, backend, hardware control, and third-party services.',
    fullDescription: 'Implemented backend services and operation flows, device and third-party integrations, frontend–backend interactions, and deployment support to improve UX and stability.',
    techStack: ['C#', '.NET Core', 'JavaScript', 'Bootstrap'],
    featured: false,
    challenges: [
      'Device communication and recovery mechanisms',
      'Stability of frontend–backend interaction flows',
      'Handling environment differences during deployment'
    ]
  }
];

const PROJECTS_ZH: Project[] = [
  {
    id: 'proj_ecoschool',
    title: '環境部台美生態學校－認證管理系統',
    shortDescription: '流程導向之認證平台，支援投稿、審核與認證全流程。',
    fullDescription: '提供學校、生態夥伴與審核單位進行完整的投稿、審核與認證流程管理，並支援多角色與多語系操作。負責認證流程與審核機制之後端邏輯、資料維護、報表匯出與通知機制。',
    techStack: ['C#', '.NET MVC', 'TypeScript', 'Entity Framework', 'React', 'MS SQL Server'],
    featured: true,
    challenges: [
      '建構可配置的多階段審核流程與權限控管',
      'PDF／Excel 報表匯出與多語系支援',
      '依流程狀態觸發 Email 通知',
      '既有系統完整重構與可維護性提升'
    ],
    mermaidCode: `
      flowchart TB
        subgraph Frontend Framework[Vite + React]
          AdminUI[Frontend_Admin<br/>管理端]
          ApplySite[Frontend_Apply<br/>申請端]
          PublicSite[Frontend_Offical<br/>官網]
        end

        subgraph Backend[Backend .NET 8]
          AdminApi[AdminApi<br/>CMS 管理後台 API]
          ClientApi[ClientApi<br/>對外/前台 API]
          Domain[Domain<br/>EF Models + Services]
          AdminApi --> Domain
          ClientApi --> Domain
        end

        subgraph Backend2[Backend Node JS]
          ApplyApi[ApplyAPI<br/>申請端 API]
        end 


        AdminUI -->|HTTP + Restful| AdminApi
        PublicSite -->|HTTP| ClientApi
        ApplySite -->|HTTP| ApplyApi

        DB[(SQL Server<br/>資料庫)]
        Domain --> DB
        ApplyApi --> DB

        Uploads[(Static Files<br/>靜態檔案)]
        AdminApi --> Uploads
        ClientApi --> Uploads
        ApplyApi --> Uploads
      `
  },
  {
    id: 'proj_elevator',
    title: '桃園市政府建管科－電梯升降設備管理系統',
    shortDescription: '整合稽查人員、協會與政府單位作業流程的管理系統。',
    fullDescription: '建立一致化的稽查與抽樣管理機制，負責稽查與抽樣模組、報表資料匯入／匯出、後端 API 與資料庫查詢，並維護舊有 .NET Framework 系統。',
    techStack: ['C#', '.NET Framework', 'TypeScript', 'SQL', 'IIS'],
    featured: true,
    challenges: [
      '稽查、抽樣流程的資料正確性與一致性',
      '大量報表匯入／匯出效能與錯誤處理',
      '維護舊版框架的穩定性與安全性'
    ]
  },
  {
    id: 'proj_travel_b2b',
    title: '凱旋旅行社－旅遊管理系統（B2B）',
    shortDescription: '企業內部 B2B 旅遊管理與行程官網維護。',
    fullDescription: '維護既有功能、旅遊資料介接與處理、報表匯出與正式環境問題排查，確保內外部系統穩定與資料一致。',
    techStack: ['C#', '.NET Framework', 'JavaScript', 'SQL', 'AJAX'],
    featured: false,
    challenges: [
      '多來源旅遊資料介接與清洗',
      '既有商業邏輯優化與錯誤控管',
      '正式環境事故排查與修復'
    ]
  },
  {
    id: 'proj_kiosk',
    title: '無人麻將館開台系統（KIOSK）',
    shortDescription: '整合 KIOSK、後端服務、硬體控制與第三方串接的自助系統。',
    fullDescription: '負責後端服務與操作流程、設備與第三方服務串接、前後端互動設計與部署支援，提升操作體驗與系統穩定性。',
    techStack: ['C#', '.NET Core', 'JavaScript', 'Bootstrap'],
    featured: false,
    challenges: [
      '裝置溝通與錯誤復原機制',
      '前後端互動流程的穩定性',
      '實際環境部署的環境差異處理'
    ]
  }
];

export const CONTENT = {
  en: {
    heroIntro: `> Initializing profile...
> Backend: C# / ASP.NET / .NET MVC
> Ops: Legacy maintenance, refactoring, reporting, i18n & notifications
> System ready.

~2–3 years of .NET backend development for government and enterprise systems.
Experienced in workflow systems (certification, inspection, sampling, submission & review), data management, and report export.
Primary stack: C#, ASP.NET, .NET Framework / MVC.`,
    nav: {
      home: 'Home',
      projects: 'Projects',
      stack: 'Tech Stack',
      log: 'Experience',
    },
    sections: {
      intro: 'About Me',
      introText: 'Focused on backend system stability and clear workflows. Experienced in government projects and legacy system maintenance; strong at incremental refactoring to improve maintainability and efficiency over greenfield builds.',
      coreFocus: 'Core Focus',
      coreFocusText: 'Legacy maintenance, workflow systems, reporting, i18n & notifications',
      currentStatus: 'Current Status',
      currentStatusText: 'Maintaining and optimizing government/enterprise systems.',
      modules: 'Projects',
      featuredOnly: '-- featured',
      dependencies: 'Tech Stack',
      stackText: 'Two-axis view of skills: practical experience vs conceptual understanding across languages/frameworks, databases, ops, and tools.',
      changelog: 'Experience',
      changelogText: 'Companies and role highlights.',
      footer: 'Portfolio built with React + Tailwind',
    },
    ui: {
      featured: 'Featured',
      projectSpecs: 'Project Specs',
      keyChallenges: 'Key Challenges',
      architecture: 'System Architecture',
      askAi: 'Ask the AI',
    },
    projects: PROJECTS_EN,
    experience: EXPERIENCE_EN,
    chatInit: 'Hi, I am the portfolio assistant. Ask about my stack, projects, or experience.',
    categories: {
      Frontend: 'Frontend',
      Backend: 'Backend',
      Database: 'Database',
      DevOps: 'DevOps',
      AI: 'AI',
      Tools: 'Tools',
    },
    chartLabels: {
      xAxis: 'Practical Experience',
      yAxis: 'Conceptual Understanding',
      xDesc: 'Years in real projects, production deployments, ops and incident handling.',
      yDesc: 'Architecture understanding, data flow mastery, ability to refactor and adjust design.',
      high: 'High',
      low: 'Low',
      legend: 'Tech Category'
    }
  },
  zh: {
    heroIntro: `> 初始化個人摘要...
> 後端：C#／ASP.NET／.NET MVC
> 維運：既有系統重構、報表匯出、多語系與通知
> 系統就緒。

具約 2–3 年 .NET 系統開發與維護經驗，參與政府標案與企業內部系統。
熟悉流程型系統（認證、稽查、抽樣、投稿與審核）、資料管理與報表匯出。
主要使用 C#、ASP.NET、.NET Framework／MVC 進行後端開發。`,
    nav: {
      home: '首頁',
      projects: '專案',
      stack: '技術能力',
      log: '工作經歷',
    },
    sections: {
      intro: 'About Me（簡介）',
      introText: '專注於後端系統的穩定性與流程清晰度，具備政府專案與既有系統維護經驗，能在高穩定性需求的環境下進行功能擴充與系統調整。相較從零開發，更擅長在既有架構中進行重構與漸進式優化，提升可維護性與使用效率。',
      coreFocus: '核心焦點',
      coreFocusText: '既有系統維運、流程型系統、報表匯出、多語系與通知',
      currentStatus: '目前狀態',
      currentStatusText: '聚焦政府與企業系統的維護與優化。',
      modules: '專案',
      featuredOnly: '— 精選',
      dependencies: '技術能力',
      stackText: '以實務與原理雙軸呈現：語言／框架、資料庫、維運與工具。',
      changelog: '工作經歷',
      changelogText: '參與公司與職務重點回顧。',
      footer: 'Portfolio 以 React + Tailwind 建置',
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
    chatInit: '你好，我是作品集助理。可詢問我的技術、專案與經歷。',
    categories: {
      Frontend: '前端',
      Backend: '後端',
      Database: '資料庫',
      DevOps: '維運',
      AI: '人工智慧',
      Tools: '工具',
    },
    chartLabels: {
      xAxis: '實務操作經驗',
      yAxis: '設計／原理理解',
      xDesc: '實際專案使用年資、上線經驗、維運與問題處理',
      yDesc: '架構理解、資料流掌握、能否重構與調整設計',
      high: '高',
      low: '低',
      legend: '技術分類'
    }
  }
};