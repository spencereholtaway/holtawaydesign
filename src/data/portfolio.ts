// Copy for /portfolio that repeats a pattern (beats, notes, cards, career rows).
// One-off copy lives in src/pages/portfolio.astro. A few strings carry inline
// HTML (<strong>, <a>); they're written here, never user input.

/** Default headings for the three beats. A case can name its own. */
export const BEAT_LABELS = ['The constraint', 'The move', 'The insight'] as const;
type Labels = readonly [string, string, string];

/** Tab name below 720px: the heading without its "The". */
const tabFor = (label: string) => label.replace(/^The /, '').toLowerCase();

const beat = (c: string, m: string, i: string, labels: Labels = BEAT_LABELS) =>
  [c, m, i].map((text, n) => ({ label: labels[n], tab: tabFor(labels[n]), text }));

export const CHIPSTACK_BEATS = beat(
  'ChipStack is an AI tool for chip designers. It reads through decades of documentation, some of it older than the people using it, and catches problems before they reach silicon. It was built by engineers, for engineers, inside a VS Code panel. ChipStack wanted to inject modern user experience principles to their product.',
  'Along with high level architecture and storytelling design decisions to improve feature findability and user flow, I developed an action bar that shows contextually relevant controls and easy access to agent interaction. The bar can be invoked and operated entirely by keyboard or mouse, and automatically gets out of the way when not in use.',
  "The obvious move would have been to center the design around ChipStack's chat capabilities, but in microchip design, context is key for designers, so an augmented, optional experience is far more suitable for the user. ChipStack was acquired by Cadence in late 2025.",
  ['The constraint', 'The work', 'The insight'],
);

export const MYBUS_BEATS = beat(
  'This is a project of self constraint. It’s hard to find a transit app that does one thing well, and that was my frustration as a daily commuter in SF from 2010–2019. 3+ taps to find the simple information I needed, then surprise subscription plans showing up when I found one I liked.',
  'Originally released in 2014, the solution was to create a simple list for daily transit users: the buses they take every day, from the bus stops they go to every day. No extras. A bus app truly designed for the daily commute.',
  'Keeping a strong opinion on features when an API can do basically anything is harder than it sounds. Apple’s SDKs in the last 10 years have made this simple solution even more powerful with widgets and live activities: features worth adding, unlike trip planning.',
  ['The constraint', 'The solution', 'The insight'],
);

export const CALM_BEATS = beat(
  'Calm was facing churn challenges as the mindfulness industry took a downturn in the months following the 2020 pandemic. With a growth veteran leading the product team, we transitioned our energy from content-focused development to growth-focused development.',
  'While the end result is a simple daily engagement pattern, it was important to engage users in deep research to ensure we chose the right path for users from a plethora of strategies and tactics generated from company-wide workshops led by yours truly.',
  'Weekly engagement lifted to healthy levels. UX research participants and reviewers enjoyed the addition of encouraging reminders and a low effort way to keep to their intention of using Calm daily.',
  ['The challenge', 'Simple on the surface', 'What people felt'],
);

export const PGE_BEATS = beat(
  'The official map shows you everything, because they have everything. Somewhere in all of it is the one thing you want, which is when your lights come back.',
  'One progress meter for your outage. Nearby outages if you want the context. Light and dark.',
  "During an outage your battery is the thing you're rationing, so the app is built to use as little of it as it can. Most of the work was deciding what not to build.",
);

