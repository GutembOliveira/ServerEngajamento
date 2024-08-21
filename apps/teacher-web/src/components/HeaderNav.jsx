import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { AppBar, Box, Button, Container, Divider, Drawer, MenuItem, Typography, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

// const logoStyle = {
//   width: '140px',
//   height: 'auto',
//   cursor: 'pointer',
// };

function ToggleColorMode({ mode, toggleColorMode }) {
  return (
    <Box sx={{ maxWidth: '40px' }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="medium"
        aria-label="button to toggle theme"
        sx={{ minWidth: '40px', height: '40px', p: '4px' }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="medium" />
        ) : (
          <ModeNightRoundedIcon fontSize="medium" />
        )}
      </Button>
    </Box>
  );
}

export default function HeaderNav({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const scrollToSection = (sectionId) => {
  //   const sectionElement = document.getElementById(sectionId);
  //   const offset = 128;
  //   if (sectionElement) {
  //     const targetScroll = sectionElement.offsetTop - offset;
  //     sectionElement.scrollIntoView({ behavior: 'smooth' });
  //     window.scrollTo({
  //       top: targetScroll,
  //       behavior: 'smooth',
  //     });
  //     setOpen(false);
  //   }
  // };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ml: '-18px',
                px: 5,
              }}
            >
              <h3>Engajamento</h3>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => navigate('/quizzes')}
                  sx={{ py: '6px', px: '36px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Quizzes
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => navigate('/classes')}
                  sx={{ py: '6px', px: '36px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Classes
                  </Typography>
                </MenuItem>
                
              </Box>

            </Box>
            
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 4,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
              >
                Login
              </Button>

              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
              >
                Nova Conta
              </Button>
            </Box>

            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                  </Box>

                  <MenuItem onClick={() => {}}>
                    Quizzes
                  </MenuItem>

                  <MenuItem onClick={() => {}}>
                    Classes
                  </MenuItem>
                  
                  <Divider />

                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Nova Conta
                    </Button>
                  </MenuItem>

                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Login
                    </Button>
                  </MenuItem>

                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}