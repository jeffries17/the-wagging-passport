import { defineField, defineType } from "sanity";

export default defineType({
  name: "gearItem",
  title: "Gear Item",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Short Description", type: "text" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Carriers & Crates", value: "carriers" },
          { title: "Flying Essentials", value: "flying" },
          { title: "Hotel & Stay", value: "hotel" },
          { title: "Health & Safety", value: "health" },
          { title: "Accessories", value: "accessories" },
        ],
      },
    }),
    defineField({ name: "price", title: "Approx. Price", type: "string" }),
    defineField({
      name: "affiliateUrl",
      title: "Affiliate URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
