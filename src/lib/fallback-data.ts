/**
 * Fallback dummy data — used while WordPress is not yet connected.
 * Once WORDPRESS_API_URL is set in .env.local, live WordPress
 * content automatically replaces everything here.
 */

import type {
  WPPost, WPService, WPTeamMember, WPClient,
  WPIndustry, WPProcessStep, WPSiteSettings, WPValue,
} from "./wordpress";

/* ─── Site-wide settings ─────────────────── */
export const FALLBACK_SETTINGS: WPSiteSettings = {
  heroTypewriterWords: ["inspire", "convert", "captivate", "grow you"],
  heroSubtitle: "A modern marketing and web agency crafting premium digital solutions for ambitious brands.",
  heroVideoUrl: "/video1277478768.mp4",
  manifestoText: "From concept to launch we deliver comprehensive digital solutions — tailored precisely to your needs and built to outperform.",
  availableBadgeText: "Available for new projects",
  aboutImageUrl: "",
  aboutStory: [
    "Founded in Dallas, Texas, Lavashing was born from a simple belief: that great digital experiences can transform businesses and inspire people.",
    "Over the past decade, we've grown from a small team of passionate creators into a full-service agency serving clients across the United States. But our core mission remains the same — to create work that's both beautiful and effective.",
    "We're not just another agency. We're your strategic partner, invested in your success and committed to delivering results that actually move the needle.",
  ],
  footerTagline: "Dallas-based marketing and web agency serving clients nationwide.",
  contactEmail: "hello@lavashing.com",
  contactPhone: "(469) 555-1234",
  contactAddress: "Dallas, TX",
  socialLinkedin: "https://linkedin.com",
  socialTiktok: "https://tiktok.com",
  socialInstagram: "https://instagram.com",
};

/* ─── Blog posts ─────────────────────────── */
export const FALLBACK_POSTS: WPPost[] = [
  {
    slug: "future-of-web-design",
    title: "The Future of Web Design: Trends to Watch in 2026",
    excerpt: "Explore the emerging design trends shaping the digital landscape and how to apply them to your brand.",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "Design",
    imageGradient: "from-[#670626] to-[#6b8d6d]",
    author: "Michael Chen",
    authorRole: "Creative Director",
    content: [
      "The digital landscape is constantly evolving, and staying ahead of design trends is crucial for creating websites that resonate with modern audiences. As we navigate through 2026, several key trends are shaping the future of web design.",
      "Minimalism continues to dominate, but with a twist. We're seeing designers embrace 'warm minimalism' — clean layouts enhanced with subtle textures, organic shapes, and warmer color palettes that create more inviting digital experiences.",
      "Interactive 3D elements are becoming more accessible and performant. With improved browser capabilities and tools, designers can now incorporate immersive 3D graphics without sacrificing load times or user experience.",
      "Accessibility is no longer optional. Modern web design prioritizes inclusive experiences, ensuring websites work seamlessly for users of all abilities.",
      "The rise of AI-powered personalization is transforming how users interact with websites. Dynamic content that adapts to user preferences and behavior creates more engaging, relevant experiences.",
    ],
  },
  {
    slug: "branding-success-stories",
    title: "Branding Success Stories: How We Transformed 5 Brands",
    excerpt: "A deep dive into our most successful branding projects and the strategies that made them work.",
    date: "March 15, 2026", readTime: "8 min read", category: "Branding",
    imageGradient: "from-[#6b8d6d] to-[#bad797]", author: "Sarah Johnson", authorRole: "Founder & CEO",
    content: ["Branding is more than a logo. It's the entire perception your audience holds of your business — and we've seen first-hand how a strategic rebrand can completely transform a company's trajectory."],
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization: A Complete Guide",
    excerpt: "Learn how to make your website faster and more efficient with our comprehensive optimization guide.",
    date: "March 10, 2026", readTime: "10 min read", category: "Development",
    imageGradient: "from-[#670626] to-[#bad797]", author: "David Park", authorRole: "Lead Developer",
    content: ["Page speed is not just a nice-to-have — it directly impacts your search ranking, bounce rate, and conversion rate."],
  },
  {
    slug: "marketing-strategies-2026",
    title: "Digital Marketing Strategies That Work in 2026",
    excerpt: "Discover the marketing tactics driving results for our clients and how to implement them in your business.",
    date: "March 5, 2026", readTime: "6 min read", category: "Marketing",
    imageGradient: "from-[#bad797] to-[#6b8d6d]", author: "Emily Rodriguez", authorRole: "Head of Strategy",
    content: ["The digital marketing landscape has shifted dramatically. What worked three years ago may now be actively hurting your brand."],
  },
  {
    slug: "user-experience-best-practices",
    title: "User Experience Best Practices for Modern Websites",
    excerpt: "Essential UX principles every website should follow to create exceptional user experiences.",
    date: "February 28, 2026", readTime: "7 min read", category: "Design",
    imageGradient: "from-[#bad797] to-[#670626]", author: "Michael Chen", authorRole: "Creative Director",
    content: ["Great UX is invisible. When done right, users never notice the design — they just effortlessly accomplish what they came to do."],
  },
  {
    slug: "choosing-tech-stack",
    title: "Choosing the Right Tech Stack for Your Web Project",
    excerpt: "A guide to selecting the best technologies for your website or web application.",
    date: "February 20, 2026", readTime: "9 min read", category: "Development",
    imageGradient: "from-[#6b8d6d] to-[#670626]", author: "David Park", authorRole: "Lead Developer",
    content: ["Picking a tech stack is one of the most consequential decisions in any web project. Get it wrong and you'll be paying the cost for years."],
  },
];

