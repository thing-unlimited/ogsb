import { MenuItem, BuffetPricing, ReviewItem, LoyaltyReward } from '../types/restaurant';

export const RESTAURANT_INFO = {
  name: "Ocean Grill & Seafood Buffet",
  shortName: "Ocean Grill Buffet",
  tagline: "Virginia Beach's Premier All-You-Can-Eat Seafood, Sushi & Hibachi Destination",
  address: {
    street: "3877 Holland Rd, Suite 416",
    city: "Virginia Beach",
    state: "VA",
    zip: "23452",
    country: "United States",
    shoppingCenter: "Timberlake Shopping Center",
    mapsUrl: "https://maps.google.com/?q=3877+Holland+Rd+Suite+416+Virginia+Beach+VA+23452",
    embedCoordinates: {
      lat: 36.8173,
      lng: -76.1082,
    }
  },
  phone: "(757) 828-6828",
  phoneRaw: "+17578286828",
  hours: [
    { days: "Monday – Thursday", open: "11:00 AM", close: "9:00 PM", openHour: 11, closeHour: 21 },
    { days: "Friday – Sunday", open: "11:00 AM", close: "10:00 PM", openHour: 11, closeHour: 22 },
  ],
  pricingNotes: "Includes unlimited fountain beverages on select dinners. Seniors (65+) receive 10% off. Children under 3 dine complimentary with adult purchase.",
  photos: {
    storefront: "/images/ocean_grill_storefront.png",
    sushi: "/images/ocean_volcano_sushi.png",
    crabs: "/images/steamed_chesapeake_crabs.png",
    fruits: "/
      images/fresh_tropical_fruits.png",
    backup: {
      storefront: "/public/assets/aistudio/file_00000000576c81f6be84830195f77811_ed054d81.png",
      sushi: "/public/assets/aistudio/file_000000008c8c81f695ed439c21006f1c_fb7e49cb.png",
      crabs: "/public/assets/aistudio/file_00000000f124820c9b58b2c8db41a2cb_438b521b.png",
      fruits: "/public/assets/aistudio/file_000000003a5c820cb91a9d5b4cdb4422_2aaf75ae.png",
    }
  }
};

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'seafood' | 'sushi' | 'fruits' | 'exterior';
  categoryLabel: string;
  src: string;
  downloadFilename: string;
  resolution: string;
  fileSize: string;
  description: string;
  tags: string[];
  station: string;
  chefNotes: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-crabs",
    title: "Steamed Chesapeake Blue Crabs",
    category: "seafood",
    categoryLabel: "Fresh Seafood Bar",
    src: "/public/images/steamed_chesapeake_crabs.png",
    downloadFilename: "ocean_grill_steamed_blue_crabs_hd.png",
    resolution: "High-Resolution Ultra HD",
    fileSize: "2.8 MB",
    description: "Plump Atlantic blue crabs fresh from the steam kettle, coated in rich Old Bay seasoning and sea salt. Served hot continuously in buffet chafers.",
    tags: ["Hot Seafood", "Local Catch", "Guest Favorite", "Shellfish Feast"],
    station: "Steamed Seafood Island (Center Station)",
    chefNotes: "Steamed in small continuous batches every 15 minutes to guarantee succulent, steaming-hot meat."
  },
  {
    id: "gal-sushi",
    title: "Ocean Volcano Tobiko Sushi Roll",
    category: "sushi",
    categoryLabel: "Master Sushi Counter",
    src: "/public/images/ocean_volcano_sushi.png",
    downloadFilename: "ocean_grill_tobiko_sushi_hd.png",
    resolution: "High-Resolution Ultra HD",
    fileSize: "2.0 MB",
    description: "Hand-rolled sushi featuring fresh tuna, crab, avocado and crisp cucumber, garnished with fiery crimson red tobiko caviar and light wasabi cream sauce.",
    tags: ["Hand Rolled", "Sashimi Grade", "Tobiko Caviar", "Signature Roll"],
    station: "Cold Sushi & Sashimi Island",
    chefNotes: "Prepared live at our sushi bar using premium sushi-grade fish and seasoned Japanese koshihikari rice."
  },
  {
    id: "gal-fruits",
    title: "Fresh Hand-Carved Fruit & Salad Display",
    category: "fruits",
    categoryLabel: "Chilled Fruit & Cold Bar",
    src: "/public/images/fresh_tropical_fruits.png",
    downloadFilename: "ocean_grill_tropical_fruits_hd.png",
    resolution: "High-Resolution Ultra HD",
    fileSize: "2.3 MB",
    description: "Abundant chilled platters of fresh-cut Florida navel oranges, sweet ruby seedless grapes, golden Hawaiian pineapples, and exotic dragon fruit slices.",
    tags: ["Farm Fresh", "Chilled Daily", "Tropical Variety", "Refreshing"],
    station: "Chilled Fruit & Dessert Island",
    chefNotes: "Sliced and replenished continuously throughout lunch and dinner service for maximum crispness and sweetness."
  },
  {
    id: "gal-exterior",
    title: "Ocean Grill & Seafood Buffet Storefront",
    category: "exterior",
    categoryLabel: "Restaurant Entrance",
    src: "/public/images/ocean_grill_storefront.png",
    downloadFilename: "ocean_grill_exterior_storefront_hd.png",
    resolution: "High-Resolution Ultra HD",
    fileSize: "2.7 MB",
    description: "Our welcoming Virginia Beach restaurant storefront at 3877 Holland Rd, Suite 416 in Timberlake Shopping Center, featuring spacious plaza parking.",
    tags: ["Virginia Beach, VA", "Timberlake Plaza", "3877 Holland Rd", "Entrance"],
    station: "Main Entrance & Welcome Lobby",
    chefNotes: "Open 7 days a week with plenty of free parking and easy wheelchair-accessible entry."
  }
];

