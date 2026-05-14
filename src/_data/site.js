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
      description: "Simple, reliable decisions for everyday kitchen products — from prep tools to countertop appliances.",
      shortDescription: "Countertop appliances, prep tools, and kitchen upgrades that are easy to overthink.",
      eyebrow: "Everyday kitchen decisions"
    },
    {
      title: "Home Essentials",
      slug: "home-essentials",
      url: "/home-essentials/",
      description: "Clear decisions for practical home products where reliability, maintenance, and daily usability matter.",
      shortDescription: "Practical home products where reliability, upkeep, and daily use matter most.",
      eyebrow: "Reliable home upgrades"
    },
    {
      title: "Personal Care",
      slug: "personal-care",
      url: "/personal-care/",
      description: "Personal care product decisions that avoid premium gimmicks and focus on daily results, usability, and value.",
      shortDescription: "Personal care tools where the right pick beats app features, gimmicks, and luxury markup.",
      eyebrow: "Better daily routines"
    }
  ],
  homepage: {
    featuredLimit: 8,
    categoryPreviewLimit: 4,
    latestLimit: 6
  }
};
