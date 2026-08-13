import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Browser tab title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", validation: (rule) => rule.max(160) }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Intro text",
      description: "Shown below the heading. Include the contact email inline if you want it to appear here.",
      type: "text",
    }),
    defineField({ name: "formButtonLabel", title: "Form submit button label", type: "string" }),
    defineField({ name: "successMessage", title: "Message shown after the form is submitted", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
