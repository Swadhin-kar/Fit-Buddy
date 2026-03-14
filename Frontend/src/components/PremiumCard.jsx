import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeInUp from '../animation/FadeInUp';

const PremiumCard = ({ data, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={FadeInUp}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onClick={() => navigate(`/article/${data.type}/${data.id}`)}
      className="group cursor-pointer relative overflow-hidden rounded-[2rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--card-depth-0))] via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--primary))] transition-colors">
            {data.title}
          </h3>
          <span className="p-2 rounded-lg bg-[rgb(var(--primary)/0.1)] text-[rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
        <p className="text-[rgb(var(--text-muted))] leading-relaxed line-clamp-3">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};
export default PremiumCard;