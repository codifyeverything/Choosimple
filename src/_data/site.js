module.exports = {
  name: "Choosimple",
  url: "https://choosimple.com",
  tagline: "One clear decision.",
  description: "Choosimple helps you find the best product for your situation with one clear pick per category. No top-10 lists. Just the right answer and the proof behind it.",
  ogImage: "/og-image.png",
  categoryGroups: [
    {
      title: "Kitchen",
      slug: "kitchen",
      url: "/kitchen/",
      description: "Reliable picks for the kitchen products people compare most — from countertop appliances to everyday prep tools.",
      shortDescription: "Countertop appliances, prep tools, and kitchen upgrades worth getting right.",
      eyebrow: "Kitchen"
    },
    {
      title: "Home Essentials",
      slug: "home-essentials",
      url: "/home-essentials/",
      description: "Clear picks for practical home products where reliability, upkeep, and daily use matter most.",
      shortDescription: "Everyday home products where reliability, upkeep, and ease of use matter most.",
      eyebrow: "Home"
    },
    {
      title: "Personal Care",
      slug: "personal-care",
      url: "/personal-care/",
      description: "Straightforward picks for daily-use products where performance, comfort, and reliability matter more than gimmicks.",
      shortDescription: "Daily-use tools where performance, comfort, and reliability matter most.",
      eyebrow: "Personal Care"
    }
  ],
  homepage: {
    featuredLimit: 8,
    categoryPreviewLimit: 4,
    latestLimit: 6
  }
};
