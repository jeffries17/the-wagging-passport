import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-27" });

function block(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text }],
  };
}

async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]`, { id: doc._id });
  if (existing) {
    console.log(`Skipping existing: ${doc._id}`);
    return existing;
  }
  const created = await client.create(doc);
  console.log(`Created: ${created._type} / ${created._id}`);
  return created;
}

async function main() {
  const author = await upsert({
    _id: "author-caitlin",
    _type: "author",
    name: "Caitlin",
    petName: "Tishka",
    slug: { _type: "slug", current: "caitlin" },
    bio: [
      block(
        "Caitlin travels full-time with her chihuahua, Tishka, chasing down the honest answer to one question over and over: is this place actually as pet-friendly as it claims to be?"
      ),
      block(
        "The Wagging Passport is everything she's learned along the way — flying logistics, hotel red flags, and the destinations that turned out to be worth the trip."
      ),
    ],
  });

  await upsert({
    _id: "site-settings",
    _type: "siteSettings",
    title: "The Wagging Passport",
    tagline: "Traveling the world with a small dog in tow.",
    affiliateDisclosure:
      "The Wagging Passport participates in affiliate programs, including the Amazon Associates Program and various hotel and booking affiliate partnerships. This means that if you click a link on this site and make a purchase or booking, we may earn a small commission — at no additional cost to you.\n\nWe only recommend gear, hotels, and services that we've personally used or would genuinely recommend to a friend traveling with a dog. Affiliate relationships never influence our honest opinion of a product or place.",
    contactEmail: "hello@thewaggingpassport.com",
  });

  const destinations = [
    {
      _id: "destination-brazil",
      name: "Brazil",
      intro: "Beaches, big cities, and surprisingly dog-friendly cafe culture.",
      tips: "Brazil requires an import permit and health certificate issued within 10 days of travel — start the paperwork early.",
    },
    {
      _id: "destination-japan",
      name: "Japan",
      intro: "Strict import rules, but some of the most thoughtfully pet-friendly hotels we've found anywhere.",
      tips: "Japan's pet import process takes months of advance preparation — rabies titer test and waiting periods are non-negotiable.",
    },
    {
      _id: "destination-georgia",
      name: "Georgia",
      intro: "An underrated, wildly walkable country for a small dog and a big appetite.",
      tips: "EU pet passport rules apply for entry from most regions; Tbilisi's old town is stroller/carrier-friendly cobblestone.",
    },
    {
      _id: "destination-france",
      name: "France",
      intro: "One of the most pet-welcoming countries in Europe — cafes included.",
      tips: "An EU pet passport or health certificate plus microchip and rabies vaccination is all you need for most travelers.",
    },
  ];

  const destinationDocs = {};
  for (const d of destinations) {
    const doc = await upsert({
      _id: d._id,
      _type: "destination",
      name: d.name,
      slug: { _type: "slug", current: d.name.toLowerCase() },
      intro: d.intro,
      body: [block(d.intro)],
      petTravelTips: [block(d.tips)],
    });
    destinationDocs[d.name] = doc;
  }

  const authorRef = { _type: "reference", _ref: author._id };

  const posts = [
    {
      _id: "post-flying-with-your-dog",
      title: "Flying With Your Dog: What I Wish I Knew Before Our First Flight",
      category: "guide",
      excerpt:
        "In-cabin carrier rules, airline pet policies, and the pre-flight checklist that's saved us from gate-side panic more than once.",
      body: [
        block(
          "The first time I flew with Tishka, I spent more time researching carrier dimensions than I spent packing for myself. Here's what actually matters."
        ),
        block(
          "Every airline has slightly different in-cabin pet policies — carrier size, breed restrictions, and fees vary widely, so always confirm directly with the airline before booking, not just through a travel site."
        ),
        block(
          "Book pet spots as early as possible: most airlines cap the number of in-cabin pets per flight, and that cap fills up fast."
        ),
      ],
    },
    {
      _id: "post-pet-friendly-hotels",
      title: "Pet-Friendly Hotels: How to Actually Find One",
      category: "guide",
      excerpt:
        "\"Pet-friendly\" means different things to different hotels. Here's how to filter for the ones that mean it.",
      body: [
        block(
          "\"Pet-friendly\" on a booking site can mean anything from a genuine welcome kit to a grudging exception with a hefty cleaning fee."
        ),
        block(
          "Call the property directly and ask about weight limits, breed restrictions, pet fees, and whether dogs can be left alone in the room — the answers rarely match what's listed online."
        ),
      ],
    },
    {
      _id: "post-is-my-hotel-really-pet-friendly",
      title: "Is My Hotel Really Pet-Friendly? Tips for a Smooth Stay",
      category: "guide",
      excerpt:
        "The red flags to watch for before you book, and how to set your dog up for a calm, incident-free stay.",
      body: [
        block(
          "A listing that says 'pet-friendly' without specifics — no weight limit, no fee mentioned, no pet policy page — is usually a hotel that hasn't thought it through."
        ),
        block(
          "Once you've checked in, do a quick safety sweep of the room: gaps under furniture, balcony access, and anything at chihuahua height that looks chewable."
        ),
      ],
    },
    {
      _id: "post-airbnb-vs-booking",
      title: "Airbnb vs. Booking.com: Which Is Better for Traveling With Pets?",
      category: "guide",
      excerpt:
        "Two very different approaches to pet policies — here's which one to reach for depending on your trip.",
      body: [
        block(
          "Airbnb hosts set their own pet policies, which means more variability but often more flexibility if you message ahead of time."
        ),
        block(
          "Booking.com aggregates hotel pet policies directly, which tends to be more consistent but less negotiable — better for short stays where you don't want to leave anything to chance."
        ),
      ],
    },
    {
      _id: "post-first-impressions-rio",
      title: "First Impressions: Exploring Rio With Tishka",
      category: "destination",
      destination: destinationDocs["Brazil"],
      excerpt:
        "Our first few days in Rio de Janeiro, from the import paperwork to the first dog-friendly cafe we found.",
      body: [
        block(
          "Rio surprised us with how many cafes waved us in without a second glance at the carrier — a good sign for the rest of the trip."
        ),
      ],
    },
  ];

  for (const p of posts) {
    await upsert({
      _id: p._id,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p._id.replace(/^post-/, "") },
      category: p.category,
      excerpt: p.excerpt,
      body: p.body,
      author: authorRef,
      publishedAt: new Date().toISOString(),
      destination: p.destination ? { _type: "reference", _ref: p.destination._id } : undefined,
    });
  }

  const gearItems = [
    {
      id: "gear-carrier",
      name: "Airline-Approved Soft-Sided Carrier",
      description:
        "The carrier that's flown with us more than a dozen times — structured enough to slide under a seat, soft enough for Tishka to get comfortable.",
      category: "flying",
      price: "$60–80",
      url: "https://www.amazon.com/s?k=airline+approved+dog+carrier",
    },
    {
      id: "gear-collapsible-bowl",
      name: "Collapsible Travel Water Bowl",
      description: "Packs flat, pops up in two seconds — lives in the outer pocket of every bag we travel with.",
      category: "accessories",
      price: "$10–15",
      url: "https://www.amazon.com/s?k=collapsible+travel+dog+bowl",
    },
    {
      id: "gear-gps-tracker",
      name: "GPS Pet Tracker",
      description: "Peace of mind in unfamiliar cities — clips right onto the collar and pairs with a phone app.",
      category: "health",
      price: "$40–60",
      url: "https://www.amazon.com/s?k=gps+pet+tracker",
    },
    {
      id: "gear-health-certificate-folder",
      name: "Travel Document Folder",
      description: "Keeps health certificates, vaccine records, and import permits organized and ready for customs.",
      category: "health",
      price: "$15–20",
      url: "https://www.amazon.com/s?k=travel+document+organizer",
    },
  ];

  for (const g of gearItems) {
    await upsert({
      _id: g.id,
      _type: "gearItem",
      name: g.name,
      slug: { _type: "slug", current: g.id.replace(/^gear-/, "") },
      description: g.description,
      category: g.category,
      price: g.price,
      affiliateUrl: g.url,
      featured: false,
    });
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
