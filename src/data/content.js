// ---------------------------------------------------------------------------
// Every word the site renders lives here, so copy can be corrected without
// touching layout code.
//
// ACCURACY RULE: nothing here is invented. Employment, education and
// certifications come from the résumé. The contribution bullets on the two
// professional systems were taken from the commit history on those
// repositories under Kimberly's account. Nothing claims sole authorship of a
// system built with someone else, and there are no performance figures, user
// counts or business results anywhere, because none were measured.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Kimberly Lopez',
  // Portfolio positioning. The official job title at Meatplus is "Backend
  // Software Developer" and is used verbatim in the experience entry below.
  // These two fields are deliberately different and should stay that way.
  title: 'Full-Stack Software Developer',
  greeting: 'Hi, I’m Kimberly.',
  headline:
    'I’m a software developer working mainly with PHP, Laravel, JavaScript and MySQL.',
  intro:
    'I work on internal business systems used for warehouse, production, purchasing and finance operations.',
  facts: [
    'Backend Software Developer at Meatplus Trading Corp.',
    'Full-stack responsibilities',
    'Quezon City, Philippines',
  ],
  // From the résumé, and it matches the LinkedIn handle "lopezkcc714".
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
    'I’m a Backend Software Developer at Meatplus Trading Corp. My title says backend, but I work on the frontend too, so most of what I do ends up being full-stack.',
  body: [
    'Most of my work is internal systems — the ones people at the company use to run production, the warehouse, purchasing and finance. A lot of it started out as spreadsheets or paper forms, so a good part of the job is asking how something is actually done before writing any code.',
    'I work with one other developer, which means I get to touch most parts of a system: the database, the business logic, the validation, and the screens on top. Day to day that’s PHP and Laravel with MySQL and MariaDB, plus Blade, Tailwind CSS and Alpine.js.',
    'I graduated with a BS in Information Technology from the Technological Institute of the Philippines. Outside work I build small projects to learn things properly rather than just read about them — that’s how I picked up TypeScript, Next.js and Cloudflare Workers.',
  ],
};

