'use client'

import { useUser } from "@clerk/nextjs";
import { Container, Box, Typography, Button, Paper, TextField, Grid, CardActionArea, DialogContentText, Dialog, DialogTitle, DialogContent, DialogActions, CardContent } from '@mui/material'
import { doc, getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (! search || ! user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docSnap = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <Container>
            <Typography variant="h4" align="center">Please sign in to view your flashcards</Typography>
        </Container>
    }

    return <Container maxWidth = "100vw">
        <Grid container spacing = {3} sx = {{mt: 4}}>
        {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Flashcards Preview</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                       <Box sx={{
                                        perspective: '1000px',
                                        '& > div': {
                                            transition: 'transform 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                       },
                                       '& > div > div': {
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                        boxSizing: 'border-box',
                                   },
                                       '& > div > div:nth-of-type(2)': {
                                        transform: 'rotateY(180deg)',
                                   },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back} {/* Changed from 'front' to 'back' */}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box> 
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleOpen} variant="contained" color="secondary">
                            Save
                            </Button>
                        </Box>
                </Box>
            )}
        </Grid>
    </Container>
}
    
    

