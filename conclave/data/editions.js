/*
 * BITSoM Business Conclave: all page content.
 *
 * The site has two views, both rendered from this file by assets/js/conclave.js:
 *
 *   index.html                    the upcoming edition (CONCLAVE_CURRENT, 2027)
 *   index.html?edition=past       Past Editions: 2026 above 2025, each with
 *                                 its theme, speakers and pictures
 *   index.html?edition=2026       same page, scrolled to that edition
 *
 * Every section is skipped when its data is empty, so content can be added
 * as it is confirmed. Things still to fill in are marked TODO.
 *
 * Speakers
 *   linkedin: full profile URL. Leave "" to show a greyed-out icon.
 *   featured: true to show the speaker under "Past Speakers" on the main
 *             page. Twelve are marked, one from each of the best-known
 *             organisations (three rows of four). Everyone appears on
 *             Past Editions.
 *   photo:    square portrait, at least 600 x 600 px, natural colour.
 *
 * Copy follows the BITSoM tone of voice: British English, active voice,
 * positive phrasing, and "BITSoM" always with a lowercase "o" (the page keeps
 * it lowercase inside capitals).
 */

window.CONCLAVE_CURRENT = "2027";

window.CONCLAVE_EDITIONS = {
  /* ================================================================== */
  /* 2027: the upcoming edition (main page)                              */
  /* ================================================================== */
  "2027": {
    year: "2027",
    status: "upcoming",
    date: "30 January 2027",
    dateISO: "2027-01-30",
    venue: "BITS School of Management, Mumbai",

    /* subtitle: the line under the chapter title. text: one line on the theme
       card. angles: the tiles beside it (without them, the previous themes are
       listed there instead). */
    theme: {
      title: "Business Unscripted: Hype, Hope and Hard Truths",
      subtitle: "Three conversations, one stage",
      text: "Leaders set the script aside to talk candidly about what is really moving business today, and what it takes to lead through it.",
      angles: [
        { title: "Hype",        text: "Telling the trends that will reshape business from the noise around them" },
        { title: "Hope",        text: "Where leaders see real opportunity: the bets, markets and talent worth backing" },
        { title: "Hard Truths", text: "Lessons learnt the hard way, shared openly with the managers who come next" }
      ]
    },

    /* Hero: company logos shown as a constellation (names must match a
       past speaker's org). The rest appear in the logo wall below. */
    constellation: ["Adobe", "Mastercard", "Mercedes-Benz", "PepsiCo", "Bloomberg", "Tata Play",
                    "Raymond", "Network18", "Abbott", "Kimberly-Clark", "Mondelēz International",
                    "Reliance Retail", "Dr. Reddy's", "JioStar"],

    /* Headline numbers. "auto:" values are counted from the past editions. */
    stats: [
      { value: "auto:speakers",      label: "Industry leaders" },
      { value: "auto:organisations", label: "Organisations" },
      { value: 350, suffix: "+",     label: "Future managers" } // TODO(confirm) cohort size from the decks
    ],

    about: {
      quote: "Not just an event. A legacy you build.",
      lead: "The BITSoM Business Conclave is our flagship industry forum. Each year, CXOs, founders and policymakers come to campus to discuss the challenges and opportunities shaping today's business landscape.",
      // {theme} is replaced by this year's theme title, in bold
      body: "First held in 2025, the Conclave returns for its third edition with a theme that asks leaders to drop the script: {theme}.",
      pillars: [
        { icon: "vision",   title: "Vision",   text: "A forum on the ideas shaping the next decade of business" },
        { icon: "purpose",  title: "Purpose",  text: "Real conversations between industry leaders and young talent" },
        { icon: "audience", title: "Audience", text: "CXOs, founders, faculty and BITSoM's future managers" },
        { icon: "impact",   title: "Impact",   text: "Partnerships between academia and industry that last beyond the day" }
      ]
    },

    /* A typical Conclave day: no times, photos from past editions */
    dayFlow: [
      { title: "Opening & Keynote",       icon: "mic",     image: "assets/img/gallery/2026/keynote.jpg",
        text: "The lamp is lit and a leader sets the agenda for the day." },
      { title: "Fireside Chats",          icon: "podcast", image: "assets/img/gallery/2026/fireside-rakesh-tiwary.jpg",
        text: "Unscripted one-on-one conversations on careers, choices and conviction." },
      { title: "Panel Discussions",       icon: "panel",   image: "assets/img/gallery/2026/panel-2.jpg",
        text: "Leaders from different industries debate the year's theme together." },
      { title: "Focus Groups",            icon: "huddle",  image: "assets/img/gallery/2026/focus-group-library.jpg",
        text: "Speakers sit down with small groups of students around one table." },
      { title: "Guest Speakers",          icon: "trophy",  image: "assets/img/gallery/2026/guest-dhanushkodi-sivanandhan.jpg",
        text: "Distinguished guests bring a view from beyond the boardroom." },
      { title: "Showcase & Networking",   icon: "tea",     image: "assets/img/gallery/2026/showcase-atrium.jpg",
        text: "Performances, the Student Excellence Showcase and conversations over high tea." }
    ],

    /* Confirmed 2027 speakers (same fields as past speakers). Once there are
       6 or more, they replace "Past Speakers" on this page, in rows of three. */
    speakers: [],

    /* Watch & Listen: appears once any link is filled in.
       youtube: a YouTube URL or the 11-character id.
       linkedin url: the post URL, or the code from "Embed this post". */
    media: {
      overview: { youtube: "", title: "Conclave 2026: the overview film" }, // TODO
      podcasts: {
        title: "Candid Conversations",
        items: [
          // TODO { youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX", title: "Episode title" }
        ]
      },
      linkedin: [
        // TODO { url: "https://www.linkedin.com/posts/...", title: "Conclave 2026 on LinkedIn" }
      ]
    },

    /* Speak & Partner: one card for speakers, one for partners. Interest goes
       straight to the vertical head (no forms): fill in contact.email and/or
       contact.whatsapp (international format, digits only, e.g. "919876543210");
       name is for reference only. Each card ends with an "Express interest"
       link and the WhatsApp logo, which link up once these are set; the hero's
       Speak / Partner buttons then open them in one click (until then they
       scroll to the cards).
       subject and message prefill the email and the WhatsApp chat. */
    involve: {
      speakers: {
        title: "Speak at the Conclave",
        points: [
          "Meet 350+ future managers headed into consulting, technology, FMCG and financial services",
          "Shape the conversation on Hype, Hope and Hard Truths",
          "Join a circle of CXOs and founders from across industries",
          "Go beyond the keynote: fireside chats, focus groups and podcasts",
          "Red-carpet hospitality: campus stay, travel support and a dedicated point of contact"
        ],
        contact: { name: "Yash Grover", email: "Yash.Grover2027@bitsom.edu.in", whatsapp: "919109485836" },
        subject: "Speaking at the BITSoM Business Conclave 2027",
        message: "Hello, I would like to express interest in speaking at the BITSoM Business Conclave 2027."
      },
      partners: {
        title: "Partner with the Conclave",
        points: [
          "Put your brand in front of the leaders on stage and the managers of tomorrow",
          "Visibility across campus branding, LED screens, social media and the after-movie",
          "Stalls for product demonstrations and live projects with BITSoM students",
          "Align your brand with BITS Pilani and the conversations shaping the next decade of business"
        ],
        contact: { name: "Yash Grover", email: "Yash.Grover2027@bitsom.edu.in", whatsapp: "919109485836" },
        subject: "Partnering with the BITSoM Business Conclave 2027",
        message: "Hello, I would like to express interest in partnering with the BITSoM Business Conclave 2027."
      }
    }
  },

  /* ================================================================== */
  /* 2026                                                                */
  /* ================================================================== */
  "2026": {
    year: "2026",
    status: "past",
    date: "14 March 2026",
    dateISO: "2026-03-14",
    venue: "BITS School of Management, Mumbai",
    theme: {
      kicker: "Reimagining Bharat",
      title: "AI-Powered Transformation & the Road to Global Leadership",
      text: "How does India turn AI into lasting global leadership? CXOs, founders and policymakers took on the question in keynotes, fireside chats and panels."
    },

    speakers: [
      {
        name: "Sanchit Suneja",
        role: "Executive Director & Group Chief Strategy Officer",
        org: "Motilal Oswal", logo: "assets/img/orgs/motilal-oswal.png",
        sector: "Financial Services", cxo: true,
        photo: "assets/img/speakers/sanchit-suneja.jpg",
        linkedin: "https://www.linkedin.com/in/sanchitsuneja/"
      },
      {
        name: "Dhanushkodi Sivanandhan",
        role: "Former Police Commissioner of Mumbai",
        org: "", logo: "",
        sector: "Public Service", cxo: false,
        photo: "assets/img/speakers/dhanushkodi-sivanandhan.jpg",
        linkedin: "https://www.linkedin.com/in/d-sivanandhan-2aa4a42bb/"
      },
      {
        name: "Sanchayan Paul",
        role: "Chief Human Resources Officer",
        org: "Network18", logo: "assets/img/orgs/network18.png",
        sector: "Media & Entertainment", cxo: true,
        photo: "assets/img/speakers/sanchayan-paul.jpg",
        linkedin: "https://www.linkedin.com/in/sanchayanpaul/",
        featured: true
      },
      {
        name: "Rakesh Tiwary",
        role: "Group Chief Financial Officer",
        org: "Raymond", logo: "assets/img/orgs/raymond.png",
        sector: "Retail & Lifestyle", cxo: true,
        photo: "assets/img/speakers/rakesh-tiwary.jpg",
        linkedin: "https://www.linkedin.com/in/rakessh-tiwary-60b004154/",
        featured: true
      },
      {
        name: "Dr. Monica Sood Bhatia",
        role: "Chief Executive Officer",
        org: "Exicon", logo: "assets/img/orgs/exicon.png",
        sector: "Healthcare & Pharma", cxo: true,
        photo: "assets/img/speakers/monica-sood-bhatia.jpg",
        linkedin: "https://www.linkedin.com/in/drmonicasoodbhatia/"
      },
      {
        name: "Neetu Ailsinghani",
        role: "Global KYC Compliance",
        org: "Bloomberg", logo: "assets/img/orgs/bloomberg.png",
        sector: "Financial Services", cxo: false,
        photo: "assets/img/speakers/neetu-ailsinghani.jpg",
        linkedin: "https://www.linkedin.com/in/neetu-ailsinghani-4117b3b/",
        featured: true
      },
      {
        name: "Sashidhar Velaga",
        role: "Associate Vice President",
        org: "Nykaa Fashion", logo: "assets/img/orgs/nykaa-fashion.png",
        sector: "Retail & Lifestyle", cxo: false,
        photo: "assets/img/speakers/sashidhar-velaga.jpg",
        linkedin: "https://www.linkedin.com/in/sashidhar-velaga-a0027264/"
      },
      {
        name: "Sambasivan G",
        role: "Chief Financial Officer",
        org: "Tata Play", logo: "assets/img/orgs/tata-play.png",
        sector: "Media & Entertainment", cxo: true,
        photo: "assets/img/speakers/sambasivan-g.jpg",
        linkedin: "https://www.linkedin.com/in/sambasivan-g-1950a712/",
        featured: true
      },
      {
        name: "Shirshendu Bhattacharya",
        role: "Group Lead DPEx – Institutional Markets",
        org: "Dr. Reddy's", logo: "assets/img/orgs/dr-reddys.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/shirshendu-bhattacharya.jpg",
        linkedin: "https://www.linkedin.com/in/bhattacharyashirshendu/",
        featured: true
      },
      {
        name: "Vidhyasagar Tyagi",
        role: "SVP & Head of Internal Audit",
        org: "Reliance Retail", logo: "assets/img/orgs/reliance-retail.png",
        sector: "Retail & Lifestyle", cxo: false,
        photo: "assets/img/speakers/vidyasagar-tyagi.jpg",
        linkedin: "https://www.linkedin.com/in/vidhyasagar-tyagi-85654a1a/",
        featured: true
      },
      {
        name: "Vivek Wadhwa",
        role: "Head – Organized Trade",
        org: "Marico", logo: "assets/img/orgs/marico.png",
        sector: "FMCG", cxo: false,
        photo: "assets/img/speakers/vivek-wadhwa.jpg",
        linkedin: "https://www.linkedin.com/in/vivekwadhwa09/"
      }
    ],

    /* size: "wide" | "tall" | "" (normal) | "full" (whole row, used for the team photo) */
    gallery: [
      { src: "assets/img/gallery/2026/panel-2.jpg"                      , caption: "The panel on India's AI economy", size: "wide" },
      { src: "assets/img/gallery/2026/keynote.jpg"                      , caption: "The keynote", size: "tall" },
      { src: "assets/img/gallery/2026/fireside-rakesh-tiwary.jpg"       , caption: "Fireside chat with Rakesh Tiwary", size: "" },
      { src: "assets/img/gallery/2026/fireside-sanchayan-paul.jpg"      , caption: "Fireside chat with Sanchayan Paul", size: "" },
      { src: "assets/img/gallery/2026/panel-2-closeup.jpg"              , caption: "Neetu Ailsinghani on the panel", size: "" },
      { src: "assets/img/gallery/2026/guest-dhanushkodi-sivanandhan.jpg", caption: "Dhanushkodi Sivanandhan in conversation", size: "wide" },
      { src: "assets/img/gallery/2026/focus-group-library.jpg"          , caption: "Focus group in the library", size: "tall" },
      { src: "assets/img/gallery/2026/focus-group-window.jpg"           , caption: "Round-table discussion", size: "" },
      { src: "assets/img/gallery/2026/focus-group-vidhyasagar-tyagi.jpg", caption: "Focus group with Vidhyasagar Tyagi", size: "" },
      { src: "assets/img/gallery/2026/showcase-atrium.jpg"              , caption: "Student Excellence Showcase", size: "wide" },
      { src: "assets/img/gallery/2026/showcase-speaker.jpg"             , caption: "Speakers meet the case champions", size: "" },
      { src: "assets/img/gallery/2026/library-group-small.jpg"          , caption: "Students with Vidhyasagar Tyagi", size: "wide" },
      { src: "assets/img/gallery/2026/library-group-large.jpg"          , caption: "A focus group after the session", size: "wide" },
      { src: "assets/img/gallery/2026/conclave-team.jpg", caption: "The Conclave 2026 organising team", size: "full" }
    ],

    testimonials: []
  },

  /* ================================================================== */
  /* 2025                                                                */
  /* ================================================================== */
  "2025": {
    year: "2025",
    status: "past",
    date: "7 February 2025",
    dateISO: "2025-02-07",
    venue: "BITS Pilani, Mumbai Campus",
    theme: {
      kicker: "Theme 2025",
      title: "Innovation Beyond Boundaries",
      text: "How can creativity and collaboration drive growth, redefine industry standards and shape the future of commerce and technology? Leaders from FMCG and FMCD, SaaS, IT and BFSI shared their answers."
    },

    speakers: [
      {
        name: "Raghavendra Purwar",
        role: "Associate Director – Manufacturing",
        org: "PepsiCo", logo: "assets/img/orgs/2025/raghavendra-purwar.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/raghavendra-purwar.jpg",
        linkedin: "https://www.linkedin.com/in/raghvendra-purwar-8396aa2b/",
        featured: true
      },
      {
        name: "Anoop Tiwari",
        role: "Lead – Regulatory Affairs & Compliance",
        org: "Mondelēz International", logo: "assets/img/orgs/2025/anoop-tiwari.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/anoop-tiwari.jpg",
        linkedin: "https://www.linkedin.com/in/anoop-tiwari-88b5142a/",
        featured: true
      },
      {
        name: "Payal Agrawaal",
        role: "Managing Director, India & South Asia",
        org: "Abbott", logo: "assets/img/orgs/2025/payal-agrawaal.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/2025/payal-agrawaal.jpg",
        linkedin: "https://www.linkedin.com/in/payal-agrawaal-b392187/"
      },
      {
        name: "Amol Peshattiwar",
        role: "Associate VP – Quality & Regulatory Compliance",
        org: "Hershey's", logo: "assets/img/orgs/2025/amol-peshattiwar.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/amol-peshattiwar.jpg",
        linkedin: ""
      },
      {
        name: "Sunil Nat",
        role: "Head – Digital Strategy & Ecommerce",
        org: "Galderma", logo: "assets/img/orgs/2025/sunil-nat.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/2025/sunil-nat.jpg",
        linkedin: "https://www.linkedin.com/in/sunilnat/"
      },
      {
        name: "Mohit Mahajan",
        role: "Associate VP",
        org: "Wendy's", logo: "assets/img/orgs/2025/mohit-mahajan.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/mohit-mahajan.jpg",
        linkedin: "https://www.linkedin.com/in/mohitmahajaniift/"
      },
      {
        name: "Anubhav Agarwal",
        role: "Director – Ecommerce",
        org: "Kimberly-Clark", logo: "assets/img/orgs/2025/anubhav-agarwal.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/anubhav-agarwal.jpg",
        linkedin: "https://www.linkedin.com/in/anubhav1606/"
      },
      {
        name: "Jitendra Chauhan",
        role: "National Head – Rural Business",
        org: "Crompton Greaves", logo: "assets/img/orgs/2025/jitendra-chauhan.png",
        sector: "Consumer Durables & Electronics", cxo: false,
        photo: "assets/img/speakers/2025/jitendra-chauhan.jpg",
        linkedin: ""
      },
      {
        name: "Midhula Devabhaktuni",
        role: "Co-founder & CMO",
        org: "Mivi", logo: "assets/img/orgs/2025/midhula-devabhaktuni.png",
        sector: "Consumer Durables & Electronics", cxo: true,
        photo: "assets/img/speakers/2025/midhula-devabhaktuni.jpg",
        linkedin: "https://www.linkedin.com/in/midhula-devabhaktuni-79b86b22/"
      },
      {
        name: "Nishant Agarwal",
        role: "Senior AD",
        org: "Kellanova", logo: "assets/img/orgs/2025/nishant-agarwal.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/nishant-agarwal.jpg",
        linkedin: "https://www.linkedin.com/in/nishant-agarwal-69b2a41a/"
      },
      {
        name: "VN Narayanan",
        role: "Founder",
        org: "strategii@work", logo: "assets/img/orgs/2025/vn-narayanan.png",
        sector: "Consulting", cxo: false,
        photo: "assets/img/speakers/2025/vn-narayanan.jpg",
        linkedin: "https://www.linkedin.com/in/vn-narayanan/"
      },
      {
        name: "Raghuraman R.",
        role: "Vice President",
        org: "Mercedes-Benz", logo: "assets/img/orgs/2025/raghuraman-r.png",
        sector: "Automotive", cxo: false,
        photo: "assets/img/speakers/2025/raghuraman-r.jpg",
        linkedin: "https://www.linkedin.com/in/raghuraman-ramamoorthy/",
        featured: true
      },
      {
        name: "Ravindra Soni",
        role: "Associate VP",
        org: "Hershey's", logo: "assets/img/orgs/2025/ravindra-soni.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/ravindra-soni.jpg",
        linkedin: ""
      },
      {
        name: "Anand Shrivatsava",
        role: "Director – Product",
        org: "Talkdesk", logo: "assets/img/orgs/2025/anand-shrivatsava.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/anand-shrivatsava.jpg",
        linkedin: "https://www.linkedin.com/in/anandshrivastava/"
      },
      {
        name: "Ranjan Mishra",
        role: "Chief Human Resources Officer",
        org: "Diebold Nixdorf", logo: "assets/img/orgs/2025/ranjan-mishra.png",
        sector: "Technology & SaaS", cxo: true,
        photo: "assets/img/speakers/2025/ranjan-mishra.jpg",
        linkedin: "https://www.linkedin.com/in/mrranjanmishra/"
      },
      {
        name: "Abhishek Shukla",
        role: "Group Product Manager",
        org: "Adobe", logo: "assets/img/orgs/2025/abhishek-shukla.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/abhishek-shukla.jpg",
        linkedin: "https://www.linkedin.com/in/abhishekshuklain/",
        featured: true
      },
      {
        name: "Naveen Chhabra",
        role: "Chief Revenue Officer",
        org: "Sify", logo: "assets/img/orgs/2025/naveen-chhabra.png",
        sector: "Technology & SaaS", cxo: true,
        photo: "assets/img/speakers/2025/naveen-chhabra.jpg",
        linkedin: ""
      },
      {
        name: "Sunil Patil",
        role: "Director – Head of PMO",
        org: "Mastercard", logo: "assets/img/orgs/2025/sunil-patil.png",
        sector: "Financial Services", cxo: false,
        photo: "assets/img/speakers/2025/sunil-patil.jpg",
        linkedin: "https://www.linkedin.com/in/sunilpatil05/",
        featured: true
      },
      {
        name: "Govind Maheshwari",
        role: "Director – Entertainment Business",
        org: "JioStar", logo: "assets/img/orgs/2025/govind-maheshwari.png",
        sector: "Media & Entertainment", cxo: false,
        photo: "assets/img/speakers/2025/govind-maheshwari.jpg",
        linkedin: "https://www.linkedin.com/in/govindmaheshwari/",
        featured: true
      },
      {
        name: "Ramya Venkatesh",
        role: "Director – Product",
        org: "Brightly", logo: "assets/img/orgs/2025/ramya-venkatesh.png",
        sector: "Technology & SaaS", cxo: false,
        photo: "assets/img/speakers/2025/ramya-venkatesh.jpg",
        linkedin: ""
      }
    ],

    gallery: [
      { src: "assets/img/gallery/2025/panel-stage.jpg"          , caption: "Panellists on the main stage", size: "wide" },
      { src: "assets/img/gallery/2025/keynote-podium.jpg"       , caption: "The keynote", size: "tall" },
      { src: "assets/img/gallery/2025/fireside-chat.jpg"        , caption: "A fireside conversation", size: "" },
      { src: "assets/img/gallery/2025/huddle-library.jpg"       , caption: "Breakout session in the library", size: "" },
      { src: "assets/img/gallery/2025/networking-corridor.jpg"  , caption: "Networking between sessions", size: "" },
      { src: "assets/img/gallery/2025/hallway-conversations.jpg", caption: "Conversations between sessions", size: "tall" },
      { src: "assets/img/gallery/2025/lamp-lighting.jpg"        , caption: "Lamp lighting to open the Conclave", size: "wide" },
      { src: "assets/img/gallery/2025/fireside-close.jpg"       , caption: "In conversation on stage", size: "" },
      { src: "assets/img/gallery/2025/panel-lineup.jpg"         , caption: "The panel line-up", size: "wide" },
      { src: "assets/img/gallery/2025/group-portrait.jpg"       , caption: "Speakers with the organising team", size: "wide" },
      { src: "assets/img/gallery/2025/closing-group.jpg", caption: "Speakers, students and the organising team", size: "full" }
    ],

    /* Verbatim from speakers' LinkedIn posts; shown on the 2027 page */
    testimonials: [
      {
        name: "Abhishek Shukla", role: "Group Product Manager, Adobe",
        photo: "assets/img/speakers/2025/abhishek-shukla.jpg",
        quote: "From the moment I took my flight to Mumbai to the time I returned home, the entire experience was seamless. The hospitality and organization by the student-led team was truly commendable."
      },
      {
        name: "Raghuraman R.", role: "Vice President, Mercedes-Benz",
        photo: "assets/img/speakers/2025/raghuraman-r.jpg",
        quote: "Excellent topic and a wonderfully organised event. Enjoyed the immersive interactions and the college campus vibes. Thanks folks"
      },
      {
        name: "Ramya Venkatesh", role: "Director – Product, Brightly",
        photo: "assets/img/speakers/2025/ramya-venkatesh.jpg",
        quote: "Grateful for the invitation to speak on my fav topic AI. Thank you for the warm welcome! The campus energy is truly contagious."
      }
    ]
  }
};
