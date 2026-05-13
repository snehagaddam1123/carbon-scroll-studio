import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEYRION — Engineered for Legends" },
      {
        name: "description",
        content:
          "VEYRION — luxury performance automobiles. Hand-built since 1965. Explore the lineup and book a private test drive.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    // ---------- DATA ----------
    const MODELS = [
      { cat: "Sports", name: "GT-R Sport", hp: "710 HP", s: "2.8s", price: "$298,000",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" },
      { cat: "Sedan", name: "Aurora", hp: "520 HP", s: "3.6s", price: "$184,000",
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80" },
      { cat: "SUV", name: "Apex", hp: "620 HP", s: "3.4s", price: "$229,000",
        img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80" },
      { cat: "Coupe", name: "Stratos", hp: "680 HP", s: "3.0s", price: "$256,000",
        img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80" },
      { cat: "Electric", name: "Volt", hp: "940 HP", s: "2.1s", price: "$312,000",
        img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80" },
      { cat: "Concept", name: "Concept-X", hp: "1200 HP", s: "1.9s", price: "POA",
        img: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80" },
    ];
    const GALLERY = [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80",
    ];

    const grid = document.getElementById("modelsGrid");
    if (grid && !grid.childElementCount) {
      MODELS.forEach((m) => {
        grid.insertAdjacentHTML(
          "beforeend",
          `<article class="car-card reveal">
            <div class="car-img" style="background-image:url('${m.img}')"></div>
            <div class="car-price">${m.price}</div>
            <div class="car-body">
              <div class="car-cat">${m.cat}</div>
              <div class="car-name">${m.name}</div>
              <div class="car-specs">
                <div class="spec"><b>${m.hp}</b><span>Power</span></div>
                <div class="spec"><b>${m.s}</b><span>0–100</span></div>
                <div class="spec"><b>V12</b><span>Engine</span></div>
              </div>
            </div>
          </article>`
        );
      });
    }

    const gg = document.getElementById("galleryGrid");
    if (gg && !gg.childElementCount) {
      GALLERY.forEach((src, i) => {
        gg.insertAdjacentHTML(
          "beforeend",
          `<div class="g-item g-${i + 1}"><img src="${src}" alt="Gallery ${i + 1}" loading="lazy"/></div>`
        );
      });
    }

    // lightbox
    const lb = document.getElementById("lightbox") as HTMLDivElement | null;
    const lbImg = document.getElementById("lbImg") as HTMLImageElement | null;
    const onGgClick = (e: Event) => {
      const t = e.target as HTMLElement;
      const img = t.closest(".g-item")?.querySelector("img") as HTMLImageElement | null;
      if (!img || !lb || !lbImg) return;
      lbImg.src = img.src;
      lb.classList.add("open");
    };
    gg?.addEventListener("click", onGgClick);
    const lbClose = document.getElementById("lbClose");
    const onClose = () => lb?.classList.remove("open");
    lbClose?.addEventListener("click", onClose);
    const onLbBg = (e: MouseEvent) => { if (e.target === lb) lb?.classList.remove("open"); };
    lb?.addEventListener("click", onLbBg);

    // nav scroll
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll);

    // burger
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");
    const onBurger = () => {
      burger?.classList.toggle("open");
      navLinks?.classList.toggle("open");
    };
    burger?.addEventListener("click", onBurger);
    const onNavClick = (e: Event) => {
      if ((e.target as HTMLElement).tagName === "A") {
        burger?.classList.remove("open");
        navLinks?.classList.remove("open");
      }
    };
    navLinks?.addEventListener("click", onNavClick);

    // active link
    const sections = document.querySelectorAll<HTMLElement>("section, header.hero");
    const linkMap: Record<string, HTMLAnchorElement> = {};
    document.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach((a) => {
      linkMap[a.getAttribute("href")!.slice(1)] = a;
    });
    const onActive = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      sections.forEach((s) => {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
          Object.values(linkMap).forEach((a) => a.classList.remove("active"));
          linkMap[s.id]?.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", onActive);

    // reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // counters
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.target!);
          const dec = parseInt(el.dataset.decimals || "0");
          const dur = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(dec);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(dec);
          };
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".counter").forEach((c) => counterIO.observe(c));

    // form
    const form = document.getElementById("bookForm") as HTMLFormElement | null;
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      document.getElementById("formMsg")?.classList.add("show");
      form?.reset();
    };
    form?.addEventListener("submit", onSubmit);

    // hero parallax
    const hero = document.querySelector(".hero") as HTMLElement | null;
    const onPara = () => {
      const y = window.scrollY;
      if (hero && y < window.innerHeight) hero.style.backgroundPosition = `center ${y * 0.4}px`;
    };
    window.addEventListener("scroll", onPara);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onActive);
      window.removeEventListener("scroll", onPara);
      gg?.removeEventListener("click", onGgClick);
      lbClose?.removeEventListener("click", onClose);
      lb?.removeEventListener("click", onLbBg);
      burger?.removeEventListener("click", onBurger);
      navLinks?.removeEventListener("click", onNavClick);
      form?.removeEventListener("submit", onSubmit);
      io.disconnect();
      counterIO.disconnect();
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <nav className="nav" id="nav">
        <div className="container nav-inner">
          <a href="#home" className="logo">VEY<span>R</span>ION</a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#models">Models</a></li>
            <li><a href="#performance">Performance</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Test Drive</a></li>
          </ul>
          <button className="burger" id="burger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="container hero-content">
          <span className="hero-eyebrow">Veyrion · Since 1965</span>
          <h1>Engineered<br /><span className="accent">For Legends</span></h1>
          <p className="lede">A new breed of performance machine. Hand-built. Wind-shaped. Forged from a singular obsession with speed and silence.</p>
          <div className="hero-cta">
            <a href="#models" className="btn btn-primary">Explore Models →</a>
            <a href="#contact" className="btn btn-ghost">Book a Test Drive</a>
          </div>
        </div>
        <div className="scroll-ind">
          <span>Scroll</span>
          <div className="line"></div>
        </div>
      </header>

      <section id="models">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">The Lineup</div>
            <h2 className="section-title">Six machines.<br /><em>One philosophy.</em></h2>
            <p className="section-sub">Every Veyrion is engineered without compromise — track-bred, road-refined, and unmistakably ours.</p>
          </div>
          <div className="models-grid" id="modelsGrid"></div>
        </div>
      </section>

      <section id="performance">
        <div className="container">
          <div className="perf-grid">
            <div className="reveal">
              <div className="section-tag">Performance</div>
              <h2 className="section-title">Numbers that <em>defy</em> physics.</h2>
              <p className="section-sub">A 6.5L twin-turbo V12 paired with our proprietary KERS-X hybrid system. The fastest production Veyrion ever built.</p>
              <div className="stats">
                <div className="stat"><div className="num"><span className="counter" data-target="812">0</span><span className="unit">HP</span></div><div className="lbl">Horsepower</div></div>
                <div className="stat"><div className="num"><span className="counter" data-target="664">0</span><span className="unit">Nm</span></div><div className="lbl">Torque</div></div>
                <div className="stat"><div className="num"><span className="counter" data-target="349">0</span><span className="unit">KM/H</span></div><div className="lbl">Top Speed</div></div>
                <div className="stat"><div className="num"><span className="counter" data-target="2.4" data-decimals="1">0</span><span className="unit">SEC</span></div><div className="lbl">0–100 KM/H</div></div>
              </div>
            </div>
            <div className="perf-img reveal"></div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Gallery</div>
            <h2 className="section-title">Form. <em>Function.</em> Fury.</h2>
          </div>
          <div className="gallery reveal" id="galleryGrid"></div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text reveal">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">Since 1965, we've built<br />machines that <em>defy limits.</em></h2>
              <p>Founded in a small workshop in Modena by engineer Enzo Veyrion, our marque was born from a single belief: that an automobile should be a feeling before it is a function.</p>
              <p>Six decades and twelve world titles later, that belief still drives every weld, every stitch, every line.</p>
            </div>
            <div className="about-img reveal"></div>
          </div>

          <div className="timeline reveal">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1965</div><div className="tl-label">The Workshop Opens</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1972</div><div className="tl-label">First GT Released</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1998</div><div className="tl-label">Le Mans Victory</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2025</div><div className="tl-label">Hybrid Era Begins</div></div>
          </div>

          <div className="values">
            <div className="value reveal"><div className="value-icon"><span>I</span></div><h4>Innovation</h4><p>Always one revolution ahead of the industry.</p></div>
            <div className="value reveal"><div className="value-icon"><span>P</span></div><h4>Power</h4><p>Engineered to thrill, refined to last.</p></div>
            <div className="value reveal"><div className="value-icon"><span>·</span></div><h4>Precision</h4><p>Every tolerance measured in microns.</p></div>
            <div className="value reveal"><div className="value-icon"><span>L</span></div><h4>Legacy</h4><p>Sixty years of motorsport heritage.</p></div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <div className="section-tag">Test Drive</div>
              <h2 className="section-title">Feel the <em>thunder.</em></h2>
              <p className="section-sub">Book a private session at your nearest Veyrion atelier. Our specialists will be in touch within 24 hours.</p>
              <form className="form" id="bookForm" style={{ marginTop: "var(--s-4)" }}>
                <div className="form-row">
                  <div className="field"><label>Full Name</label><input required type="text" placeholder="John Doe" /></div>
                  <div className="field"><label>Email</label><input required type="email" placeholder="you@domain.com" /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label>Phone</label><input required type="tel" placeholder="+1 555 000 0000" /></div>
                  <div className="field"><label>Preferred Date</label><input required type="date" /></div>
                </div>
                <div className="field"><label>Preferred Model</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select a model</option>
                    <option>Veyrion GT-R Sport</option>
                    <option>Veyrion Aurora Sedan</option>
                    <option>Veyrion Apex SUV</option>
                    <option>Veyrion Stratos Coupe</option>
                    <option>Veyrion Volt Electric</option>
                    <option>Veyrion Concept-X</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>Reserve My Drive →</button>
                <div className="form-msg" id="formMsg">✓ Reservation received — our atelier will contact you shortly.</div>
              </form>
            </div>
            <div className="contact-img reveal"></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div className="foot">
              <a href="#home" className="logo">VEY<span>R</span>ION</a>
              <p>Hand-built performance automobiles, crafted in Modena since 1965.</p>
              <div className="socials">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="X">X</a>
                <a href="#" aria-label="YouTube">YT</a>
                <a href="#" aria-label="LinkedIn">IN</a>
              </div>
            </div>
            <div className="foot">
              <h5>Explore</h5>
              <ul>
                <li><a href="#models">Models</a></li>
                <li><a href="#performance">Performance</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#about">Heritage</a></li>
              </ul>
            </div>
            <div className="foot">
              <h5>Owners</h5>
              <ul>
                <li><a href="#">Service</a></li>
                <li><a href="#">Warranty</a></li>
                <li><a href="#">Track Days</a></li>
                <li><a href="#">Concierge</a></li>
              </ul>
            </div>
            <div className="foot">
              <h5>Newsletter</h5>
              <p>Be first to hear about new models and private launches.</p>
              <form className="news" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; (f.querySelector("input") as HTMLInputElement).value = ""; (f.querySelector("button") as HTMLButtonElement).textContent = "✓"; }}>
                <input type="email" placeholder="your@email.com" required />
                <button type="submit">Join</button>
              </form>
            </div>
          </div>
          <div className="legal">
            <div>© 2025 Veyrion Automobili S.p.A. — All rights reserved.</div>
            <div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
          </div>
        </div>
      </footer>

      <div className="lightbox" id="lightbox">
        <span className="lightbox-close" id="lbClose">×</span>
        <img id="lbImg" alt="" />
      </div>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Barlow:wght@300;400;500;700&family=Bebas+Neue&display=swap');

:root{
  --bg:#0A0A0A; --bg-2:#111; --surface:#15151a;
  --line:rgba(255,255,255,.08); --text:#ECECEC; --muted:#8A8A8A;
  --accent:#E5000F; --accent-glow:rgba(229,0,15,.45); --gold:#C9A84C;
  --f-display:'Orbitron', sans-serif; --f-alt:'Bebas Neue', sans-serif; --f-body:'Barlow', sans-serif;
  --s-1:.5rem; --s-2:1rem; --s-3:1.5rem; --s-4:2rem; --s-5:3rem; --s-6:5rem; --s-7:8rem;
  --container:1280px; --ease:cubic-bezier(.2,.7,.2,1);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--f-body);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.6}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:0;background:none;color:inherit}
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.06;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>");mix-blend-mode:overlay}
.container{max-width:var(--container);margin:0 auto;padding:0 var(--s-4)}

