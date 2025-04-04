// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {ProjectCard} from './ProjectCard'
// import { ChevronUp } from 'lucide-react';

// export const ProjectsSection = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [visibleProjects, setVisibleProjects] = useState([]);
//   const [showScrollButton, setShowScrollButton] = useState(false);
  
//   // Sample project data - replace with your actual projects
//   const allProjects = [
//     {
//       id: 1,
//       title: "E-Commerce Platform",
//       description: "A full-featured online store with cart, payment processing, and admin dashboard.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//       category: "fullstack",
//       link: "https://example.com/ecommerce",
//       github: "https://github.com/yourusername/ecommerce",
//       featured: true
//     },
//     {
//       id: 2,
//       title: "AI Content Generator",
//       description: "Tool that leverages AI to create marketing content and social media posts.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
//       category: "frontend",
//       link: "https://example.com/ai-tool",
//       github: "https://github.com/yourusername/ai-tool"
//     },
//     {
//       id: 3,
//       title: "Fitness Tracker App",
//       description: "Mobile app for tracking workouts, nutrition, and fitness progress.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["React Native", "Firebase", "Redux", "Expo"],
//       category: "mobile",
//       link: "https://example.com/fitness",
//       github: "https://github.com/yourusername/fitness-app",
//       featured: true
//     },
//     {
//       id: 4,
//       title: "Personal Finance Dashboard",
//       description: "Interactive dashboard to visualize spending habits and financial goals.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
//       category: "fullstack",
//       link: "https://example.com/finance",
//       github: "https://github.com/yourusername/finance-dashboard"
//     },
//     {
//       id: 5,
//       title: "Weather Forecast App",
//       description: "Real-time weather forecasts with interactive maps and alerts.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["React", "Weather API", "Leaflet", "Styled Components"],
//       category: "frontend",
//       link: "https://example.com/weather",
//       github: "https://github.com/yourusername/weather-app"
//     },
//     {
//       id: 6,
//       title: "Task Management API",
//       description: "RESTful API for task management with authentication and team collaboration.",
//       imgUrl: "/api/placeholder/600/400",
//       technologies: ["Node.js", "Express", "MongoDB", "JWT"],
//       category: "backend",
//       link: "https://example.com/task-api",
//       github: "https://github.com/yourusername/task-api"
//     }
//   ];
  
//   // Filter categories
//   const filters = [
//     { id: 'all', label: 'All Projects' },
//     { id: 'frontend', label: 'Frontend' },
//     { id: 'backend', label: 'Backend' },
//     { id: 'fullstack', label: 'Full Stack' },
//     { id: 'mobile', label: 'Mobile Apps' },
//     { id: 'featured', label: 'Featured' }
//   ];
  
//   // Update visible projects when filter changes
//   useEffect(() => {
//     if (selectedFilter === 'all') {
//       setVisibleProjects(allProjects);
//     } else if (selectedFilter === 'featured') {
//       setVisibleProjects(allProjects.filter(project => project.featured));
//     } else {
//       setVisibleProjects(allProjects.filter(project => project.category === selectedFilter));
//     }
//   }, [selectedFilter]);
  
//   // Scroll to top button visibility
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollButton(window.scrollY > 300);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };
  
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     },
//     exit: {
//       y: -10,
//       opacity: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl"></div>
//       </div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <motion.h2 
//             className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             My Projects
//           </motion.h2>
          
//           <motion.p 
//             className="text-lg text-gray-300 max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             Explore my portfolio of projects that showcase my skills and experience in web development, 
//             mobile apps, and more. Each project represents my passion for creating innovative solutions.
//           </motion.p>
//         </div>
        
//         {/* Filter Buttons */}
//         <motion.div 
//           className="flex justify-center flex-wrap gap-3 mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           {filters.map(filter => (
//             <motion.button
//               key={filter.id}
//               className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
//                 selectedFilter === filter.id
//                   ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
//                   : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
//               }`}
//               onClick={() => setSelectedFilter(filter.id)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {filter.label}
//             </motion.button>
//           ))}
//         </motion.div>
        
//         {/* Projects Grid */}
//         <AnimatePresence mode="wait">
//           <motion.div 
//             key={selectedFilter}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//           >
//             {visibleProjects.map(project => (
//               <motion.div 
//                 key={project.id}
//                 variants={itemVariants}
//                 layout
//               >
//                 <ProjectCard {...project} />
//               </motion.div>
//             ))}
            
//             {visibleProjects.length === 0 && (
//               <motion.div 
//                 className="col-span-full text-center py-20 text-gray-400"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 No projects found in this category.
//               </motion.div>
//             )}
//           </motion.div>
//         </AnimatePresence>
        
//         {/* More Projects Button */}
//         <motion.div 
//           className="flex justify-center mt-16"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <motion.a
//             href="/all-projects"
//             className="px-8 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium flex items-center gap-2 transition-all"
//             whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
//             whileTap={{ y: 0 }}
//           >
//             View All Projects
//             <ChevronUp className="rotate-90" size={16} />
//           </motion.a>
//         </motion.div>
//       </div>
      
//       {/* Scroll to top button */}
//       <AnimatePresence>
//         {showScrollButton && (
//           <motion.button
//             className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50"
//             onClick={scrollToTop}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
//             whileTap={{ y: 0 }}
//           >
//             <ChevronUp size={24} />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default ProjectsSection;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ArrowUp, Search, Filter } from 'lucide-react';

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
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart functionality, payment processing, user authentication, and admin dashboard for product management.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      category: "fullstack",
      link: "https://example.com/ecommerce",
      github: "https://github.com/yourusername/ecommerce",
      featured: true
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "Web application that leverages AI to create marketing content, social media posts, and copywriting for various business needs.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
      category: "frontend",
      link: "https://example.com/ai-tool",
      github: "https://github.com/yourusername/ai-tool"
    },
    {
      id: 3,
      title: "Fitness Tracker App",
      description: "Mobile application for tracking workouts, nutrition, and fitness progress with customizable goals and detailed analytics.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      category: "mobile",
      link: "https://example.com/fitness",
      github: "https://github.com/yourusername/fitness-app",
      featured: true
    },
    {
      id: 4,
      title: "Personal Finance Dashboard",
      description: "Interactive dashboard to visualize spending habits, track investments, and monitor financial goals with customizable charts.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      category: "fullstack",
      link: "https://example.com/finance",
      github: "https://github.com/yourusername/finance-dashboard"
    },
    {
      id: 5,
      title: "Weather Forecast App",
      description: "Real-time weather forecasts with interactive maps, alerts, and historical data comparisons for locations worldwide.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["React", "Weather API", "Leaflet", "Styled Components"],
      category: "frontend",
      link: "https://example.com/weather",
      github: "https://github.com/yourusername/weather-app"
    },
    {
      id: 6,
      title: "Task Management API",
      description: "RESTful API for task management with authentication, team collaboration features, and automated notifications.",
      imgUrl: "/api/placeholder/600/400",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      category: "backend",
      link: "https://example.com/task-api",
      github: "https://github.com/yourusername/task-api"
    }
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