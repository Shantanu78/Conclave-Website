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
    status: "coming-soon",
    message: "We're putting together the story of Conclave 2025. Check back soon."
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

    /* Chapter: how the day unfolded. Times are from the run-of-show deck. */
    timeline: [ // TODO(confirm): times and order against the actual day
      {
        time: "10:00 AM",
        title: "Keynote Address",
        text: "The day opened with a keynote on ambition and reinvention in the age of AI.",
        icon: "mic",
        image: "assets/img/gallery/keynote-podium.jpg"
      },
      {
        time: "11:30 AM",
        title: "Panel Discussions",
        text: "Women-led and mixed panels across industries on the future of business in India.",
        icon: "panel",
        image: "assets/img/gallery/panel-stage.jpg"
      },
      {
        time: "12:45 PM",
        title: "Minds in Motion",
        text: "Focus-group huddles where students and speakers dug into niche business problems.",
        icon: "huddle",
        image: "assets/img/gallery/huddle-library.jpg"
      },
      {
        time: "02:00 PM",
        title: "Speaker Unplugged",
        text: "A student-moderated podcast with stories of building, failing and starting again.",
        icon: "podcast",
        image: "assets/img/gallery/fireside-chat.jpg"
      },
      {
        time: "03:30 PM",
        title: "The Pitch Challenge",
        text: "A surprise activity to break the ice between students and speakers.",
        icon: "trophy",
        image: "assets/img/gallery/hallway-conversations.jpg"
      },
      {
        time: "04:30 PM",
        title: "High Tea & Networking",
        text: "Speakers and students kept the conversation going over high tea.",
        icon: "tea",
        image: "assets/img/gallery/networking-corridor.jpg"
      }
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
        name: "Vidyasagar Tyagi",
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

    /*
     * Gallery. TODO(confirm): these are PLACEHOLDER photos from the 2025
     * edition (the stage backdrop reads "Innovation Beyond Boundaries").
     * Replace them with 2026 photos before going live.
     * size: "wide" | "tall" | "" (normal)
     */
    gallery: [
      // Order and sizes are chosen so the grid fills evenly at 4 and 2 columns.
      { src: "assets/img/gallery/panel-stage.jpg",           caption: "Panellists on the main stage",       size: "wide" },
      { src: "assets/img/gallery/keynote-podium.jpg",        caption: "The keynote",                        size: "tall" },
      { src: "assets/img/gallery/fireside-chat.jpg",         caption: "A fireside conversation",            size: "" },
      { src: "assets/img/gallery/huddle-library.jpg",        caption: "Minds in Motion huddles",            size: "" },
      { src: "assets/img/gallery/networking-corridor.jpg",   caption: "Networking over high tea",           size: "" },
      { src: "assets/img/gallery/hallway-conversations.jpg", caption: "Conversations between sessions",     size: "tall" },
      { src: "assets/img/gallery/lamp-lighting.jpg",         caption: "Lamp lighting to open the day",      size: "wide" },
      { src: "assets/img/gallery/fireside-close.jpg",        caption: "Speaker Unplugged",                  size: "" },
      { src: "assets/img/gallery/panel-lineup.jpg",          caption: "The panel line-up",                  size: "wide" },
      { src: "assets/img/gallery/group-portrait.jpg",        caption: "Speakers with the organising team",  size: "wide" }
    ],

    /* Speaker reflections. Leave empty to hide the block. */
    testimonials: [],

    /* Chapter: how the day closed */
    finale: {
      title: "The day closed. The conversations carry on.",
      text: "The Conclave closed with high tea and a group photograph on the main stage. Speakers and students left with new contacts, sharper questions and a clearer view of India's AI decade.",
      image: "assets/img/gallery/closing-group.jpg", // TODO(confirm): 2025 placeholder photo
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
