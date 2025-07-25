import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import type { Job } from '../types/job';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/bookmarkSlice';
import type { RootState } from '../redux/store';

interface JobCardProps {
  job: Job;
  isBookmarked?: boolean; // Optional prop
  onBookmark?: () => void; // Optional prop
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onBookmark }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);

  // If prop is not passed, calculate locally
  const bookmarked = typeof isBookmarked === 'boolean'
    ? isBookmarked
    : bookmarks.some((b) => b.slug === job.slug);

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(); // use external handler if provided
    } else {
      if (bookmarked) {
        dispatch(removeBookmark(job.slug));
      } else {
        dispatch(addBookmark(job));
      }
    }
  };

  return (
    <Card sx={{ marginBottom: 2, backgroundColor: 'background.paper', color: 'text.primary' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{job.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {job.company_name} &mdash; {job.location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Remote: {job.remote ? 'Yes' : 'No'}</Typography>
        <Typography variant="body2">Posted: {new Date(job.created_at).toLocaleDateString()}</Typography>

        <Box mt={2}>
          <Button
            variant={bookmarked ? 'contained' : 'outlined'}
            color="primary"
            onClick={handleBookmark}
          >
            {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
