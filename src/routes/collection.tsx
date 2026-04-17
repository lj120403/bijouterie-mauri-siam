import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import rubyImg from "@/assets/ruby.jpg";
import emeraldImg from "@/assets/emerald.jpg";
import sapphireImg from "@/assets/sapphire.jpg";
import diamondImg from "@/assets/diamond.jpg";
import labDiamondImg from "@/assets/lab-diamond.jpg";
import coloredImg from "@/assets/colored-stones.jpg";
import silverImg from "@/assets/silver-jewelry.jpg";
import goldImg from "@/assets/gold-earrings.jpg";
import czImg from "@/assets/cz.jpg";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Gemstones, Diamonds & Jewellery | Mauri-Siam" },
      {
        name: "description",
        content:
          "Browse our curated collection: rubies, emeralds, sapphires, natural & lab-grown diamonds, cubic zirconia, gold and silver jewellery.",
      },
      { property: "og:title", content: "The Mauri-Siam Collection" },
      { property: "og:description", content: "All grades. All stones. Curated in Mauritius." },
      { property: "og:image", content: coloredImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: coloredImg },
    ],
  }),
  component: Collection,
});

const items = [
  {
    name: "Natural Ruby",
    img: rubyImg,
    desc: "Pigeon-blood Burmese to vivid Mozambican — heated and unheated, all grades.",
    grades: ["AAA", "AA", "A", "Commercial"],
  },
  {
    name: "Natural Emerald",
    img: emeraldImg,
    desc: "Colombian, Zambian and Brazilian origins. Minor to no oil treatments available.",
    grades: ["Royal", "Fine", "Standard"],
  },
  {
    name: "Natural Sapphire",
    img: sapphireImg,
    desc: "Royal blue, Padparadscha, yellow, pink — Ceylonese, Burmese and Madagascan.",
    grades: ["Royal Blue", "Cornflower", "Fancy"],
  },
  {
    name: "Natural Diamond",
    img: diamondImg,
    desc: "GIA certified, D-Z colour, IF-SI clarity. Round brilliant and fancy cuts.",
    grades: ["D–F", "G–J", "K–M", "N–Z"],
  },
  {
    name: "Lab-Grown Diamond (CVD)",
    img: labDiamondImg,
    desc: "Chemical vapour deposition diamonds, identical chemistry, IGI certified.",
    grades: ["D–F VVS", "E VS", "G VS"],
  },
  {
    name: "Coloured Gemstones",
    img: coloredImg,
    desc: "Tanzanite, amethyst, citrine, aquamarine, tourmaline, peridot, garnet, topaz.",
    grades: ["Precious", "Semi-precious"],
  },
  {
    name: "Cubic Zirconia",
    img: czImg,
    desc: "AAAAA-grade CZ in colourless and fancy colours. Perfect for design samples.",
    grades: ["5A", "3A", "Standard"],
  },
  {
    name: "Silver Jewellery",
    img: silverImg,
    desc: "Sterling 925 chains, bangles, rings and earrings — bespoke or ready-made.",
    grades: ["925 Sterling"],
  },
  {
    name: "Gold Jewellery",
    img: goldImg,
    desc: "18k and 22k yellow, white and rose gold. Casting, repair and remounting.",
    grades: ["18k", "22k"],
  },
];

function Collection() {
  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground">
              Every stone, <span className="text-gradient italic">every grade.</span>
            </h1>
            <p className="mt-5 text-muted-foreground">
              From rough to polished, commercial to royal — Mauri-Siam holds an inventory worthy
              of collectors, designers and connoisseurs alike.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.grades.map((g) => (
                      <span
                        key={g}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20${encodeURIComponent(
                      item.name,
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:gap-2 transition-all"
                  >
                    Enquire about {item.name} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
