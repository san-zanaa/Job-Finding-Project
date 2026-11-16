/**
 * Mock content mirroring the copy and figures used in hireloop.fig so the
 * dashboards look exactly like the design until real data is wired up.
 */

/* ---------------------------------- seeker --------------------------------- */

export const seekerStats = [
  { label: "Saved Jobs", value: "12" },
  { label: "Applications Submitted", value: "24" },
  { label: "Interviews Scheduled", value: "3" },
  { label: "Offers Received", value: "1" },
]

export const seekerActivity = [
  {
    message:
      "Application for Senior Product Designer at TechFlow updated to 'Under Review'",
    time: "2 hours ago",
    icon: "file",
  },
  {
    message:
      "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.",
    time: "5 hours ago",
    icon: "briefcase",
  },
  {
    message: "You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).",
    time: "1 day ago",
    icon: "message",
  },
] as const

export const savedJobs = [
  {
    title: "Senior Product Designer",
    company: "TECHFLOW",
    location: "San Francisco, CA (Hybrid)",
    salary: "$160k - $200k + Equity",
    savedAt: "Saved 2 hours ago",
    deadline: "Closes in 3 days",
    state: "open",
  },
  {
    title: "Frontend Engineer",
    company: "VERCEL",
    location: "Remote, Global",
    salary: "$140k - $180k",
    savedAt: "Saved yesterday",
    state: "open",
  },
  {
    title: "Staff UX Researcher",
    company: "LINEAR",
    location: "New York, NY (On-site)",
    salary: "$180k - $220k",
    savedAt: "Saved 3 days ago",
    state: "draft",
  },
  {
    title: "Full Stack Developer",
    company: "META",
    location: "Menlo Park, CA (Hybrid)",
    salary: "$150k - $210k + Bonus",
    savedAt: "Saved 5 days ago",
    state: "open",
  },
  {
    title: "Design Systems Lead",
    company: "SPOTIFY",
    location: "Remote, USA",
    salary: "$170k - $210k",
    savedAt: "Saved 1 week ago",
    state: "closed",
  },
] as const

export const seekerApplications = {
  stats: [
    { label: "Total Applied", value: "24" },
    { label: "Shortlisted", value: "8" },
    { label: "Interviews", value: "3", tone: "warning" },
    { label: "Success Rate", value: "12%", tone: "success" },
  ],
  rows: [
    {
      job: "Senior Frontend Engineer",
      meta: "Full-time • Remote",
      company: "Stark Industries",
      applied: "2 hours ago",
      status: "Applied",
    },
    {
      job: "Product Designer",
      meta: "Contract • Hybrid",
      company: "Cyberdyne Systems",
      applied: "1 day ago",
      status: "Review",
    },
    {
      job: "Lead Data Scientist",
      meta: "Full-time • On-site",
      company: "Wayne Enterprises",
      applied: "4 days ago",
      status: "Shortlisted",
    },
    {
      job: "Cloud Architect",
      meta: "Full-time • Remote",
      company: "Oscorp Tech",
      applied: "1 week ago",
      status: "Rejected",
    },
    {
      job: "AI Research Engineer",
      meta: "Full-time • Hybrid",
      company: "Hooli Corp",
      applied: "2 weeks ago",
      status: "Offered",
    },
  ],
} as const

/* -------------------------------- recruiter -------------------------------- */

export const recruiterStats = [
  { label: "Total Job Posts", value: "48" },
  { label: "Total Applicants", value: "1,284" },
  { label: "Active Jobs", value: "18" },
  { label: "Jobs Closed", value: "32" },
]

export const recentApplications = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
] as const

export const recruiterJobPosts = [
  {
    title: "Frontend Developer",
    category: "Engineering",
    company: "HirePulse Network",
    location: "Remote (New York, USA)",
    type: "Full-time",
    salary: "€25 – €40 / hr",
    applicants: "34 Candidates",
    status: "Active",
    deadline: "May 30, 2025",
    posted: "Posted 4d ago",
  },
  {
    title: "Senior Product Designer",
    category: "Design",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    salary: "€90k – €115k / yr",
    applicants: "19 Candidates",
    status: "Active",
    deadline: "Jun 14, 2025",
    posted: "Posted 1w ago",
  },
  {
    title: "DevOps Specialist",
    category: "Infrastructure",
    company: "HirePulse Platform",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "€95k – €120k / yr",
    applicants: "12 Candidates",
    status: "Active",
    deadline: "Jun 30, 2025",
    posted: "Posted 2w ago",
  },
  {
    title: "Product Marketing Lead",
    category: "Marketing",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    type: "Full-time",
    salary: "€80k – €105k / yr",
    applicants: "27 Candidates",
    status: "Active",
    deadline: "Jul 15, 2025",
    posted: "Posted 5d ago",
  },
  {
    title: "QA Automation Engineer",
    category: "Quality",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    type: "Part-time",
    salary: "€35 – €50 / hr",
    applicants: "8 Candidates",
    status: "Expired",
    deadline: "May 01, 2025",
    posted: "Closed",
  },
] as const

