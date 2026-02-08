export default function Marquee() {
  const text = 'CONTINUE TO SCROLL • CONTINUE TO SCROLL • ';

  return (
    <div className="py-8 bg-brand-gradient overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-lg md:text-xl font-bold tracking-widest mx-4 text-black"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
