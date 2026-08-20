// Room categories for the #rooms section.
//
// Every field here is a placeholder. Do Step Inn Living's official category
// names, capacities and amenities have not been supplied or verified, and the
// site must never invent them — see copy/brand-kit.md §8. Replace the values
// below with verified content; `verified: true` removes the on-page warning.
export const stays = [
  {
    id: "stay-a",
    name: "[TO VERIFY: official room name]",
    desc: "[TO VERIFY: verified short description]",
    capacity: "[TO VERIFY: capacity]",
    features: ["[TO VERIFY: amenity]", "[TO VERIFY: amenity]"],
    image: "/img/room-private.jpg",
    alt: "Placeholder image — private room",
  },
  {
    id: "stay-b",
    name: "[TO VERIFY: official room name]",
    desc: "[TO VERIFY: verified short description]",
    capacity: "[TO VERIFY: capacity]",
    features: ["[TO VERIFY: amenity]", "[TO VERIFY: amenity]"],
    image: "/img/room-shared.jpg",
    alt: "Placeholder image — shared room",
  },
];

// Flip to true only once every field above is confirmed by the operator.
export const staysVerified = false;

// The booking engine deep link. Until it is supplied, CTAs stay inert rather
// than guessing a URL.
export const BOOKING_URL = null;
