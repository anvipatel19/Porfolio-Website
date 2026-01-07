export interface Project {
  id: string;
  title: string;
  tech: string;
  description: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'ai-knowledge-sidekick',
    title: 'AI Knowledge Sidekick',
    tech: 'React, TypeScript, Node.js, Express, Hugging Face',
    description:
      'AI-powered document Q&A app where users upload PDF/text files and ask questions in a chat interface, with answers grounded in the selected document.',
    highlights: [
      'Two-pane layout with document sidebar and chat interface',
      'Supports PDF and text uploads with server-side text extraction',
      'Integrates Hugging Face Router for LLM-backed, document-grounded answers',
    ],
    githubUrl: 'https://github.com/anvipatel19/ai-knowledge-sidekick/',
    liveUrl: 'https://drive.google.com/file/d/13u-6x-0D9_Ptyda0H_QAhchRr6dqu-Qh/view?usp=sharing',
  },
  {
    id: 'hungry-hub',
    title: 'Hungry Hub',
    tech: 'React, Redux Toolkit, Tailwind, Jest, Swiggy API',
    description:
      'Food delivery app using live Swiggy API integration for restaurant discovery and ordering.',
    highlights: [
      'Redux Toolkit for efficient state management',
      'Responsive restaurant listing and filters',
    ],
  },
  {
    id: 'binge-box',
    title: 'Binge Box',
    tech: 'React, Redux Toolkit, Firebase, TMDb API',
    description:
      'Movie and TV show explorer with detailed info and trailers from TMDb.',
    highlights: [
      'React Router for navigation across categories and details',
      'Integration with TMDb API for rich media content',
    ],
  },
  {
    id: 'youtube-clone',
    title: 'YouTube Clone',
    tech: 'React, Tailwind, YouTube Data API',
    description:
      'YouTube-style UI with infinite scroll, nested comments, and live chat.',
    highlights: [
      'Infinite scroll for video feed',
      'Nested comments and simulated live chat',
    ],
  },
];