// ---------------------------------------------------------------------------
// Projects
//
// `kind` decides which section a project renders in and how much room it gets.
//
// LINKING POLICY: the two professional systems are internal Meatplus
// applications. Neither links to a deployment or a repository — the
// deployments are internal, and the public mirrors of both repositories sit
// behind the commits that removed real company data from them. Those cards
// carry their own description instead. Every link that remains on this site
// resolves to something real; there are no placeholder hrefs.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'pmai-warehouse',
    kind: 'professional',
    name: 'PMAI Warehouse System',
    category: 'Production & Warehouse Traceability',
    org: 'Meatplus Trading Corp.',
    period: '2026',
    credit: 'Co-developed with one other developer',
    what:
      'An internal system that follows production output through the warehouse. A crate is weighed on the production floor, given a QR-coded identity, and then tracked through receiving, storage, processing, stock movement and dispatch as one continuous record instead of being re-encoded at each step.',
    cardSummary:
      'Internal production and warehouse traceability — one crate, one QR code, from the weighing floor through to dispatch.',
    cardRole:
      'I worked on the production weighing workflow, the further-processing module, pallets and printable tags, and the stock and production reports.',
    workflow: [
      'Production weighing',
      'QR-coded crate identification',
      'Warehouse receiving',
      'Storage / processing',
      'Inventory & stock movement',
      'Dispatch',
    ],
    contribution: [
      'Implemented the production weighing workflow — live weight capture from the floor scale, automatic SKU banding from weight per head, rapid logging through a session, batch QR label printing and CSV export.',
      'Worked on the further-processing module: entry with class-driven SKUs and customer routing, QR generation with the expiration date carried inside the token, a scan station for receiving, and a return flow with source tagging.',
      'Implemented the pallet workflow — pallet creation with a crate cap, crate assignment and removal, and printable pallet tags generated server-side as PDFs so print output stays consistent across machines.',
      'Contributed the scan-station receiving flow with background auto-accept, and the stock-on-hand and production summary reports, including an option to include not-yet-scanned records that the export also honours.',
      'Implemented role-based access: a read-only viewer role, an IT superadmin, and per-user module overrides on top of the production, warehouse and admin roles.',
      'Worked on correctness and performance across the system — timezone handling in records and daily resets, weight truncation rather than rounding on printed labels, and indexes on crate timestamps to keep the reports usable at volume.',
      'Wrote the project’s schema documentation and generated its ER diagram.',
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
        title: 'The label is the record',
        text: 'A crate gets one code at the weighing station and keeps it. Every later step is a scan against that code rather than a new form, which is what keeps the trail intact when the crate physically moves between buildings.',
      },
      {
        title: 'A hardware bridge rather than a browser API',
        text: 'The floor scale posts readings over the network to an endpoint, the server caches the last reading briefly, and the weighing form polls it. That keeps the browser out of serial-port territory and makes the failure mode obvious — if the display says it is waiting for the scale, the bridge is down, not the web app.',
      },
      {
        title: 'Server-side PDFs for anything printed',
        text: 'Crate labels and pallet tags are rendered to PDF on the server. Print output on a shared warehouse PC had to come out at a fixed physical size, which browser print styling could not guarantee across machines.',
      },
      {
        title: 'Roles plus per-user overrides',
        text: 'Three broad roles cover the normal case, but real warehouses have exceptions — one person who also needs the records screen. Per-user module overrides handle those without inventing a role for every person.',
      },
    ],
  },

  {
    slug: 'sopod',
    kind: 'professional',
    name: 'SOPOD',
    subtitle: 'Purchasing & Accounts Payable System',
    category: 'Purchasing & Finance Operations',
    org: 'Meatplus Trading Corp.',
    period: '2025 — 2026',
    credit: 'Co-developed with one other developer',
    what:
      'An internal Laravel system connecting purchasing to finance, so a transaction stays one record from the original request through to the payment made against it, rather than being re-encoded as it crosses departments.',
    cardSummary:
      'Internal purchasing and accounts payable — one record from purchase request through to check voucher.',
    cardRole:
      'I worked on backend business logic, database operations, administrative interfaces, validation, document generation and role-based permissions.',
    workflow: [
      'Purchase Request',
      'Purchase Order',
      'Receiving / Approval',
      'AP Invoice',
      'Request for Payment',
      'Check Voucher',
    ],
    contribution: [
      'Contributed backend business logic and database operations across the purchasing and accounts payable modules.',
      'Worked on the accounts receivable side — adjustments with full create, read, update and delete, the AR dashboard and its exports, statements of account, and the aging report, including making the aging date calculation agree between the summary and its detail view.',
      'Implemented the e-signature approval flow on requests, and attachments on purchase orders and cash advance requests.',
      'Moved several finance reports from raw queries onto shared models, so one filtering rule applied across all of them instead of being written separately in each.',
      'Worked on data import handling — clearer errors and logging on general ledger account imports — and fixed a database collation mismatch that was silently breaking customer search.',
      'Contributed administrative interfaces, validation, PDF and document generation, Excel handling, and user role and permission controls.',
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
        title: 'Operations and finance on the same records',
        text: 'A receiving report is the same object the accounts payable invoice is raised against, rather than something exported between two systems. That is what makes it possible to follow a transaction end to end.',
      },
      {
        title: 'One definition of a filtering rule',
        text: 'Several finance reports had each re-implemented the rule for hiding certain delivery receipts, and they disagreed with one another. Moving them onto shared models put that rule in one place, which is what stopped the reports contradicting each other.',
      },
      {
        title: 'A collation mismatch that looked like missing data',
        text: 'Customer search silently returned nothing for some records. The cause was a collation mismatch on a database join rather than anything in the search logic — in a schema this wide, a broken feature and a drifted column look identical from the interface.',
      },
      {
        title: 'Import errors people can act on',
        text: 'Ledger account imports failed opaquely on malformed spreadsheets. Adding real error handling and logging turned an unusable feature into one the finance team could run themselves.',
      },
    ],
  },

  {
    slug: 'habi-moments',
    kind: 'personal',
    name: 'Habi Moments',
    category: 'Booking & photo booth application',
    period: '2026',
    credit: 'Personal project · built solo',
    cardSummary:
      'A booking, payment-tracking and photo-booth application for an events business, on self-hosted PostgreSQL.',
    cardRole:
      'Built it end to end — database schema, authentication, row-level security policies, the admin side, and a booth mode that keeps working when the venue’s network drops.',
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
    credit: 'Personal project · built solo',
    cardSummary:
      'An installable reading tracker for novels and comics hosted on other sites, running on Cloudflare Workers and D1.',
    cardRole:
      'Built the Workers backend and database, per-site parsers with a fallback for sites that block server-side requests, and the Android share-target flow.',
    tech: ['Cloudflare Workers', 'D1', 'JavaScript', 'PWA'],
    links: { live: 'https://shuhai.shuhai.workers.dev' },
    caseStudy: false,
  },
];

