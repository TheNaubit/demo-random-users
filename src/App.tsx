/**
 * I like to keep this file (App.tsx) outside of the pages folder
 * since it is more like a container for the pages and not a page
 * by itself
 */

import logo from '@assets/logo.svg';
import { useLogger } from '@hooks/useLogger';
import { withStore } from 'react-context-hook';
import { Box, Container, Link, Typography } from '@mui/material';
import { Image } from 'mui-image'

function App() {
  const { debug } = useLogger({tag: "App"})

  debug("Rendering app container")
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Image src={logo} alt="logo" showLoading />
        <Typography variant="body1" component="p">
          Edit <code>src/App.tsx</code> and save to reload.
        </Typography>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Link>
      </Box>
    </Container>
  );
}

export default withStore(App);
