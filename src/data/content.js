// ---------------------------------------------------------------------------
// Every word the site renders lives here, so copy can be corrected without
// touching layout code.
//
// ACCURACY RULE FOR THIS FILE: nothing in here is invented. Project scope and
// contribution claims were read out of the repositories themselves (commit
// history filtered to itsmeyanxi@gmail.com, controller/model listings, README
// and SCHEMA files). Anything that could not be verified from a repository is
// written as a string starting with "TODO:" and renders on the page as a
// visible amber placeholder chip, so it cannot ship unnoticed.
// ---------------------------------------------------------------------------

/** True for copy that still needs Kimberly to confirm or supply it. */
export const isTodo = (value) =>
  typeof value === 'string' && value.startsWith('TODO:');

export const todoText = (value) => value.replace(/^TODO:\s*/, '');

export const profile = {
  name: 'Kimberly Lopez',
  title: 'Software Developer',
  headline: 'Software Developer building systems that solve real business problems.',
  intro:
    'I develop web applications and internal business systems, working across backend development, databases, business logic, and user-facing interfaces.',
  facts: [
    'Backend Software Developer',
    'Web Applications & Business Systems',
    'Philippines · Open to Remote Opportunities',
  ],
  // The most actionable fact on the page for a recruiter, so it gets its own
  // badge rather than being buried in the facts row.
  availability: 'Available for new roles from 16 September 2026',
  availabilityShort: 'Available from 16 Sept 2026',
  // Supplied by Kimberly 2026-09-01. NOTE: her LinkedIn handle is
  // "lopezkcc714" — this address has no 7. Worth re-checking once.
  email: 'lopezkcc14@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lopezkcc714',
  github: 'https://github.com/itsmeyanxi',
  team: 'https://github.com/LokalGrp',
  teamName: 'LokalGrp.dev',
  // TODO: no résumé PDF exists yet. Drop the file at
  // public/Kimberly-Lopez-Resume.pdf and flip resumeReady to true; every
  // résumé link on the site turns on at once. Until then they render as a
  // visible placeholder instead of a broken download.
  resume: '/Kimberly-Lopez-Resume.pdf',
  resumeReady: false,
  location: 'Philippines',
};

export const about = {
  heading: 'About Me',
  lead:
    'I am a software developer who enjoys turning complicated business processes into software that is easier to use, maintain and scale.',
  body: [
    'My experience spans backend development, databases, business logic and frontend implementation, with particular experience building internal business applications and operational systems — the kind of software people use for a full shift, not for five minutes.',
    'I care about understanding how a business actually works before deciding how its software should work. Most of the systems I have built replaced a workflow that already existed on paper, in a spreadsheet, or in someone’s head, so the first job is always to sit with the process and find out what it really does, including the exceptions nobody documented.',
    'I also build my own projects outside work, usually to learn a stack properly rather than to read about it. That is where I picked up TypeScript and Next.js, self-hosted PostgreSQL with row-level security, and deploying on Cloudflare Workers.',
  ],
  aside: {
    heading: 'Away from the editor',
    text: 'I am learning Chinese and French, which is how a couple of my side projects started — a reading tracker and a translation workspace I actually use.',
  },
};

