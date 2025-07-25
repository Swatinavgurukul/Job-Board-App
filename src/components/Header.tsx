import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            py: 1,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <WorkOutlineIcon color="primary" />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
            >
              Job Board
            </Typography>
          </Stack>

          <Box display="flex" gap={1} mt={isMobile ? 1 : 0}>
            {isMobile ? (
              <>
                <Tooltip title="Jobs">
                  <IconButton
                    component={Link}
                    to="/jobs"
                    color={pathname === '/jobs' ? 'primary' : 'default'}
                  >
                    <ListAltIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bookmarks">
                  <IconButton
                    component={Link}
                    to="/bookmarks"
                    color={pathname === '/bookmarks' ? 'primary' : 'default'}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/jobs"
                  variant={pathname === '/jobs' ? 'contained' : 'text'}
                  color="primary"
                >
                  Jobs
                </Button>
                <Button
                  component={Link}
                  to="/bookmarks"
                  variant={pathname === '/bookmarks' ? 'contained' : 'text'}
                  color="primary"
                >
                  Bookmarks
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
