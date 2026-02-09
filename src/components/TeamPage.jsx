import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

const TeamSection = ({ title, members, delayBase = 0 }) => {
    return (
        <div className="mb-20">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-8 pl-4 border-l-4 border-brand-orange text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-1"
            >
                {title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: delayBase + i * 0.1 }}
                        className="group relative bg-brand-red/5 border border-brand-red/20 rounded-2xl overflow-hidden hover:border-brand-orange/40 transition-colors"
                    >
                        {/* Image Placeholder */}
                        <div className="aspect-[4/5] bg-gradient-to-b from-[#331019] to-black relative overflow-hidden">
                            {member.image ? (
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-4xl font-bold">
                                    {member.initials}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                        </div>

                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-sm text-brand-orange font-mono mt-1">{member.role}</p>
                        </div>

                        {/* LinkedIn Link (Top Right) */}
                        <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-brand-red transition-all transform hover:scale-110"
                        >
                            <Linkedin size={20} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function TeamPage() {
  const officeBearers = [
      { name: 'Afreen', image: '/images/team_2026/Afreen.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/shaik-afreen-047202163/' },
      { name: 'Akash', image: '/images/team_2026/Akash.jpeg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/akash-menon11/' },
      { name: 'Animesh', image: '/images/team_2026/Animesh.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/animesh-tiwari-534235163/' },
      { name: 'Anoushka', image: '/images/team_2026/Anoushka.jpeg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/anoushka-kumar-629107174/' },
      { name: 'Aratrika', image: '/images/team_2026/Aratrika.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/aratrika-mondal-a185b727b/' },
      { name: 'Harshit', image: '/images/team_2026/Harshit.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/harshit-jain-5692a622a/' },
      { name: 'Himani', image: '/images/team_2026/Himani.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/himani-dangi-aa2134178/' },
      { name: 'Saransh', image: '/images/team_2026/Saransh.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/gupta-saransh/' },
      { name: 'Tanay', image: '/images/team_2026/Tanay.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/tanay-pandey-26314614b/' },
      { name: 'Yash', image: '/images/team_2026/Yash.jpg', role: 'Office Bearer', linkedin: 'https://www.linkedin.com/in/yashkudesia/' },
  ];

  const associateMembers = [
      { name: 'Bhuswarna', image: '/images/team_2027/Bhuswarna.jpeg', role: 'Associate Member', linkedin: 'https://www.linkedin.com/in/bhuswarna-kashyap-703796187/' },
      { name: 'Prathamesh', image: '/images/team_2027/Prathamesh.jpeg', role: 'Associate Member', linkedin: 'https://www.linkedin.com/in/prathamesh-supe/' },
      { name: 'Sampath', image: '/images/team_2027/Sampath.jpg', role: 'Associate Member', linkedin: 'https://www.linkedin.com/in/komarapuri-sampath-kumar-9s25/' },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 bg-[#050505] text-white relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NetworkBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest">
                    MEET THE <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">CREW</span>
                </h1>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    The minds behind bITeSys. Driving innovation and technology at IIM Shillong.
                </p>
            </motion.div>

            <TeamSection title="OFFICE BEARERS" members={officeBearers} />
            <TeamSection title="ASSOCIATE MEMBERS" members={associateMembers} delayBase={0.4} />

        </div>
    </div>
  );
}
