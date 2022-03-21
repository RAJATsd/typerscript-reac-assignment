export interface JOB {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
}

export interface JOB_API {
  "0-legal-notice": string;
  "job-count": number;
  jobs: JOB[];
}
