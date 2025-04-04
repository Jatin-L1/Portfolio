import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css'; // Make sure to create this CSS file

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  
  const skillsData = {
    frontend: {
      title: "Web Development",
      description: "Creating responsive, interactive user interfaces with modern JavaScript frameworks.",
      icon: "💻",
      skills: [
        { name: "HTML", level: "Expert", icon: "📝", years: 2 },
        {name : "CSS" , level : "Expert" , icon : "🎨" , years : 4},
        { name: "Next.js", level: "Advanced", icon: "🔥", years: 2 },
        { name: "JavaScript", level: "Advanced", icon: "📘", years: 3 },
        { name: "Tailwind CSS", level: "Expert", icon: "🎨", years: 3 },
        { name: "Express", level: "Expert", icon: "🚂", years: 1.5 },
        { name: "MongoDB", level: "Advanced", icon: "🍃", years: 1.5 },
        {name : "React " , level : "Advanced" , icon : "⚛️" , years : 2},
        {name : "Node.js" , level : "Advanced" , icon : "🧩" , years : 2},
      ]
    },
    backend: {
      title: "Programming Languages",
      description: "Building robust server-side applications and APIs to power web applications.",
      icon: "🖥️",
      skills: [
        { name: "Java", level: "Expert", icon: "☕", years: 1.5 },
        { name: "Solidity", level: "Expert", icon: "🪨", years: 0.5 },
        { name: "C", level: "Intermediate", icon: "💻", years: 1.5 },
        { name: "C++", level: "Advanced", icon: "🧠", years: 1.5 },
        {name : "Python" , level : "Intermediate" , icon : "🐍" , years : 2},
        {name : "JavaScript" , level : "Advanced" , icon : "🌐" , years : 2},
      ]
    },
    devops: {
      title: "Data & Libraries",
      description: "Automating and optimizing the development lifecycle with modern tooling.",
      icon: "🛠️",
      skills: [
        { name: "NumPy", level: "Advanced", icon: "🔢", years: 1 },
        { name: " Pandas", level: "Advanced", icon: "📈", years: 1 },
      ]
    },
    EmergingTechnologies : {
      title: "Emerging Technologies ",
      description: "Currently exploring blockchain fundamentals, smart contract development, and Web3 integration.",
      icon: "🦺",
      skills: [
        { name: "Blockhain", level: "Advanced", icon: "👁️", years: 0.5 },
      ]
    },
    mobile: {
      title: "Computer Fundamentals",
      description: "Creating cross-platform mobile applications with modern frameworks.",
      icon: "📱",
      skills: [
        { name: "Data Structures & Algorithms (DSA)", level: "Advanced", icon: "🗂️", years: 2 },
        { name: "Object-Oriented Programming (OOPs)", level: "Advanced", icon: "🧱", years: 2 },
        { name: "Computer Networking", level: "Advanced", icon: "🌐", years: 1 },
        { name: " Operating Systems (OS)", level: "Advanced", icon: "🖥️", years: 2 },
        { name: "Database Management Systems (DBMS)", level: "Advanced", icon: "🛢️", years: 2 },
      ]
    }
  };

  const getLevelNumber = (level) => {
    switch(level.toLowerCase()) {
      case 'expert': return 5;
      case 'advanced': return 4;
      case 'intermediate': return 3;
      case 'beginner': return 2;
      default: return 1;
    }
  };

  // Filter skills based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSkills(skillsData[activeCategory].skills);
    } else {
      const filtered = skillsData[activeCategory].skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  }, [searchTerm, activeCategory]);

  // Update filtered skills when category changes
  useEffect(() => {
    setFilteredSkills(skillsData[activeCategory].skills);
  }, [activeCategory]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <div className="section-header">
                    <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Technical Expertise
                    </motion.h2>
                    <motion.p 
                      className="skill-intro"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      I combine creativity with technical expertise to build exceptional digital experiences. 
                      Here's a showcase of my skills and technologies I work with.
                    </motion.p>
                  </div>
                  
                  {/* Search Bar */}
                  <motion.div 
                    className="search-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                      <span className="search-icon">🔍</span>
                    </div>
                  </motion.div>
                  
                  {/* Category Navigation */}
                  <motion.div 
                    className="skill-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {Object.keys(skillsData).map((category) => (
                      <motion.button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(category);
                          setSearchTerm('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="category-icon">{skillsData[category].icon}</span>
                        {skillsData[category].title}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Category Description */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="category-description"
                    >
                      <h3 className="category-title">
                        {skillsData[activeCategory].title}
                      </h3>
                      <p className="category-text">
                        {skillsData[activeCategory].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Skills Grid */}
                  <motion.div 
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeCategory + searchTerm}
                  >
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          className="skill-card"
                          variants={itemVariants}
                          whileHover={{ 
                            y: -5,
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
                          }}
                        >
                          <div className="card-header">
                            <div className="skill-icon">{skill.icon}</div>
                            <div className={`skill-level ${skill.level.toLowerCase()}`}>
                              {skill.level}
                            </div>
                          </div>
                          <h3 className="skill-name">{skill.name}</h3>
                          <div className="skill-experience">
                            <span>Experience:</span>
                            <span className="years">{skill.years} years</span>
                          </div>
                          <div className="skill-progress">
                            <div className="progress-header">
                              <span>Proficiency</span>
                              <span>{getLevelNumber(skill.level)}/5</span>
                            </div>
                            <div className="progress-bar-container">
                              <motion.div 
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${(getLevelNumber(skill.level) / 5) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        className="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        No skills match your search. Try another term.
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Additional section: Skills summary */}
                  <motion.div 
                    className="skills-summary"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    <h3 className="summary-title">Skills Overview</h3>
                    <div className="summary-content">
                      <div className="summary-column">
                        <h4 className="summary-subtitle">My Expertise Includes:</h4>
                        <ul className="summary-list">
                        <li>Proficient in Java, C, C++, Python, and JavaScript</li>

<li>Strong grasp of Data Structures & Algorithms using Java</li>

<li>Experienced in Full Stack Web Development (MERN Stack)</li>

<li>Skilled in React.js and responsive UI development using HTML, CSS, Bootstrap, Next.js, React js</li>

<li>Familiar with Python libraries like NumPy and Pandas</li>

<li>Built real-world projects: Chat App, Task Manager, Fitness Platform, Games, Web Clones</li>

<li>Good understanding of OOPs, DBMS, OS, and Computer Networking</li>

<li>Comfortable with Git & GitHub for version control</li>

<li>Consistent learner with a strong problem-solving mindset</li>
                        </ul>
                      </div>
                      <div className="summary-column">
                        <h4 className="summary-subtitle">I'm Currently Learning:</h4>
                        <ul className="summary-list">
                          <li>Web3 & Blockchain Development</li>
                          <li>Machine Learning Integration in Web Apps</li>
                          <li>Advanced Animation & 3D Web Experiences</li>
                          <li>Micro-Frontend Architecture</li>
                          <li>Performance Optimization Techniques</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};