// ---------------------------------------------------------------------------
// Selected work
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'nomsuite',
    cardSummary:
      'One platform carrying a transaction from purchase request through receiving and delivery into the ledger behind it.',
    cardRole: 'Built the accounts receivable side — adjustments, aging, statements of account and collections — plus the e-signature approval flow.',
    name: 'Nomsuite',
    category: 'Enterprise Operations Platform',
    year: '2025 — present',
    status: 'In production',
    team: {
      built: 'Built with LokalGrp.dev',
      note: 'Three-developer team. The scope below is the platform; my contribution is stated separately and covers the modules I worked on.',
    },
    client: 'Meatplus Trading Corporation',
    oneLiner:
      'A modular business operations platform that carries a transaction from purchase request through receiving and delivery into the accounting entries behind it.',
    problem:
      'Purchasing, receiving, sales, deliveries and finance each ran as a separate workflow. A single transaction had to be re-encoded and reconciled as it crossed departments, so the same order existed in several partial versions and nobody could follow it end to end.',
    solution:
      'One platform where the operational chain and the finance chain are the same records. Purchasing, receiving, sales orders, deliveries, accounts payable, accounts receivable and the general ledger are separate modules over a shared data model, with approvals, role-based access, change logs and record locking built into the modules rather than added around them.',
    contribution: [
      'Built the accounts receivable side: AR adjustments (full CRUD and form submission), the AR dashboard and its exports, statement of account, and the aging report — including a fix that made the aging date calculation consistent between the summary and the detail views.',
      'Worked on collections and delivery reconciliation so searches return the right deliveries: fulfilled orders now include deliveries with no customer code, pending-delivery search shows the delivery context, and Collections only returns delivered orders.',
      'Built the e-signature approval flow on requests and reworked it into a digital approval format, plus multi-image attachments on purchase orders and attachments on cash advance requests.',
      'Refactored the statement of account, aging report and payment controllers from raw queries onto Eloquent models so hidden delivery-receipt filtering applied consistently across all three.',
      'Handled data-import robustness — GL account import error handling and logging, nullable UOM on purchase order items — and a collation mismatch that was breaking customer search joins.',
    ],
    features: [
      'Purchase requests, purchase orders and supplier records',
      'Receiving reports and supplier receiving',
      'Sales orders, deliveries and delivery counter dates',
      'Accounts payable: invoices, check vouchers, payments',
      'Accounts receivable: adjustments, aging, statements of account',
      'General ledger, journal vouchers and cost centres',
      'Fixed assets and depreciation runs',
      'Role-based access, approvals, change logs and record locking',
      'Excel/CSV import and export across modules',
    ],
    scale:
      'Around 65 controllers and 60 Eloquent models at the time of writing — an interconnected line-of-business application rather than a CRUD demo.',
    tech: ['Laravel 11', 'PHP', 'MySQL', 'Blade', 'JavaScript', 'Tailwind CSS'],
    links: {
      // Confirmed against the live LokalGrp site and verified 200 (2026-09-01).
      live: 'https://sopod-production.up.railway.app/login',
      // Deliberately not linked: no public repository currently carries a
      // reviewed, up-to-date copy of this codebase. Set the URL once one does.
      source: null,
      sourceNote: 'Source is in a private repository.',
    },
    demo: { email: 'admin@sopod.test', password: 'password' },
    caseStudy: true,
    architecture: [
      {
        title: 'Shared data model, separate modules',
        text: 'Operations and finance read the same records rather than exchanging exports. A receiving report is the same object the accounts payable invoice is raised against, which is what makes an end-to-end trail possible at all.',
      },
      {
        title: 'Eloquent over raw SQL where filtering must be consistent',
        text: 'Several finance reports had been written as raw queries, and each re-implemented the rule for hiding certain delivery receipts. Moving statements of account, aging and payments onto shared Eloquent models put that rule in one place, which is the change that stopped the three reports disagreeing.',
      },
      {
        title: 'Approvals and audit as part of the record',
        text: 'Approval state, change logs and record locking live with the documents themselves, so a printed or exported document reflects an auditable state rather than a snapshot taken beside the workflow.',
      },
    ],
    decisions: [
      {
        title: 'Making the aging report agree with itself',
        text: 'The AR aging summary and its detail view calculated the aging date differently, so drilling into a bucket could show a different set of invoices than the bucket claimed. Fixing it meant settling on one definition of the aging date and applying it in both paths, rather than patching the numbers at the display layer.',
      },
      {
        title: 'A collation mismatch that looked like missing data',
        text: 'Customer search silently returned nothing for some records. The cause was a collation mismatch on the join, not the search logic — a reminder that in a database this wide, “the feature is broken” and “the schema drifted” look identical from the UI.',
      },
      {
        title: 'Import errors people can act on',
        text: 'GL account imports failed opaquely on malformed spreadsheets. Adding real error handling and logging turned an unusable feature into one the finance team could self-serve, which matters more than the import itself.',
      },
    ],
    learned:
      'Reporting bugs in a finance module are rarely display bugs. Most of what I fixed here came down to the same rule being written in more than one place, and the durable fix was always to give it a single home rather than to reconcile the outputs.',
  },

  {
    slug: 'pmai-warehouse',
    cardSummary:
      'One crate, one QR code, followed from the weighing floor through storage and processing to dispatch.',
    cardRole: 'Opened the repository and built the production weighing, further-processing, pallet and reporting modules.',
    name: 'PMAI Warehouse System',
    category: 'Production & Warehouse Traceability',
    year: '2026',
    status: 'In production',
    team: {
      built: 'Built with LokalGrp.dev',
      note: 'I opened the repository and built the production, further-processing, pallet and reporting side. Dispatch, disposition and pick-and-pack were built by teammates.',
    },
    // TODO: confirm how the client should be named publicly, and the exact
    // relationship between "PMAI" and "Pacific Agri-Solution".
    client: 'TODO: confirm the client name to publish (PMAI / Pacific Agri-Solution)',
    oneLiner:
      'End-to-end traceability for dressed-bird production: one crate, one QR code, followed from the weighing floor through receiving, storage and processing to dispatch.',
    problem:
      'Production output and warehouse stock were recorded separately. A crate leaving the production floor could not be followed through receiving, storage and dispatch as one continuous record, so stock on hand was a reconciliation exercise and traceability depended on paper.',
    solution:
      'A single flow that begins at the weighing station and stays attached to the crate. Live weight capture assigns the SKU band automatically, a QR label is printed and put on the crate, and every step afterwards — receiving, palletising, storage, further processing, dispatch — is a scan against that same label. The warehouse works from scanners and printed tags, not from a keyboard.',
    contribution: [
      'Built the production weighing workflow: live weight capture from the floor scale, automatic SKU banding from weight per head, rapid logging for a full session, batch QR label printing and CSV export.',
      'Built the Further Processing (FPS) module end to end — entry with class-driven SKUs and customer routing, its own QR generation with the expiration date encoded in the token, a scan station for receiving, a return flow with source tagging, and records views filtered by crate, customer, SKU and production date.',
      'Built the pallet system: pallet creation with a 24-crate cap, crate assignment and removal, and printable pallet tags rendered as PDFs through dompdf so printing does not depend on a browser’s print quirks.',
      'Built the scan-station receiving flow with background auto-accept, and the Stocks on Hand and Production Summary reports, including a scan-time-based summary and an “include not-yet-scanned” toggle that the export honours.',
      'Designed the role model — a read-only viewer role, an IT superadmin, and per-user module access overrides on top of the production, warehouse and admin roles.',
      'Handled correctness and performance work across the system: Asia/Manila timezone fixes in records and daily resets, weight truncation instead of rounding on printed labels, and indexes on crate timestamps to make the reports usable.',
      'Wrote the project documentation — a standalone schema reference and an ER diagram generated from Mermaid source.',
    ],
    features: [
      'Production weighing with automatic SKU banding',
      'QR-coded crate labels, batch printed',
      'Scan-station receiving with auto-accept',
      'Pallets, pallet tags and stock transfers',
      'Further processing entry, station and returns',
      'Storage rooms, routing and crate audit',
      'Production summary and stock-on-hand reporting',
      'Customer picklists and dispatch',
      'Role-based access with per-user overrides',
      'Excel/CSV export and printable documents',
    ],
    scale:
      'Runs on the production floor and in the warehouse over the same LAN, with a bridge program posting live scale readings into the application.',
    tech: ['Laravel 11', 'PHP', 'MariaDB', 'Blade', 'Tailwind CSS', 'Vite', 'dompdf'],
    links: {
      // Confirmed against the live LokalGrp site and verified 200 (2026-09-01).
      live: 'https://paseiwarehouse-production.up.railway.app/login',
      // TODO: this mirror is behind the main remote. Confirm you are happy
      // for it to be the public link, or point it somewhere newer.
      source: 'https://github.com/itsmeyanxi/pasei_warehouse',
    },
    demo: { email: 'admin@pmai.com', password: 'password' },
    caseStudy: true,
    architecture: [
      {
        title: 'The label is the record',
        text: 'A crate gets one code at the weighing station and keeps it for its whole life. Every later module is a scan against that code rather than a new form, which is why the trail survives when the crate physically moves between buildings.',
      },
      {
        title: 'A hardware bridge, not a browser API',
        text: 'The floor scale posts readings over the LAN to an endpoint; the server caches the last reading for ten seconds and the weighing form polls it once a second. That keeps the browser out of serial-port territory and makes the failure mode obvious — if the display says “waiting for scale”, the bridge is down, not the web app.',
      },
      {
        title: 'PDF for anything that gets printed',
        text: 'Crate labels and pallet tags are rendered server-side to PDF with dompdf. Print output on a shared warehouse PC had to be predictable at a fixed physical size, which browser print CSS could not guarantee across machines.',
      },
      {
        title: 'Roles plus per-user overrides',
        text: 'Three broad roles cover the normal case, but real warehouses have exceptions — one person who also needs the records screen. Per-user module overrides handle those without inventing a role per person.',
      },
    ],
    decisions: [
      {
        title: 'Truncating printed weights instead of rounding',
        text: 'Printed weights are truncated to two decimals rather than rounded. Rounding up a weight that is later billed against is a commercial problem, not a formatting preference.',
      },
      {
        title: 'Encoding expiry in the QR token',
        text: 'Further-processing tags carry the expiration date inside the QR payload rather than only in the printed text, so a scan at any later station can act on it without a lookup.',
      },
      {
        title: 'Timezones are a data problem, not a display problem',
        text: 'Records and the “today’s records” daily reset were drifting because timestamps and the day boundary were being interpreted in different zones. Pinning everything to Asia/Manila at the point the data is written was the only fix that survived contact with a night shift.',
      },
      {
        title: 'Indexing after the reports existed',
        text: 'The production summary and stock reports were correct but slow once real volume arrived. Adding indexes on crate creation and receipt timestamps was a small change with the largest single effect on how usable the system felt.',
      },
    ],
    learned:
      'Operational software is judged on the worst moment, not the average one. Most of my work here was about what happens when a scan fails, a shift crosses midnight, or a label prints at the wrong size — and getting those right mattered more than any feature I added.',
  },

  {
    slug: 'habi-moments',
    cardSummary:
      'Booking, payments and an on-site photo booth for an events business, on self-hosted PostgreSQL.',
    cardRole: 'Sole developer — schema, authentication, 52 row-level security policies, the booth PWA and the print pipeline.',
    name: 'Habi Moments',
    category: 'Booking, Payments & Photo Booth Platform',
    year: '2026',
    status: 'Self-hosted',
    team: null,
    // TODO: confirm how to describe your relationship to this business.
    client: 'TODO: confirm how to describe this business publicly',
    solo: 'Designed and built solo',
    oneLiner:
      'A booking, payment-tracking and photo-booth platform for an events business, built end to end on self-hosted PostgreSQL.',
    problem:
      'An events and photo-booth business was running bookings, payments, expenses and equipment out of chat threads and spreadsheets. Nothing connected a booking to what had actually been paid, what the event cost to run, or what happened at the booth on the day.',
    solution:
      'One application covering the business and the event itself. A public booking form feeds a staff dashboard with payments, expenses, packages, equipment and reporting, while a PWA kiosk mode runs the photo booth at the event with offline capture, compositing, print-ready layouts and per-session guest galleries.',
    contribution: [
      'Sole developer — schema, authentication, row-level security policies, business modules, the booth PWA, the print pipeline and CI.',
      'Replaced a hosted backend-as-a-service with an owned stack: an auth schema with scrypt-hashed passwords and session cookies stored only as SHA-256 hashes, and a file-object registry backed by disk storage served through an access-checked route handler.',
      'Wrote the row-level security model — 52 policies over a single application database role, with identity set per transaction so the policies apply to every query rather than to the code paths that remember to filter.',
      'Built the booth flow for venues with unreliable connectivity: local capture and compositing, an offline queue that drains when the network returns, and QR-linked guest galleries.',
      'Made homepage content database-driven so packages, FAQ and contact details can be changed without a redeploy, exposed through a single function that returns exactly two settings keys and nothing else.',
    ],
    features: [
      'Public booking form and calendar',
      'Bookings, payments and expense tracking',
      'Packages, equipment, loans and reserve fund',
      'Photo booth kiosk with an offline capture queue',
      'Layout builder and print-ready output',
      'Per-session guest galleries with QR links',
      'Reports with CSV export and an audit log',
      'Staff accounts, roles and file storage',
      'Installable PWA',
    ],
    scale:
      'Five delivered phases, from foundation through polish, with scripted verification suites for auth, admin pages, storage, booth and payment links, and GitHub Actions running CI.',
    tech: [
      'Next.js 16',
      'TypeScript',
      'React 19',
      'PostgreSQL 17',
      'Tailwind CSS v4',
      'Zod',
      'GitHub Actions',
    ],
    links: {
      source: 'https://github.com/itsmeyanxi/hiraya-events',
      // Self-hosted against a local PostgreSQL instance; no public deployment.
      live: null,
      liveNote: 'Self-hosted — no public deployment.',
    },
    caseStudy: true,
    architecture: [
      {
        title: 'Row-level security as the security model',
        text: 'The application connects as one restricted database role and sets the acting user per transaction. Authorisation is enforced by 52 policies in the database, so a missed filter in application code cannot leak another customer’s bookings.',
      },
      {
        title: 'Owning auth and storage rather than renting them',
        text: 'Auth and file storage were originally a managed service. Both were rebuilt in the database and on disk — an auth schema with scrypt password hashing, and a file registry with an access-checked serving route — so the whole system runs on one PostgreSQL instance the business controls.',
      },
      {
        title: 'Offline-first at the booth',
        text: 'The booth is a PWA because event venues have bad Wi-Fi. Capture, compositing and queueing all happen locally, and uploads drain when connectivity returns, so a network drop never costs a guest their photo.',
      },
      {
        title: 'Content in the database, not in a deploy',
        text: 'Packages, FAQ and contact details are rows, surfaced to the public site through one function with a fixed allowlist of keys. Prices can change without a developer, and the settings table itself stays staff-only.',
      },
    ],
    decisions: [
      {
        title: 'Never connecting as a superuser',
        text: 'Row-level security is not enforced against superusers or table owners, so connecting as the postgres role would have silently bypassed every policy while appearing to work. The application has its own restricted role, and that constraint shaped the whole data-access layer.',
      },
      {
        title: 'Verification scripts over manual clicking',
        text: 'Each phase shipped with a script that exercises it — auth, admin pages, storage, booth, payment links. It is not a full test suite, but it meant every later phase re-checked the earlier ones instead of trusting them.',
      },
    ],
    learned:
      'Doing this one alone forced me through the parts a framework usually hides — password hashing, session storage, file access control, database policy design. It is the project that most changed how I think about where authorisation belongs.',
  },

  {
    slug: 'shuhai',
    cardSummary:
      'A reading library for novels and comics hosted on other people’s sites, running on Cloudflare’s free tier.',
    cardRole: 'Sole developer — Workers backend, D1 schema, per-site adapters and the PWA share-target flow.',
    name: '书海 shuhai',
    category: 'Personal Project · Edge PWA',
    year: '2026',
    status: 'Live',
    team: null,
    solo: 'Designed and built solo',
    oneLiner:
      'A personal reading library that tracks novels and comics hosted on other people’s sites, running entirely on Cloudflare’s free tier.',
    problem:
      'I read Chinese novels and manhua across several sites, none of which share a reading list and none of which I control. I wanted one shelf with progress, categories and synopses — without hosting the content or paying for infrastructure.',
    solution:
      'An installable PWA on Cloudflare Workers and D1 that registers as an Android share target. Sharing a chapter page to the app resolves the work, its synopsis and the chapter number through per-site adapters, and updates reading progress in one tap.',
    contribution: [
      'Sole developer. Built the Workers backend, the D1 schema, the PWA shell and the share-target flow.',
      'Wrote per-site adapters against real, hostile HTML, plus a generic title-only fallback for sites that cannot be fetched server-side at all.',
      'Added reading aids for a language learner — tone-marked pinyin and a generated English title stored alongside every work, with a toggle so only one aid shows at a time.',
    ],
    features: [
      'Android share-sheet target for one-tap progress',
      'Per-site adapters with a generic fallback',
      'Categories, synopses and reading progress',
      'Pinyin and English reading aids',
      'Installable PWA with a public app shell',
      'Single-account auth with long-lived sessions',
    ],
    scale:
      'Designed to stay inside the Cloudflare free tier — 100k Worker requests a day, 5 GB of D1, 10 ms of CPU per request.',
    tech: ['Cloudflare Workers', 'D1 (SQLite)', 'JavaScript', 'PWA', 'pinyin-pro'],
    links: {
      live: 'https://shuhai.shuhai.workers.dev',
      source: null,
      sourceNote: 'Private repository.',
    },
    caseStudy: true,
    architecture: [
      {
        title: 'Adapters, with a fallback that always works',
        text: 'Each supported site gets a parser, but one of them sits behind bot management and returns 403 to any server-side fetch. Rather than fight it, the share sheet also sends the page title, and a title-only adapter extracts the chapter number from that. Degrading is a feature here, not a failure path.',
      },
      {
        title: 'Scoping selectors to the thing you meant',
        text: 'One site renders a “recently updated” widget whose links carry the same query parameter as real chapter links. An unscoped selector produced a chapter count that changed between reloads and fired false new-chapter badges. Scoping to the chapter-list element fixed it — scraped counts need to be stable, not just correct once.',
      },
      {
        title: 'Edge constraints as design input',
        text: 'A 10 ms CPU budget per request rules out heavy text work on the hot path. Pinyin and English titles are generated once at save time and stored, so reads stay trivial.',
      },
    ],
    decisions: [
      {
        title: 'Cost had to be zero',
        text: 'The stack was chosen against the free tier rather than trimmed to fit it afterwards: Workers, D1 and Pages, with the limits checked before building rather than discovered in production.',
      },
      {
        title: 'English UI for a Chinese library',
        text: 'I am still learning Chinese. An interface in Chinese locked me out of my own app once, so every control is in English and Chinese appears only as a reading aid.',
      },
    ],
    learned:
      'Building against sites you do not control teaches you to design for the parse failing. The fallback path here is the one I trust most, because it depends on the least.',
  },
];

