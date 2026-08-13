import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", validation: (rule) => rule.max(160) }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image" }),
  ],
  options: { collapsible: true, collapsed: true },
});