.nav{position:fixed;top:0;left:0;right:0;z-index:50;padding:var(--s-3) 0;transition:background .4s var(--ease),padding .4s var(--ease),border-color .4s;border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(10,10,10,.85);backdrop-filter:blur(14px);padding:var(--s-2) 0;border-bottom-color:var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between}
.logo{font-family:var(--f-display);font-weight:900;letter-spacing:.4em;font-size:1.1rem;color:#fff}
.logo span{color:var(--accent)}
.nav-links{display:flex;gap:var(--s-4);list-style:none}
.nav-links a{font-family:var(--f-body);font-weight:500;font-size:.78rem;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);position:relative;padding:.4rem 0;transition:color .3s}
.nav-links a::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:var(--accent);transition:width .35s var(--ease)}
.nav-links a:hover,.nav-links a.active{color:#fff}
.nav-links a.active::after,.nav-links a:hover::after{width:100%}
.burger{display:none;flex-direction:column;gap:5px;padding:.5rem}
.burger span{width:26px;height:2px;background:#fff;transition:.3s}
.burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

.btn{display:inline-flex;align-items:center;gap:.6rem;padding:1rem 2rem;font-family:var(--f-body);font-weight:600;letter-spacing:.25em;text-transform:uppercase;font-size:.8rem;border:1px solid var(--line);transition:all .3s var(--ease);position:relative;overflow:hidden}
.btn-primary{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 0 0 var(--accent-glow)}
.btn-primary:hover{box-shadow:0 12px 40px var(--accent-glow);transform:translateY(-2px)}
.btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.04)}
.btn::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.18),transparent);transition:left .6s}
.btn:hover::before{left:100%}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(180deg,rgba(10,10,10,.4) 0%,rgba(10,10,10,.85) 70%,#0A0A0A 100%),url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat}
.hero::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.25;background-image:repeating-linear-gradient(45deg,#000 0 2px,transparent 2px 4px),repeating-linear-gradient(-45deg,#000 0 2px,transparent 2px 4px);background-size:6px 6px;mix-blend-mode:multiply}
.hero-content{position:relative;z-index:2;width:100%}
.hero-eyebrow{font-family:var(--f-body);letter-spacing:.5em;font-size:.75rem;color:var(--accent);text-transform:uppercase;margin-bottom:var(--s-3);display:inline-block;padding-left:60px;position:relative}
.hero-eyebrow::before{content:"";position:absolute;left:0;top:50%;width:48px;height:1px;background:var(--accent)}
.hero h1{font-family:var(--f-display);font-weight:900;font-size:clamp(2.8rem,8vw,7rem);line-height:.95;letter-spacing:.02em;text-transform:uppercase;color:#fff;margin-bottom:var(--s-4)}
.hero h1 .accent{color:var(--accent);display:block}
.hero p.lede{max-width:520px;color:var(--muted);font-size:1.05rem;margin-bottom:var(--s-5)}
.hero-cta{display:flex;gap:var(--s-2);flex-wrap:wrap}
.scroll-ind{position:absolute;bottom:var(--s-4);left:50%;transform:translateX(-50%);z-index:3;color:var(--muted);font-size:.7rem;letter-spacing:.4em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:.8rem}
.scroll-ind .line{width:1px;height:60px;background:linear-gradient(180deg,var(--accent),transparent);animation:scrollPulse 2s var(--ease) infinite;transform-origin:top}
@keyframes scrollPulse{0%,100%{transform:scaleY(.3);opacity:.4}50%{transform:scaleY(1);opacity:1}}

section{padding:var(--s-7) 0;position:relative}
.section-head{margin-bottom:var(--s-6);max-width:780px}
.section-tag{font-family:var(--f-body);font-weight:600;letter-spacing:.4em;text-transform:uppercase;font-size:.72rem;color:var(--accent);margin-bottom:var(--s-2)}
.section-title{font-family:var(--f-display);font-weight:800;font-size:clamp(2rem,4.5vw,3.6rem);line-height:1;text-transform:uppercase;letter-spacing:.02em}
.section-title em{color:var(--accent);font-style:normal}
.section-sub{color:var(--muted);margin-top:var(--s-2);font-size:1.05rem;max-width:600px}

#models{background:linear-gradient(180deg,#0A0A0A,#08080A)}
.models-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-3)}
.car-card{background:var(--surface);border:1px solid var(--line);overflow:hidden;position:relative;transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .5s}
.car-card:hover{transform:translateY(-10px);border-color:var(--accent);box-shadow:0 30px 60px -20px var(--accent-glow)}
.car-img{aspect-ratio:16/10;background-size:cover;background-position:center;transition:transform 1s var(--ease)}
.car-card:hover .car-img{transform:scale(1.08)}
.car-body{padding:var(--s-3);position:relative}
.car-cat{font-size:.7rem;letter-spacing:.3em;color:var(--accent);text-transform:uppercase}
.car-name{font-family:var(--f-display);font-weight:700;font-size:1.4rem;margin:.4rem 0 1rem;letter-spacing:.04em}
.car-specs{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;padding-top:1rem;border-top:1px solid var(--line);max-height:0;opacity:0;overflow:hidden;transition:max-height .5s var(--ease),opacity .4s,padding .4s}
.car-card:hover .car-specs{max-height:200px;opacity:1;padding-top:1rem}
.spec b{display:block;font-family:var(--f-display);color:#fff;font-size:1rem}
.spec span{font-size:.7rem;color:var(--muted);letter-spacing:.15em;text-transform:uppercase}
.car-price{position:absolute;top:var(--s-3);right:var(--s-3);background:rgba(0,0,0,.6);backdrop-filter:blur(8px);padding:.4rem .8rem;font-family:var(--f-display);font-size:.85rem;border:1px solid var(--line)}

#performance{background:linear-gradient(90deg,#0A0A0A 0%,rgba(10,10,10,.7) 60%,rgba(10,10,10,.4) 100%),url('https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1920&q=80') right center/cover no-repeat}
.perf-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:var(--s-6);align-items:center}
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s-3);margin-top:var(--s-5)}
.stat{padding:var(--s-3);background:rgba(20,20,22,.6);border:1px solid var(--line);border-left:3px solid var(--accent);backdrop-filter:blur(8px)}
.stat .num{font-family:var(--f-display);font-weight:900;font-size:3rem;line-height:1;color:#fff}
.stat .unit{color:var(--accent);font-family:var(--f-display);font-size:1rem;margin-left:.3rem}
.stat .lbl{margin-top:.5rem;font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted)}
.perf-img{aspect-ratio:4/3;background:url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80') center/cover;border:1px solid var(--line);position:relative}
.perf-img::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,10,.6))}

