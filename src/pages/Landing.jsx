import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Thermometer, Camera, ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SmartHomeCanvas from '@/components/three/SmartHomeCanvas';
import { useSmartHome } from '@/context/SmartHomeContext';

export default function Landing() {
  const { rooms } = useSmartHome();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.92]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="min-h-screen bg-[#07070D] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <SmartHomeCanvas autoRotate interactive={false} rooms={rooms} selectedRoom={null} onSelectRoom={() => {}} />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#07070D]/60 via-transparent to-[#07070D] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-slate-400 tracking-wide">DIGITAL TWIN · SMART HOME</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-heading">
              SmartHome
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Digital Twin
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Khám phá ngôi nhà thông minh của tương lai. Điều khiển ánh sáng, nhiệt độ và an ninh
              trong môi trường 3D trực quan — mô phỏng hoàn chỉnh hệ thống IoT.
            </p>
            <Link to="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-cyan-400 transition-colors"
              >
                Khám Phá Ngôi Nhà
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <ChevronDown className="w-5 h-5 text-slate-500 animate-bounce" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 bg-[#07070D] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
              Ba Hệ Thống Thông Minh
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Mỗi hệ thống được mô phỏng chân thực, phản hồi real-time với mô hình 3D
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Lightbulb}
              title="Ánh Sáng"
              description="Bật/tắt, điều chỉnh độ sáng và màu sắc đèn. Mô hình 3D phản hồi tức thì với ánh sáng động."
              color="amber"
              features={['Bật/tắt từng đèn', 'Dim 5-100%', 'Màu sắc tùy chỉnh']}
            />
            <FeatureCard
              icon={Thermometer}
              title="Nhiệt Độ"
              description="Điều khiển điều hòa đa chế độ. Nhiệt độ mô phỏng thay đổi dần dần theo mục tiêu."
              color="cyan"
              features={['4 chế độ: Cool/Heat/Fan/Auto', 'Nhiệt độ 16-30°C', 'Mô phỏng real-time']}
            />
            <FeatureCard
              icon={Camera}
              title="An Ninh"
              description="Hệ thống camera giám sát với live feed mô phỏng. Điều chỉnh góc quay PTZ."
              color="green"
              features={['Live feed mô phỏng', 'PTZ 0-360°', 'Trạng thái online/offline']}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 bg-[#07070D] py-24 px-6 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
            Sẵn sàng khám phá?
          </h2>
          <p className="mt-4 text-slate-400">
            Trải nghiệm điều khiển ngôi nhà thông minh 3D ngay bây giờ
          </p>
          <Link to="/demo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              Vào Demo
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, features }) {
  const colors = {
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'hover:shadow-amber-500/10' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'hover:shadow-cyan-500/10' },
    green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', glow: 'hover:shadow-green-500/10' },
  };
  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all ${c.glow}`}
    >
      <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
      <ul className="space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
            <span className={`w-1 h-1 rounded-full ${c.bg}`} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}