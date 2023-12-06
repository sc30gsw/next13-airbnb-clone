import type { Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import type { SafeUser } from '@/types/SafeUser'

type TParams = {
  params: { reservationId: string; userId: string }
}

const useOnCancel = (
  deleteModel: ({ params }: TParams) => Promise<{ reservation: Reservation }>,
  currentUser?: SafeUser | null,
) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        await deleteModel({
          params: { reservationId: id, userId: currentUser?.id as string },
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

  return { deletingId, onCancel }
}

export default useOnCancel