/* ─── Services ───────────────────────────── */
export const FALLBACK_SERVICES: WPService[] = [
  { title: "Web Development", description: "Fast, responsive websites engineered for performance, mobile-first design, and AI search visibility.", features: ["Responsive Design", "Performance Optimization", "CMS Integration", "E-commerce Solutions", "API Integration", "PWA"] },
  { title: "App Development", description: "Custom mobile and web apps from concept to launch — intuitive, scalable, and built to perform.", features: ["iOS & Android", "Web Apps", "UX Design", "API Integration", "Testing", "Launch Support"] },
  { title: "Web Design", description: "Visually striking, user-friendly designs that bring your brand to life on every screen.", features: ["UI/UX Design", "Prototyping", "Design Systems", "Brand Guidelines", "User Research", "Accessibility"] },
  { title: "Branding", description: "Visual identity, strategy, voice, and messaging — built to stand out in human and AI discovery.", features: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Messaging", "Packaging", "Positioning"] },
  { title: "Marketing", description: "Creative campaigns and data-driven strategy designed to grow your audience and drive results.", features: ["SEO & SEM", "Social Media", "Content Marketing", "Email Campaigns", "Analytics", "Paid Ads"] },
  { title: "Social Media Management", description: "Strategy-first management keeping your brand active and visible where your audience spends time.", features: ["Content Calendar", "Community Management", "Growth Strategy", "Reporting", "Paid Social", "Influencer"] },
  { title: "Content Creation", description: "SEO and AISO-optimized content built to rank, resonate, and get cited by AI tools.", features: ["Blog Writing", "Copywriting", "Video Scripts", "Social Copy", "Email Content", "AI-Optimized"] },
  { title: "Graphic Design", description: "Scroll-stopping visuals — from social graphics to pitch decks — on-brand and built for engagement.", features: ["Social Graphics", "Print Design", "Pitch Decks", "Infographics", "Illustrations", "Packaging"] },
  { title: "Search Engine Optimization (SEO)", description: "Technical audits, keyword strategy, and content alignment to rank higher and convert more.", features: ["Technical SEO", "Keyword Research", "On-Page SEO", "Link Building", "Local SEO", "Reporting"] },
  { title: "AI SEO (AISO) / GEO", description: "Making your brand discoverable and recommended by ChatGPT, Perplexity, and Google AI Overviews.", features: ["AI Content Structuring", "Entity Optimization", "Citation Building", "GEO Strategy", "Schema Markup", "AI Visibility"] },
  { title: "Digital Campaign Planning", description: "Multi-channel campaigns from audience research to performance tracking — built to maximize impact.", features: ["Campaign Strategy", "Audience Research", "Channel Planning", "Creative Direction", "A/B Testing", "Analytics"] },
  { title: "Creative Consulting", description: "Strategic creative direction — positioning, ideation, and visual direction for brands ready to grow.", features: ["Brand Positioning", "Creative Strategy", "Visual Direction", "Messaging", "Workshops", "Competitive Analysis"] },
];

/* ─── Industries ─────────────────────────── */
export const FALLBACK_INDUSTRIES: WPIndustry[] = [
  { title: "Restaurants & Food Service", description: "", clientCount: 0 },
  { title: "Construction & Home Services", description: "", clientCount: 0 },
  { title: "Beauty & Wellness", description: "", clientCount: 0 },
  { title: "Retail & E-commerce", description: "", clientCount: 0 },
  { title: "Professional Services", description: "", clientCount: 0 },
  { title: "Real Estate", description: "", clientCount: 0 },
  { title: "Healthcare & Medical", description: "", clientCount: 0 },
  { title: "Technology & SaaS", description: "", clientCount: 0 },
  { title: "Events & Entertainment", description: "", clientCount: 0 },
  { title: "Photography & Creative", description: "", clientCount: 0 },
  { title: "Legal & Consulting", description: "", clientCount: 0 },
  { title: "Education & Coaching", description: "", clientCount: 0 },
];

/* ─── Process steps ──────────────────────── */
export const FALLBACK_PROCESS: WPProcessStep[] = [
  { title: "Discovery", description: "Your business. Your goals. Your audience. Your competition. Everything gets studied before anything gets built." },
  { title: "Strategy", description: "A clear, data-driven roadmap with real milestones and measurable outcomes. No guesswork. No filler tactics." },
  { title: "Design", description: "Experiences that look and feel like your brand — not a template. Functional. Beautiful. Impossible to ignore." },
  { title: "Build", description: "Clean, fast, scalable. Every detail built in-house with the precision and care of a team that treats your business like its own." },
  { title: "Launch", description: "Going live is just step one. Ongoing support, optimization, and performance tracking keep the momentum going — because growth doesn't stop at launch." },
];

/* ─── Team members ───────────────────────── */
export const FALLBACK_TEAM: WPTeamMember[] = [
  { name: "Sarah Johnson", role: "Founder & CEO", funFact: "Pitched our first client from a coffee shop with no WiFi ☕", color: "from-[#670626] to-[#6b8d6d]" },
  { name: "Michael Chen", role: "Creative Director", funFact: "Has redesigned his home office 4 times this year 🎨", color: "from-[#6b8d6d] to-[#bad797]" },
  { name: "Emily Rodriguez", role: "Head of Strategy", funFact: "Reads one marketing book every two weeks 📚", color: "from-[#670626] to-[#bad797]" },
  { name: "David Park", role: "Lead Developer", funFact: "Built his first website at age 11 for his hamster 🐹", color: "from-[#bad797] to-[#6b8d6d]" },
];

/* ─── Values ─────────────────────────────── */
export const FALLBACK_VALUES: WPValue[] = [
  { title: "Purpose-Driven", description: "We believe in creating work that matters and makes a real impact. Every pixel, every line of copy, every campaign — intentional and meaningful." },
  { title: "Collaborative", description: "Your success is our success. We work as partners, not just vendors. That means transparency, honest feedback, and shared wins." },
  { title: "Excellence", description: "We hold ourselves to the highest standards in everything we do — from strategic thinking to micro-interactions." },
  { title: "Growth-Focused", description: "We're committed to continuous improvement. We study trends, test ideas, and iterate — so your brand stays ahead." },
];

/* ─── Clients ────────────────────────────── */
export const FALLBACK_CLIENTS: WPClient[] = [
  { name: "One Bite", logoUrl: "/onebite.png" },
  { name: "SS Towing", logoUrl: "/ss-towing.png" },
  { name: "Super Towing", logoUrl: "/super-towing.png" },
  { name: "One Coffee", logoUrl: "/one-coffee.png" },
  { name: "One Smoothie", logoUrl: "/one-smoothie.png" },
  { name: "Aj's Chicken", logoUrl: "/ajs-chicken.png" },
  { name: "Shimaa", logoUrl: "/shimaa.png" },
  { name: "WJ Place", logoUrl: "/wj-tires.png" },
  { name: "Lune Cafe", logoUrl: "/lune.png" },
  { name: "State Protection Service", logoUrl: "/state-protection-service.png" },
];
