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
  intro:
    'I work on internal systems for warehouse, production, purchasing, and finance operations.',
  facts: [
    'Backend Software Developer at Meatplus Trading Corp.',
    'Full-stack responsibilities',
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
  lead:
    'I’m currently a Backend Software Developer at Meatplus Trading Corp., but most of my work is full-stack because I also handle frontend features and interfaces.',
  body: [
    'Most of the systems I work on are internal business systems for warehouse, production, purchasing, and finance. I usually work with PHP, Laravel, MySQL or MariaDB, JavaScript, Blade, Tailwind CSS, and Alpine.js.',
    'I work with another developer, so I get involved in different parts of the system depending on what needs to be done: backend logic, database work, validation, reports, permissions, or frontend screens.',
    'I graduated with a BS in Information Technology from the Technological Institute of the Philippines. I also build personal projects when I want to learn something new or make something I would actually use.',
  ],
};

// `kind` decides which section a project appears in.
// The two work systems are internal, so no live link and no repository.
export const projects = [
  {
    slug: 'pmai-warehouse',
    kind: 'professional',
    name: 'PMAI Warehouse System',
    category: 'Production & Warehouse',
    org: 'Meatplus Trading Corp.',
    period: '2026',
    credit: 'Co-developed with one other developer',
    what:
      'An internal production and warehouse system that tracks crates from weighing to warehouse receiving, storage, processing, stock movement, and dispatch. Each crate gets a QR code so the same record can be followed through the whole process.',
    cardSummary:
      'Internal production and warehouse system for tracking crates from weighing to dispatch.',
    cardRole:
      'I worked on production weighing, further processing, pallets, QR labels, receiving, and stock and production reports.',
    workflow: [
      'Production weighing',
      'QR-coded crate identification',
      'Warehouse receiving',
      'Storage / processing',
      'Inventory & stock movement',
      'Dispatch',
    ],
    contribution: [
      'Built the production weighing flow, including live scale readings, automatic SKU assignment based on weight, batch QR label printing, and CSV export.',
      'Worked on the further-processing module, including item entry, customer routing, QR generation, receiving, and return tracking.',
      'Built pallet creation and crate assignment, including printable pallet tags.',
      'Worked on warehouse receiving and stock and production reports.',
      'Added role-based access and per-user module permissions.',
      'Fixed issues involving timezone handling, printed weights, and report performance.',
      'Wrote the database schema documentation and generated the ER diagram.',
    ],
    features: [
      'QR generation and scanning',
      'Crate tracking and crate audit',
      'Inventory and stock movement',
      'Pallets and storage assignment',
      'Issuance and stock transfers',
      'Production records and summaries',
      'Customer picklists and dispatch',
      'Reporting and audit functions',
      'Printable documents (PDF)',
      'Excel / CSV import and export',
      'Role-based access control',
    ],
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
    notes: [
      {
        title: 'QR tracking',
        text: 'Each crate gets one QR code when it is weighed. The same code is scanned later during receiving, storage, processing, and dispatch so the record does not have to be recreated at every step.',
      },
      {
        title: 'Scale integration',
        text: 'The weighing scale sends its latest reading to the server. The weighing screen then reads that value, so the operator does not have to type the weight manually.',
      },
      {
        title: 'Printable labels',
        text: 'Crate and pallet labels are generated as PDFs so their size stays consistent when printed from different computers.',
      },
      {
        title: 'Access control',
        text: 'The system has normal roles, but individual users can also be given access to specific modules when needed.',
      },
    ],
  },

  {
    slug: 'sopod',
    kind: 'professional',
    name: 'SOPOD',
    subtitle: 'Purchasing & Accounts Payable System',
    category: 'Purchasing & Finance',
    org: 'Meatplus Trading Corp.',
    period: '2025 — 2026',
    credit: 'Co-developed with one other developer',
    what:
      'An internal purchasing and finance system that connects purchase requests, purchase orders, receiving, accounts payable, requests for payment, and check vouchers.',
    cardSummary:
      'Internal purchasing and finance system covering the workflow from purchase request to payment.',
    cardRole:
      'I worked on backend logic, database operations, finance modules, admin interfaces, reports, document generation, and permissions.',
    workflow: [
      'Purchase Request',
      'Purchase Order',
      'Receiving / Approval',
      'AP Invoice',
      'Request for Payment',
      'Check Voucher',
    ],
    contribution: [
      'Worked on backend logic and database operations across purchasing and finance modules.',
      'Built and maintained accounts receivable features including adjustments, the AR dashboard, statements of account, and aging reports.',
      'Added e-signature approvals and file attachments to selected workflows.',
      'Refactored several finance reports to use shared models and filtering rules.',
      'Improved import error handling and logging for general ledger data.',
      'Fixed database and search issues, including a collation mismatch affecting customer search.',
      'Worked on validation, PDF generation, Excel handling, and user roles and permissions.',
    ],
    features: [
      'Purchase requests and purchase orders',
      'Suppliers and receiving records',
      'Receiving approvals',
      'AP invoices and requests for payment',
      'Check vouchers and payments',
      'General ledger account data',
      'Accounts receivable: adjustments, aging, statements',
      'Administrative interfaces and validation',
      'PDF and document generation',
      'Excel import and export',
      'User roles and permissions',
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
    notes: [
      {
        title: 'Shared records',
        text: 'Some purchasing and finance steps use the same underlying records, which makes it easier to follow a transaction from receiving through payment.',
      },
      {
        title: 'Consistent report filters',
        text: 'Some reports had slightly different filtering logic. I moved the shared rules into common models so the reports used the same logic.',
      },
      {
        title: 'Customer search fix',
        text: 'A customer search issue turned out to be caused by mismatched database collations rather than the search code itself.',
      },
      {
        title: 'Better import errors',
        text: 'I improved the error handling and logging for ledger imports so failed spreadsheets were easier to troubleshoot.',
      },
    ],
  },

  {
    slug: 'habi-moments',
    kind: 'personal',
    name: 'Habi Moments',
    category: 'Booking & photo booth system',
    period: '2026',
    credit: 'Personal project',
    cardSummary:
      'A booking, payment tracking, and photo booth management system I built for an events business.',
    cardRole:
      'I built the database, authentication, admin features, and booth workflow.',
    tech: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'Tailwind CSS'],
    links: { source: 'https://github.com/itsmeyanxi/hiraya-events' },
    caseStudy: false,
  },

  {
    slug: 'shuhai',
    kind: 'personal',
    name: '书海 shuhai',
    category: 'Reading tracker · PWA',
    period: '2026',
    credit: 'Personal project',
    cardSummary:
      'A personal reading tracker for novels and comics hosted on other websites.',
    cardRole:
      'I built the backend, database, site parsers, and Android share flow.',
    tech: ['Cloudflare Workers', 'D1', 'JavaScript', 'PWA'],
    links: { live: 'https://shuhai.shuhai.workers.dev' },
    caseStudy: false,
  },
];

export const professionalProjects = projects.filter((p) => p.kind === 'professional');
export const personalProjects = projects.filter((p) => p.kind === 'personal');
export const findProject = (slug) => projects.find((p) => p.slug === slug);

export const experience = [
  {
    company: 'Meatplus Trading Corp.',
    role: 'Backend Software Developer',
    roleNote: 'Full-stack responsibilities',
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
  dates: '2022 — 2023',
  items: [
    { name: 'Programming for Intermediate Users Using Python', date: 'July 2022' },
    { name: 'Programming for Beginners Using Python', date: 'July 2022' },
    {
      name: 'Code Your Future: Coding Workshop for Non-Coders',
      issuer: 'DICT Region IV',
      date: 'January 2023',
    },
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
