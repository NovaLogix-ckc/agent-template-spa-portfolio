export const siteConfig = {
  // --- Site Metadata ---
  site: {
    name: 'Your Company',
    tagline: 'Creative Technology',
    description: 'A modern digital studio crafting beautiful, scalable solutions.',
    url: 'https://example.com',
    locale: 'en_US',
    logoText: 'YOURCO',
    faviconLetter: 'Y',
    showcaseColorCycler: true,
    showThemeToggle: true,       // show light/dark mode toggle in navbar
    defaultTheme: 'system',      // 'dark' | 'light' | 'system' (follows OS preference)
  },

  // --- Theme Overrides ---
  // Any CSS custom property from variables.css can be overridden here.
  // Only include the ones you want to change.
  // Change --color-primary to re-theme the entire site.
  // Hover, subtle, and border variants are derived automatically via color-mix() in CSS.
  theme: {
    '--color-primary': '#0EA5E9',
    // '--color-bg': '#050505',
    // '--color-bg-elevated': '#111111',
    // '--color-text': '#f0f0f0',
  },

  // --- Navbar ---
  navbar: {
    contactButtonText: 'Contact',
  },

  // --- Sections ---
  // Controls rendering order AND navigation links.
  // Set enabled: false or remove an entry to hide a section.
  sections: [
    { id: 'services', label: 'Services', enabled: true },
    { id: 'work', label: 'Work', enabled: true },
    { id: 'showcase', label: 'Showcase', enabled: true },
    { id: 'insights', label: 'Insights', enabled: true },
    { id: 'about', label: 'About', enabled: true },
    { id: 'contact', label: 'Contact', enabled: true },
    { id: 'team', label: 'Team', enabled: false },
  ],

  // --- Hero ---
  hero: {
    greeting: 'Your Name',
    headlineLines: [
      { text: 'Innovator.', accent: false },
      { text: 'Creator.', accent: true },
      { text: 'Leader.', accent: false },
    ],
    tagline:
      'Crafting compelling solutions that are beautiful, scalable, and built to last. Describe your experience and what drives you here.',
    background: 'particles',       // 'particles' | 'aurora' | 'orbs' | 'embers'
    backgroundSwitcher: true,      // show switcher buttons in hero
  },

  // --- Services ---
  services: {
    heading: 'What We Do',
    background: 'grey',            // 'black' | 'grey' | 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
    items: [
      {
        number: '01',
        title: 'Strategy',
        description:
          'Define clear technical direction and roadmaps that align with business goals.',
      },
      {
        number: '02',
        title: 'Development',
        description:
          'Build robust, scalable applications using modern frameworks and best practices.',
      },
      {
        number: '03',
        title: 'Design',
        description:
          'Create intuitive interfaces and experiences that delight users and drive engagement.',
      },
      {
        number: '04',
        title: 'Support',
        description:
          'Provide ongoing maintenance, optimization, and technical guidance for your platforms.',
      },
    ],
  },

  // --- Work / Projects ---
  work: {
    heading: 'Selected Work',
    background: 'shapes',          // 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
    filterCategories: [
      { key: 'all', label: 'All' },
      { key: 'product', label: 'Products' },
      { key: 'opensource', label: 'Open Source' },
    ],
    labels: {
      opensource: 'View Repo',
      product: 'Learn More',
      default: 'View Project',
    },
    projects: [
      {
        id: 1,
        title: 'Project Alpha',
        category: 'Web Application',
        year: '2025',
        type: 'product',
        image: 'https://placehold.co/600x400/1a1a1a/808080?text=Project+Alpha',
        description:
          'A modern web application showcasing scalable architecture and clean design.',
      },
      {
        id: 2,
        title: 'Project Beta',
        category: 'Open Source Tool',
        year: '2025',
        type: 'opensource',
        image: '/github-code.svg',
        language: 'JavaScript',
        languageColor: '#f1e05a',
        description:
          'An open-source utility library for common development tasks.',
        github: '#',
      },
      {
        id: 3,
        title: 'Project Gamma',
        category: 'UI Component',
        year: '2024',
        type: 'opensource',
        image: '/github-code.svg',
        language: 'TypeScript',
        languageColor: '#3178c6',
        description:
          'A reusable component library built with accessibility and performance in mind.',
        github: '#',
      },
      {
        id: 4,
        title: 'Project Delta',
        category: 'Mobile App',
        year: '2025',
        type: 'product',
        image: 'https://placehold.co/600x400/1a1a1a/808080?text=Project+Delta',
        description:
          'A cross-platform mobile application with real-time data synchronization.',
      },
    ],
  },

  // --- Showcase ---
  showcase: {
    heading: 'Project Showcase',
    subtitle: 'A closer look at featured projects',
    background: 'shapes',          // 'black' | 'grey' | 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
    labels: {
      screenshotsHeading: 'Screenshots',
      live: 'Live',
      appStore: 'App Store',
      playStore: 'Play Store',
      github: 'GitHub',
    },
    statusLabels: {
      live: 'Live',
      beta: 'Beta',
      experimental: 'Experimental',
    },
    projects: [
      {
        id: 'featured-1',
        title: 'Featured Project',
        subtitle: 'A Detailed Case Study',
        description:
          'An in-depth look at a flagship project. Describe the problem, approach, and outcomes. Highlight key technical decisions and the impact delivered.',
        status: 'live',
        year: '2025',
        techStack: ['React', 'Node.js', 'Cloud', 'AI'],
        videoId: null,
        screenshots: [
          { src: 'https://placehold.co/800x500/1a1a1a/808080?text=Screenshot+1', alt: 'Screenshot 1' },
          { src: 'https://placehold.co/800x500/1a1a1a/808080?text=Screenshot+2', alt: 'Screenshot 2' },
        ],
        links: {
          live: '#',
          appStore: null,
          playStore: null,
          github: null,
        },
      },
    ],
  },

  // --- Insights ---
  insights: {
    heading: 'Insights',
    subtitle: 'Thoughts, talks, and updates',
    background: 'grey',            // 'black' | 'grey' | 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
    videos: {
      label: 'Videos',
      stats: {
        subscribers: '1K+',
        totalViews: '50K+',
        videos: '10',
      },
      channelUrl: '#',
      channelLinkText: 'View all videos',
      statLabels: {
        subscribers: 'Subscribers',
        totalViews: 'Total Views',
        videos: 'Videos',
      },
      items: [
        {
          id: 'dQw4w9WgXcQ',
          title: 'Sample Video Title',
          duration: '10:00',
          date: '2025',
          thumbnail: 'https://placehold.co/480x360/1a1a1a/808080?text=Video+1',
        },
        {
          id: 'dQw4w9WgXcQ',
          title: 'Another Video Title',
          duration: '15:30',
          date: '2025',
          thumbnail: 'https://placehold.co/480x360/1a1a1a/808080?text=Video+2',
        },
      ],
    },
    news: {
      label: 'News',
      ctaText: 'Follow along for the latest updates',
      ctaUrl: '#',
      items: [
        {
          date: 'Mar 2025',
          headline: 'New Feature Release',
          excerpt:
            'Launched a major update with improved performance and new capabilities.',
          link: '#',
        },
        {
          date: 'Jan 2025',
          headline: 'Community Milestone',
          excerpt:
            'Reached a significant community milestone with growing adoption and contributions.',
          link: '#',
        },
        {
          date: 'Nov 2024',
          headline: 'Open Source Launch',
          excerpt:
            'Released the core framework as open source, enabling community contributions.',
          link: '#',
        },
      ],
    },
  },

  // --- About ---
  about: {
    heading: 'About',
    background: 'black',           // 'black' | 'grey' | 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
    photoUrl: 'https://placehold.co/400x500/1a1a1a/808080?text=Your+Photo',
    photoAlt: 'Profile photo',
    quote:
      'Your personal or company mission statement goes here. What drives you and what you believe in.',
    paragraphs: [
      'Write about your background, experience, and what drives you. Describe your journey and the expertise you bring to every project.',
      'Explain your approach, philosophy, or unique value proposition. What makes you different from others in your field.',
      'Share your vision for the future, your goals, or what you are building next. Inspire confidence in your direction.',
    ],
    stats: [
      { value: '10+', label: 'Years of Experience' },
      { value: '50+', label: 'Projects Delivered' },
      { value: '5', label: 'Industries Served' },
    ],
  },

  // --- Contact ---
  contact: {
    heading: 'Have a project in mind?\nLet\u2019s talk.',
    ctaLabel: 'Get in touch',
    ctaUrl: '#',
    ctaExternal: false,
    background: 'grid',            // 'shapes' | 'grid' | 'mesh' | 'waves'
    backgroundSwitcher: true,      // show switcher buttons in section
  },

  // --- Footer ---
  footer: {
    copyright: 'Your Company',
    rightsText: 'All rights reserved.',
    backToTopText: 'Back to top',
    socialLinks: [
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },

  // --- Team ---
  team: {
    heading: 'The Team',
    members: [
      { name: 'Team Member', role: 'Founder & Strategy', initials: 'TM', color: '#1a1a3a' },
      { name: 'Team Member', role: 'Creative Director', initials: 'TM', color: '#3a1a2a' },
      { name: 'Team Member', role: 'Lead Developer', initials: 'TM', color: '#1a3a1a' },
    ],
  },
}
