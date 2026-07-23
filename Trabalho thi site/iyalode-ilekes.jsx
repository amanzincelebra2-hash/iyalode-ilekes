import { useState, useEffect, useRef } from "react";
import { Instagram, MessageCircle, ShoppingBag, Sparkles, ChevronDown } from "lucide-react";

/* ============================================================
   IYALODÊ ILEKÊS — Site one-page cinematográfico
   ------------------------------------------------------------
   PARA EDITAR:
   1. WHATSAPP: troque o número abaixo (formato: 55 + DDD + número)
   2. INSTAGRAM: já aponta para @iyalodeilekes
   3. As fotos ficam nesta mesma pasta — se mover o .jsx, mova
      as fotos junto (ou ajuste os caminhos em PRODUTOS).
   ============================================================ */
const WHATSAPP = "5500000000000"; // <-- EDITE AQUI seu número
const INSTAGRAM = "https://www.instagram.com/iyalodeilekes";
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---------- Produtos ---------- */
const PRODUTOS = [
  { nome: "Conjunto Pombogira 1", preco: "85,00", img: "Conjunto Pombogira 1 85,00.jpeg" },
  { nome: "Conjunto Cigana", preco: "80,00", img: "Conjunto Cigana 80,00.jpeg" },
  { nome: "Conjunto Pombogira 2", preco: "80,00", img: "Conjunto Pombogira 2 80,00.jpeg" },
  { nome: "Conjunto Pombogira 3", preco: "80,00", img: "Conjunto Pombogira 3 80,00.jpeg" },
  { nome: "Conjunto Pombogira 4", preco: "75,00", img: "Conjunto Pombogira 4 75,00.jpeg" },
  { nome: "Conjunto Pombogira 5", preco: "80,00", img: "Conjunto Pombogira 5 80,00.jpeg" },
  { nome: "Conjunto Pombogira 6", preco: "80,00", img: "Conjunto Pombogira 6 80,00.jpeg" },
  { nome: "Conjunto Boa Sorte 1", preco: "80,00", img: "Conjunto boa sorte 1 80,00.jpeg" },
  { nome: "Conjunto Boa Sorte 2", preco: "75,00", img: "Conjunto boa sorte 2 75,00.jpeg" },
  { nome: "Conjunto Orixás", preco: "75,00", img: "Conjunto orixás 75,00.jpeg" },
  { nome: "Conjunto Oxaguian 1", preco: "60,00", img: "Conjunto Oxaguian 1 60,00.jpeg" },
  { nome: "Conjunto Oxaguian 2", preco: "70,00", img: "Conjunto Oxaguian 2 70,00.jpeg" },
  { nome: "Conjunto Oxaguian 3", preco: "75,00", img: "Conjunto Oxaguian 3 75,00.jpeg" },
  { nome: "Conjunto Oxalá/Oxalufã", preco: "75,00", img: "Conjunto OxaláOxalufan 75,00.jpeg" },
  { nome: "Conjunto Omolu 1", preco: "80,00", img: "Conjunto Omolu 1 80,00.jpeg" },
  { nome: "Conjunto Omolu 2", preco: "75,00", img: "Conjunto Omolu 2 75,00.jpeg" },
  { nome: "Conjunto Ajê", preco: "80,00", img: "Conjunto Ajê 80,00.jpeg" },
  { nome: "Conjunto Oxum", preco: "80,00", img: "Conjunto Oxum 80,00.jpeg" },
  { nome: "Conjunto Oxum II", preco: "75,00", img: "Conjunto Oxum 75,00.jpeg" },
  { nome: "Conjunto Yemanjá 1", preco: "80,00", img: "Conjunto Yemanjá 1 80,00.jpeg" },
  { nome: "Conjunto Yemanjá 2", preco: "80,00", img: "Conjunto Yemanjá 2 80,00.jpeg" },
  { nome: "Conjunto Obá", preco: "70,00", img: "Conjunto Obá 70,00.jpeg" },
  { nome: "Conjunto Yewá", preco: "75,00", img: "Conjunto Yewá 75,00.jpeg" },
  { nome: "Conjunto Yansã", preco: "80,00", img: "Conjunto Yansã 80,00.jpeg" },
  { nome: "Conjunto Nanã", preco: "75,00", img: "Conjunto Nanã 75,00.jpeg" },
  { nome: "Conjunto Ogum 1", preco: "75,00", img: "Conjunto Ogum 1 75,00.jpeg" },
  { nome: "Conjunto Ogum 2", preco: "75,00", img: "Conjunto Ogum 2 75,00.jpeg" },
  { nome: "Conjunto Ogum 3", preco: "75,00", img: "Conjunto Ogum 3 75,00.jpeg" },
  { nome: "Conjunto Oxóssi 1", preco: "75,00", img: "Conjunto Oxóssi 1 75,00.jpeg" },
  { nome: "Conjunto Oxóssi 2", preco: "75,00", img: "Conjunto Oxóssi 2 75,00.jpeg" },
  { nome: "Conjunto Oxóssi 3", preco: "75,00", img: "Conjunto Oxóssi 3 75,00.jpeg" },
  { nome: "Conjunto Xangô 1", preco: "75,00", img: "Conjunto Xangô 1 75,00.jpeg" },
  { nome: "Conjunto Xangô 2", preco: "75,00", img: "Conjunto Xangô 2 75,00.jpeg" },
  { nome: "Conjunto Ayrá", preco: "75,00", img: "Conjunto Ayrá 75,00.jpeg" },
  { nome: "Conjunto Oxumarê", preco: "75,00", img: "Conjunto Oxumare 75,00.jpeg" },
  { nome: "Conjunto Ossain", preco: "75,00", img: "Conjunto Ossain 75,00.jpeg" },
  { nome: "Conjunto Caboclo", preco: "75,00", img: "Conjunto Caboclo 75,00.jpeg" },
  { nome: "Conjunto Cabocla", preco: "75,00", img: "Conjunto Cabocla 75,00.jpeg" },
  { nome: "Proteção Ogum", preco: "60,00", img: "Conjunto proteção Ogum 60,00.jpeg" },
  { nome: "Proteção Exu", preco: "60,00", img: "Conjunto proteção Exu 60,00.jpeg" },
  { nome: "Proteção 7 Linhas", preco: "55,00", img: "Conjunto proteção 7 linhas 55,00.jpeg" },
];

