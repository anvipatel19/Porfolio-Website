import { useEffect, useState, type JSX } from 'react';
import { Menu, X } from 'lucide-react';
import { projects } from './projects';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

function App() {
  type SectionKey = 'about' | 'work' | 'projects' | 'contact';
  const routeForSection: Record<SectionKey, string> = {
    about: '/',
    work: '/experience',
    projects: '/projects',
    contact: '/contact',
  };

  const sectionFromPath = (path: string): SectionKey => {
    const match = (Object.entries(routeForSection) as Array<[SectionKey, string]>).find(
      ([, route]) => route === path,
    );
    return match ? match[0] : 'about';
  };

  const [activeSection, setActiveSection] = useState<SectionKey>(
    sectionFromPath(window.location.pathname),
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handlePopState = () => {
      setActiveSection(sectionFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const targetRoute = routeForSection[activeSection];
    if (window.location.pathname !== targetRoute) {
      window.history.pushState({ section: activeSection }, '', targetRoute);
    }
  }, [activeSection]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth >= 768;
      setIsDesktop(isWide);
      if (isWide) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const navItems: { id: SectionKey; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];
  const navButtonClasses = (isActive: boolean) => {
    const focusClasses = isDesktop
      ? 'focus:outline-none focus-visible:outline-none focus-visible:ring-0'
      : 'focus:outline-none focus-visible:outline-none focus-visible:ring-0';
    return [
      'w-full rounded-2xl px-4 py-2 text-left text-base font-semibold text-slate-100 transition-all duration-150 shadow-[0_12px_30px_rgba(2,6,23,0.55)] md:w-auto md:rounded-none md:bg-transparent md:px-0 md:py-0 md:text-base md:font-medium md:text-slate-300 md:shadow-none',
      focusClasses,
      isActive
        ? 'bg-slate-800/90 text-white md:bg-transparent md:text-white md:underline md:decoration-sky-400 md:decoration-2 md:underline-offset-8'
        : 'bg-slate-900/70 text-slate-200 hover:text-white md:bg-transparent',
    ].join(' ');
  };

  const sections: Record<SectionKey, JSX.Element> = {
    about: (
    <section key="about" id="about" className="space-y-10">
      <div className="w-full rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/80 p-6 shadow-[0_15px_50px_rgba(2,6,23,0.65)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-500/70 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)] sm:p-8 md:p-10">
        <div className="space-y-5 text-center md:text-left">
          <p className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
            Hi, I’m <span className="text-sky-300">Anvi Patel</span>, a software developer with a front-end focus.
          </p>

          <p className="text-sm text-slate-300 md:text-base">
            I build user-facing web experiences with React and TypeScript with attention to performance,
            accessibility and clean component design. I’ve worked on API integrations, shaped responses into
            UI-friendly models and shipped production-ready features with solid test coverage. I’ve worked
            with product teams at Amazon and Salesforce and previously built patient-facing applications
            at Accenture for Kaiser Permanente.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-sky-600 px-6 text-base font-semibold text-white transition-colors hover:bg-sky-500 hover:text-white focus-visible:ring-sky-300 sm:w-auto"
            >
              <a href="/AnviPatelResume.pdf" download="AnviPatel-Resume.pdf">
                Download resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-slate-500 bg-slate-900/40 px-6 text-base font-semibold text-slate-100 transition-colors hover:border-sky-400 hover:bg-slate-800 hover:text-white focus-visible:ring-slate-300 sm:w-auto"
              onClick={() => setActiveSection('work')}
            >
              Work experience
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950/80 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-500/70 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Skills</p>

        <div className="grid gap-6 pt-6 text-xs text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Frontend',
              items: [
                'React',
                'Redux',
                'JavaScript (ES6+)',
                'TypeScript',
                'Accessibility (WCAG)',
                'HTML5',
                'CSS3',
                'SASS/SCSS',
                'TailwindCSS',
              ],
            },
            {
              title: 'Backend & Data',
              items: ['Node.js', 'REST APIs', 'GraphQL', 'Python', 'MySQL', 'MongoDB'],
            },
            {
              title: 'Tooling & Cloud',
              items: [
                'Git',
                'GitHub',
                'GitHub Copilot',
                'ChatGPT',
                'LLM integration',
                'VS Code',
                'Jira',
                'Figma',
                'Jest',
                'NVDA',
                'AWS',
                'Azure',
              ],
            },
          ].map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-[11px] font-semibold uppercase text-slate-500">{group.title}</p>

              <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
                {group.items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="rounded-full border-slate-700 bg-slate-900/80 text-[11px] font-medium text-slate-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    ),
    work: (
      <section key="work" id="work" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-50">Experience</h2>
        <div className="space-y-4 text-sm text-slate-200 leading-relaxed md:text-base">
          {[
            {
              company: 'Salesforce',
              role: 'Software Engineer (Contract) · Remote',
              period: 'Jun 2025 – Aug 2025',
              stack: 'TypeScript · React · Web Components · Node.js · REST/GraphQL · Jest · Webpack',
              highlights: [
                'Built visitor-facing features for Salesforce.com using TypeScript, React, and Web Components alongside Node.js microservices.',
                'Improved performance and reliability through Jest coverage, CI automation, and Webpack code splitting.',
                'Partnered with product, design, and backend teams to align requirements and ship on schedule.',
                'Created reusable UI components and test utilities to reduce duplication across features.',
              ],
            },
            {
              company: 'Amazon',
              role: 'Front End Engineer (Contract) · Seattle, USA',
              period: 'Jul 2024 – Apr 2025',
              stack: 'TypeScript · JavaScript · HTML/CSS · Node.js · Jest · Performance',
              highlights: [
                'Shipped 5+ Prime upsells in Cart and Checkout using the Cards widget framework (server + client rendering) and backend-integrated view models.',
                'Ensured responsive behavior across desktop and mobile for critical purchase flows.',
                'Maintained unit and integration tests (Jest) to reduce regressions and deployment risk.',
                'Implemented performance improvements such as lazy loading to reduce page load time.',
              ],
            },
            {
              company: 'Accenture',
              role: 'Senior Front End Developer · India (Client: Kaiser Permanente, US)',
              period: 'Aug 2018 – Dec 2023',
              stack: 'React · TypeScript · GraphQL · Node.js · Accessibility (WCAG) · Agile',
              highlights: [
                'Built patient-facing flows including Covid-19 forms and appointment scheduling, with a focus on performance and WCAG accessibility.',
                'Developed workflow and state management features using TypeScript and GraphQL APIs; supported SSR with Node.js.',
                'Drove accessibility improvements and partnered with teams to make issues measurable and repeatable to fix.',
                'Mentored junior developers through reviews and technical guidance while delivering time-sensitive releases.',
              ],
            },
          ].map((job) => (
            <div
              key={job.company}
              className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950/80 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-500/70 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-50">{job.company}</p>
                  <p className="text-base text-slate-300">{job.role}</p>
                </div>
                <div className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
                  {job.period}
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-400">{job.stack}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-sky-200">
                {job.stack.split(' · ').map((skill) => (
                  <span
                    key={`${job.company}-${skill}`}
                    className="rounded-full border border-sky-500/30 bg-slate-900/70 px-2 py-1 text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-200 md:text-base">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    projects: (
      <section key="projects" id="projects" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-50">Personal Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex h-full flex-col rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950/80 p-6 text-sm text-slate-300 shadow-[0_10px_30px_rgba(2,6,23,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-500/70 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)]"
            >
              <header className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-xs text-slate-400">{project.tech}</p>
              </header>
              <p className="mt-3 text-sm text-slate-200">{project.description}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-sky-200">
                {project.tech.split(',').map((skill) => (
                  <span
                    key={`${project.id}-${skill.trim()}`}
                    className="rounded-full border border-sky-500/30 bg-slate-900/70 px-2 py-1 text-[10px]"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.liveUrl && (
                  <Button
                    asChild
                    size="sm"
                    className="w-full rounded-full bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-500 hover:text-white sm:w-auto"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full rounded-full border-slate-500 bg-slate-900/40 px-4 text-sm font-semibold text-slate-100 transition-colors hover:border-sky-400 hover:bg-slate-800 hover:text-white sm:w-auto"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    contact: (
      <section key="contact" id="contact" className="pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/85 to-slate-950/80 p-6 shadow-[0_15px_40px_rgba(2,6,23,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-500/70 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)] sm:p-8 md:p-10">
          <span className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl sm:h-40 sm:w-40" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-purple-500/10 blur-3xl sm:h-32 sm:w-32" />
          <div className="relative grid gap-6 md:grid-cols-[1.1fr,0.9fr] md:items-center md:gap-8">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Let’s collaborate</p>

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Open to software engineering roles with a front-end focus
              </h2>

              <p className="text-sm text-slate-400">
                If you’re hiring for front-end roles or building polished interfaces and AI-assisted workflows,
                I’d be happy to connect.
              </p>

              <p className="text-xs text-slate-500">
                Work authorization: H-4 EAD (no sponsorship required).
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-inner shadow-black/20 sm:p-6">
              {[
                {
                  label: 'Email',
                  value: 'anvipatel194@gmail.com',
                  href: 'mailto:anvipatel194@gmail.com',
                },
                {
                  label: 'GitHub',
                  value: 'github.com/anvipatel19',
                  href: 'https://github.com/anvipatel19',
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/anvipatel19',
                  href: 'https://www.linkedin.com/in/anvipatel19/',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-800 hover:bg-slate-900/70"
                >
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                    <span className="text-slate-400 group-hover:text-slate-200">↗</span>
                  </span>
                  <span className="font-medium underline decoration-dotted decoration-slate-600">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#03091c] via-[#040b23] to-[#01030d] text-slate-50">
      {isMenuOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-10 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#03091c]/90 backdrop-blur">
        <div className="relative mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex-1 text-[0.68rem] uppercase tracking-[0.2em] text-slate-200 sm:text-[0.75rem] sm:tracking-[0.35em]">
            Software Engineer · Front End
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="site-nav"
            aria-expanded={isMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-500/60 bg-slate-900/80 text-sky-100 shadow-[0_15px_35px_rgba(2,6,23,0.55)] transition hover:border-sky-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-current" strokeWidth={1.8} />
            ) : (
              <Menu className="h-5 w-5 text-current" strokeWidth={1.8} />
            )}
          </button>
          <nav
            id="site-nav"
            aria-label="Primary navigation"
            aria-hidden={!isDesktop && !isMenuOpen}
            className={`absolute left-4 right-4 top-[calc(100%+0.75rem)] z-30 flex flex-col gap-2 rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#050b22] p-4 text-base font-medium text-slate-200 shadow-[0_35px_80px_rgba(2,6,23,0.75)] backdrop-blur-xl transition-all duration-200 md:relative md:left-auto md:right-auto md:top-auto md:z-auto md:ml-auto md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:text-base md:text-slate-400 md:shadow-none ${
              isMenuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={navButtonClasses(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="w-full flex-1 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl space-y-16 px-4 sm:px-6 md:space-y-20">
          {sections[activeSection]}
        </div>
      </main>
      <footer className="border-t border-slate-800 bg-slate-950/80 px-4 py-6 text-center shadow-inner shadow-black/20 sm:px-6">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Anvi Patel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
