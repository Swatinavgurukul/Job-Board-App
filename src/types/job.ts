export interface Job {
  slug: string;
  title: string;
  company_name: string;
  location: string;
  remote: boolean;
  created_at: string;
  [key: string]: any;
}
