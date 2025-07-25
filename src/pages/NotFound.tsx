import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ paddingY: 10, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom color="error">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to="/jobs"
        variant="contained"
        color="primary"
      >
        Go Back to Jobs
      </Button>
    </Container>
  );
};

export default NotFound;
