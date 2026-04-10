/**
 * Fallback dummy data — used while WordPress is not yet connected.
 * Once WORDPRESS_API_URL is set in .env.local, live WordPress
 * content automatically replaces everything here.
 */

import type {
  WPPost, WPService, WPTeamMember, WPClient,
  WPIndustry, WPProcessStep, WPSiteSettings,
} from "./wordpress";

/* ─── Site-wide settings ─────────────────── */
export const FALLBACK_SETTINGS: WPSiteSettings = {
  heroTypewriterWords: ["inspire", "convert", "captivate", "grow you"],
  heroSubtitle: "A modern marketing and web agency crafting premium digital solutions for ambitious brands.",
  heroVideoUrl: "https://cdn.coverr.co/videos/coverr-gradient-wave-3d-animation-9948/1080p.mp4",
  manifestoText: "From concept to launch we deliver comprehensive digital solutions — tailored precisely to your needs and built to outperform.",
  availableBadgeText: "Available for new projects",
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
    imageGradient: "from-blue-500 to-purple-500",
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
    imageGradient: "from-purple-500 to-pink-500", author: "Sarah Johnson", authorRole: "Founder & CEO",
    content: ["Branding is more than a logo. It's the entire perception your audience holds of your business — and we've seen first-hand how a strategic rebrand can completely transform a company's trajectory."],
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization: A Complete Guide",
    excerpt: "Learn how to make your website faster and more efficient with our comprehensive optimization guide.",
    date: "March 10, 2026", readTime: "10 min read", category: "Development",
    imageGradient: "from-pink-500 to-orange-500", author: "David Park", authorRole: "Lead Developer",
    content: ["Page speed is not just a nice-to-have — it directly impacts your search ranking, bounce rate, and conversion rate."],
  },
  {
    slug: "marketing-strategies-2026",
    title: "Digital Marketing Strategies That Work in 2026",
    excerpt: "Discover the marketing tactics driving results for our clients and how to implement them in your business.",
    date: "March 5, 2026", readTime: "6 min read", category: "Marketing",
    imageGradient: "from-orange-500 to-yellow-500", author: "Emily Rodriguez", authorRole: "Head of Strategy",
    content: ["The digital marketing landscape has shifted dramatically. What worked three years ago may now be actively hurting your brand."],
  },
  {
    slug: "user-experience-best-practices",
    title: "User Experience Best Practices for Modern Websites",
    excerpt: "Essential UX principles every website should follow to create exceptional user experiences.",
    date: "February 28, 2026", readTime: "7 min read", category: "Design",
    imageGradient: "from-yellow-500 to-green-500", author: "Michael Chen", authorRole: "Creative Director",
    content: ["Great UX is invisible. When done right, users never notice the design — they just effortlessly accomplish what they came to do."],
  },
  {
    slug: "choosing-tech-stack",
    title: "Choosing the Right Tech Stack for Your Web Project",
    excerpt: "A guide to selecting the best technologies for your website or web application.",
    date: "February 20, 2026", readTime: "9 min read", category: "Development",
    imageGradient: "from-green-500 to-teal-500", author: "David Park", authorRole: "Lead Developer",
    content: ["Picking a tech stack is one of the most consequential decisions in any web project. Get it wrong and you'll be paying the cost for years."],
  },
];

/* ─── Services ───────────────────────────── */
export const FALLBACK_SERVICES: WPService[] = [
  { title: "Web Development", description: "Custom websites and web applications built with modern technologies.", features: ["Responsive Design", "Performance Optimization", "CMS Integration", "E-commerce Solutions", "API Integration", "PWA"] },
  { title: "Web Design", description: "Beautiful, user-centered designs that engage and drive conversions.", features: ["UI/UX Design", "Prototyping", "Design Systems", "Brand Guidelines", "User Research", "Accessibility"] },
  { title: "Branding", description: "Comprehensive brand identity development that makes your business memorable.", features: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Messaging", "Packaging", "Positioning"] },
  { title: "Marketing", description: "Data-driven strategies that grow your audience and increase ROI.", features: ["SEO & SEM", "Social Media", "Content Marketing", "Email Campaigns", "Analytics", "Paid Ads"] },
  { title: "Strategy", description: "Strategic planning and consulting to achieve your business goals.", features: ["Digital Strategy", "Market Research", "Competitor Analysis", "Growth Planning", "Transformation", "Consulting"] },
];

/* ─── Industries ─────────────────────────── */
export const FALLBACK_INDUSTRIES: WPIndustry[] = [
  { title: "E-commerce & Retail", description: "Helping online and brick-and-mortar retailers create seamless shopping experiences that convert and delight.", clientCount: 34 },
  { title: "Healthcare & Wellness", description: "Supporting healthcare providers with compliant, user-friendly digital solutions that build patient trust.", clientCount: 18 },
  { title: "Education", description: "Empowering educational institutions and edtech companies to reach learners in engaging, accessible ways.", clientCount: 12 },
  { title: "Real Estate", description: "Creating powerful digital tools for real estate agencies — from listing platforms to lead generation engines.", clientCount: 22 },
  { title: "Food & Beverage", description: "Crafting appetizing digital experiences for restaurants, food brands, and hospitality businesses.", clientCount: 15 },
  { title: "Professional Services", description: "Building credibility and trust for consultants, agencies, and service providers through polished digital presence.", clientCount: 28 },
];

/* ─── Process steps ──────────────────────── */
export const FALLBACK_PROCESS: WPProcessStep[] = [
  { title: "Discovery", description: "We dig deep into your business, goals, audience, and competitive landscape." },
  { title: "Strategy", description: "We develop a comprehensive plan with clear milestones and measurable outcomes." },
  { title: "Design", description: "Our creatives craft experiences that feel uniquely yours — functional and beautiful." },
  { title: "Build", description: "We build with precision — performant, accessible, and built to scale." },
  { title: "Launch", description: "Smooth deployment, then ongoing support so you never feel abandoned." },
];

/* ─── Team members ───────────────────────── */
export const FALLBACK_TEAM: WPTeamMember[] = [
  { name: "Sarah Johnson", role: "Founder & CEO", funFact: "Pitched our first client from a coffee shop with no WiFi ☕", color: "from-blue-500 to-purple-500" },
  { name: "Michael Chen", role: "Creative Director", funFact: "Has redesigned his home office 4 times this year 🎨", color: "from-purple-500 to-pink-500" },
  { name: "Emily Rodriguez", role: "Head of Strategy", funFact: "Reads one marketing book every two weeks 📚", color: "from-pink-500 to-orange-500" },
  { name: "David Park", role: "Lead Developer", funFact: "Built his first website at age 11 for his hamster 🐹", color: "from-orange-500 to-yellow-500" },
];

/* ─── Clients ────────────────────────────── */
export const FALLBACK_CLIENTS: WPClient[] = [
  { name: "TechCorp", color: "#3B82F6" },
  { name: "DesignHub", color: "#8B5CF6" },
  { name: "StartupX", color: "#EC4899" },
  { name: "GlobalCo", color: "#F59E0B" },
  { name: "Innovate", color: "#10B981" },
  { name: "FutureLabs", color: "#6366F1" },
  { name: "CreativeWorks", color: "#EF4444" },
  { name: "BuildRight", color: "#14B8A6" },
];
