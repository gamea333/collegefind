export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  avgPackage: number;
  established: number;
  type: string;
  courses: string[];
  overview: string;
  image: string | null;
  createdAt: Date;
}

export interface CollegeCard {
  id: string;
  name: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  avgPackage: number;
  type: string;
  image: string | null;
  established: number;
}

export interface CollegeDetail extends College {
  savedBy?: SavedCollege[];
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  college?: CollegeCard;
}

export interface PaginatedColleges {
  colleges: CollegeCard[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
