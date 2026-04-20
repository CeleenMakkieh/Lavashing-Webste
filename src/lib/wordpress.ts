/**
 * WordPress Headless CMS — API layer
 *
 * Fetches all site content from WordPress via WPGraphQL.
 *
 * Required WordPress plugins (all free):
 *   1. WPGraphQL              wordpress.org/plugins/wp-graphql
 *   2. Advanced Custom Fields  wordpress.org/plugins/advanced-custom-fields
 *   3. WPGraphQL for ACF       wordpress.org/plugins/wpgraphql-acf
 *   4. Custom Post Type UI     wordpress.org/plugins/custom-post-type-ui
 *
 * Set WORDPRESS_API_URL in .env.local to activate.
 * Every function falls back to dummy data when not configured.
 */

const API_URL = process.env.WORDPRESS_API_URL ?? "";

async function fetchWP<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data as T;
  } catch (err) {
    console.error("[WordPress] fetch error:", err);
    return null;
  }
}

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export type WPPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageGradient: string;
  author: string;
  authorRole: string;
  content: string[];
};

export type WPService = {
  title: string;
  description: string;
  features: string[];
};

export type WPTeamMember = {
  name: string;
  role: string;
  funFact: string;
  color: string;
};

export type WPClient = {
  name: string;
  color?: string;
  logoUrl?: string;
};

export type WPIndustry = {
  title: string;
  description: string;
  clientCount: number;
};

export type WPProcessStep = {
  title: string;
  description: string;
};

export type WPSiteSettings = {
  // Hero (Home page)
  heroTypewriterWords: string[];       // e.g. ["inspire","convert","captivate","grow you"]
  heroSubtitle: string;
  heroVideoUrl: string;
  manifestoText: string;
  availableBadgeText: string;

  // About story (About page)
  aboutStory: string[];
  aboutImageUrl: string;

  // Footer
  footerTagline: string;

  // Contact info (Contact page + Footer)
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Social links
  socialLinkedin: string;
  socialTiktok: string;
  socialInstagram: string;
};

export type WPValue = {
  title: string;
  description: string;
};

/* ─────────────────────────────────────────────
   SITE SETTINGS  (ACF Options Page)
   WordPress admin → Settings → Site Settings
   Fields: all fields in WPSiteSettings above
───────────────────────────────────────────── */

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  type R = {
    pages: {
      nodes: Array<{
        siteSettings: {
          heroTypewriterWords: string;
          heroSubtitle: string;
          heroVideoUrl: string;
          manifestoText: string;
          availableBadgeText: string;
          aboutStory: string;
          footerTagline: string;
          contactEmail: string;
          contactPhone: string;
          contactAddress: string;
          socialLinkedin: string;
          socialTiktok: string;
          socialInstagram: string;
        };
      }>;
    };
  };
  const data = await fetchWP<R>(`
    query GetSiteSettings {
      pages(where: { name: "site-settings" }) {
        nodes {
          siteSettings {
            heroTypewriterWords
            heroSubtitle
            heroVideoUrl
            manifestoText
            availableBadgeText
            aboutStory
            footerTagline
            contactEmail
            contactPhone
            contactAddress
            socialLinkedin
            socialTiktok
            socialInstagram
          }
        }
      }
    }
  `);
  const s = data?.pages?.nodes?.[0]?.siteSettings;
  if (!s) return null;
  return {
    heroTypewriterWords: s.heroTypewriterWords
      ? s.heroTypewriterWords.split(",").map((w) => w.trim()).filter(Boolean)
      : ["inspire", "convert", "captivate", "grow you"],
    heroSubtitle: s.heroSubtitle ?? "",
    heroVideoUrl: s.heroVideoUrl ?? "",
    manifestoText: s.manifestoText ?? "",
    availableBadgeText: s.availableBadgeText ?? "",
    aboutStory: s.aboutStory ? s.aboutStory.split("\n\n").filter(Boolean) : [],
    aboutImageUrl: "",
    footerTagline: s.footerTagline ?? "",
    contactEmail: s.contactEmail ?? "",
    contactPhone: s.contactPhone ?? "",
    contactAddress: s.contactAddress ?? "",
    socialLinkedin: s.socialLinkedin ?? "",
    socialTiktok: s.socialTiktok ?? "",
    socialInstagram: s.socialInstagram ?? "",
  };
}

/* ─────────────────────────────────────────────
   BLOG POSTS  (WordPress Posts, built-in)
   ACF fields on Posts: readTime, imageGradient, authorRole, contentParagraphs
───────────────────────────────────────────── */

export async function getBlogPosts(): Promise<WPPost[] | null> {
  type R = {
    posts: {
      nodes: Array<{
        slug: string;
        title: string;
        excerpt: string;
        date: string;
        categories: { nodes: { name: string }[] };
        author: { node: { name: string } };
        postFields: { readTime: string; imageGradient: string; authorRole: string };
      }>;
    };
  };
  const data = await fetchWP<R>(`
    query GetPosts {
      posts(first: 20, where: { status: PUBLISH }) {
        nodes {
          slug title excerpt date
          categories { nodes { name } }
          author { node { name } }
          postFields { readTime imageGradient authorRole }
        }
      }
    }
  `);
  if (!data) return null;
  return data.posts.nodes.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: (p.excerpt ?? "").replace(/<[^>]+>/g, ""),
    date: new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: p.postFields?.readTime ?? "5 min read",
    category: p.categories.nodes[0]?.name ?? "General",
    imageGradient: p.postFields?.imageGradient ?? "from-blue-500 to-purple-500",
    author: p.author.node.name,
    authorRole: p.postFields?.authorRole ?? "",
    content: [],
  }));
}

