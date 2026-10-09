export type CategoryId = 'cakes' | 'cookies' | 'bread' | 'desserts' | 'custom';

export interface CakeSizeOption {
  label: string;
  weight: string;
  serves: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  subCategory?: string;
  shortDescription: string;
  longDescription: string;
  tastingNotes: string[];
  allergens: string[];
  egglessAvailable: boolean;
  isPureVegDefault: boolean;
  isSignature: boolean;
  rating: number;
  reviewCount: number;
  preparationTimeHours: number;
  sizes: CakeSizeOption[];
  visualTheme: {
    accentGradient: string;
    cakeType: 'chocolate-lava' | 'truffle' | 'fruit-gateau' | 'red-velvet' | 'butterscotch' | 'cookie' | 'bread' | 'cheesecake' | 'brownie';
    primaryColor: string;
  };
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  deliveryRadiusKm: number;
  servicedPinCodes: string[];
  pickupReadyMinutes: number;
  landmark: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  category: CategoryId;
  selectedSize: CakeSizeOption;
  isEggless: boolean;
  customMessage?: string;
  quantity: number;
  unitPrice: number;
  addOns: {
    sparkleCandle?: boolean;
    luxuryGiftBox?: boolean;
    greetingCard?: { message: string };
  };
}

export interface CustomCakeRequest {
  occasion: string;
  flavor: string;
  frosting: string;
  sizeWeight: string;
  shape: string;
  isEggless: boolean;
  cakeMessage: string;
  themeStyle: string;
  uploadedPhotoName?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  selectedBranchId: string;
  customerName: string;
  customerPhone: string;
  specialNotes?: string;
  estimatedPrice: number;
}

export interface OrderRecord {
  orderId: string;
  items: CartItem[];
  branch: Branch;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryAddress?: {
    street: string;
    area: string;
    pinCode: string;
    landmark?: string;
  };
  deliveryDate: string;
  deliveryTimeSlot: string;
  customerName: string;
  customerPhone: string;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  gstTax: number;
  discount: number;
  grandTotal: number;
  status: 'confirmed' | 'baking' | 'decorating' | 'out_for_delivery' | 'delivered';
  placedAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  branchName: string;
  city: string;
  rating: number;
  date: string;
  occasion: string;
  productName: string;
  comment: string;
  verified: boolean;
}
