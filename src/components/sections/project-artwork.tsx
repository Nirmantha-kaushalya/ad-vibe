type ArtworkVariant = "studio" | "aster" | "nectar" | "luma" | "folio" | "field";

const descriptions: Record<ArtworkVariant, string> = {
  studio: "Ad Vibe studio visual identity poster",
  aster: "Aster identity and editorial design concept",
  nectar: "Nectar skincare packaging design concept",
  luma: "Luma culture campaign design concept",
  folio: "Folio editorial design concept",
  field: "Field & Form visual identity concept",
};

export function ProjectArtwork({
  variant,
  className = "",
}: {
  variant: ArtworkVariant;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={descriptions[variant]}
      className={`overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 800 1000"
        className="h-full w-full transition-transform duration-700 group-hover:scale-[1.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === "studio" && (
          <>
            <rect width="800" height="1000" fill="#233b35" />
            <path d="M0 800 800 180v820H0Z" fill="#d5e77a" />
            <circle cx="630" cy="205" r="194" fill="#edaa91" />
            <circle cx="630" cy="205" r="146" fill="none" stroke="#233b35" strokeWidth="2" />
            <path d="M0 0h800v1000H0z" fill="none" stroke="#f8f5ec" strokeOpacity=".32" strokeWidth="2" />
            <text x="52" y="112" fill="#f8f5ec" fontSize="17" letterSpacing="5">AD VIBE / INDEPENDENT DESIGN STUDIO</text>
            <text x="40" y="510" fill="#f8f5ec" fontFamily="Georgia,serif" fontSize="330" letterSpacing="-28">Aa</text>
            <text x="56" y="616" fill="#233b35" fontSize="18" letterSpacing="5">IDENTITY · ART DIRECTION · DIGITAL</text>
            <text x="56" y="915" fill="#233b35" fontFamily="Georgia,serif" fontSize="64">Make a mark.</text>
            <text x="58" y="955" fill="#233b35" fontSize="15" letterSpacing="4">IDEAS MADE IMPOSSIBLE TO IGNORE</text>
          </>
        )}
        {variant === "aster" && (
          <>
            <rect width="800" height="1000" fill="#efc8b9" />
            <circle cx="405" cy="495" r="278" fill="#9e3e35" />
            <circle cx="405" cy="495" r="215" fill="none" stroke="#f7e8d4" strokeWidth="2" />
            <path d="M405 150v690M60 495h690" stroke="#f7e8d4" strokeOpacity=".65" />
            <text x="52" y="90" fill="#682c29" fontSize="16" letterSpacing="5">ASTER / BOTANICAL HOUSE</text>
            <text x="405" y="475" fill="#f7e8d4" textAnchor="middle" fontFamily="Georgia,serif" fontSize="116">Aster</text>
            <text x="405" y="530" fill="#f7e8d4" textAnchor="middle" fontSize="16" letterSpacing="6">GROW INTO YOUR OWN</text>
            <text x="52" y="925" fill="#682c29" fontSize="15" letterSpacing="4">IDENTITY SYSTEM · EDITORIAL · 2026</text>
          </>
        )}
        {variant === "nectar" && (
          <>
            <rect width="800" height="1000" fill="#ed714d" />
            <circle cx="655" cy="195" r="126" fill="#f5d96e" />
            <path d="M0 705c175-120 315-120 470 0s235 130 330 70v225H0Z" fill="#f5d96e" />
            <rect x="286" y="300" width="228" height="460" rx="92" fill="#f3e7cf" />
            <rect x="333" y="254" width="134" height="74" rx="12" fill="#273c32" />
            <rect x="349" y="214" width="102" height="50" rx="9" fill="#273c32" />
            <path d="M314 486h172v173H314z" fill="#273c32" />
            <text x="400" y="545" fill="#f5d96e" textAnchor="middle" fontFamily="Georgia,serif" fontSize="45">nectar</text>
            <text x="400" y="582" fill="#f3e7cf" textAnchor="middle" fontSize="11" letterSpacing="4">BOTANICAL SKINCARE</text>
            <text x="54" y="92" fill="#273c32" fontSize="16" letterSpacing="5">NECTAR / MADE OF GOOD THINGS</text>
            <text x="56" y="912" fill="#273c32" fontFamily="Georgia,serif" fontSize="55">A softer kind of glow.</text>
          </>
        )}
        {variant === "luma" && (
          <>
            <rect width="800" height="1000" fill="#c9d1ec" />
            <path d="M0 0h800v220H0z" fill="#302e58" />
            <path d="M0 720h800v280H0z" fill="#f28f73" />
            <circle cx="600" cy="490" r="205" fill="#f0cf74" />
            <path d="M600 285a205 205 0 0 1 0 410Z" fill="#f28f73" />
            <text x="50" y="92" fill="#f8f5ec" fontSize="17" letterSpacing="5">LUMA / CULTURE IN MOTION</text>
            <text x="48" y="440" fill="#302e58" fontFamily="Georgia,serif" fontSize="160">Feel</text>
            <text x="48" y="565" fill="#302e58" fontFamily="Georgia,serif" fontSize="160" fontStyle="italic">more.</text>
            <text x="52" y="925" fill="#302e58" fontSize="16" letterSpacing="5">CAMPAIGN ART DIRECTION · 2026</text>
          </>
        )}
        {variant === "folio" && (
          <>
            <rect width="800" height="1000" fill="#e9edb1" />
            <path d="M0 670 800 170v830H0Z" fill="#dc633f" />
            <path d="m78 690 196-335 194 335Z" fill="#263b35" />
            <circle cx="468" cy="388" r="93" fill="#f6eee1" />
            <path d="M78 730h640M78 758h640M78 786h640" stroke="#f6eee1" strokeWidth="3" />
            <text x="50" y="95" fill="#263b35" fontSize="17" letterSpacing="5">FOLIO / PRINTED MATTER NO. 01</text>
            <text x="54" y="905" fill="#f6eee1" fontFamily="Georgia,serif" fontSize="90">Words</text>
            <text x="58" y="950" fill="#f6eee1" fontSize="16" letterSpacing="5">AN OBJECT FOR THE CURIOUS</text>
          </>
        )}
        {variant === "field" && (
          <>
            <rect width="800" height="1000" fill="#d8e0c5" />
            <path d="M120 780V418a280 280 0 0 1 560 0v362Z" fill="#425d47" />
            <path d="M217 780V438a183 183 0 0 1 366 0v342Z" fill="#d8e0c5" />
            <path d="M315 780V458a85 85 0 0 1 170 0v322Z" fill="#d98964" />
            <path d="M400 458v326" stroke="#f1e9d7" strokeWidth="3" />
            <text x="52" y="96" fill="#314736" fontSize="17" letterSpacing="5">FIELD &amp; FORM / OBJECTS FOR SLOW LIVING</text>
            <text x="400" y="875" fill="#314736" textAnchor="middle" fontFamily="Georgia,serif" fontSize="76">A room to grow.</text>
            <text x="400" y="925" fill="#314736" textAnchor="middle" fontSize="15" letterSpacing="5">IDENTITY · PACKAGING · ART DIRECTION</text>
          </>
        )}
      </svg>
    </div>
  );
}