export const BUFFET_PRICING: BuffetPricing[] = [
  {
    tier: "Weekday Lunch Buffet",
    hours: "11:00 AM – 3:30 PM",
    days: "Monday – Friday",
    adultPrice: 18.99,
    kidsPrice3to6: 6.99,
    kidsPrice7to10: 10.99,
    seniorDiscount: "10% off (65+)",
    highlights: ["Fresh Sushi Rolls", "Live Hibachi Stir-Fry", "Peel & Eat Shrimp", "Dim Sum & Wonton Soup", "Full Salad & Fruit Bar"]
  },
  {
    tier: "Weekday Dinner Buffet",
    hours: "3:30 PM – 9:00 PM",
    days: "Monday – Thursday",
    adultPrice: 29.99,
    kidsPrice3to6: 8.99,
    kidsPrice7to10: 14.99,
    seniorDiscount: "10% off (65+)",
    highlights: ["Steamed Blue Crabs", "Black Pepper Beef Ribs", "Raw Oysters on Half Shell", "Chef Signature Specialty Sushi", "Chocolate Lava Fountain"]
  },
  {
    tier: "Weekend Seafood Extravaganza",
    hours: "All Day 11:00 AM – 10:00 PM",
    days: "Friday Dinner, Saturday & Sunday",
    adultPrice: 35.99,
    kidsPrice3to6: 9.99,
    kidsPrice7to10: 16.99,
    seniorDiscount: "10% off (65+)",
    highlights: ["Unlimited Snow Crab Legs", "Steamed Chesapeake Blue Crabs", "Jumbo Garlic Butter Shrimp", "Fresh Atlantic Salmon Nigiri", "Whole Roasted Carvery"]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // SEAFOOD
  {
    id: "sea-01",
    name: "Steamed Chesapeake Blue Crabs",
    category: "seafood",
    categoryLabel: "Fresh Seafood & Raw Bar",
    description: "Plump, sweet Atlantic blue crabs steamed fresh in traditional bay seasoning and served piping hot in buffet trays with warm clarified butter.",
    tags: ["Hot Buffet Item", "Local Catch", "Guest Favorite"],
    isSignature: true,
    isPopular: true,
    image: "/public/images/steamed_chesapeake_crabs.png",
    dietary: ["Shellfish", "Gluten-Free"],
    prepStyle: "Steamed with Old Bay & Sea Salt"
  },
  {
    id: "sea-02",
    name: "Alaskan Snow Crab Legs",
    category: "seafood",
    categoryLabel: "Fresh Seafood & Raw Bar",
    description: "Tender, sweet snow crab leg clusters continuously replenished from our steam cauldrons. Crackers and melted garlic butter available at the station.",
    tags: ["Weekend Dinner Featured", "Unlimited", "Premium Catch"],
    isSignature: true,
    isPopular: true,
    dietary: ["Shellfish", "Gluten-Free"],
    prepStyle: "Fresh Steamed Clusters"
  },
  {
    id: "sea-03",
    name: "Chilled Peel & Eat Gulf Shrimp",
    category: "seafood",
    categoryLabel: "Fresh Seafood & Raw Bar",
    description: "Jumbo wild-caught gulf shrimp poached with aromatics, quick-chilled on crushed ice, served with house-made horseradish cocktail sauce and fresh lemons.",
    tags: ["Chilled Raw Bar", "All Day"],
    isPopular: true,
    dietary: ["Shellfish", "Gluten-Free", "Dairy-Free"],
    prepStyle: "Poached & Chilled on Ice"
  },
  {
    id: "sea-04",
    name: "Fresh Atlantic Oysters on the Half Shell",
    category: "seafood",
    categoryLabel: "Fresh Seafood & Raw Bar",
    description: "Shucked daily local salt-pond oysters presented on shaved sea ice with mignonette sauce, tabasco, and crisp lemon wedges.",
    tags: ["Dinner & Weekend", "Shucked Daily"],
    isSignature: true,
    dietary: ["Shellfish", "Gluten-Free", "Dairy-Free"],
    prepStyle: "Raw Half-Shell on Ice"
  },
  {
    id: "sea-05",
    name: "Baked Stuffed Clams Casino",
    category: "seafood",
    categoryLabel: "Fresh Seafood & Raw Bar",
    description: "Littleneck clams baked with seasoned herb panko, smoked bacon crumbles, garlic shallot butter, and bell peppers.",
    tags: ["Hot Buffet", "Oven Baked"],
    dietary: ["Shellfish"],
    prepStyle: "Oven Baked Au Gratin"
  },

  // SUSHI
  {
    id: "sushi-01",
    name: "Ocean Volcano Tobiko Roll",
    category: "sushi",
    categoryLabel: "Artisan Sushi & Sashimi Island",
    description: "Fresh bluefin tuna, cucumber, and snow crab salad wrapped in seasoned nori and sushi rice, crowned with fiery crimson red tobiko caviar and creamy wasabi aioli.",
    tags: ["Master Roll", "Hand Crafted", "Photo Featured"],
    isSignature: true,
    isPopular: true,
    image: "/public/images/ocean_volcano_sushi.png",
    dietary: ["Shellfish", "Spicy"],
    prepStyle: "Hand-rolled by Sushi Chefs"
  },
  {
    id: "sushi-02",
    name: "Fresh Atlantic Salmon Nigiri",
    category: "sushi",
    categoryLabel: "Artisan Sushi & Sashimi Island",
    description: "Hand-pressed seasoned vinegared sushi rice topped with silky slices of sashimi-grade Norwegian salmon with a hint of wasabi.",
    tags: ["Sashimi Grade", "Fresh Daily"],
    isPopular: true,
    dietary: ["Gluten-Free", "Dairy-Free"],
    prepStyle: "Traditional Edomae Nigiri"
  },
  {
    id: "sushi-03",
    name: "Golden Dragon Eel & Avocado Roll",
    category: "sushi",
    categoryLabel: "Artisan Sushi & Sashimi Island",
    description: "Crispy tempura shrimp and cucumber inside, draped with grilled freshwater unagi eel, ripe Haas avocado ribbons, and sweet kabayaki reduction.",
    tags: ["Specialty Roll", "Warm & Savory"],
    isPopular: true,
    dietary: ["Shellfish"],
    prepStyle: "Torched Eel with Kabayaki Glaze"
  },
  {
    id: "sushi-04",
    name: "Spicy Crunch Yellowtail Roll",
    category: "sushi",
    categoryLabel: "Artisan Sushi & Sashimi Island",
    description: "Diced hamachi yellowtail tossed with sriracha, toasted sesame oil, and scallions, rolled with tempura flakes for an irresistible textural crunch.",
    tags: ["Spicy Favorite", "Chef Special"],
    dietary: ["Spicy", "Dairy-Free"],
    prepStyle: "Crispy Tempura Flakes Crunch"
  },

  // HIBACHI
  {
    id: "hib-01",
    name: "Live Sizzling Hibachi Steak & Shrimp",
    category: "hibachi",
    categoryLabel: "Live Mongolian Teppanyaki & Hibachi",
    description: "Hand-select your choice of USDA choice strip sirloin, tiger shrimp, noodles, and garden vegetables, seared to order on our flaming 600°F teppan grill.",
    tags: ["Made To Order", "Interactive Chef Station"],
    isSignature: true,
    isPopular: true,
    dietary: ["Shellfish", "Dairy-Free"],
    prepStyle: "Teppan Sautéed with Garlic Butter"
  },
  {
    id: "hib-02",
    name: "Flame-Kissed Teriyaki Salmon",
    category: "hibachi",
    categoryLabel: "Live Mongolian Teppanyaki & Hibachi",
    description: "Atlantic salmon steak seared on high heat with sweet ginger teriyaki glaze, scallions, and toasted sesame seeds.",
    tags: ["High Protein", "Cooked To Order"],
    dietary: ["Dairy-Free"],
    prepStyle: "Flame Seared Teppanyaki"
  },
  {
    id: "hib-03",
    name: "Hibachi Garlic Butter Udon Noodles",
    category: "hibachi",
    categoryLabel: "Live Mongolian Teppanyaki & Hibachi",
    description: "Thick Japanese wheat udon tossed on the grill with shredded cabbage, carrots, onion, tamari soy, and roasted garlic herb butter.",
    tags: ["Noodle Bar", "Vegetarian Option"],
    isPopular: true,
    dietary: ["Vegetarian"],
    prepStyle: "Wok Tossed with Soy & Garlic Butter"
  },

  // HOT ENTREES
  {
    id: "hot-01",
    name: "Honey Walnut Jumbo Shrimp",
    category: "hot-entrees",
    categoryLabel: "Hot Gourmet Entrées & Asian Specialties",
    description: "Crispy battered jumbo shrimp coated in a velvety sweet honey cream sauce, garnished with candied whole walnuts and sesame seeds.",
    tags: ["Buffet Classic", "Crowd Favorite"],
    isPopular: true,
    dietary: ["Shellfish"],
    prepStyle: "Crisp Fried & Tossed in Honey Glaze"
  },
  {
    id: "hot-02",
    name: "Cantonese Ginger-Scallion Steamed Flounder",
    category: "hot-entrees",
    categoryLabel: "Hot Gourmet Entrées & Asian Specialties",
    description: "Delicate white flounder fillets steamed with fresh shredded ginger root, scallion threads, cilantro, and premium light soy sesame reduction.",
    tags: ["Traditional Recipe", "Delicate & Healthy"],
    isSignature: true,
    dietary: ["Dairy-Free", "Gluten-Free"],
    prepStyle: "Gentle Bamboo Steam"
  },
  {
    id: "hot-03",
    name: "Salt & Pepper Dungeness Crab Bites",
    category: "hot-entrees",
    categoryLabel: "Hot Gourmet Entrées & Asian Specialties",
    description: "Wok-fried crab sections tossed with diced jalapeños, scallions, roasted Sichuan pepper salt, and minced crispy garlic.",
    tags: ["Bold Flavor", "Spicy Delight"],
    dietary: ["Shellfish", "Spicy", "Dairy-Free"],
    prepStyle: "High Heat Wok Toss"
  },
  {
    id: "hot-04",
    name: "Carved Prime Roast Beef Au Jus",
    category: "hot-entrees",
    categoryLabel: "Hot Gourmet Entrées & Asian Specialties",
    description: "Slow-roasted herb-crusted beef sirloin carved hot to order at our carvery station, served with savory rosemary au jus and creamy horseradish.",
    tags: ["Carvery Station", "Dinner & Weekend"],
    dietary: ["Gluten-Free"],
    prepStyle: "Slow Roasted 8 Hours"
  },

  // FRUITS & SALAD
  {
    id: "fruit-01",
    name: "Fresh Cut Citrus & Tropical Fruit Display",
    category: "fruits-salad",
    categoryLabel: "Farm Fresh Fruit & Cold Salad Bar",
    description: "Vibrant self-serve chilled buffet platters piled high with sweet Florida navel orange wedges, ruby red seedless grapes, Hawaiian golden pineapple, and exotic dragon fruit.",
    tags: ["All-Day Fresh", "Photo Featured", "Refreshing"],
    isPopular: true,
    image: "/public/images/fresh_tropical_fruits.png",
    dietary: ["Vegetarian", "Gluten-Free", "Dairy-Free"],
    prepStyle: "Chilled & Sliced Every 30 Minutes"
  },
  {
    id: "fruit-02",
    name: "Sesame Wakame Seaweed Salad",
    category: "fruits-salad",
    categoryLabel: "Farm Fresh Fruit & Cold Salad Bar",
    description: "Crisp emerald seaweed tossed in sweet rice vinegar dressing, roasted sesame oil, and toasted white sesame seeds.",
    tags: ["Cold Appetizer", "Japanese Style"],
    isPopular: true,
    dietary: ["Vegetarian", "Dairy-Free"],
    prepStyle: "Chilled Marinated Greens"
  },

  // DESSERTS
  {
    id: "des-01",
    name: "Decadent Belgian Chocolate Fountain",
    category: "desserts",
    categoryLabel: "Sweet Confections & Dessert Bar",
    description: "Tiered flowing warm Belgian milk chocolate fountain with bamboo skewers for dipping fresh strawberries, marshmallows, cream puffs, and butter pretzels.",
    tags: ["Kids & Family Hit", "All-You-Can-Dip"],
    isSignature: true,
    isPopular: true,
    dietary: ["Vegetarian"],
    prepStyle: "Warm Flowing Fountain"
  },
  {
    id: "des-02",
    name: "House Vanilla Bean Soft Serve & Sundae Bar",
    category: "desserts",
    categoryLabel: "Sweet Confections & Dessert Bar",
    description: "Self-serve creamy swirl machine with wafer cake cones, rainbow sprinkles, crushed Oreos, warm caramel sauce, and maraschino cherries.",
    tags: ["Unlimited Soft Serve", "Custom Sundaes"],
    dietary: ["Vegetarian"],
    prepStyle: "Continuous Swirl Soft Serve"
  }
];

export const RECENT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    location: "Virginia Beach, VA",
    rating: 5,
    date: "2 days ago",
    verifiedDiner: true,
    visitType: "Weekend Dinner",
    content: "Hands down the most impressive seafood spread in the 757! The steamed blue crabs were packed with sweet meat and seasoned just right. Crab legs kept coming out fresh in huge batches—no long waits like other buffets. The sushi chefs take serious pride in their rolls, and the fruit bar with dragon fruit and fresh pineapple was the perfect finish.",
    favoriteItems: ["Steamed Chesapeake Blue Crabs", "Alaskan Snow Crab Legs", "Ocean Volcano Tobiko Roll"],
    helpfulCount: 38
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    location: "Norfolk, VA",
    rating: 5,
    date: "October 2026",
    verifiedDiner: true,
    visitType: "Family Birthday",
    content: "We brought a party of 10 for my father's 70th birthday. The online reservation process was super smooth and our large booth was ready the minute we walked through the doors. The staff constantly cleared our empty crab shell bowls and refilled drinks with genuine smiles. Outstanding value for the quality of seafood provided!",
    favoriteItems: ["Live Sizzling Hibachi Steak & Shrimp", "Honey Walnut Jumbo Shrimp", "Belgian Chocolate Fountain"],
    helpfulCount: 29
  },
  {
    id: "rev-3",
    author: "David K. Henderson",
    location: "Chesapeake, VA",
    rating: 5,
    date: "1 week ago",
    verifiedDiner: true,
    visitType: "Weekend Dinner",
    content: "If you love raw bar and fresh seafood, this is the spot. The peel-and-eat shrimp were huge, fresh, and snapping crisp. The hibachi grill is a great touch where you choose your exact vegetables, meat, and garlic noodles. The whole restaurant on Holland Road is spotless and well managed.",
    favoriteItems: ["Chilled Peel & Eat Gulf Shrimp", "Steamed Chesapeake Blue Crabs", "Hibachi Garlic Butter Udon Noodles"],
    helpfulCount: 22
  },
  {
    id: "rev-4",
    author: "Samantha & Brian T.",
    location: "Virginia Beach, VA",
    rating: 5,
    date: "October 2026",
    verifiedDiner: true,
    visitType: "Weekday Lunch",
    content: "The lunch price of $18.99 is unbeatable for the sheer variety you get. You can get fresh nigiri, hot wok specialties, and custom stir fry cooked right in front of you. Plus, signing up for the Ocean Club rewards earned us points towards our next weekend crab dinner. Highly recommended!",
    favoriteItems: ["Fresh Atlantic Salmon Nigiri", "Cantonese Ginger-Scallion Steamed Flounder", "Fresh Cut Citrus & Tropical Fruit"],
    helpfulCount: 16
  },
  {
    id: "rev-5",
    author: "Captain Rick Morales",
    location: "Virginia Beach Oceanfront, VA",
    rating: 5,
    date: "2 weeks ago",
    verifiedDiner: true,
    visitType: "Weekend Dinner",
    content: "As a local fisherman, I am picky about seafood freshness. Ocean Grill does it right: the crabs are heavy and sweet, not hollow, and the oysters on the half shell are briny and clean. Great atmosphere for families and seafood die-hards alike.",
    favoriteItems: ["Steamed Chesapeake Blue Crabs", "Fresh Atlantic Oysters", "Salt & Pepper Dungeness Crab Bites"],
    helpfulCount: 45
  }
];

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: "rew-1",
    title: "$10 Off Any Buffet Visit",
    pointsCost: 200,
    description: "Enjoy $10 instant discount deducted directly from your table bill at checkout.",
    tierRequired: "Pearl",
    voucherCodePrefix: "OG10-",
    iconName: "TicketPercent"
  },
  {
    id: "rew-2",
    title: "Complimentary Jumbo Crab Cluster",
    pointsCost: 350,
    description: "Receive an extra chef-steamed jumbo premium Alaskan crab cluster brought directly to your table with garlic herb butter.",
    tierRequired: "Coral",
    voucherCodePrefix: "CRAB-",
    iconName: "UtensilsCrossed"
  },
  {
    id: "rew-3",
    title: "Free Weekend Seafood Feast Pass",
    pointsCost: 600,
    description: "One complete complimentary all-you-can-eat weekend dinner seafood buffet pass valid any Friday, Saturday or Sunday.",
    tierRequired: "Coral",
    voucherCodePrefix: "FEAST-",
    iconName: "Gift"
  },
  {
    id: "rew-4",
    title: "VIP Family Feast Table for 4 (50% Off)",
    pointsCost: 1000,
    description: "Bring 4 guests and enjoy 50% off the entire table bill plus reserved private booth seating with champagne flutes or sparkling cider.",
    tierRequired: "Golden Trident",
    voucherCodePrefix: "VIP4-",
    iconName: "Crown"
  }
];
