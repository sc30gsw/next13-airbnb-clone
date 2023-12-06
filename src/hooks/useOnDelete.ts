import type { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import type { SafeUser } from '@/types/SafeUser'

type TParams = {
  // reservationIdとlistingIdが渡ってくるためidと命名
  params: { id: string; userId: string }
}

const useOnDelete = (
  deleteModel: ({
    params,
  }: TParams) => Promise<{ reservation?: Reservation; listing?: Listing }>,
  currentUser?: SafeUser | null,
) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onDelete = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        await deleteModel({
          params: { id, userId: currentUser?.id as string },
        })
        toast.success('Reservation cancelled')
        router.refresh()
      } catch (err) {
        toast.error('Something Went Wrong')
      } finally {
        setDeletingId('')
      }
    },
    [currentUser?.id, deleteModel, router],
  )

  return { deletingId, onDelete }
}

export default useOnDelete
