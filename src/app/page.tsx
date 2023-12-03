import { getServerSession } from 'next-auth'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchListings from '@/hooks/useFetchListings'
import authOptions from '@/libs/authOptions'

const Home = async () => {
  const listings = await useFetchListings()

  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')

  if (listings.length === 0) return <EmptyState showReset />

  return (
    <Container>
      <div className="pt-24 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Home
