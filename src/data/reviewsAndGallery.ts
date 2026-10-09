import { CustomerReview } from '../types/bakery';

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Priya Ramanathan',
    branchName: 'Anna Nagar Flagship',
    city: 'Chennai',
    rating: 5,
    date: '3 days ago',
    occasion: '1st Birthday Celebration',
    productName: 'Belgian Molten Chocolate Lava Cake',
    comment: 'Ordered the 2kg Belgian Lava Cake for my son’s 1st birthday. The molten chocolate core was an absolute showstopper! All our guests kept asking which bakery it was from. Delivered sharp at 5 PM as promised.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Karthik Subramanian',
    branchName: 'R.S. Puram Gourmet Studio',
    city: 'Coimbatore',
    rating: 5,
    date: '1 week ago',
    occasion: '25th Wedding Anniversary',
    productName: 'Custom 2-Tier Floral Velvet Cake',
    comment: 'The team at R.S. Puram Coimbatore coordinated everything over WhatsApp after I submitted the custom cake builder form. The floral finish was identical to our reference image and 100% eggless as requested by my parents.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Meera Vijayakumar',
    branchName: 'Trichy Thillai Nagar',
    city: 'Tiruchirappalli',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Farewell Party',
    productName: 'Alphonso Mango & Fresh Cream Gateau',
    comment: 'Hands down the freshest mango cake in Trichy. Light, not overly sweet, with real chunks of mango. The Thillai Nagar staff packaged it securely in a chilled thermal box.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Dr. Anand Kumar',
    branchName: 'Madurai K.K. Nagar',
    city: 'Madurai',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Housewarming',
    productName: 'Dutch Truffle Royale',
    comment: 'Clean pricing with zero surprises at checkout. The chocolate truffle was silky and rich. Love having a premium bakery like Lava Cakes in KK Nagar Madurai.',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Sangeetha R.',
    branchName: 'Salem Fairlands Boutique',
    city: 'Salem',
    rating: 4.9,
    date: '3 weeks ago',
    occasion: 'Office Milestone',
    productName: 'Double Belgian Chocolate Chunk Cookies & Brownies',
    comment: 'We ordered 3 cookie tins and brownie boxes for our team celebration. The warm gooey center of the cookies was divine with evening tea.',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Ramesh Balaji',
    branchName: 'OMR Tech Corridor',
    city: 'Chennai',
    rating: 5,
    date: 'Last month',
    occasion: 'Surprise Birthday Delivery',
    productName: 'Red Velvet Philadelphia Cream Cheese',
    comment: 'Live order tracking kept me calm throughout. The driver reached our apartment in Thoraipakkam right on time with candles and message card neatly printed.',
    verified: true,
  },
];

export interface CakeGalleryItem {
  id: string;
  title: string;
  occasion: 'Birthday' | 'Anniversary' | 'Kids Theme' | 'Wedding' | 'Minimalist';
  flavor: string;
  branch: string;
  weight: string;
  badge: string;
  colorScheme: string;
  description: string;
}

export const REAL_CAKE_GALLERY: CakeGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Midnight Gold Ganache Drip Cake',
    occasion: 'Birthday',
    flavor: 'Belgian Dark Truffle & Espresso',
    branch: 'Anna Nagar, Chennai',
    weight: '1.5 kg',
    badge: 'Trending Design',
    colorScheme: 'from-amber-950 via-stone-900 to-amber-900',
    description: 'Glossy chocolate mirror drip with gold dust macaron toppers and fresh dark cherries.',
  },
  {
    id: 'gal-2',
    title: 'Enchanted Butterfly Pastel Dream',
    occasion: 'Kids Theme',
    flavor: 'Strawberry Vanilla Cream',
    branch: 'R.S. Puram, Coimbatore',
    weight: '2.0 kg',
    badge: 'Kids Favorite',
    colorScheme: 'from-rose-400 via-pink-300 to-amber-200',
    description: 'Edible wafer butterflies, soft watercolor buttercream gradient, and hand-piped pastel rosettes.',
  },
  {
    id: 'gal-3',
    title: '2-Tier Rustic Floral Naked Cake',
    occasion: 'Wedding',
    flavor: 'Red Velvet & White Truffle',
    branch: 'T. Nagar, Chennai',
    weight: '3.5 kg',
    badge: 'Wedding Masterpiece',
    colorScheme: 'from-amber-100 via-stone-200 to-amber-300',
    description: 'Semi-naked crumb coat with fresh rosemary sprigs, eucalyptus, and blush roses.',
  },
  {
    id: 'gal-4',
    title: 'Silver Jubilee Pearl Heart Cake',
    occasion: 'Anniversary',
    flavor: 'Dutch Chocolate Molten Lava',
    branch: 'Madurai K.K. Nagar',
    weight: '1.0 kg',
    badge: 'Anniversary Special',
    colorScheme: 'from-stone-900 via-rose-950 to-stone-900',
    description: 'Vintage lambeth piping, sugar pearls, and personalized chocolate calligraphy plaque.',
  },
  {
    id: 'gal-5',
    title: 'Contemporary Botanical Minimalist',
    occasion: 'Minimalist',
    flavor: 'Mango Mascarpone Gateau',
    branch: 'Salem Fairlands',
    weight: '1.5 kg',
    badge: 'Modern Aesthetic',
    colorScheme: 'from-amber-400 via-yellow-200 to-amber-500',
    description: 'Sharp edge frosting, textured gold leaf edges, and fresh dried citrus rounds.',
  },
  {
    id: 'gal-6',
    title: 'Space Galaxy Explorer Tier Cake',
    occasion: 'Kids Theme',
    flavor: 'Belgian Truffle Crunch',
    branch: 'Velachery, Chennai',
    weight: '2.5 kg',
    badge: 'Custom Sculpted',
    colorScheme: 'from-indigo-950 via-purple-900 to-stone-950',
    description: 'Deep galaxy mirror glaze with astronaut figurine, chocolate spheres, and edible constellations.',
  },
];
