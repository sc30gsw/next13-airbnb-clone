import { getServerSession } from 'next-auth'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchListings from '@/hooks/useFetchListings'
import authOptions from '@/libs/authOptions'
import type { ListingsParams } from '@/types/ListngsParams'

type HomeProps = {
  searchParams: ListingsParams
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const listings = await useFetchListings(searchParams)

  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')

  if (listings.length === 0) return <EmptyState showReset />

  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
