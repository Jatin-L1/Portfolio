import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, ArrowUpRight } from 'lucide-react';

export const ProjectCard = ({ title, description, imgUrl, technologies, link, github }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.15)' 
          : '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Image Container */}
      <div 
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
        }}
      >
        {/* Project Image */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.6s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Overlay */}
        <motion.div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Project Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.9, 
                opacity: isHovered ? 1 : 0,
                transition: { delay: 0.1, duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)',
                color: 'white',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </motion.a>
            
            <motion.a 
              href={github || `${link}/github`} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.9, 
                opacity: isHovered ? 1 : 0,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
              }}
            >
              <Github size={16} />
              <span>View Code</span>
            </motion.a>
          </div>
        </motion.div>
        
        {/* Featured Badge, if needed */}
        {false && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'linear-gradient(90deg, #f59e0b, #d97706)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)',
            zIndex: 10,
          }}>
            Featured
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div style={{ padding: '24px' }}>
        {/* Title */}
        <motion.h3 
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '12px',
            background: 'linear-gradient(90deg, #f9fafb, #e5e7eb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          {title}
        </motion.h3>
        
        {/* Description */}
        <p style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#d1d5db',
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {description}
        </p>
        
        {/* Technologies */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '16px',
        }}>
          {technologies.slice(0, 4).map((tech, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#93c5fd',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              {tech}
            </motion.span>
          ))}
          {technologies.length > 4 && (
            <motion.span 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#9ca3af',
                background: 'rgba(156, 163, 175, 0.1)',
                border: '1px solid rgba(156, 163, 175, 0.2)',
              }}
            >
              +{technologies.length - 4}
            </motion.span>
          )}
        </div>
        
        {/* Footer with View Details */}
        <motion.div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '12px',
        }}>
          <motion.a 
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#60a5fa',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              opacity: isHovered ? 1 : 0.7,
              textDecoration: 'none',
            }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            View Details <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
            opacity: 0.15,
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;