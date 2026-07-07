import Image from "next/image";

/**
 * Global app heading.
 *
 * Re-implements the `bird-id-heading.html` mockup using the existing
 * Tailwind-based styling approach already used across the app
 * (translucent panels, layered gradients, soft shadows, responsive
 * `sm:` breakpoints) instead of the standalone CSS from the mockup.
 *
 * The bird mark uses the existing PNG asset
 * `public/bird-icon-orange-transparent.png` (per request) rather than
 * the inline bird SVG from the mockup. The South African flag uses
 * the provided `public/south_africa.png` image.
 */
export default function Header() {
  return (
    <header
      aria-label="Bird Id Quiz"
      className="
        w-full flex justify-center px-3 sm:px-6 pt-3 sm:pt-6
      "
    >
      <div
        className="
          w-full max-w-[860px] flex items-center gap-3 sm:gap-[22px]
          p-3 sm:px-9 sm:py-7 rounded-[20px] sm:rounded-[24px]
          bg-white border border-black/10
          shadow-[0_28px_70px_rgba(0,0,0,0.12)]
          dark:bg-[linear-gradient(135deg,rgba(30,42,38,0.78),rgba(12,22,19,0.72))]
          dark:border-white/12
          dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_70px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
        "
      >
        {/* Bird mark */}
        <Image
          src="/bird-icon-orange-transparent.png"
          alt=""
          width={92}
          height={126}
          priority
          aria-hidden="true"
          className="
            w-[58px] h-[82px] sm:w-[72px] sm:h-[100px] md:w-[92px] md:h-[126px]
            flex-0 shrink-0 object-contain
            [filter:drop-shadow(0_0_8px_rgba(255,128,0,0.18))_drop-shadow(0_7px_10px_rgba(0,0,0,0.45))]
          "
        />

        {/* Heading copy */}
        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-[14px] leading-none whitespace-nowrap">
            <div>
              <span
                className="
                  text-[27px] sm:text-[34px] md:text-[46px] font-black tracking-[0.01em]
                  text-[#171717] dark:text-[#f5f5f0]
                  dark:[text-shadow:0_2px_0_rgba(0,0,0,0.35),0_6px_18px_rgba(0,0,0,0.35)]
                "
              >
                Bird Id
              </span>
              <span
                className="
                  text-[27px] sm:text-[34px] md:text-[46px] font-black
                  text-[#ff7a00]
                  [text-shadow:0_2px_0_rgba(0,0,0,0.45),0_0_18px_rgba(255,122,0,0.16)]
                "
              >
                {" "}Quiz
              </span>
            </div>

            {/* South African flag */}
            <Image
              src="/south_africa.png"
              alt="South African flag"
              width={48}
              height={32}
              className="
                w-8 h-[22px] sm:w-10 sm:h-[27px] md:w-12 md:h-8
                flex-0 shrink-0 object-cover rounded-[5px]
                [filter:drop-shadow(0_0_0_2px_rgba(255,255,255,0.78))_drop-shadow(0_4px_12px_rgba(0,0,0,0.45))]
              "
            />
          </div>

          {/* Tagline */}
          <div
            className="
              flex items-center gap-2 sm:gap-3
              text-[15px] sm:text-lg md:text-2xl font-medium
              text-black/72 dark:text-white/78
              dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.4)]
            "
          >
            <span>Learn</span>
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#83b942] [box-shadow:0_0_10px_rgba(131,185,66,0.45)] translate-y-px"
            />
            <span>Identify</span>
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff8a00] [box-shadow:0_0_10px_rgba(255,138,0,0.45)] translate-y-px"
            />
            <span>Enjoy</span>
          </div>
        </div>
      </div>
    </header>
  );
}