export const recruiterApplicants = [
  {
    name: "Julianne Moore",
    email: "julianne.moore@example.com",
    job: "Senior Product Designer",
    applied: "Oct 24, 2023",
    status: "Shortlisted",
  },
  {
    name: "Robert Downey",
    email: "robert.downey@example.com",
    job: "Senior Product Designer",
    applied: "Oct 23, 2023",
    status: "Under Review",
  },
  {
    name: "Emma Stone",
    email: "emma.stone@example.com",
    job: "Marketing Lead",
    applied: "Oct 22, 2023",
    status: "Applied",
  },
  {
    name: "Chris Pratt",
    email: "chris.pratt@example.com",
    job: "Product Manager",
    applied: "Oct 21, 2023",
    status: "Rejected",
  },
  {
    name: "Brie Larson",
    email: "brie.larson@example.com",
    job: "Frontend Developer",
    applied: "Oct 20, 2023",
    status: "Offered",
  },
] as const

export const companyProfile = {
  name: "HirePulse Network",
  industry: "Engineering & Tech",
  website: "hirepulse.io",
  location: "New York, USA",
  employees: "51 – 200 employees",
  description:
    "HirePulse builds hiring infrastructure for fast-moving product teams. Our network connects vetted engineers, designers, and product managers with companies that ship.",
  status: "Approved",
} as const

/* ---------------------------------- admin ---------------------------------- */

export const adminStats = [
  { label: "Total Users", value: "124,892", delta: "12%", tone: "success" },
  { label: "Total Recruiters", value: "12,405", delta: "8%", tone: "success" },
  { label: "Total Companies", value: "4,281", delta: "0%", tone: "neutral" },
  { label: "Jobs Posted", value: "8,920", delta: "24%", tone: "success" },
  { label: "Platform Revenue", value: "$245,800", delta: "18.5%", tone: "success" },
] as const

export const adminTransactions = [
  {
    user: "marcus.k@techcorp.io",
    org: "TechCorp Inc.",
    plan: "Enterprise Monthly",
    txn: "#TXN-902341",
    amount: "$1,299.00",
    date: "Oct 24, 2023, 14:20",
    status: "Success",
  },
  {
    user: "sarah.l@creativestudio.com",
    org: "Creative Studio",
    plan: "Professional Annual",
    txn: "#TXN-882103",
    amount: "$499.00",
    date: "Oct 24, 2023, 11:05",
    status: "Success",
  },
  {
    user: "j.doe@freelance.org",
    org: "Independent",
    plan: "Starter Monthly",
    txn: "#TXN-774129",
    amount: "$49.00",
    date: "Oct 23, 2023, 16:45",
    status: "Pending",
  },
  {
    user: "admin@retailglobal.net",
    org: "Retail Global",
    plan: "Enterprise Monthly",
    txn: "#TXN-552014",
    amount: "$1,299.00",
    date: "Oct 23, 2023, 09:12",
    status: "Failed",
  },
] as const

export const adminUsers = [
  {
    name: "Jordan Davis",
    email: "jordan.davis@example.com",
    role: "Seeker",
    joined: "Oct 12, 2023",
    status: "Active",
  },
  {
    name: "Elena Rodriguez",
    email: "elena.r@talentflow.io",
    role: "Recruiter",
    joined: "Sep 28, 2023",
    status: "Active",
  },
  {
    name: "Marcus Webb",
    email: "m.webb@outlook.com",
    role: "Seeker",
    joined: "Aug 05, 2023",
    status: "Suspended",
  },
  {
    name: "Tom Hiddleston",
    email: "t.hiddles@loki-tech.com",
    role: "Recruiter",
    joined: "Nov 01, 2023",
    status: "Active",
  },
] as const

export const adminCompanies = [
  {
    name: "Nexus Lab",
    recruiter: "ops@nexuslab.io",
    industry: "AI",
    status: "Pending",
    submitted: "Oct 24, 2023",
  },
  {
    name: "Quantum",
    recruiter: "hiring@quantum.dev",
    industry: "Developer Tools",
    status: "Approved",
    submitted: "Oct 21, 2023",
  },
  {
    name: "Vanguard",
    recruiter: "people@vanguard.co",
    industry: "Fintech",
    status: "Rejected",
    submitted: "Oct 15, 2023",
  },
  {
    name: "CloudScale",
    recruiter: "talent@cloudscale.com",
    industry: "Cloud & Infrastructure",
    status: "Approved",
    submitted: "Oct 09, 2023",
  },
  {
    name: "Humanize",
    recruiter: "join@humanize.ai",
    industry: "AI",
    status: "Pending",
    submitted: "Oct 03, 2023",
  },
] as const

