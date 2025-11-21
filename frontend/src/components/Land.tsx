import { Card } from './ui/card'
import profile from "../assets/group-people-near-stage-concert_250224-175 2.png"
import { BookmarkIcon, Dumbbell, Music, PartyPopper, Tags, Ticket, Tv } from 'lucide-react'
import { useRef } from 'react';

const singers = [
  {
    id: 1,
    name: "Drake",
    date: "20 June, Toronto",
    img: "/mnt/data/da7f7cae-c349-45a0-93c5-6e0de2ba6183.png",
  },
  {
    id: 2,
    name: "Taylor Swift",
    date: "10 July, Nashville",
    img: "/images/taylor.jpg", 
  },
  {
    id: 3,
    name: "Ed Sheeran",
    date: "25 August, Los Angeles",
    img: "/images/ed.jpg",
  },
  {
    id: 4,
    name: "Billie Eilish",
    date: "30 September, Chicago",
    img: "/images/billie.jpg",
  },
  {
    id: 5,
    name: "Adele",
    date: "5 May, New York",
    img: "/images/adele.jpg",
  },
  // add more...
];
const Land = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right" = "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };
  return (
  
    <div >
         <div className='mx-100 my-20 '>
             <h1 className='text-7xl font-bold'>What Event  would you like to go to?</h1>  
             <p className='my-6 text-2xl font-medium'>Lorem ipsum dolor sit amet consectetur Asperiores, quidem.</p>        
         </div>
         <Card className='mx-70 my-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl border-thickness-4'>
            <div className='my-7 flex '>
                 <div className='flex items-center mx-20 gap-2'>
                    <Music className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>music</h1>
                 </div>
                 <div className='flex items-center mx-20 gap-2 '>
                     <Tv className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>music</h1>
                 </div>
                 <div className='flex items-center mx-20 gap-2'>
                    <Dumbbell className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>music</h1>
                 </div>
                 <div className='flex items-center mx-20 gap-2'>
                    <PartyPopper className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>music</h1>
                 </div>
            </div>
         </Card>
         <div className='flex mx-110 my-3'>
          <div className='flex items-center mx-7 gap-2 '>
                  <BookmarkIcon/>
                <h1 className='font-bold text-1xl'>Book anytime</h1>
             </div>
                 <div className='flex items-center mx-7 gap-2'>
                     <Ticket className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>Refundable tickets</h1>
                 </div>
                 <div className='flex items-center mx-7 gap-2'>
                    <Tags className="w-5 h-5" />
                    <h1 className='font-bold text-1xl'>smart deals</h1>
           </div>
          </div>
     <section className="py-12">
      
      
     
      <div className="max-w-6xl mx-auto relative">
       
        <button
          aria-label="scroll left"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 backdrop-blur hover:bg-black/60 text-white hidden md:inline-flex"
        >
            ‹
        </button>

        <button
          aria-label="scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 backdrop-blur hover:bg-black/60 text-white hidden md:inline-flex"
        >
          ›
        </button>

       
        <div className="px-6">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {singers.map((s) => (
              <div
                key={s.id}
                className="snap-start min-w-[260px] md:min-w-[320px] shrink-0"
              >
                
                <div className="bg-linear-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-xl rounded-2xl p-3 flex gap-3 items-center">
                  
                  <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden ring-1 ring-white/10">
                    
                    <img
                      src={profile}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  
                  <div className="flex-1">
                    <h3 className="text-white text-sm md:text-base font-semibold">{s.name}</h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">{s.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

   
        <div className="mt-6 px-6">
          <div className="h-1 bg-linear-to-r from-transparent via-white/6 to-transparent rounded-full" />
        </div>
      </div>
    </section>
    <div className="flex items-start gap-6">
     
      <div className="mx-16 flex flex-col gap-4">
        <Card >
          <div className="flex items-center gap-4 p-4">
            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
              <img src={profile} alt="feature" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-current">Refundable Tickets</h3>
              <p className="text-sm text-current/70 mt-1">You can pay a ticket in 2 portions throughout a fixed period of time.</p>
            </div>
          </div>
        </Card>

        <Card >
          <div className="flex items-center gap-4 p-4">
            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
              <img src={profile} alt="feature" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-current">Smart Deals</h3>
              <p className="text-sm text-current/70 mt-1">You can pay a ticket in 2 portions throughout a fixed period of time.</p>
            </div>
          </div>
        </Card>
      </div>

    
      <Card >
        <div className="flex items-center gap-6 p-6">
          <div className="w-28 h-28 rounded-md overflow-hidden shrink-0">
            <img src={profile} alt="feature big" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-current">Book Anytime!</h3>
            <p className="text-sm text-current/70 mt-2">
              You can pay a ticket in 2 portions throughout a fixed period of time. Start invoicing for free.
            </p>
          </div>
        </div>
      </Card>
    </div>
       
    </div>
  )
}

export default Land