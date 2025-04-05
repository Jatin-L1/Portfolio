import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ArrowUp, Search, Filter } from 'lucide-react';
import skillSyncImage from '../assets/img/SkillSync.png';
import chitchat from '../assets/img/image.png';
import Ecom from '../assets/img/E-Commerce.png';
import Nova from '../assets/img/nOVA.png';
import MED from '../assets/img/med.png';

export const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample project data - replace with your actual projects
  const allProjects = [
    {
      id: 1,
      title: "Skill Sync",
      description: "Skill Sync is an innovative platform designed to bridge the gap between your current skill set and the requirements of your dream job.",
      imgUrl: skillSyncImage,
      technologies: ["Next.js", "Node.js", "MongoDB", "Express.js", "ML" , "AI" ,"Tailwind CSS", "Vercel"],
      category: "fullstack",
      link: "https://skill-sync-mu.vercel.app/",
      github: "https://github.com/Namann-14/Skill-Sync",
      featured: true
    },
    {
      id: 2,
      title: "ChitChat",
      description: "AI Chatbot This chatbot is designed to integrate multiple AI models seamlessly. Just add your API keys, and the chatbot will automatically connect and start working. No extra setup is needed",
      imgUrl: chitchat,
      technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel" , "TypeScript"],
      category: "fullstack",
      link: "https://chit-chat-kappa-ten.vercel.app/",
      github: "https://github.com/Jatin-L1/ChatBot"
    },
    {
      id: 3,
      title: "E-Commerce-Website",
      description: "E-Commerce-Website for real Madrid Merchendise",
      imgUrl: Ecom,
      technologies: ["HTML" , "CSS" , "JS" ,"BootStrap"],
      category: "frontend",
      link: "https://jatin-l1.github.io/E-Commerce-Website/",
      github: "https://github.com/Jatin-L1/E-Commerce-Website",
      featured: true
    },
    {
      id: 4,
      title: "Nova Acadmey",
      description: "Nova Academy is a smart student management platform that helps college students handle daily tasks like facial attendance, viewing results, and staying updated on upcoming events.It aims to simplify academic life by centralizing essential student services in one seamless interface.",
      imgUrl: Nova,
      technologies: ["JavaScript","TailWindCSS", "Next.js", "Express", "MongoDB" , "Vercel"],
      category: "fullstack",
      link: "https://nova-academy-c7t6-coral.vercel.app/",
      github: "https://github.com/Jatin-L1/Nova-Academy"
    },
    {
      id: 5,
      title: "MedNexus",
      description: "MedNexus is a healthcare management platform designed to connect patients, doctors, and medical services through a centralized system.",
      imgUrl: MED,
      technologies: ["NextJS", "Gemni API", "Leaflet", "MongoDB" , "Express", "Vercel"],
      category: "fullstack",
      link: "https://med-nexus.vercel.app/",
      github: "https://github.com/Jatin-L1/MedNexus"
    },
    {
      id: 6,
      title: "SecureX",
      description: "A secure, real-time chat application designed to provide a seamless and highly secure communication experience. Built with React, Firebase, and EmailJS, SecureX offers encrypted communication, session locking, and OTP-based access to keep conversations private and secure.",
      technologies: ["REACT" , "JavaScript" , "Firebase"],
      category: "frontend",
      github: "https://github.com/Jatin-L1/SecureX"
    },
  ];
  
  // Filter categories
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'featured', label: 'Featured' }
  ];
  
  // Update visible projects when filter or search changes
  useEffect(() => {
    let filtered = [...allProjects];
    
    // Apply category filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'featured') {
        filtered = filtered.filter(project => project.featured);
      } else {
        filtered = filtered.filter(project => project.category === selectedFilter);
      }
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
    
    setVisibleProjects(filtered);
  }, [selectedFilter, searchTerm]);
  
  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section style={{
      position: 'relative',
      padding: '100px 0',
      background: 'linear-gradient(135deg, #111827, #0f172a, #0c0d21)',
      color: 'white',
      overflow: 'hidden',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}></div>
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}></div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '24px',
            background: 'linear-gradient(90deg, #60a5fa, #38bdf8, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
          }}>
            My Projects
          </h2>
          
          <p style={{
            fontSize: '18px',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#94a3b8',
            lineHeight: '1.7',
          }}>
            Explore my portfolio of innovative projects showcasing my skills in web development, 
            mobile applications, and software engineering. Each project demonstrates my passion 
            for creating impactful digital solutions.
          </p>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              color: '#64748b',
            }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '15px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(56, 189, 248, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Filter size={16} />
              <span>Filter Projects</span>
            </button>
          </div>
          
          {/* Filter Buttons */}
          <motion.div 
            animate={{ 
              height: showFilters ? 'auto' : 'auto',
              opacity: 1
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...(selectedFilter === filter.id
                    ? {
                        background: 'linear-gradient(90deg, #3b82f6, #38bdf8)',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                        border: 'none',
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }
                  ),
                }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedFilter + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '60px',
            }}
          >
            {visibleProjects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
            
            {visibleProjects.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '80px 0',
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  marginBottom: '16px',
                }}>
                  No projects found
                </div>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                }}>
                  Try changing your search term or selecting a different filter.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* More Projects Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <motion.a
            href="/all-projects"
            whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ y: 0 }}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#60a5fa',
              fontSize: '16px',
              fontWeight: '600',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -3 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #38bdf8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              border: 'none',
              cursor: 'pointer',
              zIndex: 100,
            }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Decorative gradient line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #3b82f6, #38bdf8, #818cf8, #8b5cf6)',
        opacity: 0.7,
      }}/>
    </section>
  );
};

export default ProjectsSection;