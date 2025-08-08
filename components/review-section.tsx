import { Star, StarHalf } from "lucide-react"
import Image from "next/image"

interface Review {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export function ReviewSection() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "saint",
      role: "",
      content:
        "ngl this did NOT pmo. ts hella tuff icl, absolute cinema 🥀🔥 -saintlyr",
      rating: 5,
      avatar: "IMG_5606.png",
    },
    {
      id: 2,
      name: "Astric",
      role: "",
      content:
        "Chat his certs are legit i had mine for like 3 months now and it worked from the start. If you think i'm a bot message xyrevexx im more legit than my dads love for me",
      rating: 5,
      avatar: "IMG_5607.png",
    },
    {
      id: 3,
      name: "sahir4og",
      role: "",
      content:
        "These certs r lit fire. I cant live without cracked spotify and Loyah’s certs got me for a whole year. thats A YEAR of free spotify premium for $12 basically. Best purchase.",
      rating: 5,
      avatar: "IMG_5608.png",
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-5 w-5 fill-[hsl(var(--highlight-yellow))] text-[hsl(var(--highlight-yellow))]"
        />,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="h-5 w-5 fill-[hsl(var(--highlight-yellow))] text-[hsl(var(--highlight-yellow))]"
        />,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />)
    }

    return stars
  }

  return (
    <section className="py-16 px-4 md:px-6 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Join other customers of mine who have trusted us with their iOS signing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-background rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-3">{renderStars(review.rating)}</div>
              <p className="text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
