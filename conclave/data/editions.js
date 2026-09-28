/*
 * BITSoM Business Conclave: content for every edition.
 *
 * The page (index.html) is a single template. It reads the edition from
 * ?edition=YYYY (default: CONCLAVE_DEFAULT_EDITION) and renders whatever is
 * filled in below. Any section whose data is missing or empty is skipped, so
 * an edition can go live with only part of its story ready.
 *
 * To publish an edition:
 *   1. Copy the 2026 object as a starting point.
 *   2. Set status: "published".
 *   3. Put images in assets/img/... and reference them relative to index.html.
 *
 * Items marked TODO(confirm) came from pre-event decks (planned numbers and
 * timings) and should be checked against what actually happened.
 *
 * Copy follows the BITSoM tone of voice: British English (programme,
 * organisation, colour), active voice, positive phrasing, and "BITSoM" always
 * written with a lowercase "o" (the page keeps it lowercase in uppercase text).
 */

window.CONCLAVE_DEFAULT_EDITION = "2026";

window.CONCLAVE_EDITIONS = {
  /* ------------------------------------------------------------------ */
  "2025": {
    year: "2025",
    status: "published",
    edition: "Edition 2025",
    date: "7–8 February 2025",
    dateISO: "2025-02-07",
    venue: "BITS Pilani, Mumbai Campus",
    theme: {
      kicker: "Theme 2025",
      title: "Innovation Beyond Boundaries"
    },

    about: {
      lead: "The 2025 BITSoM Business Conclave focused on harnessing creativity and collaboration to drive business growth, redefine industry standards and shape the future of commerce and technology.",
      body: "Day 1 put the spotlight on FMCG and FMCD. Day 2 turned to SaaS, IT and BFSI.",
      pillars: [
        { icon: "mic",     title: "Keynote Speech",      text: "Leaders set the tone for two days of ideas" },
        { icon: "panel",   title: "Panel Discussions",   text: "Industry voices on FMCG, FMCD, SaaS, IT and BFSI" },
        { icon: "huddle",  title: "Breakout Sessions",   text: "Small groups where students and speakers dug deeper" },
        { icon: "trophy",  title: "Performances",        text: "Student performances on the Conclave stage" }
      ]
    },

    stats: [
      { value: "auto:speakers",      label: "Industry speakers" },
      { value: "auto:organisations", label: "Organisations" },
      { value: 2,                    label: "Days" },
      { value: "auto:sponsors",      label: "Sponsors & partners" }
    ],

    /* Two-day structure from the 2025 event overview. No session times. */
    timeline: [
      { time: "Day 1", title: "Lamp Lighting & Keynote",   icon: "mic",     image: "assets/img/gallery/2025/lamp-lighting.jpg",
        text: "The Conclave opened with the ceremonial lamp lighting and a keynote address." },
      { time: "Day 1", title: "FMCG & FMCD Panels",        icon: "panel",   image: "assets/img/gallery/2025/panel-stage.jpg",
        text: "Leaders from PepsiCo, Mondelēz, Hershey's, Kimberly-Clark and more on the future of consumer business." },
      { time: "Day 1–2", title: "Breakout Sessions",       icon: "huddle",  image: "assets/img/gallery/2025/huddle-library.jpg",
        text: "Students and speakers met in small groups to work through real business questions." },
      { time: "Day 2", title: "SaaS, IT & BFSI Panels",    icon: "panel",   image: "assets/img/gallery/2025/fireside-chat.jpg",
        text: "Adobe, Mastercard, Sify, JioStar and others on how AI and changing consumers are reshaping products." },
      { time: "Day 1–2", title: "Networking",                icon: "tea",     image: "assets/img/gallery/2025/hallway-conversations.jpg",
        text: "Conversations carried on in the corridors between sessions." },
      { time: "Day 1–2", title: "Performances",            icon: "trophy",
        text: "Student performances on the Conclave stage." }
    ],

    speakers: [
      {
        name: "Raghavendra Purwar",
        role: "Associate Director – Manufacturing",
        org: "PepsiCo", logo: "assets/img/orgs/2025/raghavendra-purwar.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/raghavendra-purwar.jpg",
        bio: ""
      },
      {
        name: "Anoop Tiwari",
        role: "Lead – Regulatory Affairs & Compliance",
        org: "Mondelēz International", logo: "assets/img/orgs/2025/anoop-tiwari.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/anoop-tiwari.jpg",
        bio: ""
      },
      {
        name: "Payal Agrawaal",
        role: "Managing Director, India & South Asia",
        org: "Abbott", logo: "assets/img/orgs/2025/payal-agrawaal.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/2025/payal-agrawaal.jpg",
        bio: ""
      },
      {
        name: "Amol Peshattiwar",
        role: "Associate VP – Quality & Regulatory Compliance",
        org: "Hershey's", logo: "assets/img/orgs/2025/amol-peshattiwar.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/amol-peshattiwar.jpg",
        bio: ""
      },
      {
        name: "Sunil Nat",
        role: "Head – Digital Strategy & Ecommerce",
        org: "Galderma", logo: "assets/img/orgs/2025/sunil-nat.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/2025/sunil-nat.jpg",
        bio: ""
      },
      {
        name: "Mohit Mahajan",
        role: "Associate VP",
        org: "Wendy's", logo: "assets/img/orgs/2025/mohit-mahajan.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/mohit-mahajan.jpg",
        bio: ""
      },
      {
        name: "Anubhav Agarwal",
        role: "Director – Ecommerce",
        org: "Kimberly-Clark", logo: "assets/img/orgs/2025/anubhav-agarwal.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/anubhav-agarwal.jpg",
        bio: ""
      },
      {
        name: "Jitendra Chauhan",
        role: "National Head – Rural Business",
        org: "Crompton Greaves", logo: "assets/img/orgs/2025/jitendra-chauhan.png",
        sector: "Consumer Durables & Electronics", cxo: false,
        photo: "assets/img/speakers/2025/jitendra-chauhan.jpg",
        bio: ""
      },
      {
        name: "Midhula Devabhaktuni",
        role: "Co-founder & CMO",
        org: "Mivi", logo: "assets/img/orgs/2025/midhula-devabhaktuni.png",
        sector: "Consumer Durables & Electronics", cxo: true,
        photo: "assets/img/speakers/2025/midhula-devabhaktuni.jpg",
        bio: ""
      },
      {
        name: "Nishant Agarwal",
        role: "Senior AD",
        org: "Kellanova", logo: "assets/img/orgs/2025/nishant-agarwal.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/nishant-agarwal.jpg",
        bio: ""
      },
      {
        name: "VN Narayanan",
        role: "Founder",
        org: "strategii@work", logo: "assets/img/orgs/2025/vn-narayanan.png",
        sector: "Consulting", cxo: false,
        photo: "assets/img/speakers/2025/vn-narayanan.jpg",
        bio: ""
      },
      {
        name: "Raghuraman R.",
        role: "Vice President",
        org: "Mercedes-Benz", logo: "assets/img/orgs/2025/raghuraman-r.png",
        sector: "Automotive", cxo: false,
        photo: "assets/img/speakers/2025/raghuraman-r.jpg",
        bio: ""
      },
      {
        name: "Ravindra Soni",
        role: "Associate VP",
        org: "Hershey's", logo: "assets/img/orgs/2025/ravindra-soni.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/ravindra-soni.jpg",
        bio: ""
      },
      {
        name: "Anand Shrivatsava",
        role: "Director – Product",
        org: "Talkdesk", logo: "assets/img/orgs/2025/anand-shrivatsava.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/anand-shrivatsava.jpg",
        bio: ""
      },
      {
        name: "Ranjan Mishra",
        role: "Chief Human Resources Officer",
        org: "Diebold Nixdorf", logo: "assets/img/orgs/2025/ranjan-mishra.png",
        sector: "Technology & SaaS", cxo: true,
        photo: "assets/img/speakers/2025/ranjan-mishra.jpg",
        bio: ""
      },
      {
        name: "Abhishek Shukla",
        role: "Group Product Manager",
        org: "Adobe", logo: "assets/img/orgs/2025/abhishek-shukla.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/abhishek-shukla.jpg",
        bio: ""
      },
      {
        name: "Naveen Chhabra",
        role: "Chief Revenue Officer",
        org: "Sify", logo: "assets/img/orgs/2025/naveen-chhabra.png",
        sector: "Technology & SaaS", cxo: true,
        photo: "assets/img/speakers/2025/naveen-chhabra.jpg",
        bio: ""
      },
      {
        name: "Sunil Patil",
        role: "Director – Head of PMO",
        org: "Mastercard", logo: "assets/img/orgs/2025/sunil-patil.png",
        sector: "Financial Services", cxo: false,
        photo: "assets/img/speakers/2025/sunil-patil.jpg",
        bio: ""
      },
      {
        name: "Govind Maheshwari",
        role: "Director – Entertainment Business",
        org: "JioStar", logo: "assets/img/orgs/2025/govind-maheshwari.png",
        sector: "Media & Entertainment", cxo: false,
        photo: "assets/img/speakers/2025/govind-maheshwari.jpg",
        bio: ""
      },
      {
        name: "Ramya Venkatesh",
        role: "Director – Product",
        org: "Brightly", logo: "assets/img/orgs/2025/ramya-venkatesh.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/ramya-venkatesh.jpg",
        bio: ""
      }
    ],

    panels: [],

    gallery: [
      // Order and sizes are chosen so the grid fills evenly at 4 and 2 columns.
      { src: "assets/img/gallery/2025/panel-stage.jpg",           caption: "Panellists on the main stage",       size: "wide" },
      { src: "assets/img/gallery/2025/keynote-podium.jpg",        caption: "The keynote",                        size: "tall" },
      { src: "assets/img/gallery/2025/fireside-chat.jpg",         caption: "A fireside conversation",            size: "" },
      { src: "assets/img/gallery/2025/huddle-library.jpg",        caption: "Breakout session in the library",    size: "" },
      { src: "assets/img/gallery/2025/networking-corridor.jpg",   caption: "Networking between sessions",        size: "" },
      { src: "assets/img/gallery/2025/hallway-conversations.jpg", caption: "Conversations between sessions",     size: "tall" },
      { src: "assets/img/gallery/2025/lamp-lighting.jpg",         caption: "Lamp lighting to open the Conclave", size: "wide" },
      { src: "assets/img/gallery/2025/fireside-close.jpg",        caption: "In conversation on stage",           size: "" },
      { src: "assets/img/gallery/2025/panel-lineup.jpg",          caption: "The panel line-up",                  size: "wide" },
      { src: "assets/img/gallery/2025/group-portrait.jpg",        caption: "Speakers with the organising team",  size: "wide" }
    ],

    /* Verbatim from speakers' LinkedIn posts */
    testimonials: [
      { name: "Abhishek Shukla", role: "Group Product Manager, Adobe", photo: "assets/img/speakers/2025/abhishek-shukla.jpg",
        quote: "From the moment I took my flight to Mumbai to the time I returned home, the entire experience was seamless. The hospitality and organization by the student-led team was truly commendable." },
      { name: "Raghuraman R.", role: "Vice President, Mercedes-Benz", photo: "assets/img/speakers/2025/raghuraman-r.jpg",
        quote: "Excellent topic and a wonderfully organised event. Enjoyed the immersive interactions and the college campus vibes. Thanks folks" },
      { name: "Ramya Venkatesh", role: "Director – Product, Brightly", photo: "assets/img/speakers/2025/ramya-venkatesh.jpg",
        quote: "Grateful for the invitation to speak on my fav topic AI. Thank you for the warm welcome! The campus energy is truly contagious." }
    ],

    sponsors: [
      { name: "Business Standard", logo: "assets/img/sponsors/2025/business-standard.jpg" },
      { name: "Solastaa Salon", logo: "assets/img/sponsors/2025/solastaa-salon.jpg" },
      { name: "Arayie – The Earth Store", logo: "assets/img/sponsors/2025/arayie.jpg" },
      { name: "Fortis", logo: "assets/img/sponsors/2025/fortis.jpg" },
      { name: "EaseMyTrip", logo: "assets/img/sponsors/2025/easemytrip.jpg" },
      { name: "Taju's Sweet Flavours", logo: "assets/img/sponsors/2025/tajus-sweet-flavours.jpg" },
      { name: "White Kiwi", logo: "assets/img/sponsors/2025/white-kiwi.jpg" },
      { name: "Awear Beauty", logo: "assets/img/sponsors/2025/awear-beauty.jpg" },
      { name: "Oaks and Olives Cafe", logo: "assets/img/sponsors/2025/oaks-and-olives.jpg" },
      { name: "Edutech", logo: "assets/img/sponsors/2025/edutech.jpg" },
      { name: "Domino's", logo: "assets/img/sponsors/2025/dominos.jpg" },
      { name: "SBI", logo: "assets/img/sponsors/2025/sbi.jpg" },
      { name: "Mad Over Donuts", logo: "assets/img/sponsors/2025/mod-donuts.jpg" },
      { name: "Good Flippin' Burgers", logo: "assets/img/sponsors/2025/good-flippin-burgers.jpg" },
      { name: "3 Sisters", logo: "assets/img/sponsors/2025/3-sisters.jpg" },
      { name: "True Elements", logo: "assets/img/sponsors/2025/true-elements.jpg" },
      { name: "Palvit Photobooth", logo: "assets/img/sponsors/2025/palvit-photobooth.jpg" },
      { name: "EBSCO", logo: "assets/img/sponsors/2025/ebsco.jpg" },
      { name: "Teatopia", logo: "assets/img/sponsors/2025/teatopia.jpg" },
      { name: "LK", logo: "assets/img/sponsors/2025/lk.jpg" }
    ],

    finale: {
      title: "Two days. Twenty leaders. One campus.",
      text: "Conclave 2025 closed with speakers, students and the organising team together on the main stage.",
      image: "assets/img/gallery/2025/closing-group.jpg",
      takeaways: [
        { word: "Day 1", text: "FMCG & FMCD: how consumer brands grow and change" },
        { word: "Day 2", text: "SaaS, IT & BFSI: AI and the products people use" },
        { word: "Campus", text: "Students in the room with twenty industry leaders" }
      ]
    },

    next: {
      title: "Continue to Conclave 2026",
      text: "See how the story moved on: Reimagining Bharat.",
      cta: { label: "View 2026", href: "?edition=2026" }
    }
  },

  /* ------------------------------------------------------------------ */
  "2026": {
    year: "2026",
    status: "published",
    edition: "Edition 2026",
    date: "14 March 2026",
    dateISO: "2026-03-14",
    venue: "BITS School of Management, Mumbai",
    tagline: ["Ideas", "Insight", "Impact"],
    theme: {
      kicker: "Reimagining Bharat",
      title: "AI-Powered Transformation & the Road to Global Leadership"
    },

    /* Chapter 01: the idea behind the edition */
    about: {
      quote: "Not just an event. A legacy you build.",
      lead: "The BITSoM Business Conclave is where ideas meet action. It is our flagship stage, bringing industry trailblazers, thought leaders and innovators to campus.",
      body: "The 2026 edition asked one question: how does India turn AI into lasting global leadership? CXOs, founders and policymakers took it on in keynotes, fireside chats and panels.",
      pillars: [
        { icon: "vision",   title: "Vision",   text: "Reimagining Bharat through AI-powered transformation" },
        { icon: "purpose",  title: "Purpose",  text: "A platform where leaders and young talent redefine industries" },
        { icon: "audience", title: "Audience", text: "CXOs, founders, faculty and 350+ future managers" },
        { icon: "impact",   title: "Impact",   text: "Partnerships between academia and industry that last beyond the day" }
      ]
    },

    /*
     * Headline numbers. `value` may be a number or "auto:<key>", where key is
     * one of speakers | cxos | organisations | sectors (counted from the
     * speakers list below, so they stay correct when speakers change).
     */
    stats: [
      { value: "auto:speakers",      label: "Industry speakers" },
      { value: "auto:cxos",          label: "C-suite leaders" },
      { value: "auto:organisations", label: "Organisations" },
      { value: "auto:sectors",       label: "Sectors represented" },
      { value: 350, suffix: "+",     label: "Attendees" } // TODO(confirm): deck figure was "350+ expected"
    ],

    /* Chapter: how the day unfolded. Highlights from the 14 March 2026 run of show. */
    timeline: [
      { time: "10:15 AM", title: "Keynote Session", icon: "mic", image: "assets/img/gallery/2026/keynote.jpg",
        text: "After the opening address and lamp lighting, Sanchit Suneja of Motilal Oswal delivered the keynote on how generative AI is becoming accessible at every level." },
      { time: "10:45 AM", title: "Fireside Chats", icon: "podcast", image: "assets/img/gallery/2026/fireside-rakesh-tiwary.jpg",
        text: "One-on-one conversations with Rakesh Tiwary, Group CFO of Raymond, and Sanchayan Paul, CHRO of Network18." },
      { time: "11:30 AM", title: "Panel Discussions", icon: "panel", image: "assets/img/gallery/2026/panel-2.jpg",
        text: "Two panels: Shirshendu Bhattacharya, Sashidhar Velaga and Vivek Wadhwa; then Sambasivan G, Vidhyasagar Tyagi, Neetu Ailsinghani and Dr. Monica Sood Bhatia on India's AI economy." },
      { time: "12:30 PM", title: "Focus Group Discussions", icon: "huddle", image: "assets/img/gallery/2026/focus-group-library.jpg",
        text: "Students sat down with speakers, including Dhanushkodi Sivanandhan and Sanchit Suneja, in small groups in the library." },
      { time: "1:15 PM", title: "Guest Speaker", icon: "trophy", image: "assets/img/gallery/2026/guest-dhanushkodi-sivanandhan.jpg",
        text: "Dhanushkodi Sivanandhan, former Police Commissioner of Mumbai, took the stage as the day's guest speaker." },
      { time: "4:15 PM", title: "Performances, Closure & Networking", icon: "tea", image: "assets/img/gallery/2026/showcase-atrium.jpg",
        text: "Club performances and the event closure, followed by snacks and networking at COE Plaza." }
    ],

    /*
     * Speakers. `cxo: true` counts toward the C-suite stat.
     * `sector` feeds the "sectors represented" stat and the filter chips.
     */
    speakers: [
      {
        name: "Sanchit Suneja",
        role: "Executive Director & Group Chief Strategy Officer",
        org: "Motilal Oswal", logo: "assets/img/orgs/motilal-oswal.png",
        sector: "Financial Services", cxo: true,
        photo: "assets/img/speakers/sanchit-suneja.jpg",
        bio: "Previously Associate Partner at McKinsey & Company, where he led the Wealth and Asset Management practice in India."
      },
      {
        name: "Dhanushkodi Sivanandhan",
        role: "Former Police Commissioner of Mumbai",
        org: "", logo: "",
        sector: "Public Service", cxo: false,
        photo: "assets/img/speakers/dhanushkodi-sivanandhan.jpg",
        bio: "Retired IPS officer who served as Mumbai's Police Commissioner and later as Director General of Police, Maharashtra."
      },
      {
        name: "Sanchayan Paul",
        role: "Chief Human Resources Officer",
        org: "Network18", logo: "assets/img/orgs/network18.png",
        sector: "Media & Entertainment", cxo: true,
        photo: "assets/img/speakers/sanchayan-paul.jpg",
        bio: "Previously CHRO at Modenik Lifestyle and earlier with Vodafone India."
      },
      {
        name: "Rakesh Tiwary",
        role: "Group Chief Financial Officer",
        org: "Raymond", logo: "assets/img/orgs/raymond.png",
        sector: "Retail & Lifestyle", cxo: true,
        photo: "assets/img/speakers/rakesh-tiwary.jpg",
        bio: "Previously Group CFO of Adani Cement (Ambuja & ACC) and Adani Airports, and earlier CFO at Adani Electricity Mumbai Limited."
      },
      {
        name: "Dr. Monica Sood Bhatia",
        role: "Chief Executive Officer",
        org: "Exicon", logo: "assets/img/orgs/exicon.png",
        sector: "Healthcare & Pharma", cxo: true,
        photo: "assets/img/speakers/monica-sood-bhatia.jpg",
        bio: "CEO at Exicon and Harvard Business School alumna, bringing medical expertise into business leadership."
      },
      {
        name: "Neetu Ailsinghani",
        role: "Global KYC Compliance",
        org: "Bloomberg", logo: "assets/img/orgs/bloomberg.png",
        sector: "Financial Services", cxo: false,
        photo: "assets/img/speakers/neetu-ailsinghani.jpg",
        bio: "Financial crime compliance and anti-money-laundering expert with 15+ years across Standard Chartered, Citi and BNP Paribas."
      },
      {
        name: "Sashidhar Velaga",
        role: "Associate Vice President",
        org: "Nykaa Fashion", logo: "assets/img/orgs/nykaa-fashion.png",
        sector: "Retail & Lifestyle", cxo: false,
        photo: "assets/img/speakers/sashidhar-velaga.jpg",
        bio: "Spent nearly a decade at Myntra in leadership roles, including Director and Associate Director."
      },
      {
        name: "Sambasivan G",
        role: "Chief Financial Officer",
        org: "Tata Play", logo: "assets/img/orgs/tata-play.png",
        sector: "Media & Entertainment", cxo: true,
        photo: "assets/img/speakers/sambasivan-g.jpg",
        bio: "CFO at Tata Play since 2013; previously Executive Vice President – Finance at Vodafone Essar."
      },
      {
        name: "Shirshendu Bhattacharya",
        role: "Group Lead DPEx – Institutional Markets",
        org: "Dr. Reddy's", logo: "assets/img/orgs/dr-reddys.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/shirshendu-bhattacharya.jpg",
        bio: "Previously Deputy Vice President and Head of Digital Sales Transformation at Angel One."
      },
      {
        name: "Vidhyasagar Tyagi",
        role: "SVP & Head of Internal Audit",
        org: "Reliance Retail", logo: "assets/img/orgs/reliance-retail.png",
        sector: "Retail & Lifestyle", cxo: false,
        photo: "assets/img/speakers/vidyasagar-tyagi.jpg",
        bio: "Leads internal audit for Reliance Retail as Senior Vice President."
      },
      {
        name: "Vivek Wadhwa",
        role: "Head – Organized Trade",
        org: "Marico", logo: "assets/img/orgs/marico.png",
        sector: "FMCG", cxo: false,
        photo: "assets/img/speakers/vivek-wadhwa.jpg",
        bio: "Retail leader driving growth across modern and emerging retail; previously with The Kellogg Company."
      }
    ],

    /*
     * Panels: which speakers sat on which panel. Leave empty to hide the block.
     * Example:
     * { title: "AI in Consumer Business", moderator: "Student name",
     *   speakers: ["Vivek Wadhwa", "Sashidhar Velaga"] }
     */
    panels: [],

    /* Gallery. size: "wide" | "tall" | "" (normal); ordered so the grid fills evenly */
    gallery: [
      { src: "assets/img/gallery/2026/panel-2.jpg",                       caption: "Panel 2: India's AI economy",           size: "wide" },
      { src: "assets/img/gallery/2026/keynote.jpg",                       caption: "The keynote",                           size: "tall" },
      { src: "assets/img/gallery/2026/fireside-rakesh-tiwary.jpg",        caption: "Fireside chat with Rakesh Tiwary",      size: "" },
      { src: "assets/img/gallery/2026/fireside-sanchayan-paul.jpg",       caption: "Fireside chat with Sanchayan Paul",     size: "" },
      { src: "assets/img/gallery/2026/panel-2-closeup.jpg",               caption: "Neetu Ailsinghani on the panel",        size: "" },
      { src: "assets/img/gallery/2026/guest-dhanushkodi-sivanandhan.jpg", caption: "Dhanushkodi Sivanandhan in conversation", size: "wide" },
      { src: "assets/img/gallery/2026/focus-group-library.jpg",           caption: "Focus group in the library",            size: "tall" },
      { src: "assets/img/gallery/2026/focus-group-window.jpg",            caption: "Round-table discussion",                size: "" },
      { src: "assets/img/gallery/2026/focus-group-vidhyasagar-tyagi.jpg", caption: "Focus group with Vidhyasagar Tyagi",    size: "" },
      { src: "assets/img/gallery/2026/showcase-atrium.jpg",               caption: "Student Excellence Showcase",           size: "wide" },
      { src: "assets/img/gallery/2026/showcase-speaker.jpg",              caption: "Speakers meet the case champions",      size: "" },
      { src: "assets/img/gallery/2026/library-group-small.jpg",           caption: "Students with Vidhyasagar Tyagi",       size: "wide" },
      { src: "assets/img/gallery/2026/library-group-large.jpg",           caption: "A focus group after the session",       size: "wide" }
    ],

    /* Speaker reflections. Leave empty to hide the block. */
    testimonials: [],

    /* Chapter: how the day closed. Background: the Conclave team on stage. */
    finale: {
      title: "The day closed. The conversations carry on.",
      text: "Club performances and the event closure brought the Assembly Hall together one last time, and the Conclave team gathered on stage. The evening carried on with the Student Excellence Showcase and games.",
      image: "assets/img/gallery/2026/conclave-team.jpg",
      takeaways: [
        { word: "Ideas",   text: "AI as the engine of India's next decade of growth" },
        { word: "Insight", text: "How CXOs across six sectors are putting AI to work" },
        { word: "Impact",  text: "Connections between future managers and today's leaders" }
      ]
    },

    next: {
      title: "See you at Conclave 2027",
      text: "Speak, partner or sponsor at the next edition of the BITSoM Business Conclave.",
      cta: { label: "Preview 2027", href: "?edition=2027" }
    }
  },

  /* ------------------------------------------------------------------ */
  "2027": {
    year: "2027",
    status: "coming-soon",
    message: "We're planning the next edition of the BITSoM Business Conclave. Watch this space for dates and speakers."
  }
};
