/**
 * Garden Atelier Editorial — Croshii’s pages feel like a warm craft catalogue:
 * botanical still lifes, off-centre compositions, Croshii Moss actions, and precise serif/sans hierarchy.
 */
import { Fragment, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Flower2,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  PackageCheck,
  Sparkles,
  X,
} from "lucide-react";

type Category = "All pieces" | "Charms" | "Bouquets" | "Keepsakes";

type Product = {
  name: string;
  code: string;
  price: number;
  category: Exclude<Category, "All pieces">;
  image: string;
  tone: string;
};

const productImage = (file: string) => `https://www.croshii.com/${file}`;

const products: Product[] = [
  { name: "Rose Charm", code: "CRS-P001", price: 499, category: "Charms", image: productImage("c1-red.jpg"), tone: "rose" },
  { name: "Sunshine Bloom", code: "CRS-P002", price: 499, category: "Charms", image: productImage("c2-yellow.jpg"), tone: "sun" },
  { name: "Berry Bliss", code: "CRS-P003", price: 299, category: "Charms", image: productImage("c3-pink.jpg"), tone: "berry" },
  { name: "Lily of the Valley", code: "CRS-P004", price: 299, category: "Charms", image: productImage("c4-white.jpg"), tone: "cloud" },
  { name: "Honey Puff", code: "CRS-P005", price: 499, category: "Charms", image: productImage("c5-yellow.jpg"), tone: "sun" },
  { name: "Cozy Penguin", code: "CRS-P006", price: 299, category: "Keepsakes", image: productImage("c6-blue.jpg"), tone: "blue" },
  { name: "Tulip Keychain", code: "CRS-P007", price: 499, category: "Charms", image: productImage("c7-lavender.jpg"), tone: "lavender" },
  { name: "Bow Charm", code: "CRS-P008", price: 299, category: "Charms", image: productImage("c8-white.jpg"), tone: "cloud" },
  { name: "Sunflower Bouquet", code: "CRS-P009", price: 1599, category: "Bouquets", image: productImage("c9-yellow.jpg"), tone: "sun" },
  { name: "Rose Bouquet", code: "CRS-P010", price: 799, category: "Bouquets", image: productImage("c10-cream.jpg"), tone: "rose" },
  { name: "Peony Bouquet", code: "CRS-P011", price: 2999, category: "Bouquets", image: productImage("c11-pink.jpg"), tone: "berry" },
  { name: "Lavender Bouquet", code: "CRS-P012", price: 1099, category: "Bouquets", image: productImage("c12-lavender.jpg"), tone: "lavender" },
  { name: "Tulip Bouquet", code: "CRS-P013", price: 2499, category: "Bouquets", image: productImage("c13-lavender.jpg"), tone: "lavender" },
  { name: "Daisy Bouquet", code: "CRS-P014", price: 999, category: "Bouquets", image: productImage("c19-white.jpg"), tone: "cloud" },
  { name: "Daisy Bookmark", code: "CRS-P015", price: 499, category: "Keepsakes", image: productImage("c20-white.jpg"), tone: "cloud" },
  { name: "Bear Keychain", code: "CRS-P016", price: 399, category: "Keepsakes", image: productImage("c14-brown.jpg"), tone: "kraft" },
  { name: "Heart Keychain", code: "CRS-P017", price: 199, category: "Charms", image: productImage("c15-sky.jpg"), tone: "blue" },
  { name: "Bouquet Blanket", code: "CRS-P018", price: 4999, category: "Keepsakes", image: productImage("c16-white.jpg"), tone: "cloud" },
  { name: "Couple Keychain Duo", code: "CRS-P019", price: 599, category: "Keepsakes", image: productImage("c17-blue.jpg"), tone: "blue" },
  { name: "Ghost Keychain", code: "CRS-P020", price: 299, category: "Keepsakes", image: productImage("c18-black.jpg"), tone: "charcoal" },
  { name: "Mini Spidey Buddy", code: "CRS-P021", price: 499, category: "Keepsakes", image: productImage("c21-red.jpg"), tone: "rose" },
  { name: "Bean Teddy Duo", code: "CRS-P022", price: 599, category: "Keepsakes", image: productImage("c22-brown.jpg"), tone: "kraft" },
  { name: "Blush Bunny Duo", code: "CRS-P023", price: 449, category: "Keepsakes", image: productImage("c23-white.jpg"), tone: "cloud" },
  { name: "Berry Choco Donut", code: "CRS-P024", price: 449, category: "Keepsakes", image: productImage("c24-brown.jpg"), tone: "kraft" },
];

const categories: Category[] = ["All pieces", "Charms", "Bouquets", "Keepsakes"];

