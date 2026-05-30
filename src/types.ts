export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  specs: TechnicalSpec[];
  alloyGrades: string[];
  applications: string[];
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
  stats: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  productId: string;
  alloyGrade: string;
  quantityKg: number;
  specifications: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  iconName: string;
  description: string;
}
