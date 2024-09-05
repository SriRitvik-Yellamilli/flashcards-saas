'use client'
import { useUser } from '@clerk/nextjs'
import { Container, Box, Typography, Button, Paper, TextField, Grid, CardActionArea, DialogContentText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { writeBatch, doc, getDoc, collection, setDoc, CollectionReference } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { db } from '@/firebase'
import { Router } from 'next/router'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const colRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(DocRef)
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }
            else {
                await setDoc(DocRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <Container>
            <Typography variant="h4" align="center">Please sign in to view your flashcards</Typography>
        </Container>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcards?id=${id}`)
    }

    return <Container>
        <Typography variant="h4" align="center">Flashcards</Typography>
        <Grid container spacing={2}>
            {flashcards.map((flashcard) => (
                <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                    <Card>
                        <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                            <Box p={2}>
                                <Typography variant="h6">{flashcard.name}</Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
}

