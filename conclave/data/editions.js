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
    date: "",    // TODO e.g. "13 February 2027"; empty shows "Date to be announced"
    dateISO: "",
    venue: "BITS School of Management, Mumbai",

    // text: optional one-line description shown on the theme card
    theme: {
      title: "Business Unscripted: Hype, Hope and Hard Truths",
      text: ""
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
      { value: "auto:editions",      label: "Editions" },
      { value: 350, suffix: "+",     label: "Future managers" } // TODO(confirm) cohort size from the decks
    ],

    about: {
      quote: "Not just an event. A legacy you build.",
      lead: "The BITSoM Business Conclave is where ideas meet action. It is our flagship stage, bringing industry trailblazers, thought leaders and innovators to campus.",
      body: "Each edition takes on one defining question for Indian business. CXOs, founders and policymakers answer it in keynotes, fireside chats and panels, then sit down with 350+ future managers in small groups.",
      pillars: [
        { icon: "vision",   title: "Vision",   text: "A forum on the ideas shaping India's next decade of business" },
        { icon: "purpose",  title: "Purpose",  text: "A platform where leaders and young talent redefine industries" },
        { icon: "audience", title: "Audience", text: "CXOs, founders, faculty and 350+ future managers" },
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
        text: "Leaders from different industries take on the year's big question together." },
      { title: "Focus Groups",            icon: "huddle",  image: "assets/img/gallery/2026/focus-group-library.jpg",
        text: "Speakers sit down with small groups of students around one table." },
      { title: "Guest Speaker",           icon: "trophy",  image: "assets/img/gallery/2026/guest-dhanushkodi-sivanandhan.jpg",
        text: "A distinguished guest brings a view from beyond the boardroom." },
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

    /* Get involved: one card for speakers, one for partners.
       TODO: cta.href, e.g. "mailto:conclave@bitsom.edu.in"; the button
       appears once it is filled in. */
    involve: {
      speakers: {
        title: "Speak at Conclave 2027",
        points: [
          "Meet 350+ future managers headed into consulting, technology, FMCG and financial services",
          "Lead the conversation on the year's defining business question",
          "Join a circle of CXOs and founders from across industries",
          "Go beyond the keynote: fireside chats, focus groups and podcasts",
          "Red-carpet hospitality: campus stay, travel support and a dedicated point of contact"
        ],
        cta: { label: "Express interest", href: "" }
      },
      partners: {
        title: "Partner with Conclave 2027",
        points: [
          "Put your brand in front of 350+ future managers and the leaders on stage",
          "Visibility across campus branding, LED screens, social media and the after-movie",
          "Stalls for product demonstrations and live projects with BITSoM students",
          "Align your brand with BITS Pilani and the conversations shaping Indian business"
        ],
        cta: { label: "Become a partner", href: "" }
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
        linkedin: ""
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
        linkedin: "https://www.linkedin.com/in/sanchayanpaul/"
      },
      {
        name: "Rakesh Tiwary",
        role: "Group Chief Financial Officer",
        org: "Raymond", logo: "assets/img/orgs/raymond.png",
        sector: "Retail & Lifestyle", cxo: true,
        photo: "assets/img/speakers/rakesh-tiwary.jpg",
        linkedin: "https://www.linkedin.com/in/rakessh-tiwary-60b004154/"
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
        linkedin: ""
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
        linkedin: ""
      },
      {
        name: "Shirshendu Bhattacharya",
        role: "Group Lead DPEx – Institutional Markets",
        org: "Dr. Reddy's", logo: "assets/img/orgs/dr-reddys.png",
        sector: "Healthcare & Pharma", cxo: false,
        photo: "assets/img/speakers/shirshendu-bhattacharya.jpg",
        linkedin: ""
      },
      {
        name: "Vidhyasagar Tyagi",
        role: "SVP & Head of Internal Audit",
        org: "Reliance Retail", logo: "assets/img/orgs/reliance-retail.png",
        sector: "Retail & Lifestyle", cxo: false,
        photo: "assets/img/speakers/vidyasagar-tyagi.jpg",
        linkedin: "https://www.linkedin.com/in/vidhyasagar-tyagi-85654a1a/"
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
      { src: "assets/img/gallery/2026/panel-2.jpg"                      , caption: "Panel 2: India's AI economy", size: "wide" },
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
      text: "Harnessing creativity and collaboration to drive business growth, redefine industry standards and shape the future of commerce and technology, across FMCG and FMCD, and SaaS, IT and BFSI."
    },

    speakers: [
      {
        name: "Raghavendra Purwar",
        role: "Associate Director – Manufacturing",
        org: "PepsiCo", logo: "assets/img/orgs/2025/raghavendra-purwar.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/raghavendra-purwar.jpg",
        linkedin: ""
      },
      {
        name: "Anoop Tiwari",
        role: "Lead – Regulatory Affairs & Compliance",
        org: "Mondelēz International", logo: "assets/img/orgs/2025/anoop-tiwari.png",
        sector: "FMCG & Food", cxo: false,
        photo: "assets/img/speakers/2025/anoop-tiwari.jpg",
        linkedin: "https://www.linkedin.com/in/anoop-tiwari-88b5142a/"
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
        linkedin: ""
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
        linkedin: ""
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
        linkedin: ""
      },
      {
        name: "Govind Maheshwari",
        role: "Director – Entertainment Business",
        org: "JioStar", logo: "assets/img/orgs/2025/govind-maheshwari.png",
        sector: "Media & Entertainment", cxo: false,
        photo: "assets/img/speakers/2025/govind-maheshwari.jpg",
        linkedin: "https://www.linkedin.com/in/govindmaheshwari/"
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
