import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from 'next/link'; 
import { SignIn, SignUp} from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">
            <AppBar position="static">
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        sx={{ flexGrow: 1 }}
                    >
                        FlashCard SaaS
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            SignUp
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/" passHref>
                            Dashboard
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <SignUp/>
            </Box>
        </Container>
    );
}
