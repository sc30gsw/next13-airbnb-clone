import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import useLoginModal from '@/hooks/useLoginModal'
import type { SafeUser } from '@/types/SafeUser'

type TUseFavorite = {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: TUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    const list = currentUser?.favoriteIds || []
    setFavorited(list.includes(listingId))
  }, [currentUser?.favoriteIds, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) return loginModal.onOpen()
      const newFavorited = !favorited
      setFavorited(newFavorited)

      try {
        if (favorited) {
          const response = await fetch(`/api/favorites/${listingId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
            body: JSON.stringify({ userId: currentUser.id }),
          })

          if (!response.ok) {
            setFavorited(!favorited)
            router.refresh()
            return
          }
        } else {
          const response = await fetch(`/api/favorites/${listingId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ userId: currentUser.id }),
          })

          if (!response.ok) {
            setFavorited(!favorited)
            router.refresh()
            return
          }
        }

        router.refresh()
        toast.success('Success')
      } catch (err) {
        console.log(err)
        setFavorited(!favorited)
        router.refresh()
        toast.error('Something went wrong')
      }
    },
    [currentUser, favorited, listingId, loginModal, router],
  )

  return { favorited, toggleFavorite }
}

export default useFavorite
