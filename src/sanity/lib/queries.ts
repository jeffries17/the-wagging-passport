const coverImageProjection = `coverImage{ ..., asset->{ _id, metadata { lqip } } }`;

const postSummaryProjection = `{
  title,
  "slug": slug.current,
  category,
  excerpt,
  ${coverImageProjection},
  publishedAt,
  tags,
  destination->{ name, "slug": slug.current, heroImage, intro }
}`;

export const allPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postSummaryProjection}`;

export const postsByCategoryQuery = `*[_type == "post" && category == $category && defined(slug.current)] | order(publishedAt desc) ${postSummaryProjection}`;

export const latestPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...$limit] ${postSummaryProjection}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  excerpt,
  ${coverImageProjection},
  publishedAt,
  tags,
  body,
  destination->{ name, "slug": slug.current, heroImage, intro },
  author->{ name, petName, "slug": slug.current, image, petImage, bio, social },
  seo
}`;

export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

export const allDestinationsQuery = `*[_type == "destination" && defined(slug.current)] | order(name asc) {
  name,
  "slug": slug.current,
  heroImage,
  intro
}`;

export const destinationBySlugQuery = `*[_type == "destination" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  heroImage,
  intro,
  body,
  petTravelTips,
  seo,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) ${postSummaryProjection}
}`;

export const allDestinationSlugsQuery = `*[_type == "destination" && defined(slug.current)].slug.current`;

export const allGearItemsQuery = `*[_type == "gearItem" && defined(slug.current)] | order(featured desc, name asc) {
  name,
  "slug": slug.current,
  image,
  description,
  category,
  price,
  affiliateUrl,
  featured
}`;

export const primaryAuthorQuery = `*[_type == "author"][0]{
  name,
  petName,
  "slug": slug.current,
  image,
  petImage,
  bio,
  social
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  tagline,
  affiliateDisclosure,
  social,
  contactEmail,
  defaultSeo
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  hero,
  journalSection,
  destinationsSection,
  newsletter
}`;

export const journalPageQuery = `*[_type == "journalPage"][0]{
  metaTitle,
  metaDescription,
  eyebrow,
  title,
  description,
  emptyStateMessage
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  metaTitle,
  metaDescription,
  eyebrow,
  heading,
  intro,
  formButtonLabel,
  successMessage
}`;
