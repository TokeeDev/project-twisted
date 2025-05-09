// app/info/page.tsx
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Twisted Cantina – Info',
}

export default function InfoPage() {
  return (
    <main className="bg-black text-[#DDD] font-inter">
      {/* Hero */}
      <section
        className="relative h-[80vh] min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/inside-bar.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-orbitron text-[3rem] text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]">
            Info
          </h1>
          <p className="font-vt323 text-lg text-[#EEE] mt-2">
            All you need to know before you arrive
          </p>
        </div>
      </section>

      {/* History */}
      <section className="bg-[#121212] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-orbitron text-2xl text-[#39FF14] drop-shadow-[0_0_6px_#39FF14] mb-4">
              Our Story
            </h2>
            <p className="mb-4">
              Since opening in early 2019, Twisted Cantina has fused
              Mexican-inspired street eats with craft cocktails and late-night DJs
              to become a Pilsen staple.
            </p>
            <ul className="space-y-2 text-[#EEE]">
              <li className="flex items-center">
                <span className="mr-2 text-[#39FF14]">•</span>2019: Grand
                opening in Pilsen
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[#39FF14]">•</span>2020: “Best Mule”
                award
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[#39FF14]">•</span>2022: Bulgogi tacos
                launch
              </li>
            </ul>
          </div>
          <Image
            src="/history-placeholder.jpg"
            alt="Archival shot of Twisted Cantina"
            width={600}
            height={400}
            className="w-full rounded"
          />
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="h-64 rounded overflow-hidden">
            {/* swap src with your embed URL */}
            <iframe
              src="https://maps.google.com/maps?q=1640%20S%20Blue%20Island%20Ave%20Chicago&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-orbitron text-xl text-[#39FF14] drop-shadow-[0_0_6px_#39FF14] mb-2">
              1640 S Blue Island Ave, Chicago, IL 60608
            </h3>
            <ul className="mb-4">
              <li>Wed–Sun: 5 PM–2 AM</li>
              <li>Closed: Mon & Tue</li>
            </ul>
            <a href="#" className="text-[#39FF14] underline">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#121212] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-800 overflow-hidden rounded group"
            >
              <Image
                src={`/gallery-${i + 1}.jpg`}
                alt={`Gallery image ${i + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105 border-2 border-transparent group-hover:border-[#39FF14]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Social */}
      <section className="py-8 text-center">
        <a
          href="tel:+13122650923"
          className="mx-4 text-lg text-[#EEE] inline-block"
        >
          📞 (312) 265-0923
        </a>
        <a
          href="https://instagram.com/TwistedCantina"
          target="_blank"
          className="mx-4 text-lg text-[#EEE] inline-block"
        >
          📸 @TwistedCantina
        </a>
        <a
          href="mailto:info@twistedcantina.com"
          className="mx-4 text-lg text-[#EEE] inline-block"
        >
          ✉️ Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-[#121212] text-center font-orbitron">
        <nav className="space-x-6">
          <a href="/menu" className="text-[#EEE]">
            Menu
          </a>
          <a href="/events" className="text-[#EEE]">
            Events
          </a>
          <a href="/info" className="text-[#EEE]">
            Info
          </a>
        </nav>
      </footer>
    </main>
  )
}