/** "Five more." Each one has a card in the carousel and a side sheet. */
export const PROJECTS = [
  {
    key: 'calmb2b', num: '04', name: 'Calm for Business', year: '2026', tint: 'var(--p-calm)',
    meta: '2020 zero-to-one, revisited · 2026',
    head: 'A dashboard that lives up to the name.',
    teaser: 'An HR admin should feel what they just bought.',
    labels: ['The constraint', 'The purpose', 'The insight'],
    c: "I designed Calm's B2B product from nothing in 2020, fast, while demand for mindfulness tools was peaking during the pandemic. We shipped within 2 months of starting work, and continued to develop the business & partnerships and Calm Health offering through 2022 when I moved to the consumer team.",
    m: 'As user expectations of UI polish shifted between 2024 and 2025, I wanted to revisit the visual design for Calm for Business. Originally, a 2020 SaaS-inspired UI suddenly felt incredibly dated and it was time for me to brush up on modern visual design.',
    i: 'Just how much visual design can make a difference to the emotive response a user can feel. Comparatively, this visual approach instills a sense of depth and calm, a place I’d hope HR administrators would look forward to visiting as part of their job.',
  },
  {
    key: 'flight', num: '05', name: 'FlightAware', year: '2025', tint: 'var(--p-flight)',
    meta: 'Self-directed redesign · 2025',
    head: 'Dark mode, for a reason.',
    teaser: 'They patched. I designed.',
    c: 'A dense, nerdy flight tracker whose information architecture had been patched for years rather than designed.',
    m: "A dark mode built on FlightAware's own dark brand blue, for balance. The trend was permission, not the reason.",
    i: 'Flight alerts and recent searches get somewhere proper to live. They patched. I designed.',
  },
  {
    key: 'parent', num: '06', name: 'ParentSquare', year: '2025', tint: 'var(--p-parent)',
    meta: 'Self-directed refresh · 2025',
    head: 'Designed for messages nobody designed.',
    teaser: 'Built for whatever a teacher pastes in.',
    c: 'A school app that works fine and looks ten years old, carrying teacher posts in every format you can imagine.',
    m: 'A clean, modern refresh that keeps the brand colors.',
    i: 'The layout is built for the variety. Mixed text, images, whatever a teacher pastes in.',
  },
  {
    key: 'pge', num: '07', name: 'Simpler PG&E Outages', year: '2025', tint: 'var(--p-pge)',
    meta: 'Self-directed, web · 2025',
    head: 'Less map. More battery.',
    teaser: 'One progress meter for your outage, built to use as little of your battery as it can.',
    c: PGE_BEATS[0].text,
    m: PGE_BEATS[1].text,
    i: PGE_BEATS[2].text,
  },
  {
    key: 'divorce', num: '08', name: 'CA Divorce Disclosures Workbook', year: 'Holtaway Design', tint: 'var(--p-divorce)',
    meta: 'Local-first app, shipped under Holtaway Design',
    head: 'Hundreds of fields, and now it knows where you left off.',
    teaser: "Same as PG&E. Work out what's running low and protect it.",
    c: "California divorce disclosures turn up as PDF worksheets from your lawyer. Hundreds of fields and no memory of what you've done. You're filling them in at the worst point in your life and nothing tells you where you are.",
    m: "I built the part that was missing. It tracks what's finished and takes you straight to what isn't.",
    i: "Same instinct as the PG&E one. There the thing running out is battery. Here it's attention, because nobody doing this is at their best. Work out what's scarce and protect it.",
  },
] as const;

export type ProjectKey = (typeof PROJECTS)[number]['key'];

/**
 * The three featured cases in Work also open a side sheet ("The whole story").
 * Their longer write-ups are Spencer's to write; until then `c`/`m`/`i` are
 * absent and the sheet shows a placeholder. `head` may carry inline HTML.
 */
export const FEATURED: {
  key: string; num: string; name: string; meta: string; head: string; tint: string;
  c?: string; m?: string; i?: string;
}[] = [
  { key: 'chipstack', num: '01', name: 'ChipStack', meta: 'AI for microchip design, inside VS Code · 2025 – 2026', head: 'Design <i>can</i> save the world.', tint: 'var(--p-chip)' },
  { key: 'mybussf', num: '02', name: 'My Bus SF', meta: 'iOS · $0.99', head: 'An app that wants you to leave.', tint: 'var(--p-bus)' },
  { key: 'calm', num: '03', name: 'Calm', meta: 'Staff Product Designer, Consumer · 2022 – 2024', head: 'Retention, for people who came here to relax.', tint: 'var(--p-calm)' },
];

/** Every side sheet in order, so "Next" runs 01 through 08. */
export const STORIES = [...FEATURED, ...PROJECTS];

/**
 * Career rows. `notes` are the three paragraphs when the row is opened
 * (HTML allowed). `headline: null` and `todo` mark copy Spencer hasn't written yet.
 */
