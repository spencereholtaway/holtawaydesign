// Copy for /portfolio that repeats a pattern (beats, notes, cards, career rows).
// One-off copy lives in src/pages/portfolio.astro. A few strings carry inline
// HTML (<strong>, <a>); they're written here, never user input.

const beat = (c: string, m: string, i: string) => [
  { label: 'The constraint', tab: 'constraint', text: c },
  { label: 'The move', tab: 'move', text: m },
  { label: 'The insight', tab: 'insight', text: i },
];

export const CHIPSTACK_BEATS = beat(
  'ChipStack is an AI tool for chip designers. It reads through decades of documentation, some of it older than the people using it, and catches problems before they reach silicon. It was built by engineers, for engineers, inside a VS Code panel. ChipStack wanted to inject modern user experience principles to their product.',
  'Along with high level architecture and storytelling design decisions to improve findability and user flow, I developed an action bar that shows contextually relevant controls and easy access to agent interaction. The bar can be invoked and operated entirely by keyboard or mouse, and automatically gets out of the way when not in use.',
  "The obvious move would have been to center the design around ChipStack's chat capabilities, but in microchip design, context is key for designers, so an augmented, optional experience is far more suitable for the user. ChipStack was acquired by Cadence in late 2025.",
);

export const MYBUS_BEATS = beat(
  'Tap a stop in a bus app and it lists every line that runs through it. All of them. It’s the lazy default, and it hands you the sorting.',
  'So I asked what you actually need at that stop, at that moment, and cut the rest. Set it up once. After that it just tells you.',
  'The measure of it is how fast you close the app. No PM, no roadmap, just an API and an opinion.',
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
    meta: 'My 2020 zero-to-one, revisited · 2026',
    head: 'A dashboard that lives up to the name.',
    teaser: 'An HR admin should feel the thing they just bought.',
    c: "I built Calm's B2B product from nothing in 2020, fast, while demand was peaking. It shipped and it scaled.",
    m: "The same system, redrawn in Calm's brand and register. Same jobs, same data, calmer.",
    i: "This is one where the feeling is doing real work. Someone buying Calm for their company should get a bit of the thing they're buying, even in an admin dashboard.",
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
 * Career rows. `notes` are the three paragraphs when the row is opened
 * (HTML allowed). `headline: null` and `todo` mark copy Spencer hasn't written yet.
 */
export const CAREER: {
  key: string;
  when: string;
  role: string;
  headline: string | null;
  notes?: string[];
  body?: string;
  todo?: string;
}[] = [
  {
    key: 'chipstack', when: '2025–26', role: 'ChipStack · Product &amp; brand, head-of-design track',
    headline: 'I asked the dumb question in a room of PhDs for months.',
    notes: [
      '<strong>The hard part.</strong> I got dropped into chip design knowing none of the words. Most of the first few months was catching up fast enough to be useful in the room.',
      '<strong>Decision.</strong> Information architecture first. Where does each thing happen, and why there. The action bar came out of that.',
      '<strong>Why this job.</strong> Everyone there was a chip engineering nerd and genuinely pleased someone had turned up to help. And if I was going to work on AI, I wanted it to be the kind that makes this mess less wasteful rather than more. Cadence acquired them.',
    ],
  },
  {
    key: 'red9', when: '2023–24', role: 'Red9 · Product &amp; brand',
    headline: 'I designed myself out of a job.',
    notes: [
      '<strong>The hard part.</strong> They hired me for a growth website and a light rebrand, but every change still had to come through me. Then came the Health Check, which has to tell people their database is in worse shape than they thought.',
      '<strong>Decision.</strong> I turned the rebrand into a full design system so they could keep building without me. For the Health Check, I made it read like a doctor, not a car alarm: what’s wrong, what to fix first, and no scare tactics.',
      '<strong>Why it worked.</strong> It showed people problems they didn’t know they had, and Red9 was the company that could fix them. It’s still on their site.',
    ],
  },
  {
    key: 'calm', when: '2020–24', role: 'Calm · Staff Product Designer, Consumer',
    headline: 'Retention, for people who came here to relax.',
    notes: [
      "<strong>The hard part.</strong> People were canceling as normal life came back, and my team got handed engagement. In a wellness app that's a dangerous word.",
      '<strong>Decision.</strong> I ran the exploration across the company with research behind it. Programs, plans, pathways, all of it, then we cut back to what people would actually use. Nothing in it nags.',
      "<strong>What people felt.</strong> A bit of achievement, never guilt about a broken streak. Building a habit is fine as long as there's something worth being habitual about. Calm shipped the sleep pathway later, as Calm Sleep.",
    ],
  },
  {
    key: 'calmb2b', when: '2020–22', role: 'Calm for Business · Staff Product Designer, zero-to-one',
    headline: "The least glamorous work I'm proudest of.",
    notes: [
      '<strong>The hard part.</strong> Demand went through the roof and every partnership still ran through an engineer. Adding 50,000 American Express users was done by hand.',
      '<strong>Decision.</strong> There was no PM. Me, three engineers and a GM, so I was the product function. Tools for the account managers, and a self-serve side for companies: card, CSV, HRIS.',
      "<strong>What it became.</strong> Self-serve B2B at the busiest moment we'd ever have, a lot more partnerships than anyone could handle manually, and engineering out of the middle of it. The early work on how it all fitted together fed into Calm Health.",
    ],
  },
  {
    key: 'dialpad', when: '2016–20', role: 'Dialpad · Head of Design',
    headline: "How to modernize a plane while it's flying.",
    notes: [
      '<strong>The hard part.</strong> A small-business phone system had grown into an enterprise platform with sales, support and early voice AI, all sitting on old code where moving one thing broke another.',
      '<strong>Decision.</strong> Information architecture first, then modernize in pieces. You never get a clean slate. Most of the job is managing the seam between the new system and the parts nobody can touch yet.',
      "<strong>The team.</strong> I inherited a feral art studio and pointed it at the business. In B2B, what's good for the business and what's good for the user are mostly the same thing. It grew to seven designers.",
    ],
  },
  {
    key: 'shuddle', when: '2014–16', role: 'Shuddle · Senior UX Designer, rideshare for families',
    headline: 'Where I learned to map the whole web first.',
    notes: [
      "<strong>The hard part.</strong> I was the only UX designer. A bare-bones back end and a lot of live logistics: where's the kid, where do I need to be, when do I leave.",
      '<strong>Decision.</strong> A driver app that turned a set of raw functions into something you could follow, including what happens when a ride falls through at the last minute.',
      '<strong>What stuck.</strong> Multifamily carpools. Who hosts, who drives, who drops out, and who gets re-routed when they do. I came back to the same problem ten years later with blisspool.',
    ],
  },
  { key: 'zynga', when: '2010–14', role: 'Zynga · Lead UI Designer, Words With Friends and Boggle', headline: 'Worked With Friends', todo: 'Placeholder. Spencer to write the constraint, move and insight.' },
  {
    key: 'early', when: '2003–10', role: 'Central Saint Martins, then agencies · Visual communication, spatial and print',
    headline: 'Type first. Screens later.',
    body: 'Visual Communication at Central Saint Martins, 2003–06. The grid and the type on this page come from there.',
    todo: 'Agencies, 2006–10, spatial and print. Placeholder. Spencer to write the framing.',
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

/** The career row's three notes as beats, for a featured case study. */
function beatsFromNotes(key: string) {
  return CAREER.find((c) => c.key === key)!.notes!.map((n) => {
    const [, label, text] = n.match(/^<strong>(.+?)\.<\/strong> (.+)$/)!;
    return { label, tab: label.replace(/^The /, '').toLowerCase(), text };
  });
}
export const CALM_BEATS = beatsFromNotes('calm');
