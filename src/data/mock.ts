export type AnnouncementCategory = "News" | "Event" | "Notice" | "Visit";

export type Announcement = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: AnnouncementCategory;
};

export type CourseLevel = "Initial" | "Refresher" | "Specialized";

export type Course = {
  id: string;
  name: string;
  duration: string;
  level: CourseLevel;
  category: "Operating" | "Commercial" | "Safety" | "Administration";
  description: string;
};

export type Role = "admin";

export type QuickLink = {
  title: string;
  href: string;
  description: string;
};

export type TrainingResource = {
  id: string;
  title: string;
  description: string;
  meta: string;
};

export type KnowledgeCategory = {
  title:
    | "Operating"
    | "Commercial"
    | "Safety"
    | "Working Time Table"
    | "Trains at a Glance"
    | "Establishment"
    | "Vigilance"
    | "Codes and Manuals"
    | "Misc";
  items: string[];
};

export type TraineeSection = {
  title: "Class Schedule" | "Examination" | "Result";
  description: string;
  href: string;
};

export type MagazineIssue = {
  id: string;
  title: string;
  period: string;
  description: string;
  fileLabel: string;
};

export type Facility = {
  title: string;
  description: string;
};

export const siteMeta = {
  name: "Zonal Railway Training Institute, Ghazipur",
  shortName: "ZRTI Ghazipur",
  subtitle: "Official Training Portal",
  authority: "Government of India · Ministry of Railways",
  addressLines: [
    "Zonal Railway Training Institute",
    "Mahuabagh",
    "Ghazipur, Uttar Pradesh",
    "PIN 233001",
  ],
  phone: "(0548) XXX XXXX",
  email: "zrti.ghazipur@railnet.gov.in",
};

export const principalMessage = {
  name: "Principal, ZRTI Ghazipur",
  title: "Principal's Message",
  body:
    "Zonal Railway Training Institute, Ghazipur is committed to strengthening operational efficiency, safety awareness and service standards across the railway system. Our institute strives to provide structured, practical and future-ready training for officers and staff through disciplined instruction, continuous learning resources and a collaborative campus environment.",
  note:
    "This section is prepared for future CMS or API integration and can be linked to /api/principal-message.",
  imageAlt: "Placeholder portrait for the Principal of ZRTI Ghazipur",
};

export const quickLinks: QuickLink[] = [
  {
    title: "Training Calendar",
    href: "/training-information",
    description: "View the yearly training schedule and upcoming batches.",
  },
  {
    title: "Courses",
    href: "/training-information",
    description: "Browse forthcoming and specialized training programmes.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Reach the institute office for official communication.",
  },
];

export const announcementsMock: Announcement[] = [
  {
    id: "n1",
    title: "Senior Officers visited ZRTI Ghazipur for training review",
    date: "2026-04-18",
    excerpt:
      "A delegation of senior railway officers reviewed classroom infrastructure, training delivery and knowledge resources at the institute.",
    category: "Visit",
  },
  {
    id: "n2",
    title: "Safety awareness workshop scheduled for the May 2026 batch",
    date: "2026-04-14",
    excerpt:
      "The forthcoming workshop will focus on operational discipline, emergency response and incident prevention for field staff.",
    category: "Event",
  },
  {
    id: "n3",
    title: "Training calendar for 2026-27 uploaded for departmental reference",
    date: "2026-04-09",
    excerpt:
      "Departments may review the proposed calendar for initial, refresher and specialized courses offered by the institute.",
    category: "Notice",
  },
  {
    id: "n4",
    title: "Library and digital knowledge resources expanded for trainees",
    date: "2026-04-03",
    excerpt:
      "New manuals, circulars and learning materials have been organized into category-wise access sections for trainees and faculty.",
    category: "News",
  },
];

export const coursesMock: Course[] = [
  {
    id: "c1",
    name: "Operating Department Initial Course",
    duration: "4 weeks",
    level: "Initial",
    category: "Operating",
    description:
      "Structured induction module covering train operations, station working basics and field coordination practices.",
  },
  {
    id: "c2",
    name: "Commercial Refresher Programme",
    duration: "2 weeks",
    level: "Refresher",
    category: "Commercial",
    description:
      "Refresher course on passenger services, claims handling, revenue awareness and updated commercial procedures.",
  },
  {
    id: "c3",
    name: "Safety Management and Accident Prevention",
    duration: "3 weeks",
    level: "Specialized",
    category: "Safety",
    description:
      "Focused training on safety culture, rule compliance, counseling, reporting and preventive practices across departments.",
  },
  {
    id: "c4",
    name: "Office Administration and Establishment Rules",
    duration: "1 week",
    level: "Refresher",
    category: "Administration",
    description:
      "Practical orientation on office procedures, establishment matters and administrative documentation for supervisors and clerical staff.",
  },
];

