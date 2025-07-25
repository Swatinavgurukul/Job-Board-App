import { Container, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { removeBookmark } from '../redux/bookmarkSlice';
import JobCard from '../components/JobCard';

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Your Bookmarked Jobs
      </Typography>

      <Grid container spacing={3}>
        {bookmarks.map((job) => (
          <Grid item key={job.slug} xs={12} sm={6} md={4}>
            <JobCard
              job={job}
              onBookmark={() => dispatch(removeBookmark(job.slug))}
              isBookmarked
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookmarksPage;
