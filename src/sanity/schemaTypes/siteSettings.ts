import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Title", type: "string", initialValue: "The Wagging Passport" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "affiliateDisclosure", title: "Affiliate Disclosure", type: "text" }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO & Social Share Image",
      description: "Fallback meta description and social share image used site-wide when a page doesn't set its own.",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
