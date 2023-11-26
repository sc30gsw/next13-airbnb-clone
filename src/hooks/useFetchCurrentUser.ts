const useFetchCurrentUser = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/current?userId=${userId || ''}`,
      {
        next: { tags: ['layout'] },
      },
    )

    if (!response.ok) return null

    const currentUser = await response.json()

    return currentUser
  } catch (err) {
    return null
  }
}

export default useFetchCurrentUser
