// ---------------------------------------------------------------------------
// Church information used throughout the site. Edit freely to match your
// actual details. Values marked TODO are placeholder examples — please
// replace them before launch.
// ---------------------------------------------------------------------------

export const siteConfig = {
  churchName: "Southern Illinois Church",
  orgName: "Life Word Mission U.S. Conference",
  tagline: "United in the Word of Life",
  url: "https://jbch.sibc.org",

  address: {
    line1: "4 Phillips Dr",
    line2: "Fairview Heights, IL 62208",
    full: "4 Phillips Dr, Fairview Heights, IL 62208",
    mapsQuery: "4+Phillips+Dr+Fairview+Heights+IL+62208",
  },

  // TODO: replace with your real contact details.
  contact: {
    phone: "(618) 555-0123",
    email: "info@jbch.sibc.org",
  },

  // TODO: replace with your actual service times.
  services: [
    {
      name: "Sunday Worship",
      time: "11:00 AM",
      day: "Every Sunday",
      desc: "Our main Sunday service, where the whole congregation gathers to worship together.",
    },
    {
      name: "Sunday School",
      time: "9:30 AM",
      day: "Every Sunday",
      desc: "Bible teaching for the next generation, organized by age group.",
    },
    {
      name: "Wednesday Service",
      time: "7:30 PM",
      day: "Every Wednesday",
      desc: "A midweek time to be renewed in the Word.",
    },
    {
      name: "Friday Prayer",
      time: "8:00 PM",
      day: "Every Friday",
      desc: "Gathering together for earnest, united prayer.",
    },
  ],

  ministries: [
    {
      title: "Nursery & Preschool",
      desc: "Where our youngest members first encounter God's love.",
    },
    {
      title: "Children's Ministry",
      desc: "Building a foundation of faith through the Word and worship.",
    },
    {
      title: "Youth Ministry",
      desc: "A community for teens growing into their identity in Christ.",
    },
    {
      title: "Young Adults",
      desc: "A community of young adults growing together as the next generation of leaders.",
    },
    {
      title: "Adult Ministry & Cell Groups",
      desc: "Small groups building one another up through the Word and fellowship.",
    },
    {
      title: "Missions",
      desc: "Carrying the Word of Life to the ends of the earth.",
    },
  ],

  // TODO: replace with your actual seminar date and details.
  seminar: {
    title: "Bible Seminar",
    subtitle: "Bible Seminar",
    dateLabel: "Date to be announced",
    timeLabel: "",
    location: "Southern Illinois Church, Main Sanctuary",
    description:
      "You're invited to join us for a Bible Seminar — a time to learn and grow in the Word together. Fill out the form below and we'll follow up to confirm your spot.",
  },

  verse: {
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    ref: "John 1:1",
  },
} as const;

export type SiteConfig = typeof siteConfig;
