// All visible copy lives here so wording can change without touching layout.
// Keep professional project contributions limited to verified work.

export const profile = {
  name: 'Kimberly Lopez',
  // Portfolio headline. The Meatplus job title is separate and stays
  // "Backend Software Developer" in the experience entry.
  title: 'Full-Stack Software Developer',
  greeting: 'Hi, I’m Kimberly.',
  headline:
    'I’m a software developer working mainly with PHP, Laravel, JavaScript, and MySQL.',
  facts: [
    'Backend Software Developer at Meatplus Trading Corp.',
    'Quezon City, Philippines',
  ],
  email: 'lopezkcc714@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lopezkcc714',
  github: 'https://github.com/itsmeyanxi',
  team: 'https://lokalgrpdev.netlify.app/',
  teamName: 'LokalGrp.dev',
  resume: '/Kimberly-Lopez-Resume.pdf',
  resumeReady: true,
  location: 'Quezon City, Philippines',
};

export const about = {
  heading: 'About Me',
  body: [
    'I’m a software developer based in Quezon City. I currently work on internal business systems at Meatplus Trading Corp., where I handle both backend and frontend work.',
    'I graduated with a BS in Information Technology from the Technological Institute of the Philippines. Outside work, I like building projects based on things I would actually use, which is how Habi Moments and Shuhai started.',
  ],
};

// `kind` decides which section a project appears in.
// The two work systems are internal, so no live link and no repository.
// Project dates are not shown: they were inferred from commits, not given.
export const projects = [
  {
    slug: 'pmai-warehouse',
    kind: 'professional',
    name: 'PMAI Warehouse System',
    category: 'Production & Warehouse',
    org: 'Meatplus Trading Corp.',
    team: 'Two developers',
    what:
      'PMAI is an internal production and warehouse system we use to track products from weighing to warehouse receiving, storage, processing, and dispatch. Each crate gets a QR code that is used to track it as it moves through the system.',
    cardSummary:
      'Internal production and warehouse system for tracking crates from weighing to dispatch.',
    areas: ['Weighing', 'Warehouse', 'Reporting', 'Access'],
    workflow: [
      'Production weighing',
      'QR-coded crate identification',
      'Warehouse receiving',
      'Storage / processing',
      'Inventory & stock movement',
      'Dispatch',
    ],
    // Grouped by area. Entries with a title render as labelled blocks.
    tech: [
      'PHP',
      'Laravel',
      'MySQL / MariaDB',
      'Blade',
      'Tailwind CSS',
      'Alpine.js',
      'JavaScript',
      'Vite',
      'Git',
    ],
    links: {},
    caseStudy: true,
  },

  {
    slug: 'sopod',
    kind: 'professional',
    name: 'SOPOD',
    category: 'Purchasing & Accounts Payable',
    org: 'Meatplus Trading Corp.',
    team: 'Two developers',
    what:
      'SOPOD is an internal system we use at Meatplus for purchasing and finance. It handles the process from purchase requests and purchase orders to receiving, AP invoices, requests for payment, and check vouchers.',
    cardSummary:
      'Internal purchasing and finance system covering the workflow from purchase request to payment.',
    areas: ['Finance features', 'Reports', 'Imports', 'Permissions'],
    workflow: [
      'Purchase Request',
      'Purchase Order',
      'Receiving / Approval',
      'AP Invoice',
      'Request for Payment',
      'Check Voucher',
    ],
    tech: [
      'PHP',
      'Laravel',
      'MySQL',
      'JavaScript',
      'Bootstrap',
      'Tailwind CSS',
      'AdminLTE',
      'Vite',
      'Git',
    ],
    links: {},
    caseStudy: true,
  },

  {
    slug: 'habi-moments',
    kind: 'personal',
    name: 'Habi Moments',
    category: 'Booking & photo booth system',
    cardSummary:
      'Booking, payments and photo booth management system I built for Habi Moments.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
    links: { source: 'https://github.com/itsmeyanxi/hiraya-events' },
    caseStudy: false,
  },

  {
    slug: 'shuhai',
    kind: 'personal',
    name: '书海 Shuhai',
    category: 'Reading tracker · PWA',
    cardSummary:
      'Personal reading tracker for novels and comics I read on other websites.',
    tech: ['Cloudflare Workers', 'D1', 'JavaScript'],
    links: { live: 'https://shuhai.shuhai.workers.dev' },
    caseStudy: false,
  },
];

export const projectAccessNote =
  'Internal company system — source code and live access aren’t public.';

export const professionalProjects = projects.filter((p) => p.kind === 'professional');
export const personalProjects = projects.filter((p) => p.kind === 'personal');
export const findProject = (slug) => projects.find((p) => p.slug === slug);

export const experience = [
  {
    company: 'Meatplus Trading Corp.',
    role: 'Backend Software Developer',
    dates: 'November 2025 — Present',
    location: 'Quezon City · On-site',
    current: true,
    bullets: [
      'Help develop internal systems for production, warehouse, purchasing, and finance operations.',
      'Work on both backend and frontend features using Laravel, PHP, MySQL/MariaDB, JavaScript, Blade, Tailwind CSS, and Alpine.js.',
      'Handle database work, validation, debugging, testing, reports, document generation, data import/export, and role-based access.',
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'MariaDB', 'JavaScript', 'Blade', 'Tailwind CSS', 'Alpine.js'],
  },
  {
    company: 'moodLearning, Inc.',
    role: 'IT Intern — Web Developer',
    dates: 'February 2025 — May 2025',
    location: 'UP Diliman, Quezon City',
    current: false,
    bullets: [
      'Built responsive React.js and Ionic interfaces and helped with testing, debugging, and deployment.',
    ],
    tech: ['React.js', 'Ionic', 'JavaScript'],
  },
];

export const education = {
  heading: 'Education',
  items: [
    {
      school: 'Technological Institute of the Philippines',
      credential: 'BS Information Technology',
      dates: 'Graduated 15 June 2026',
      location: 'Cubao, Quezon City',
    },
  ],
};

export const certifications = {
  heading: 'Certifications',
  dates: '2022',
  items: [
    { name: 'Programming for Intermediate Users Using Python', date: 'July 2022' },
    { name: 'Programming for Beginners Using Python', date: 'July 2022' },
  ],
};

export const skills = [
  {
    group: 'Primary',
    note: 'Main stack',
    primary: true,
    items: ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'MariaDB', 'SQL', 'Git'],
  },
  {
    group: 'Frontend',
    items: ['Blade', 'Tailwind CSS', 'Alpine.js', 'Bootstrap', 'React.js', 'Ionic'],
  },
  {
    group: 'Familiar',
    note: 'Other technologies I’ve used',
    items: [
      'Python',
      'Java',
      'C#',
      'C++',
      'PostgreSQL',
      'Oracle',
      'Firebase',
      'TypeScript',
      'Next.js',
    ],
  },
  {
    group: 'Tools',
    items: ['VS Code', 'Vite', 'SAP', 'Burp Suite', 'Android Studio'],
  },
];

export const contact = {
  heading: 'Get in touch',
  lead:
    'If you’d like to talk about a software development role or my work, you can reach me by email or LinkedIn.',
};

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