export const CAREER: {
  key: string;
  when: string;
  role: string;
  headline: string | null;
  /** One line under the headline that explains it. Shown while the notes are hidden. */
  line?: string;
  notes?: string[];
  body?: string;
  todo?: string;
}[] = [
  {
    key: 'chipstack', when: '2025 – 2026', role: 'ChipStack · Product &amp; brand, head-of-design track',
    headline: 'I asked the dumb question in a room of PhDs for months.', line: 'Regular user research with microchip designers led to simple solutions for complex problems.',
    notes: [
      '<strong>The hard part.</strong> I got dropped into chip design knowing none of the words. Most of the first few months was catching up fast enough to be useful in the room.',
      '<strong>Decision.</strong> Information architecture first. Where does each thing happen, and why there. The action bar came out of that.',
      '<strong>Why this job.</strong> Everyone there was a chip engineering nerd and genuinely pleased someone had turned up to help. And if I was going to work on AI, I wanted it to be the kind that makes this mess less wasteful rather than more. Cadence acquired them.',
    ],
  },
  {
    key: 'red9', when: '2023 – 2024', role: 'Red9 · Product &amp; brand',
    headline: 'I designed myself out of a job.', line: 'A full design system including responsive page elements and dashboard widget components allowed the client to iterate on their site long after the engagement.',
    notes: [
      '<strong>The hard part.</strong> They hired me for a growth website and a light rebrand, but every change still had to come through me. Then came the Health Check, which has to tell people their database is in worse shape than they thought.',
      '<strong>Decision.</strong> I turned the rebrand into a full design system so they could keep building without me. For the Health Check, I made it read like a doctor, not a car alarm: what’s wrong, what to fix first, and no scare tactics.',
      '<strong>Why it worked.</strong> It showed people problems they didn’t know they had, and Red9 was the company that could fix them. It’s still on their site.',
    ],
  },
  {
    key: 'calm', when: '2020 – 2024', role: 'Calm · Staff Product Designer, Consumer',
    headline: 'Growth hacked, for people who came here to relax.', line: 'Careful communication and deep research meant growth didn’t have to look like a notification center full of nags and guilt.',
    notes: [
      "<strong>The hard part.</strong> People were canceling as normal life came back, and my team got handed engagement. In a wellness app that's a dangerous word.",
      '<strong>Decision.</strong> I ran the exploration across the company with research behind it. Programs, plans, pathways, all of it, then we cut back to what people would actually use. Nothing in it nags.',
      "<strong>What people felt.</strong> A bit of achievement, never guilt about a broken streak. Building a habit is fine as long as there's something worth being habitual about. Calm shipped the sleep pathway later, as Calm Sleep.",
    ],
  },
  {
    key: 'calmb2b', when: '2020 – 2022', role: 'Calm for Business · Staff Product Designer, zero-to-one',
    headline: "The least glamorous work I'm proudest of.", line: 'A zero-to-one project with a tiny team and very little internal visibility turned into a huge revenue source.',
    notes: [
      '<strong>The hard part.</strong> Demand went through the roof and every partnership still ran through an engineer. Adding 50,000 American Express users was done by hand.',
      '<strong>Decision.</strong> There was no PM. Me, three engineers and a GM, so I was the product function. Tools for the account managers, and a self-serve side for companies: card, CSV, HRIS.',
      "<strong>What it became.</strong> Self-serve B2B at the busiest moment we'd ever have, a lot more partnerships than anyone could handle manually, and engineering out of the middle of it. The early work on how it all fitted together fed into Calm Health.",
    ],
  },
  {
    key: 'dialpad', when: '2016 – 2020', role: 'Dialpad · Head of Design',
    headline: "How to modernize a plane while it's flying.", line: 'From an employee phone system for small businesses to enterprise-grade, AI-enabled communication platform for sales, support and large distributed teams. In 4 years.',
    notes: [
      '<strong>The hard part.</strong> A small-business phone system had grown into an enterprise platform with sales, support and early voice AI, all sitting on old code where moving one thing broke another.',
      '<strong>Decision.</strong> Information architecture first, then modernize in pieces. You never get a clean slate. Most of the job is managing the seam between the new system and the parts nobody can touch yet.',
      "<strong>The team.</strong> I inherited a feral art studio and pointed it at the business. In B2B, what's good for the business and what's good for the user are mostly the same thing. It grew to seven designers.",
    ],
  },
  {
    key: 'shuddle', when: '2014 – 2016', role: 'Shuddle · Senior UX Designer, rideshare for families',
    headline: 'Where I learned how to design software instead of screens.', line: 'Working with a small team on multi-family, multi-leg carpools meant I had to go deep with back end engineers to understand how every UI change snowballed on the back end in order to create a service for busy families that felt like an assist and not a chore.',
    notes: [
      "<strong>The hard part.</strong> I was the only UX designer. A bare-bones back end and a lot of live logistics: where's the kid, where do I need to be, when do I leave.",
      '<strong>Decision.</strong> A driver app that turned a set of raw functions into something you could follow, including what happens when a ride falls through at the last minute.',
      '<strong>What stuck.</strong> Multifamily carpools. Who hosts, who drives, who drops out, and who gets re-routed when they do. I came back to the same problem ten years later with blisspool.',
    ],
  },
  { key: 'zynga', when: '2010 – 2014', role: 'Zynga · Lead UI Designer, Words With Friends and Boggle', headline: 'Worked With Friends', line: 'Translated my graphic design background to UI and UX and learned how to work with and balance the needs of design, engineering and product management. Shipped Words With Friends for iPad and many more with friends products and projects.', todo: 'Placeholder. Spencer to write the constraint, move and insight.' },
  {
    key: 'early', when: '2003 – 2010', role: 'Central Saint Martins, then agencies · Visual communication, spatial and print',
    headline: 'Type first. Screens later.', line: 'Created live marketing experiences for Orange Telecom, Samsung, Skype, HSBC and American Express.',
    body: 'Visual Communication at Central Saint Martins, 2003 – 2006. The grid and the type on this page come from there.',
    todo: 'Agencies, 2006 – 2010, spatial and print. Placeholder. Spencer to write the framing.',
  },
];