/* ---------- Fade-in ao rolar (IntersectionObserver) ---------- */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 1.1s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 1.1s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Imagem do produto ---------- */
function ProdutoImagem({ p }) {
  return (
    <img
      src={p.img}
      alt={p.nome}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
    />
  );
}

export default function IyalodeIlekes() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const irPara = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen text-neutral-200 antialiased" style={{ background: "#050505" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@200;300;400&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans  { font-family: 'Jost', sans-serif; }
        .gold  { color: #c9a227; }
        .tracking-luxe { letter-spacing: .35em; }
        @keyframes shimmer { 0%,100% { opacity:.5 } 50% { opacity:1 } }
        .shimmer { animation: shimmer 5s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ============ NAV ============ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled ? "py-3 backdrop-blur-md border-b border-white/5" : "py-6"
        }`}
        style={{ background: scrolled ? "rgba(5,5,5,.82)" : "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => irPara("hero")} className="serif text-lg tracking-widest gold">
            IYALODÊ&nbsp;ILEKÊS
          </button>
          <div className="hidden md:flex items-center gap-10 sans text-xs uppercase tracking-luxe text-neutral-400">
            <button onClick={() => irPara("sobre")} className="hover:text-white transition-colors duration-500">Quem Somos</button>
            <button onClick={() => irPara("colecao")} className="hover:text-white transition-colors duration-500">Coleção</button>
            <button onClick={() => irPara("comprar")} className="hover:text-white transition-colors duration-500">Comprar</button>
          </div>
          <a
            href={waLink("Olá! Vi o site da Iyalodê Ilekês e gostaria de saber mais.")}
            target="_blank" rel="noreferrer"
            className="sans text-xs uppercase tracking-widest border border-[#c9a227]/50 gold px-5 py-2 hover:bg-[#c9a227] hover:text-black transition-all duration-500"
          >
            Contato
          </a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,162,39,.16), transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(120,80,20,.12), transparent 55%)," +
            "linear-gradient(180deg, #0a0806 0%, #050505 70%)",
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-25 shimmer" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i}
              cx={(i * 173) % 1200} cy={(i * 271) % 800}
              r={1 + (i % 4)} fill="#c9a227" opacity={0.15 + (i % 5) * 0.1} />
          ))}
        </svg>

        <FadeIn className="relative z-10 text-center px-6">
          <p className="sans text-xs md:text-sm uppercase tracking-luxe gold mb-8 flex items-center justify-center gap-3">
            <Sparkles size={14} /> Joias de axé feitas à mão <Sparkles size={14} />
          </p>
          <h1 className="serif text-5xl md:text-8xl font-medium text-white leading-tight">
            Iyalodê <span className="italic gold">Ilekês</span>
          </h1>
          <p className="sans font-light text-neutral-400 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Fios de conta que carregam história, tradição e a força dos orixás —
            cada peça, uma coroa.
          </p>
          <button
            onClick={() => irPara("colecao")}
            className="sans mt-12 inline-block text-xs uppercase tracking-luxe px-12 py-4 border border-[#c9a227] gold hover:bg-[#c9a227] hover:text-black transition-all duration-700"
          >
            Ver Coleção
          </button>
        </FadeIn>

        <button onClick={() => irPara("sobre")} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-white transition-colors">
          <ChevronDown size={22} className="animate-bounce" />
        </button>
      </header>

      {/* ============ QUEM SOMOS ============ */}
      <section id="sobre" className="py-32 md:py-44 px-6">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <p className="sans text-xs uppercase tracking-luxe gold mb-6">Quem Somos</p>
          <h2 className="serif text-3xl md:text-5xl text-white leading-snug">
            Artesania ancestral,<br />
            <span className="italic gold">exclusividade</span> em cada fio
          </h2>
          <div className="w-px h-16 mx-auto my-10" style={{ background: "linear-gradient(#c9a227, transparent)" }} />
          <p className="sans font-light text-neutral-400 leading-loose text-base md:text-lg">
            Cada ilekê é fiado à mão, conta por conta, honrando a tradição dos
            terreiros e a beleza que atravessa gerações. Peças únicas,
            consagradas no cuidado, feitas para quem entende que uma guia não se
            veste — se carrega.
          </p>
        </FadeIn>
      </section>

      {/* ============ COLEÇÃO (GRID) ============ */}
      <section id="colecao" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="sans text-xs uppercase tracking-luxe gold mb-4">Nossos Produtos</p>
            <h2 className="serif text-3xl md:text-5xl text-white">A Coleção</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {PRODUTOS.map((p, i) => (
              <FadeIn key={p.nome} delay={(i % 3) * 150}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/5] border border-white/5">
                    <ProdutoImagem p={p} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <a
                      href={waLink(`Olá! Tenho interesse na peça "${p.nome}".`)}
                      target="_blank" rel="noreferrer"
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 sans text-[11px] uppercase tracking-widest bg-[#c9a227] text-black px-6 py-2.5 whitespace-nowrap"
                    >
                      Encomendar
                    </a>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="serif text-xl text-white">{p.nome}</h3>
                    <p className="sans text-sm gold mt-2">R$ {p.preco}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ÁREA DE COMPRAS / CTA ============ */}
      <section id="comprar" className="py-32 md:py-44 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(201,162,39,.1), transparent 65%)",
        }} />
        <FadeIn className="relative max-w-2xl mx-auto text-center">
          <p className="sans text-xs uppercase tracking-luxe gold mb-6">Área de Compras</p>
          <h2 className="serif text-3xl md:text-5xl text-white leading-snug">
            Sua peça, feita <span className="italic gold">para você</span>
          </h2>
          <p className="sans font-light text-neutral-400 leading-loose mt-8 text-base md:text-lg">
            Encomendas personalizadas e peças prontas. Fale conosco e receba
            atendimento direto de quem faz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
            <a
              href={waLink("Olá! Quero fazer um pedido na Iyalodê Ilekês.")}
              target="_blank" rel="noreferrer"
              className="sans flex items-center gap-3 text-xs uppercase tracking-luxe bg-[#c9a227] text-black px-10 py-4 hover:bg-[#e0be4a] transition-colors duration-500 w-full sm:w-auto justify-center"
            >
              <MessageCircle size={16} /> Pedir pelo WhatsApp
            </a>
            <a
              href={INSTAGRAM}
              target="_blank" rel="noreferrer"
              className="sans flex items-center gap-3 text-xs uppercase tracking-luxe border border-white/20 text-neutral-300 px-10 py-4 hover:border-[#c9a227] hover:text-white transition-all duration-500 w-full sm:w-auto justify-center"
            >
              <ShoppingBag size={16} /> Ver no Instagram
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="serif tracking-widest gold">IYALODÊ ILEKÊS</p>
          <p className="sans font-light text-xs text-neutral-600 tracking-widest uppercase">
            Feito à mão · Com axé · © {new Date().getFullYear()}
          </p>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-[#c9a227] transition-colors duration-500">
            <Instagram size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
