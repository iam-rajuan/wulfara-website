export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  total?: number;
  data: T;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export interface Category {
  _id: string;
  name: string;
  slug?: string;
}

export interface SupplierProduct {
  _id?: string;
  title?: string;
  name?: string;
}

export interface SupplierLocation {
  formattedAddress?: string;
  coordinates?: [number, number] | number[];
}

export interface SupplierContactInfo {
  address?: string;
  website?: string;
}

export interface FeaturedHeroPlacement {
  enabled?: boolean;
  activatedAt?: string;
}

export interface Supplier {
  _id: string;
  user: string;
  companyName: string;
  description?: string;
  logo?: string;
  location?: SupplierLocation;
  contactInfo?: SupplierContactInfo;
  contactPhone?: string;
  contactEmail?: string;
  categories?: Category[];
  coreProducts?: string[];
  products?: Array<SupplierProduct | string>;
  services?: SupplierProduct[];
  supplierType?: string;
  avgResponseTime?: string;
  contactAddress?: string;
  address?: string;
  subscriptionPlan?: string;
  isApproved?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
  featuredHeroPlacement?: FeaturedHeroPlacement;
  serviceAreas?: string[];
  averageRating?: number;
  totalReviews?: number;
  certifications?: string[];
  employeeCount?: string;
  establishedYear?: string | number;
  annualTurnover?: string;
  gallery?: Array<{ url: string }>;
}

export interface Favorite {
  _id: string;
  createdAt?: string;
  supplier?: Supplier | string | null;
}

export interface Rfq {
  _id?: string;
  rfqNumber?: string;
  title?: string;
  status?: string;
  supplier?: Supplier;
  quantity?: number | string;
  details?: string;
  updatedAt?: string;
  subject?: string;
  attachments?: string[];
}

export interface UploadUrlData {
  uploadUrl: string;
  key?: string;
  url?: string;
  fileUrl?: string;
}

export interface MessageUser {
  _id: string;
  name?: string;
  role?: string;
}

export interface ChatMessage {
  _id?: string;
  id?: string | number;
  conversation?: string;
  sender?: MessageUser | string;
  text?: string;
  isFile?: boolean;
  fileName?: string;
  fileUrl?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  participants?: MessageUser[];
  lastMessage?: ChatMessage | null;
  lastMessageAt?: string;
  rfq?: Rfq | null;
  hasUnread?: boolean;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface CmsPage {
  _id: string;
  slug: string;
  title?: string;
  htmlContent?: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  buyer?: MessageUser;
}