.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-2);grid-auto-rows:200px}
.g-item{overflow:hidden;cursor:pointer;position:relative;background:#111}
.g-item img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease);filter:grayscale(.2)}
.g-item:hover img{transform:scale(1.12);filter:none}
.g-item::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,10,10,.7));opacity:0;transition:opacity .4s}
.g-item:hover::after{opacity:1}
.g-1{grid-column:span 2;grid-row:span 2}
.g-4{grid-row:span 2}
.g-7{grid-column:span 2}

.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:100;display:none;align-items:center;justify-content:center;padding:var(--s-4)}
.lightbox.open{display:flex;animation:fadeIn .3s ease}
.lightbox img{max-width:90vw;max-height:90vh;border:1px solid var(--line)}
.lightbox-close{position:absolute;top:var(--s-4);right:var(--s-4);font-size:2rem;color:#fff;cursor:pointer}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

#about{background:#08080A}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-6);align-items:center;margin-bottom:var(--s-6)}
.about-text p{color:var(--muted);margin-top:var(--s-3);font-size:1.05rem}
.about-img{aspect-ratio:4/5;background:url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80') center/cover;border:1px solid var(--line);position:relative}
.about-img::before{content:"";position:absolute;inset:-12px -12px 12px 12px;border:1px solid var(--accent);z-index:-1}

.timeline{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-3);margin:var(--s-6) 0;position:relative}
.timeline::before{content:"";position:absolute;top:18px;left:5%;right:5%;height:1px;background:var(--line)}
.tl-item{text-align:center;position:relative}
.tl-dot{width:14px;height:14px;border-radius:50%;background:var(--accent);margin:0 auto var(--s-2);box-shadow:0 0 0 4px rgba(229,0,15,.15);position:relative;z-index:2}
.tl-year{font-family:var(--f-display);font-weight:800;font-size:1.4rem;color:#fff}
.tl-label{font-size:.85rem;color:var(--muted);margin-top:.3rem}

.values{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-3);margin-top:var(--s-5)}
.value{padding:var(--s-4);border:1px solid var(--line);background:var(--surface);text-align:center;transition:.4s var(--ease)}
.value:hover{border-color:var(--accent);transform:translateY(-6px)}
.value-icon{width:54px;height:54px;border:1px solid var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto var(--s-2);color:var(--accent);font-family:var(--f-display);font-weight:700;transform:rotate(45deg)}
.value-icon span{transform:rotate(-45deg)}
.value h4{font-family:var(--f-display);letter-spacing:.1em;text-transform:uppercase;font-size:1rem;margin-bottom:.4rem}
.value p{color:var(--muted);font-size:.9rem}

#contact{background:linear-gradient(180deg,#0A0A0A,#050505)}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-6);align-items:center}
.form{display:grid;gap:var(--s-3)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-3)}
.field label{display:block;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem}
.field input,.field select{width:100%;padding:1rem;background:transparent;border:1px solid var(--line);color:#fff;font-family:var(--f-body);font-size:1rem;transition:border-color .3s}
.field input:focus,.field select:focus{outline:none;border-color:var(--accent)}
.field select option{background:#111}
.contact-img{aspect-ratio:4/5;background:linear-gradient(180deg,transparent,rgba(10,10,10,.6)),url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80') center/cover;border:1px solid var(--line)}
.form-msg{color:var(--accent);font-family:var(--f-display);letter-spacing:.2em;text-transform:uppercase;font-size:.9rem;opacity:0;transition:.4s}
.form-msg.show{opacity:1}

footer{background:#050505;border-top:1px solid var(--line);padding:var(--s-6) 0 var(--s-3)}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:var(--s-4);margin-bottom:var(--s-5)}
.foot h5{font-family:var(--f-display);font-size:.9rem;letter-spacing:.2em;text-transform:uppercase;margin-bottom:var(--s-3);color:#fff}
.foot ul{list-style:none;display:grid;gap:.7rem}
.foot a{color:var(--muted);font-size:.9rem;transition:color .3s}
.foot a:hover{color:var(--accent)}
.foot p{color:var(--muted);font-size:.9rem;margin-top:var(--s-2)}
.news{display:flex;border:1px solid var(--line);margin-top:var(--s-2)}
.news input{flex:1;padding:.8rem 1rem;background:transparent;border:0;color:#fff;font-family:inherit}
.news input:focus{outline:none}
.news button{padding:0 1.2rem;background:var(--accent);color:#fff;letter-spacing:.2em;font-size:.7rem;text-transform:uppercase;font-weight:700;cursor:pointer}
.socials{display:flex;gap:.6rem;margin-top:var(--s-2)}
.socials a{width:38px;height:38px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:.8rem;transition:.3s}
.socials a:hover{border-color:var(--accent);color:var(--accent)}
.legal{border-top:1px solid var(--line);padding-top:var(--s-3);display:flex;justify-content:space-between;font-size:.78rem;color:var(--muted);flex-wrap:wrap;gap:var(--s-2)}
.legal a{margin-left:var(--s-3)}

.reveal{opacity:0;transform:translateY(40px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
.reveal.in{opacity:1;transform:none}

@media (max-width:980px){
  .nav-links{position:fixed;top:0;right:-100%;width:75%;max-width:340px;height:100vh;background:rgba(10,10,10,.97);backdrop-filter:blur(16px);flex-direction:column;justify-content:center;align-items:flex-start;padding:var(--s-6);gap:var(--s-3);transition:right .4s var(--ease);border-left:1px solid var(--line)}
  .nav-links.open{right:0}
  .nav-links a{font-size:1rem}
  .burger{display:flex;z-index:60}
  .models-grid{grid-template-columns:repeat(2,1fr)}
  .perf-grid,.about-grid,.contact-grid{grid-template-columns:1fr;gap:var(--s-5)}
  .gallery{grid-template-columns:repeat(2,1fr)}
  .g-1,.g-4,.g-7{grid-column:auto;grid-row:auto}
  .timeline{grid-template-columns:repeat(2,1fr);gap:var(--s-4)}
  .timeline::before{display:none}
  .values{grid-template-columns:repeat(2,1fr)}
  .foot-grid{grid-template-columns:1fr 1fr}
  section{padding:var(--s-6) 0}
}
@media (max-width:560px){
  .models-grid,.values,.foot-grid,.form-row{grid-template-columns:1fr}
  .stats{grid-template-columns:1fr}
  .stat .num{font-size:2.4rem}
  .legal{flex-direction:column;align-items:flex-start}
  .legal a{margin-left:0;margin-right:var(--s-2)}
}
`;
