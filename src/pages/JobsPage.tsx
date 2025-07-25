import { useEffect, useState, useMemo } from 'react';
import { fetchJobs } from '../utils/jobService';
import type { Job } from '../types/job';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/bookmarkSlice';
import type { RootState } from '../redux/store';
import useDebounce from '../hooks/useDebounce';
import LoadingSkeleton from '../components/LoadingSkeleton';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Pagination,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'company'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedSearch = useDebounce(searchTerm, 300);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBookmark = (job: Job) => {
    const isBookmarked = bookmarks.some(j => j.slug === job.slug);
    isBookmarked ? dispatch(removeBookmark(job.slug)) : dispatch(addBookmark(job));
  };

  useEffect(() => {
    fetchJobs()
      .then(data => setJobs(data))
      .catch(err => {
        console.error('API Error', err);
        setError('Failed to fetch jobs. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(term) ||
          job.company_name.toLowerCase().includes(term)
      );
    }
    if (remoteOnly) filtered = filtered.filter(job => job.remote === true);
    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (sortBy === 'date') {
      filtered.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === 'company') {
      filtered.sort((a, b) => a.company_name.localeCompare(b.company_name));
    }
    return filtered;
  }, [debouncedSearch, remoteOnly, locationFilter, sortBy, jobs]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredJobs.slice(start, end);
  }, [filteredJobs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, remoteOnly, locationFilter, sortBy]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Job Listings
      </Typography>
      <Stack mb={3} spacing={2} direction={isMobile ? 'column' : 'row'} flexWrap="wrap">
        <TextField
          label="Search by job title or company"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={remoteOnly} onChange={() => setRemoteOnly(prev => !prev)} />}
          label="Remote Only"
        />
        <TextField
          label="Filter by location"
          variant="outlined"
          size="small"
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
        />
        <Select
          value={sortBy}
          size="small"
          onChange={e => setSortBy(e.target.value as 'date' | 'company')}
        >
          <MenuItem value="date">Most Recent</MenuItem>
          <MenuItem value="company">Company Name (A-Z)</MenuItem>
        </Select>
      </Stack>

      {loading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredJobs.length === 0 ? (
        <Typography>No jobs found.</Typography>
      ) : (
        <>
          {paginatedJobs.map(job => (
            <JobCard
              key={job.slug}
              job={job}
              onBookmark={() => handleBookmark(job)}
              isBookmarked={bookmarks.some(j => j.slug === job.slug)}
            />
          ))}

          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredJobs.length / itemsPerPage)}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              size={isMobile ? 'small' : 'medium'}
              siblingCount={isMobile ? 0 : 1}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                  fontWeight: 500
                }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default JobsPage;
