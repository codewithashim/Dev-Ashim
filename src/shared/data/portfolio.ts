import { PortfolioData } from '@/shared/types'

export const portfolioData: PortfolioData = {
  name: 'Ashim Rudra Paul',
  title: 'Software Engineer — Full Stack / DevOps',
  phone: '+8801740-737445',
  email: 'codewithashim@gmail.com',
  location: 'Sylhet, Bangladesh',
  portfolio: 'https://ashimrudrapaul.com',
  linkedin: 'https://linkedin.com/in/codewithashim',
  github: 'https://github.com/codewithashim',
  
  about: [
    'Welcome to my terminal! 👋',
    '',
    'I\'m Ashim Rudra Paul, a passionate Software Engineer specializing in Full Stack',
    'Development and DevOps. With over 3 years of experience, I\'ve worked on diverse',
    'projects ranging from AI automation to enterprise ERP systems.',
    '',
    'I thrive on building scalable, efficient solutions that solve real-world problems.',
    'My expertise spans modern web technologies, cloud infrastructure, and AI integration.',
    '',
    'Currently working at SJ Innovation LLC, where I develop backend services and AI',
    'automation workflows that streamline operations and enhance efficiency.',
    '',
    'Type "help" to see available commands or explore the desktop apps above!',
  ],
  
  skills: [
    {
      category: 'Frontend',
      items: 'TypeScript, Next.js, React Native, React, Redux, Zustand, Vue'
    },
    {
      category: 'Backend',
      items: 'Node.js, Express.js, Fastify, Nest.js, GraphQL, Socket.IO, Prisma ORM, BullMQ, Redis, Pusher, Elasticsearch, Payment Gateway'
    },
    {
      category: 'Database',
      items: 'PostgreSQL, MongoDB, MySQL'
    },
    {
      category: 'Tools',
      items: 'Linux, GitHub, Swagger, Jira, Trello, Confluence, DigitalOcean, AWS (EC2, ECR, EKS, RDS, S3, ELB), Docker, Jest, GitHub Actions, Grafana'
    },
    {
      category: 'AI & Automation',
      items: 'AI Agent Development, Workflow Automation, n8n, ElevenLabs, Virtual Assistants'
    }
  ],
  
  experience: [
    {
      company: 'SJ Innovation LLC',
      position: 'Software Engineer',
      location: 'Sylhet (On-site)',
      period: 'August 2024 - Present',
      type: 'Full-Time',
      responsibilities: [
        'Actively participated in Agile methodology, conducting project user story analysis, sprint planning, and task management using Jira, Asana, and ActiveCollab to ensure seamless project delivery.',
        'Developing backend and AI automation features for CollabAI by integrating services such as HubSpot, Slack, Google Drive (automating file management and synchronization), Dynamic App, and AI agents to streamline workflows and significantly enhance operational efficiency.',
        'Building automation workflows for banking, health EMR systems, and Paige\'s Office (invoice tracking system) using n8n and BullMQ, optimizing data processing pipelines & achieving a 25% improvement in processing efficiency across systems.',
        'Optimized Laravel-based applications by enhancing database queries with PostgreSQL, refactoring code, and implementing Redis caching strategies, resulting in a 30% boost in application responsiveness and reduced server load.'
      ]
    },
    {
      company: 'elPixala',
      position: 'Full Stack Developer',
      location: 'India (Remote)',
      period: 'January 2023 - July 2024',
      type: 'Full-Time',
      responsibilities: [
        'Implemented test-driven development (TDD) with high code coverage using unit and integration tests, improving code quality and reducing post-release bugs; actively participated in code reviews to maintain team standards and collaboration.',
        'Spearheaded the integration of Swagger (OpenAPI) to deliver clear, interactive API documentation, streamlining frontend-backend collaboration, enhancing developer experience, and reducing onboarding friction for new team members.',
        'Deployed the product to production using AWS Cloud, implementing CI/CD pipelines for automated testing and deployment, monitoring system performance with cloud-native tools, and ensuring scalability, reliability, and high availability.'
      ]
    },
    {
      company: 'RI Software',
      position: 'Frontend Engineer',
      location: 'New York (Remote)',
      period: 'July 2022 - December 2022',
      type: 'Contract-based',
      responsibilities: [
        'Designed and developed user interfaces for ERP software, ensuring a seamless and intuitive user experience.',
        'Developed custom UI components using advanced techniques such as component reusability and modular architecture, enhancing functionality and visual appeal.',
        'Implemented a real-time chat module using WebSocket technology, increasing communication efficiency and user engagement.',
        'Applied best UI/UX practices and TypeScript to manage code complexity by utilizing static type checking and code splitting, leading to a noticeable reduction in code errors and improved performance.'
      ]
    }
  ],
  
  projects: [
    {
      id: 'lipika-ai',
      name: 'LipikaAI',
      description: 'Real-time AI interaction platform with multimodal AI integration',
      tech: ['Next.js', 'TypeScript', 'Express.js', 'GenAI', 'MongoDB'],
      link: 'https://lipika.ai',
      highlights: [
        'Real-Time AI Interaction: Utilizes Server-Sent Events (SSE) to enable seamless, real-time streaming responses from AI models, enhancing user experience during conversations.',
        'Multimodal AI Integration: Integrated multiple powerful AI model APIs, including ChatGPT, Claude, Grok, DeepSeek, and Gemini, through a centralized interface. These models support diverse capabilities such as text generation, image processing, video analysis, and more.',
        'Smart Utility Tools: Enhanced functionality with built-in tools, including Grammarly for grammar and writing assistance, QuillBot for intelligent paraphrasing, HIX Bypass for unlocking AI-restricted content, and GPTZero for AI-generated content detection.',
        'Unified Chat Interface: A centralized and user-friendly interface enables smooth switching between models and tools, offering an intuitive and efficient AI experience.',
        'This platform is designed to be a versatile, all-in-one AI assistant for users seeking high-quality outputs across creative, academic, and professional tasks.'
      ]
    },
    {
      id: 'paiges-office',
      name: 'Paige\'s Office',
      description: 'Invoice tracking system with AI voice assistant',
      tech: ['Next.js', 'n8n', 'BullMQ', 'PostgreSQL', 'TypeScript'],
      link: 'https://paiges-office.com',
      highlights: [
        'Developed automation workflows with n8n, streamlining invoice intake, payment confirmation, and follow-up communication.',
        'Utilized BullMQ to manage high-throughput background processing, ensuring timely task execution even during traffic spikes.',
        'Integrated a voice-enabled virtual assistant using ElevenLabs, supporting inbound and outbound calling to handle invoice status inquiries and payment reminders.',
        'Designed RESTful APIs and documented them with Swagger, enabling smooth integration with client systems and internal services.',
        'Enabled real-time updates using WebSockets, facilitating instant notifications for invoice events and customer interactions.'
      ]
    },
    {
      id: 'zeework',
      name: 'ZeeWork',
      description: 'Platform connecting freelancers and businesses',
      tech: ['MongoDB', 'Express.js', 'Node.js', 'Socket.IO', 'Payment Gateway', 'React.js', 'TypeScript'],
      link: 'https://zeework.com',
      highlights: [
        'Search Functionality Optimization: Improved backend performance for search operations by integrating Elasticsearch and reducing average latency to under 300ms. Achieved a smooth and responsive user experience through advanced query optimization and intelligent caching strategies.',
        'Real-Time Chat System: Designed and implemented a scalable chat infrastructure using Socket.IO, enabling real-time communication with minimal message delivery lag and seamless user experience.',
        'Secure Payment Integration: Integrated a robust payment workflow using Stripe, handling subscription billing, refunds, and webhook-based event tracking with high reliability and security.',
        'Backend Performance Enhancement: Refactored service architecture and optimized queries, improving response time under load and maintaining consistent performance during traffic surges.'
      ]
    }
  ],
  
  education: 'Sylhet Polytechnic Institute || 2019-2020 Computer Science And Engineering'
}