export const adminJobs = [
  {
    title: "Senior Product Designer",
    ref: "Ref: HL-90210",
    company: "Nexus Lab",
    category: "Design",
    type: "Full-time",
    posted: "Oct 24, 2023",
    status: "Active",
  },
  {
    title: "Full-stack Engineer",
    ref: "Ref: HL-88231",
    company: "Quantum",
    category: "Engineering",
    type: "Contract",
    posted: "Oct 22, 2023",
    status: "Active",
  },
  {
    title: "Marketing Director",
    ref: "Ref: HL-11022",
    company: "Vanguard",
    category: "Marketing",
    type: "Full-time",
    posted: "Oct 15, 2023",
    status: "Closed",
  },
  {
    title: "Backend Architect",
    ref: "Ref: HL-99032",
    company: "CloudScale",
    category: "Engineering",
    type: "Remote",
    posted: "Oct 20, 2023",
    status: "Active",
  },
  {
    title: "UX Research Lead",
    ref: "Ref: HL-44112",
    company: "Humanize",
    category: "Design",
    type: "Hybrid",
    posted: "Oct 19, 2023",
    status: "Active",
  },
] as const

export const jobInsights = [
  {
    label: "Engagement Rate",
    value: "82.4%",
    note: "+5.2% from last month",
    tone: "success",
  },
  { label: "Avg. Time to Fill", value: "14 Days", note: "Stable performance", tone: "neutral" },
  {
    label: "Total Applications",
    value: "12,840",
    note: "-2.1% across tech sectors",
    tone: "warning",
  },
] as const

export const paymentMetrics = [
  { label: "Total Revenue", value: "$1,284,500", delta: "+12.4%", tone: "success" },
  { label: "Monthly Revenue", value: "$94,210", delta: "+8.1%", tone: "success" },
  { label: "Active Pro Users", value: "12,408", delta: "+2.3%", tone: "warning" },
  { label: "Active Enterprise Users", value: "842", delta: "+15.7%", tone: "success" },
] as const

export const platformPayments = [
  {
    email: "jordan.daniels@enterprise.co",
    plan: "Enterprise",
    amount: "$4,500.00",
    date: "May 19, 2026",
    relative: "• Just now",
    txn: "TXN-882910443",
    status: "Success",
  },
  {
    email: "sarah.k@techflow.io",
    plan: "Pro",
    amount: "$299.00",
    date: "May 18, 2026",
    relative: "• 1 day ago",
    txn: "TXN-773410291",
    status: "Success",
  },
  {
    email: "marcus.lee@gmail.com",
    plan: "Starter",
    amount: "$49.00",
    date: "May 17, 2026",
    relative: "• 2 days ago",
    txn: "TXN-110294857",
    status: "Pending",
  },
  {
    email: "e.lopez@globalfoundries.com",
    plan: "Enterprise",
    amount: "$12,000.00",
    date: "May 10, 2026",
    relative: "• 9 days ago",
    txn: "TXN-009485712",
    status: "Failed",
  },
] as const

export const billingHistory = [
  {
    date: "Sep 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    txn: "TRX-948102-HL",
    status: "Paid",
  },
  {
    date: "Aug 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    txn: "TRX-771920-HL",
    status: "Paid",
  },
  {
    date: "Jul 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    txn: "TRX-331005-HL",
    status: "Paid",
  },
  {
    date: "Jun 24, 2023",
    plan: "Standard Tier",
    amount: "$12.00",
    txn: "TRX-220199-HL",
    status: "Paid",
  },
] as const

export const browseJobs = [
  {
    title: "Lead Frontend Engineer",
    company: "FinGrid",
    location: "Remote, Global",
    type: "Full-time",
    salary: "$150k - $190k",
    posted: "Posted 2 days ago",
    tags: ["React", "TypeScript", "Design Systems"],
  },
  {
    title: "Product Designer",
    company: "Nova Labs",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "€70k – €95k",
    posted: "Posted 4 days ago",
    tags: ["Figma", "Prototyping", "UX Research"],
  },
  {
    title: "Staff Data Scientist",
    company: "Orbital AI",
    location: "San Francisco, CA (Hybrid)",
    type: "Contract",
    salary: "$120 / hr",
    posted: "Posted 1 week ago",
    tags: ["Python", "LLMs", "ML Ops"],
  },
  {
    title: "Full Stack Developer",
    company: "Brightloop",
    location: "Remote, EU",
    type: "Part-time",
    salary: "€45 – €60 / hr",
    posted: "Posted 1 week ago",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
] as const