export const professionalProjects = projects.filter((p) => p.kind === 'professional');
export const personalProjects = projects.filter((p) => p.kind === 'personal');
export const findProject = (slug) => projects.find((p) => p.slug === slug);

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experience = [
  {
    company: 'Meatplus Trading Corp.',
    // The official title. Not the same as the portfolio headline, on purpose.
    role: 'Backend Software Developer',
    roleNote: 'Full-stack responsibilities',
    dates: 'November 2025 — Present',
    location: 'Quezon City · On-site',
    current: true,
    bullets: [
      'Co-develop internal web systems used across production, warehouse, purchasing and finance operations, turning day-to-day business processes into database-driven workflows.',
      'Work across backend and frontend — business logic and database operations in Laravel and PHP against MySQL and MariaDB, and the interfaces on top in Blade, Tailwind CSS and Alpine.js.',
      'Handle validation, debugging and testing, reporting and document generation, data import and export, and role-based access where it applies.',
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
      'Developed responsive React.js and Ionic interfaces, and supported testing, debugging and deployment for a cross-platform client application.',
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

// ---------------------------------------------------------------------------
// Skills — ordered by how much they are actually used, strongest first.
// ---------------------------------------------------------------------------

export const skills = [
  {
    group: 'Primary',
    note: 'What I work in daily',
    primary: true,
    items: ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'MariaDB', 'SQL', 'Git'],
  },
  {
    group: 'Frontend',
    items: ['Blade', 'Tailwind CSS', 'Alpine.js', 'Bootstrap', 'React.js', 'Ionic'],
  },
  {
    group: 'Familiar',
    note: 'Coursework and side projects',
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

export const howIWork = {
  heading: 'How I Work',
  lead:
    'Development starts with the workflow, not the code. Most of the systems I have worked on replaced a process that already existed, so the first job is to understand what that process actually does — including the exceptions nobody wrote down.',
  steps: [
    { name: 'Understand', text: 'Sit with the current workflow and the people running it.' },
    { name: 'Design', text: 'Agree the data model, the roles and the screens before building.' },
    { name: 'Build', text: 'Deliver in working stages that can be reviewed.' },
    { name: 'Test', text: 'Check the real cases, including the awkward ones.' },
    { name: 'Deploy', text: 'Release it, with the documentation needed to run it.' },
    { name: 'Improve', text: 'Keep adjusting as the business changes around it.' },
  ],
};

// ---------------------------------------------------------------------------

export const contact = {
  heading: 'Let’s talk.',
  lead:
    'I’m open to software development roles. Email is the quickest way to reach me.',
};

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