export const PILLARS = [
  { label: 'Service and systems', text: 'Ten years building software for specialists. Telephony, microchip design, the stressed and anxious. People who know how complex their problems are, and need a design lens to help achieve their goals more easily.' },
  { label: 'Craft', text: 'It all started with Hypercard stacks in 1986. I trained in typography under Phil Baines at Central Saint Martins, and broke out into experiential marketing as a graduate. The balance of high craft and rich experience design is the constant in my career.' },
  { label: 'Building to be better', text: 'I hate to see people build for building’s sake. If we’re not learning from what we build or building to deliver something we know will be valuable to customers (through research), I’ll be the one in the room to say we’re on the wrong path.' },
  { label: 'Mentorship', text: 'Head of Design at Dialpad, Staff Designer at Calm. Growing designers and sharing my 20+ years of experience has been as much of the job as shipping great products.' },
];

/** The three principles in the dark band. Headlines carry inline HTML for the accent. */
export const PRINCIPLES = [
  {
    head: 'The most I can charge you is <span class="t-accent">99 cents</span>.',
    text: "MyBus SF and Breath Body are 99 cents with no subscription: not because they’re “only worth $0.99” but because my belief is simple solutions deserve simple, honest pricing as opposed to the mental gymnastics “less than a cup of coffee” or subscription plans cause potential customers.",
  },
  {
    head: 'They asked for engagement. I gave them permission to leave.',
    text: "We were asked to growth-hack a wellness app. So we made something that encourages the right amount of achievement and doesn’t rely on guilt to garner engagement. Encouragement and being ok with being an imperfect human is great; nagging and a sense of dread from under-achievement is not.",
  },
  {
    head: 'I took the AI job that uses less water.',
    text: 'In early 2025 I had mixed feelings about the AI boom and was hesitant to be a part of it without really thinking about the why. ChipStack helps designers make more efficient chips. Better chips need less cooling, which means less water and less power. That’s a product I could get behind.',
  },
];