export async function getBlogPost(slug: string): Promise<WPPost | null> {
  type R = {
    post: {
      slug: string; title: string; excerpt: string; date: string;
      categories: { nodes: { name: string }[] };
      author: { node: { name: string } };
      postFields: { readTime: string; imageGradient: string; authorRole: string; contentParagraphs: string };
    };
  };
  const data = await fetchWP<R>(`
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        slug title excerpt date
        categories { nodes { name } }
        author { node { name } }
        postFields { readTime imageGradient authorRole contentParagraphs }
      }
    }
  `, { slug });
  if (!data?.post) return null;
  const p = data.post;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: (p.excerpt ?? "").replace(/<[^>]+>/g, ""),
    date: new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: p.postFields?.readTime ?? "5 min read",
    category: p.categories.nodes[0]?.name ?? "General",
    imageGradient: p.postFields?.imageGradient ?? "from-blue-500 to-purple-500",
    author: p.author.node.name,
    authorRole: p.postFields?.authorRole ?? "",
    content: (p.postFields?.contentParagraphs ?? "").split("\n\n").filter(Boolean),
  };
}

/* ─────────────────────────────────────────────
   SERVICES  (CPT: "service")
   ACF fields: description, features (one per line)
───────────────────────────────────────────── */

export async function getServices(): Promise<WPService[] | null> {
  type R = { services: { nodes: Array<{ title: string; serviceFields: { description: string; features: string } }> } };
  const data = await fetchWP<R>(`
    query GetServices {
      services(first: 10) {
        nodes { title serviceFields { description features } }
      }
    }
  `);
  if (!data) return null;
  return data.services.nodes.map((s) => ({
    title: s.title,
    description: s.serviceFields?.description ?? "",
    features: (s.serviceFields?.features ?? "").split("\n").filter(Boolean),
  }));
}

/* ─────────────────────────────────────────────
   INDUSTRIES  (CPT: "industry")
   ACF fields: description, clientCount
───────────────────────────────────────────── */

export async function getIndustries(): Promise<WPIndustry[] | null> {
  type R = { industries: { nodes: Array<{ title: string; industryFields: { description: string; clientCount: number } }> } };
  const data = await fetchWP<R>(`
    query GetIndustries {
      industries(first: 20) {
        nodes { title industryFields { description clientCount } }
      }
    }
  `);
  if (!data) return null;
  return data.industries.nodes.map((i) => ({
    title: i.title,
    description: i.industryFields?.description ?? "",
    clientCount: i.industryFields?.clientCount ?? 0,
  }));
}

/* ─────────────────────────────────────────────
   PROCESS STEPS  (CPT: "process_step")
   ACF fields: description
   Order steps by menu_order in WordPress
───────────────────────────────────────────── */

export async function getProcessSteps(): Promise<WPProcessStep[] | null> {
  type R = { processSteps: { nodes: Array<{ title: string; processStepFields: { description: string } }> } };
  const data = await fetchWP<R>(`
    query GetProcessSteps {
      processSteps(first: 10, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes { title processStepFields { description } }
      }
    }
  `);
  if (!data) return null;
  return data.processSteps.nodes.map((s) => ({
    title: s.title,
    description: s.processStepFields?.description ?? "",
  }));
}

/* ─────────────────────────────────────────────
   TEAM MEMBERS  (CPT: "team_member")
   ACF fields: role, funFact, gradientColor
───────────────────────────────────────────── */

export async function getTeamMembers(): Promise<WPTeamMember[] | null> {
  type R = { teamMembers: { nodes: Array<{ title: string; teamFields: { role: string; funFact: string; gradientColor: string } }> } };
  const data = await fetchWP<R>(`
    query GetTeam {
      teamMembers(first: 20) {
        nodes { title teamFields { role funFact gradientColor } }
      }
    }
  `);
  if (!data) return null;
  return data.teamMembers.nodes.map((m) => ({
    name: m.title,
    role: m.teamFields?.role ?? "",
    funFact: m.teamFields?.funFact ?? "",
    color: m.teamFields?.gradientColor ?? "from-blue-500 to-purple-500",
  }));
}

/* ─────────────────────────────────────────────
   CLIENTS / LOGOS  (CPT: "client")
   ACF fields: logoColor (hex)
───────────────────────────────────────────── */

export async function getClients(): Promise<WPClient[] | null> {
  type R = { clients: { nodes: Array<{ title: string; clientField: { logoColor: string; logoImage: string } }> } };
  const data = await fetchWP<R>(`
    query GetClients {
      clients(first: 20) {
        nodes { title clientField { logoColor logoImage } }
      }
    }
  `);
  if (!data) return null;
  return data.clients.nodes.map((c) => ({
    name: c.title,
    color: c.clientField?.logoColor ?? "#6b8d6d",
    logoUrl: c.clientField?.logoImage ?? "",
  }));
}

/* ─────────────────────────────────────────────
   VALUES  (CPT: "value")
   ACF fields: description
   Order by menu_order in WordPress
───────────────────────────────────────────── */

export async function getValues(): Promise<WPValue[] | null> {
  type R = { values: { nodes: Array<{ title: string; valueFields: { description: string } }> } };
  const data = await fetchWP<R>(`
    query GetValues {
      values(first: 10, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes { title valueFields { description } }
      }
    }
  `);
  if (!data) return null;
  return data.values.nodes.map((v) => ({
    title: v.title,
    description: v.valueFields?.description ?? "",
  }));
}
