import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import Head from 'next/head';

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      }
    })

    const checkoutSessionResponse = await checkoutSession.json()

    if (checkoutSessionResponse.statusCode === 5000) {
      console.error('Checkout session failed')
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionResponse.id
    })

    if (error) {
      console.warn('Error:', error)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcards SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Signup</Button>
          </SignedOut>
          <SignedIn>
            <Button>Dashboard</Button>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to create flashcards to boost your learning!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy to use!</Typography>
            <Typography>
              Simply enter your text, and we will create flashcards for you by letting our software do the work!
              Creating flashcards has never been easier!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              Our AI Intelligence will help you learn more effectively by
              breaking down your text into concise flashcards, perfect for studying!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere & Anytime</Typography>
            <Typography>
              Accessible anywhere and anytime, our flashcards are designed to fit your schedule!
              Study on the go!
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic Plan</Typography>
              <Typography variant="h6" gutterBottom>$1 / Month</Typography>
              <Typography>
                 All the basic features and limited storage to get you started!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
             <Typography variant="h5" gutterBottom>Pro Plan</Typography>
             <Typography variant="h6" gutterBottom>$3 / Month</Typography>
              <Typography>
                Unlock advanced features with our Pro Plan, perfect for power users!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
