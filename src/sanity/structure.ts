import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Homepage" },
  { id: "journalPage", title: "Journal Page" },
  { id: "contactPage", title: "Contact Page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .id(singleton.id)
          .title(singleton.title)
          .child(S.document().schemaType(singleton.id).documentId(singleton.id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.some((singleton) => singleton.id === item.getId())
      ),
    ]);