// ---------------------------------------------------------------------------
// Experience — dates and employment history could not be verified from any
// repository or file on this machine. They are placeholders until confirmed.
// ---------------------------------------------------------------------------

export const experience = [
  {
    company: 'Meatplus Trading Corporation',
    role: 'Backend Software Developer',
    // Kimberly: started November, last day 15 September 2026. The year is
    // inferred from her first commit on the Nomsuite repo (25 Nov 2025).
    // TODO: confirm 2025 is the right start year.
    dates: 'November 2025 — September 2026',
    // TODO: add the city if you want it shown (e.g. 'On-site · Quezon City').
    location: 'On-site · Philippines',
    current: true,
    bullets: [
      'Develop and maintain internal business systems used across purchasing, receiving, sales, deliveries and finance.',
      'Build accounts receivable functionality in the company’s operations platform, including AR adjustments, the aging report, statements of account and collections reconciliation.',
      'Refactor reporting controllers onto shared models so filtering rules are defined once and applied consistently across related finance reports.',
      'TODO: add any responsibilities not visible in the repositories — support, data work, deployments, stakeholder work.',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
  },
  {
    company: 'LokalGrp.dev',
    role: 'Software Developer',
    dates: 'TODO: confirm the period you have been part of the group',
    location: 'Remote · Philippines',
    current: true,
    bullets: [
      'One of three developers in a software group building custom business systems and web applications for organisations that have outgrown spreadsheets and off-the-shelf tools.',
      'Co-developed Nomsuite, a modular operations platform spanning purchasing, receiving, sales, deliveries and accounting.',
      'Opened and led the production, further-processing, pallet and reporting side of a warehouse traceability system now running on a production floor.',
      'Work directly with the people who use the software, from the first workflow conversations through to support after release.',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'MariaDB', 'Tailwind CSS', 'Git'],
  },
  {
    company: 'TODO: earlier employment',
    role: 'TODO: earlier roles, if any',
    dates: 'TODO: dates',
    location: 'TODO: location',
    placeholder: true,
    bullets: [
      'TODO: send me any earlier positions, internships or freelance work you want listed — or tell me to remove this entry entirely.',
    ],
    tech: [],
  },
];

export const education = {
  heading: 'Education',
  // TODO: nothing about education could be verified from this machine.
  items: [
    {
      school: 'TODO: school or university',
      credential: 'TODO: degree or programme',
      dates: 'TODO: years attended',
    },
  ],
};

// ---------------------------------------------------------------------------
// Skills — only technologies evidenced in the work above.
// ---------------------------------------------------------------------------

export const skills = [
  {
    group: 'Backend',
    items: [
      'PHP',
      'Laravel 11',
      'Node.js',
      'TypeScript',
      'Eloquent ORM',
      'REST APIs',
      'Authentication & sessions',
      'Role-based access control',
    ],
  },
  {
    group: 'Frontend',
    items: [
      'JavaScript (ES2023)',
      'React 19',
      'Next.js 16',
      'Blade templates',
      'Tailwind CSS',
      'Semantic HTML & CSS',
      'Progressive Web Apps',
    ],
  },
  {
    group: 'Databases',
    items: [
      'MySQL',
      'MariaDB',
      'PostgreSQL',
      'Row-level security policies',
      'Cloudflare D1 (SQLite)',
      'Schema design & migrations',
      'Query and index tuning',
    ],
  },
  {
    group: 'Tools & Deployment',
    items: [
      'Git & GitHub',
      'GitHub Actions',
      'Vite',
      'Composer & npm',
      'Railway',
      'Cloudflare Workers & Pages',
      'Laragon / XAMPP',
    ],
  },
  {
    group: 'Other',
    items: [
      'Business & workflow analysis',
      'PDF and label generation (dompdf)',
      'QR generation and scanning workflows',
      'Excel / CSV import and export',
      'Reporting and dashboards',
      'Technical documentation',
      'AI-assisted development',
    ],
  },
];

// ---------------------------------------------------------------------------
// For businesses
// ---------------------------------------------------------------------------

export const forBusinesses = {
  heading: 'Software built around how your business works.',
  lead:
    'If your team relies on spreadsheets, manual encoding, disconnected tools, or software that no longer fits your workflow, I can help turn those processes into a purpose-built application.',
  capabilities: [
    {
      title: 'Internal Business Systems',
      text: 'Purchasing, sales, finance and operations workflows in one place, with the approvals and audit trail the business already expects on paper.',
    },
    {
      title: 'Inventory & Warehouse Systems',
      text: 'Stock tracked as it physically moves — scanning, labels, storage and dispatch — instead of reconciled after the fact.',
    },
    {
      title: 'Workflow & Approval Systems',
      text: 'Requests that route to the right people, record who approved what, and stop being chased over chat.',
    },
    {
      title: 'Dashboards & Reporting',
      text: 'Reports built on the operational data itself, so the numbers on screen and the numbers in the system are the same numbers.',
    },
    {
      title: 'Existing System Improvements',
      text: 'Work on software you already have — new modules, fixing what drifted, or making it usable again as the business changed around it.',
    },
    {
      title: 'Custom Web Applications',
      text: 'Booking systems, portals and customer-facing applications built for a specific process rather than configured from a template.',
    },
  ],
  teamNote:
    'For larger projects, I also work with my software development team at LokalGrp.dev.',
};

export const howIWork = {
  heading: 'How I Work',
  lead:
    'Development starts with the workflow, not the code. Most of the systems I have built replaced a process that already existed, so the first job is to understand what that process actually does — including the exceptions nobody wrote down.',
  steps: [
    { name: 'Understand', text: 'Sit with the current workflow and the people running it.' },
    { name: 'Design', text: 'Agree the data model, the roles and the screens before building.' },
    { name: 'Build', text: 'Deliver in working stages you can review, not one final reveal.' },
    { name: 'Test', text: 'Check the real cases, including the awkward ones.' },
    { name: 'Deploy', text: 'Release it, with the documentation needed to run it.' },
    { name: 'Improve', text: 'Keep adjusting as the business changes around it.' },
  ],
};

export const contact = {
  heading: 'Let’s build something useful.',
  lead:
    'Whether you are hiring a software developer or looking for someone to build or improve a business system, I would be happy to talk. I am available for new roles from 16 September 2026.',
  tracks: [
    {
      label: 'Hiring?',
      text: 'Start with the résumé and the case studies — they show what was built and which parts were mine.',
      cta: 'View Résumé',
    },
    {
      label: 'Building a project?',
      text: 'Tell me about the workflow you want to fix. A short description of the process is enough to start.',
      cta: 'Tell Me About It',
    },
  ],
};

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#for-businesses', label: 'For Businesses' },
  { href: '#contact', label: 'Contact' },
];

export const findProject = (slug) => projects.find((p) => p.slug === slug);
