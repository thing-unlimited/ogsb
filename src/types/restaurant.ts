export interface MenuItem {
  id: string;
  name: string;
  category: 'seafood' | 'sushi' | 'hibachi' | 'hot-entrees' | 'fruits-salad' | 'desserts';
  categoryLabel: string;
  description: string;
  tags: string[];
  isSignature?: boolean;
  isPopular?: boolean;
  image?: string;
  dietary?: ('Gluten-Free' | 'Shellfish' | 'Dairy-Free' | 'Vegetarian' | 'Spicy')[];
  prepStyle?: string;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingZone: 'main-hall' | 'sushi-booths' | 'hibachi-side' | 'private-banquet';
  occasion?: string;
  specialRequests?: string[];
  notes?: string;
  status: 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  tierRequired: 'Pearl' | 'Coral' | 'Golden Trident';
  voucherCodePrefix: string;
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verifiedDiner: boolean;
  visitType: 'Weekend Dinner' | 'Weekday Lunch' | 'Family Birthday' | 'Hibachi Night';
  content: string;
  favoriteItems: string[];
  helpfulCount: number;
}

export interface BuffetPricing {
  tier: string;
  hours: string;
  days: string;
  adultPrice: number;
  kidsPrice3to6: number;
  kidsPrice7to10: number;
  seniorDiscount: string;
  highlights: string[];
}
