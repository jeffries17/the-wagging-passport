import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge text", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text" }),
        defineField({ name: "primaryCtaLabel", title: "Primary button label", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "Primary button link", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary button label", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "Secondary button link", type: "string" }),
      ],
    }),
    defineField({
      name: "journalSection",
      title: "\"Latest from the journal\" section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "linkLabel", title: "\"View all\" link label", type: "string" }),
      ],
    }),
    defineField({
      name: "destinationsSection",
      title: "\"Explore destinations\" section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({ name: "linkLabel", title: "\"View all\" link label", type: "string" }),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text" }),
        defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
        defineField({ name: "successMessage", title: "Success message", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
