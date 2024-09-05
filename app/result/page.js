'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getStripe } from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            if (!sessionId) {
                setError('No session ID provided')
                return
            }

            try {
                const response = await fetch(`/api/checkout/session?session_id=${sessionId}`)
                const sessionData = await response.json()
                
                if (response.ok) {
                    setSession(sessionData)
                } else {
                    setError('Failed to fetch checkout session')
                }
            } catch (error) {
                setError('Error fetching checkout session')
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [sessionId])
}

export default ResultPage