export const trainingSections: {
  title: "Training Programme Calendar" | "Forthcoming Training Courses" | "Training Program Videos" | "Webinar";
  items: TrainingResource[];
}[] = [
  {
    title: "Training Programme Calendar",
    items: [
      {
        id: "calendar-1",
        title: "Annual Training Calendar 2026-27",
        description: "Consolidated schedule of planned departmental and refresher training programmes.",
        meta: "PDF placeholder · Future endpoint: /api/training/calendar",
      },
      {
        id: "calendar-2",
        title: "Monthly Batch Plan",
        description: "Month-wise commencement plan for approved batches and institute activities.",
        meta: "Updated section-ready card",
      },
    ],
  },
  {
    title: "Forthcoming Training Courses",
    items: [
      {
        id: "upcoming-1",
        title: "Operating Rules Refresher",
        description: "Upcoming course for field and supervisory staff covering rules, discipline and case studies.",
        meta: "Batch starts in May 2026",
      },
      {
        id: "upcoming-2",
        title: "Commercial Practices Module",
        description: "Short-term training on ticketing, passenger interface and updated commercial instructions.",
        meta: "Nomination-based intake",
      },
    ],
  },
  {
    title: "Training Program Videos",
    items: [
      {
        id: "video-1",
        title: "Orientation to Institute Training Systems",
        description: "Introductory recorded session for visiting batches and new trainees.",
        meta: "Video placeholder",
      },
      {
        id: "video-2",
        title: "Safety Drill Demonstration",
        description: "Demonstration video on emergency preparedness and reporting standards.",
        meta: "Video placeholder",
      },
    ],
  },
  {
    title: "Webinar",
    items: [
      {
        id: "webinar-1",
        title: "Operational Safety Webinar Series",
        description: "Online knowledge session for departmental officers and nominated staff.",
        meta: "Live link placeholder",
      },
      {
        id: "webinar-2",
        title: "Administrative Best Practices Webinar",
        description: "Webinar covering records management, communication discipline and office procedures.",
        meta: "Archive placeholder",
      },
    ],
  },
];

export const knowledgeCentreCategories: KnowledgeCategory[] = [
  { title: "Operating", items: ["General and Subsidiary Rules", "Station Working Notes", "Operating Circulars"] },
  { title: "Commercial", items: ["Commercial Manuals", "Passenger Amenities Instructions", "Claims and Parcel Guidelines"] },
  { title: "Safety", items: ["Safety Circulars", "Accident Prevention Material", "Disaster Management Notes"] },
  { title: "Working Time Table", items: ["Sectional Working Time Table", "Speed Restrictions", "Operating Charts"] },
  { title: "Trains at a Glance", items: ["Passenger Train Reference", "Mail/Express Services", "Important Route Links"] },
  { title: "Establishment", items: ["Service Matters", "Leave and Conduct Rules", "Administrative Orders"] },
  { title: "Vigilance", items: ["Vigilance Guidelines", "Integrity Awareness Notes", "Preventive Vigilance Material"] },
  { title: "Codes and Manuals", items: ["Indian Railway Codes", "Manuals for Departments", "Compendium of Instructions"] },
  { title: "Misc", items: ["Downloads", "Forms", "Reference Material"] },
];

export const traineeSections: TraineeSection[] = [
  {
    title: "Class Schedule",
    description: "Batch-wise daily routine, classroom allocation and session timing placeholders for future integration.",
    href: "/api/trainees/schedule",
  },
  {
    title: "Examination",
    description: "Assessment notices, exam guidance and internal evaluation related information for trainees.",
    href: "/api/trainees/examination",
  },
  {
    title: "Result",
    description: "Result publication space for batches and departmental programmes with backend-ready data mapping.",
    href: "/api/trainees/result",
  },
];

export const magazineIssues: MagazineIssue[] = [
  {
    id: "mag-1",
    title: "ZRTI E-Magazine Inaugural Issue",
    period: "January - March 2026",
    description: "Institute highlights, training achievements and literary contributions from staff and trainees.",
    fileLabel: "PDF placeholder",
  },
  {
    id: "mag-2",
    title: "Campus Chronicle",
    period: "April - June 2026",
    description: "Upcoming magazine space for articles, reports and important institute moments.",
    fileLabel: "PDF placeholder",
  },
];

export const facilities: Facility[] = [
  { title: "Smart Classes", description: "Digitally supported classrooms for presentations, demonstrations and hybrid sessions." },
  { title: "Projector-equipped classrooms", description: "Teaching spaces with projector systems for structured lecture delivery." },
  { title: "Hostel", description: "On-campus accommodation support for nominated trainees attending residential programmes." },
  { title: "Mess", description: "Dedicated dining arrangements for hostel residents and training batches." },
  { title: "Gym", description: "Basic fitness facility for residential trainees and campus well-being activities." },
  { title: "Recreation", description: "Common areas for reading, interaction and off-session engagement." },
  { title: "Sports", description: "Open space and selected sports amenities for organized physical activities." },
];

export const howToReach = [
  {
    mode: "By Train",
    details: "Nearest station: Ghazipur (GCT). The city is connected to Varanasi and Chhapra.",
  },
  {
    mode: "By Road",
    details: "The institute is accessible by road and located on the NH 29 and NH 31 corridor.",
  },
  {
    mode: "By Air",
    details: "Nearest airport: Varanasi, approximately 80 km from Ghazipur.",
  },
];

export const adminHighlights = [
  { label: "News cards configured", value: "04" },
  { label: "Training sections ready", value: "04" },
  { label: "Knowledge categories", value: "09" },
  { label: "Portal status", value: "API-ready" },
];
