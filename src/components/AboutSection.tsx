export default function AboutSection() {
  return (
    <section className="py-20 bg-white text-black">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            About Us
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="prose prose-lg mx-auto max-w-none">
          <div className="text-lg md:text-xl leading-relaxed space-y-6 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
            <p className="italic text-sm uppercase tracking-wider mb-8 text-gray-600">
              (typeset like a 1964 magazine advert—wry, direct, a wink to the over‑worked reader)
            </p>
            
            <p>
              You've met the modern office worker: eyes rimmed in blue‑light fatigue, tabs multiplying like rabbits, pipeline dashboards blinking "almost there." We were those workers - Josh juggling fundraising technology & campaigns that saved pennies on dollars, Mik tokenising characters at 3 a.m.—until we asked a forbidden question: <em>"Why can't the best closer in the room work for everyone at once?"</em>
            </p>
            
            <p>
              So we mixed Josh's knack for squeezing gold out of cold lists with Mik's talent for cloning talent in code, and bottled the result as Konverter.ai. Press the shiny button, and an expert‑built AI agent springs to life—first enhancing your contacts with our Data Oracle, then emailing, texting, calling, and (most deliciously) closing while you refill your coffee. The specialists behind each agent earn a rev‑share, so their playbooks keep improving long after your first deal lands.
            </p>
            
            <p>
              We're the ex‑Airbnb/Web3 misfits who still believe technology should feel like a superpower, not a second job. If you're done chasing every "growth hack" in the drawer, let Konverter turn intention into revenue—two clicks, zero code, and not a single late‑night Zapier reroute ever again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}