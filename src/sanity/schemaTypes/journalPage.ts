import { defineField, defineType } from "sanity";

export default defineType({
  name: "journalPage",
  title: "Journal Page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Browser tab title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", validation: (rule) => rule.max(160) }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "emptyStateMessage", title: "Message shown when no posts are published", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Journal Page" }),
  },
});
