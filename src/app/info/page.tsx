// app/info/page.tsx
import Image from 'next/image';
import { Metadata } from 'next';
// For icons, we'd ideally use an SVG library like Heroicons or custom SVGs
// For this example, I'll use text placeholders for brevity.
// import { MapPinIcon, ClockIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Example

export const metadata: Metadata = {
  title: 'Twisted Cantina – The Full Story', // More evocative title
};

// Consider a layout component if you have a persistent header/footer across pages
// const SiteLayout = ({ children }) => <>{children}</>; // Simplified

export default function InfoPage() {
  return (
    // <SiteLayout>
    <main className="bg-gradient-to-br from-black via-zinc-950 to-black text-neutral-300 font-sans antialiased overflow-x-hidden">
      {/* Optional: Subtle animated background elements (e.g., very slow moving particles, scanlines) */}
      {/* <div className="fixed inset-0 z-0 opacity-5 pointer-events-none"> ... animated background ... </div> */}

      {/* Hero Section - Full Bleed, Immersive */}
      <section
        className="relative h-screen min-h-[700px] flex items-center justify-center text-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/inside-bar.jpg')" }} // A new, higher-quality, moodier hero image
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" /> {/* Darker, blurred overlay */}
        <div className="relative z-10 p-6 animate-fadeIn"> {/* Simple fade-in animation */}
          <h1 className="font-orbitron text-5xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-green-500 drop-shadow-[0_0_15px_#39FF1499] mb-4">
            About Us 
          </h1>
          <p className="font-vt323 text-2xl sm:text-3xl text-neutral-400 uppercase tracking-widest animate-slideUp" style={{ animationDelay: '0.5s' }}>
            Unravel Our Story
          </p>
        </div>
      </section>

      {/* Our Story Section - Narrative & Visual */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        {/* Decorative background element - e.g. subtle geometric lines or a faint texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/geometric-pattern.svg')] bg-repeat"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/50 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                <Image
                  src="/storefront.jpg" // New, more artistic shot or heavily stylized version
                  alt="Twisted Cantina Storefront - A Pilsen Icon"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="font-orbitron text-4xl md:text-5xl mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">About Twisted</span>
              </h2>
              <p className="font-vt323 text-[#39FF14] text-lg uppercase tracking-wider mb-8">Est. 2019</p>
              <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
                <p>
                  Forged in the vibrant heart of Pilsen in early 2019, Twisted Cantina was born from a desire to meld authentic Mexican street culinary artistry with an avant-garde cocktail culture and the pulse of late-night DJ rhythms. We're not just a venue; we're a destination.
                </p>
                <p>
                  Our journey has been one of passion, innovation, and community. Each milestone reflects our commitment to an unparalleled experience.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-neutral-800 space-y-4">
                {[
                  { year: "2019", event: "Grand Opening: The legend begins in Pilsen." },
                  { year: "2020", event: "Awarded 'Chicago's Best Mule' – a testament to our mixology." },
                  { year: "2022", event: "The Bulgogi Taco Revolution: A fusion icon is born." }
                ].map(item => (
                  <div key={item.year} className="flex items-start group">
                    <span className="font-orbitron text-2xl text-[#39FF14] mr-4 group-hover:animate-pulse">›</span>
                    <div>
                      <h4 className="font-semibold text-neutral-200 text-xl">{item.year}</h4>
                      <p className="text-neutral-500">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Section - Prominent & Stylized */}
      <section className="py-20 md:py-32 bg-gradient-to-t from-zinc-950 to-black">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Connect</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "📞", label: "Call Us", value: "(312) 265-0923", href: "tel:+13122650923", color: "text-sky-400" },
              { icon: "📸", label: "Instagram", value: "@TwistedCantina", href: "https://instagram.com/TwistedCantina", target: "_blank", color: "text-pink-500" },
              { icon: "✉️", label: "Email Us", value: "jose@twistedcantina.com", href: "mailto:jose@twistedcantina.com", color: "text-amber-400" }
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="block p-8 bg-zinc-900 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#39FF14]/20 border border-transparent 
                           hover:border-[#39FF14]/50 transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`text-5xl mb-4 ${item.color} group-hover:scale-110 transition-transform duration-300`}>{item.icon}</div>
                <h4 className="font-orbitron text-2xl text-neutral-200 mb-1">{item.label}</h4>
                <p className="font-vt323 text-xl text-[#39FF14] group-hover:text-emerald-400 transition-colors duration-300">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
                
      {/* Location & Hours - Sleek & Functional */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
          <div className="relative group rounded-xl overflow-hidden shadow-xl shadow-black/40 min-h-[400px] md:min-h-[500px]">
            {/* Styled Map - consider Mapbox GL JS for full custom dark theme */}
            <iframe
              src="https://maps.google.com/maps?q=1640%20S%20Blue%20Island%20Ave%20Chicago&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=en& επισัย=-87.665&ค่า широта=41.861&โทน=dark" // Attempting a dark theme, but custom JS map is better
              className="absolute inset-0 w-full h-full border-0 filter grayscale-[0.5] contrast-[1.1] group-hover:filter-none transition-all duration-500"
              loading="lazy"
              title="Twisted Cantina Location Map"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 pointer-events-none"></div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="font-orbitron text-3xl flex items-center mb-3">
                {/* <MapPinIcon className="w-8 h-8 mr-3 text-[#39FF14]" /> */}
                <span className="text-[#39FF14] mr-3">📍</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Location</span>
              </h3>
              <p className="text-xl text-neutral-400 leading-relaxed">
                1640 S Blue Island Ave, <br />Chicago, IL 60608
              </p>
            </div>

            <div className="mb-10">
              <h3 className="font-orbitron text-3xl flex items-center mb-3">
                {/* <ClockIcon className="w-8 h-8 mr-3 text-[#39FF14]" /> */}
                <span className="text-[#39FF14] mr-3">⏳</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Hours</span>
              </h3>
              <ul className="text-xl text-neutral-400 space-y-1">
                <li><strong className="text-neutral-200">Wed–Sun:</strong> 5:00 PM – 2:00 AM</li>
                <li><strong className="text-neutral-200">Mon & Tue:</strong> Elegantly Closed</li>
              </ul>
            </div>

            <a
              href="https://maps.google.com/?q=1640 S Blue Island Ave Chicago"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 font-orbitron text-lg uppercase tracking-wider border-2 border-[#39FF14] text-[#39FF14] rounded-md 
                         hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_20px_#39FF14] transition-all duration-300 transform hover:scale-105 self-start"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section - Dynamic & Engaging */}
      <section className="py-20 md:py-32 bg-black relative">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-[#39FF14]/30 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-emerald-400/20 to-transparent rounded-full blur-3xl opacity-40 animate-pulse-slower"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <h2 className="font-orbitron text-4xl md:text-5xl text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#39FF14] via-emerald-500 to-cyan-500">Gallery</span> 
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {[
              "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pTuYYLt8IF7UCzcT0v4itRfnMqr8wyQxlEboeg",
              "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pTujKeKHIF7UCzcT0v4itRfnMqr8wyQxlEboeg",
              "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pTA11fZfTMuqRsL40XTvo5SaHGDyQbnwmKO719",
              "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pTp4Cv5TnYPEJSCp8otkINfwaBzcjvGFYq1gdT",
              "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pT3wvGa09Vf8PJI4o9kLeR2XptsuxAZj6YMiSm",
               "https://nrii7n2d7j.ufs.sh/f/kV2B6evAl8pTYqrrLqKotnsB2bKH5VvFIfDPypwkadGiNTCM",
            ].map((url, i) => (
              <div
                key={i}
                className={`relative rounded-lg overflow-hidden shadow-lg group aspect-video
                           ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-[4/3]' : ''} 
                           ${i % 5 === 0 && i % 3 !== 0 ? 'aspect-[3/4]' : ''}
                           transform transition-all duration-500 hover:!scale-110 hover:z-20`}
              >
                <Image
                  src={url}
                  alt={`Twisted Cantina Ambiance ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    image {i + 1}
                  </p>
                </div>
                 <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#39FF14] transition-all duration-300 rounded-lg"></div>
              </div>
            ))}
          </div>
           <p className="text-center mt-16 text-neutral-500 font-vt323 text-2xl">More on <a href="https://instagram.com/TwistedCantina" target="_blank" rel="noopener noreferrer" className="text-[#39FF14] hover:underline">Instagram</a></p>
        </div>
      </section>


      {/* Footer - Refined & Branded */}
      <footer className="py-16 bg-black border-t border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <nav className="flex justify-center space-x-6 sm:space-x-10 mb-8">
            {["Menu", "Events", "Info"].map(link => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className={`font-orbitron text-lg uppercase tracking-wider relative 
                           ${link === "Info" ? "text-[#39FF14]" : "text-neutral-400 hover:text-[#39FF14]"}
                           after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#39FF14] 
                           after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300`}
              >
                {link}
              </a>
            ))}
          </nav>
          <p className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-emerald-400 to-cyan-400 mb-2">
            TWISTED CANTINA
          </p>
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Twisted Cantina Inc. All Rights Reserved. Elevating Pilsen Nights.
          </p>
          <p className="text-xs text-neutral-700 mt-1">
            Crafted with passion in Chicago.
          </p>
        </div>
      </footer>
    </main>
    // </SiteLayout>
  );
}

// Add some simple CSS animations (in a global CSS file or <style jsx global>)
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
.animate-slideUp { animation: slideUp 0.8s ease-out forwards; }

.animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-pulse-slower { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

@keyframes pulse {
  50% {
    opacity: .7;
  }
}
*/