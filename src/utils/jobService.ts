import axios from 'axios';
import type { Job } from '../types/job';

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
  return response.data.data || [];
};
