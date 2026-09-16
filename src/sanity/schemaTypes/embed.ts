import { defineField, defineType } from "sanity";

export default defineType({
  name: "embed",
  title: "Embed (Instagram / Google Maps)",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "Paste an Instagram post URL, or a Google Maps embed URL (Google Maps → Share → Embed a map → copy the src from the iframe code, starts with https://www.google.com/maps/embed?...).",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
  ],
  preview: {
    select: { url: "url" },
    prepare: ({ url }) => ({ title: "Embed", subtitle: url }),
  },
});