const faqs = [
  ["What is Croshii?", "Croshii creates handcrafted crochet pieces for everyday living, gifting, and the small moments worth keeping."],
  ["How do I place an order?", "Choose a piece you love and message Croshii directly on Instagram to confirm your order and any personal details."],
  ["Can I customise a piece?", "Yes. If you have an idea, colour direction, or a meaningful occasion in mind, send it over and Croshii will explore what can be made."],
  ["How long does delivery take?", "Handmade orders are prepared with care. Delivery within India typically takes 15–20 business days once the order is confirmed."],
  ["Do you ship outside India?", "Croshii currently ships within India. Follow the studio on Instagram for future updates."],
  ["What is the return policy?", "Because each creation is handmade to order, returns are not accepted once a piece has been made. Please review the catalogue before confirming."],
];

const orderLink = "https://ig.me/m/croshii_official";
const instagramLink = "https://www.instagram.com/croshii_official/";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All pieces");
  const [sortOrder, setSortOrder] = useState<"recommended" | "asc" | "desc">("recommended");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = useMemo(() => {
    const matched = activeCategory === "All pieces" ? products : products.filter((product) => product.category === activeCategory);
    if (sortOrder === "asc") return [...matched].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return [...matched].sort((a, b) => b.price - a.price);
    return matched;
  }, [activeCategory, sortOrder]);
  const shownProducts = activeCategory === "All pieces" && !showAll ? visibleProducts.slice(0, 12) : visibleProducts;

  return (
    <div className="site-shell">
      <div className="announcement" role="status">
        <span className="announcement-dot" aria-hidden="true" /> Free shipping within India on orders above ₹999
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Croshii home" onClick={() => setMenuOpen(false)}>
          <img src="/manus-storage/croshii-yarn-knot-logo_aa63d3f3.png" alt="" className="brand-mark" />
          <span>croshii</span>
        </a>

        <button className="mobile-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The craft</a>
          <a href="#gifting" onClick={() => setMenuOpen(false)}>Gifting</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
          <a href={orderLink} className="nav-order" target="_blank" rel="noreferrer">Message us <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> Crochet for everyday living</p>
            <h1 id="hero-title">Made slowly.<br /><em>Meant</em> to stay close.</h1>
            <p className="hero-intro">Handcrafted crochet pieces for gifting, gathering, and the little corners of a life that deserve a softer touch.</p>
            <div className="hero-actions">
              <a href="#collection" className="button button-primary">Browse the collection <ArrowDownRight size={18} /></a>
              <a href="#story" className="text-link">The Croshii story <ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Handcrafted crochet still life">
            <img src="/manus-storage/croshii-hero-still-life_4f0ce1c9.jpg" alt="Crochet flower bouquet with yarn and natural botanicals" />
            <div className="hero-stamp"><Flower2 size={19} /><span>Handmade<br />with warmth</span></div>
            <span className="hero-caption">A quiet study in yarn, bloom &amp; time</span>
          </div>
          <div className="hero-side-note">EST. 2026<br /><span>INDIA</span></div>
        </section>

        <section className="collection section" id="collection" aria-labelledby="collection-title">
          <div className="section-heading collection-heading">
            <div>
              <p className="eyebrow"><span>02</span> The studio shelf</p>
              <h2 id="collection-title">Little objects.<br /><em>Lasting</em> feeling.</h2>
            </div>
            <p className="section-description">From pocket-size charms to full blooms, each piece is made one stitch at a time and carries its own gentle character.</p>
          </div>

          <div className="collection-controls" aria-label="Collection filters">
            <div className="category-tabs" role="group" aria-label="Filter product collection">
              {categories.map((category) => (
                <button key={category} onClick={() => { setActiveCategory(category); setShowAll(category !== "All pieces"); }} className={activeCategory === category ? "is-active" : ""}>{category}</button>
              ))}
            </div>
            <label className="sort-select">
              <span className="sr-only">Sort collection</span>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)}>
                <option value="recommended">Shelf order: Studio edit</option>
                <option value="asc">Price: Low to high</option>
                <option value="desc">Price: High to low</option>
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </label>
          </div>

          <div className="product-grid">
            {shownProducts.map((product, index) => (
              <Fragment key={product.code}>
                {index === 4 && activeCategory === "All pieces" && (
                  <aside className="catalogue-interlude" aria-label="Croshii maker note">
                    <div className="interlude-art" aria-hidden="true"><span className="stitch-orbit orbit-one" /><span className="stitch-orbit orbit-two" /><img src="/manus-storage/croshii-yarn-knot-logo_aa63d3f3.png" alt="" /></div>
                    <div className="interlude-copy"><p className="eyebrow eyebrow-light"><span>Studio note</span> The pocket garden</p><h3>Small things, <em>carrying</em> big feeling.</h3><p>Each bloom begins as a yarn line, a patient hand, and an ordinary day made a little more tender.</p></div>
                    <span className="interlude-code">MKR-ED.01</span>
                  </aside>
                )}
                <article className={`product-card tone-${product.tone}`}>
                <a href={orderLink} target="_blank" rel="noreferrer" className="product-image-wrap" aria-label={`Message Croshii about ${product.name}`}>
                  <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                  <img src={product.image} alt={`${product.name} handcrafted crochet piece`} loading={index > 5 ? "lazy" : "eager"} />
                  <span className="product-hover">Hold this thought <ArrowUpRight size={16} /></span>
                </a>
                <div className="product-meta">
                  <div><h3>{product.name}</h3><p>Studio piece · {product.code}</p></div>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </article>
              </Fragment>
            ))}
          </div>
          {activeCategory === "All pieces" && !showAll && <div className="shelf-reveal"><span>12 studio pieces, selected for a first look.</span><button onClick={() => setShowAll(true)}>Open the full shelf <ArrowDownRight size={16} /></button></div>}
          <p className="catalogue-note">Looking for something only yours? <a href={orderLink} target="_blank" rel="noreferrer">Bring the idea to the studio <ArrowUpRight size={14} /></a></p>
        </section>

        <section className="studio-feature" id="story" aria-labelledby="story-title">
          <div className="studio-photo"><img src="/manus-storage/croshii-materials-studio_10f88644.jpg" alt="Crochet yarn, flower in progress, and wooden crochet hook in the Croshii studio" /></div>
          <div className="studio-copy">
            <p className="eyebrow eyebrow-light"><span>03</span> The slow work</p>
            <h2 id="story-title">A handmade object<br />has its own <em>rhythm.</em></h2>
            <p>It starts with soft, carefully chosen yarn and an idea worth making visible. From the first loop to the final finish, each Croshii piece is worked by hand with patience, care, and a love of the imperfect.</p>
            <div className="process-list">
              <div><span>01</span><p><strong>Choose the feeling</strong>Colour, shape, and a story to start from.</p></div>
              <div><span>02</span><p><strong>Work the stitch</strong>Time, texture, and hands doing their quiet work.</p></div>
              <div><span>03</span><p><strong>Send it with warmth</strong>Made for you, or wrapped for someone you love.</p></div>
            </div>
          </div>
        </section>

        <section className="gifting section" id="gifting" aria-labelledby="gifting-title">
          <div className="gifting-copy">
            <p className="eyebrow"><span>04</span> A gift with a story</p>
            <h2 id="gifting-title">Mark the moment<br />with something <em>made.</em></h2>
            <p>Birthdays, new homes, thank-yous, and just-because days: a Croshii piece carries the thought a little further. Ask about colours, custom notes, and pieces made for a particular person.</p>
            <a href={orderLink} className="button button-primary" target="_blank" rel="noreferrer">Start a custom conversation <MessageCircle size={17} /></a>
          </div>
          <div className="gifting-visual">
            <img src="/manus-storage/croshii-gifting-scene_175d8655.jpg" alt="A crocheted gift thoughtfully wrapped in a recycled paper box" />
            <div className="gift-note"><Heart size={16} fill="currentColor" /><span>A little note<br />can come along.</span></div>
          </div>
        </section>

        <section className="promise-strip" aria-label="Croshii service commitments">
          <div><Sparkles size={22} /><span><strong>Made by hand</strong>Thoughtfully crafted one stitch at a time.</span></div>
          <div><PackageCheck size={22} /><span><strong>India delivery</strong>Prepared with care and sent across India.</span></div>
          <div><MessageCircle size={22} /><span><strong>Custom enquiries</strong>Your idea is always welcome at the studio.</span></div>
        </section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="eyebrow"><span>05</span> Need to know</p>
            <h2 id="faq-title">Questions, answered<br /><em>with care.</em></h2>
            <p>Still wondering about a colour, piece, or order? Send Croshii a message and start the conversation.</p>
            <a href={instagramLink} className="text-link" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow the studio</a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={question}>
                <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{question}<span className="faq-symbol">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </div>;
            })}
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="cta-bloom bloom-one" aria-hidden="true" /><div className="cta-bloom bloom-two" aria-hidden="true" />
          <p className="eyebrow eyebrow-light"><span>06</span> Your idea, in yarn</p>
          <h2 id="cta-title">Bring us the feeling.<br /><em>We’ll make</em> the keepsake.</h2>
          <a href={orderLink} className="button button-light" target="_blank" rel="noreferrer">Message Croshii <ArrowUpRight size={18} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><a className="brand-lockup" href="#top"><img src="/manus-storage/croshii-yarn-knot-logo_aa63d3f3.png" alt="" className="brand-mark" /><span>croshii</span></a><p>Handcrafted crochet pieces designed for everyday living and meaningful gifting.</p></div>
        <div className="footer-links"><p>Explore</p><a href="#collection">Collection</a><a href="#story">The craft</a><a href="#gifting">Custom gifting</a></div>
        <div className="footer-links"><p>Keep close</p><a href={instagramLink} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href={orderLink} target="_blank" rel="noreferrer">Message Croshii <ArrowUpRight size={14} /></a><a href="#faq">FAQs</a></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} Croshii</span><span>Made with a slower hand.</span></div>
      </footer>
    </div>
  );
}
