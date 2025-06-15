"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Clock,
  Instagram,
  Code2,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ContactForm from '@/components/ContactForm'


// Fix the AnimatedBackground component
const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
  }>>([])

  useEffect(() => {
    setMounted(true)
    
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.1,
      }))
      setParticles(newParticles)
    }
  }, [])

  useEffect(() => {
    if (!mounted || particles.length === 0) return

    const animateParticles = () => {
      if (typeof window === 'undefined') return

      setParticles(prev => 
        prev.map(particle => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY
          if (newX > window.innerWidth) newX = 0
          else if (newX < 0) newX = window.innerWidth
          if (newY > window.innerHeight) newY = 0
          else if (newY < 0) newY = window.innerHeight
          return {
            ...particle,
            x: newX,
            y: newY,
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [mounted, particles.length])

  // Don't render anything until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Enhanced Floating Navigation with Hover Effects
const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "about", icon: "👨‍💻", label: "About" },
    { id: "tech", icon: "⚡", label: "Tech Stack" },
    { id: "projects", icon: "🚀", label: "Projects" },
    { id: "achievements", icon: "🏆", label: "Awards" },
    { id: "contact", icon: "📧", label: "Contact" },
  ]

  return (
    <motion.nav
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`relative p-3 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-400 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              whileHover={{
                scale: 1.2,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(item.id)
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <span className="text-xl">{item.icon}</span>

              {/* Enhanced Tooltip */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-xl">
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-500" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// Hero Section with Enhanced Social Links
const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Jatin-L1",
      label: "GitHub",
      color: "from-gray-600 to-gray-800",
      hoverColor: "from-gray-500 to-gray-700",
      description: "Open Source",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jatin-sharma-391830283/",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700",
      description: "Professional",
    },
    {
      icon: Code2,
      href: "https://leetcode.com/u/Jatin_10_54/",
      label: "LeetCode",
      color: "from-orange-600 to-yellow-600",
      hoverColor: "from-orange-500 to-yellow-500",
      description: "Problem Solving",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jatin_sharma_2435?igsh=MWF6OTQ1anA1cWszcA==",
      label: "Instagram",
      color: "from-pink-600 to-purple-600",
      hoverColor: "from-pink-500 to-purple-500",
      description: "Lifestyle",
    },
    {
      icon: Mail,
      href: "jatinsharmasm2435@gmail.com",
      label: "Email",
      color: "from-green-600 to-emerald-600",
      hoverColor: "from-green-500 to-emerald-500",
      description: "Direct Contact",
    },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Status Bar */}
      <motion.div
        className="absolute top-8 right-8 flex items-center space-x-4 text-sm text-white/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Available for work</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Zirakpur, Punjab</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10">
              👋 Oh, Hello There!
            </Badge>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              className="text-6xl lg:text-8xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="text-white">I'm</span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Jatin Sharma
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Software Developer
            </motion.p>
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-lg text-white/70 leading-relaxed">
              Crafting <span className="text-cyan-400 font-semibold">extraordinary</span> digital experiences
              <br />
              through innovative web solutions.
            </p>

            {/* Enhanced Social Links Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Connect With Me</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300 group-hover:border-white/30">
                      {/* Gradient Background on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
                      />

                      {/* Content */}
                      <div className="relative flex items-center space-x-3">
                        <div
                          className={`p-2 bg-gradient-to-r ${social.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <social.icon className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                            {social.label}
                          </div>
                          <div className="text-white/50 text-xs truncate">{social.description}</div>
                        </div>

                        {/* Arrow Icon */}
                        <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      {/* Subtle Glow Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${social.hoverColor} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 rounded-xl`}
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume Download Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <Button 
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 group shadow-lg hover:shadow-xl transition-all duration-300"
  onClick={() => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
>
  <FileText className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
  Download Resume
  <motion.div
    className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100"
    initial={false}
    animate={{ scale: [0, 1.2, 0] }}
    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
  />
</Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Content - Profile Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ padding: "4px" }}
            >
              <div className="w-full h-full bg-black rounded-3xl" />
            </motion.div>

            {/* Profile Image */}
            <div className="relative z-10 p-2">
  <Image
    src="/Placeholder-User.jpeg"
    alt="Alex Chen"
    width={400}
    height={450}
    className="rounded-2xl object-cover"
  />
</div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-4"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-cyan-400 font-bold text-lg">2+</div>
              <div className="text-white/60 text-sm">Years Exp</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-purple-400 font-bold text-lg">50+</div>
              <div className="text-white/60 text-sm">Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// About Section
const AboutSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10 mb-8">
            Software Developer
          </Badge>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8">About Me</h2>

          <p className="text-xl text-cyan-400 mb-8 font-light">Passionate Developer | Problem Solver | UI Enthusiast</p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-white/70 leading-relaxed">
                I'm a passionate developer with expertise in building modern web applications. I enjoy solving complex
                problems and creating intuitive, user-friendly interfaces that make a real impact.
              </p>

              <p className="text-lg text-white/70 leading-relaxed">
                From exploring diverse programming languages to working on cutting-edge projects, I am driven by
                curiosity and the desire to make an impact in the tech space.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Current Focus</h3>
              <div className="space-y-4">
                {[
                  "Developing full-stack web development skills",
                  "Exploring the field of data Science",
                  "Building practical projects and solutions",
                  "Enhacing my problem solving techinique",
                  "Contributing to open-source projects",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div className="pt-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button 
    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
    onClick={() => window.open('https://github.com/Jatin-L1?tab=repositories', '_blank')}
  >
    <Github className="w-4 h-4 mr-2" />
    View my projects on GitHub
  </Button>
</motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const TechStackSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const skillsData = [
    // Web Development (Frontend)
    { name: "HTML", level: 95, category: "frontend", icon: "📝", color: "from-orange-400 to-red-500", x: 20, y: 15, years: 2 },
    { name: "CSS", level: 95, category: "frontend", icon: "🎨", color: "from-blue-400 to-purple-500", x: 70, y: 25, years: 4 },
    { name: "Next.js", level: 88, category: "frontend", icon: "🔥", color: "from-gray-700 to-gray-900", x: 45, y: 35, years: 2 },
    { name: "JavaScript", level: 88, category: "frontend", icon: "📘", color: "from-yellow-400 to-orange-500", x: 15, y: 55, years: 3 },
    { name: "Tailwind CSS", level: 95, category: "frontend", icon: "🎨", color: "from-cyan-400 to-blue-500", x: 75, y: 45, years: 3 },
    { name: "React", level: 88, category: "frontend", icon: "⚛️", color: "from-blue-400 to-cyan-500", x: 30, y: 70, years: 2 },
    
    // Backend
    { name: "Express", level: 95, category: "backend", icon: "🚂", color: "from-green-500 to-green-700", x: 60, y: 65, years: 1.5 },
    { name: "Node.js", level: 88, category: "backend", icon: "🧩", color: "from-green-600 to-green-800", x: 80, y: 75, years: 2 },
    { name: "MongoDB", level: 88, category: "backend", icon: "🍃", color: "from-green-500 to-green-700", x: 25, y: 85, years: 1.5 },
    
    // Programming Languages
    { name: "Java", level: 95, category: "languages", icon: "☕", color: "from-orange-500 to-red-600", x: 55, y: 80, years: 1.5 },
    { name: "Solidity", level: 95, category: "languages", icon: "🪨", color: "from-purple-500 to-purple-700", x: 40, y: 20, years: 0.5 },
    { name: "C", level: 75, category: "languages", icon: "💻", color: "from-blue-500 to-blue-700", x: 85, y: 35, years: 1.5 },
    { name: "C++", level: 88, category: "languages", icon: "🧠", color: "from-blue-600 to-purple-600", x: 10, y: 40, years: 1.5 },
    { name: "Python", level: 75, category: "languages", icon: "🐍", color: "from-yellow-400 to-green-500", x: 65, y: 15, years: 2 },
    
    // Data & Libraries
    { name: "NumPy", level: 88, category: "data", icon: "🔢", color: "from-blue-400 to-blue-600", x: 35, y: 50, years: 1 },
    { name: "Pandas", level: 88, category: "data", icon: "📈", color: "from-green-400 to-blue-500", x: 20, y: 30, years: 1 },
    
    // Emerging Technologies
    { name: "Blockchain", level: 88, category: "emerging", icon: "👁️", color: "from-purple-500 to-pink-500", x: 70, y: 60, years: 0.5 },
    
    // Computer Fundamentals
    { name: "DSA", level: 88, category: "fundamentals", icon: "🗂️", color: "from-indigo-500 to-purple-600", x: 50, y: 25, years: 2 },
    { name: "OOPs", level: 88, category: "fundamentals", icon: "🧱", color: "from-teal-500 to-cyan-600", x: 80, y: 50, years: 2 },
    { name: "Networking", level: 88, category: "fundamentals", icon: "🌐", color: "from-green-500 to-teal-500", x: 25, y: 65, years: 1 },
    { name: "OS", level: 88, category: "fundamentals", icon: "🖥️", color: "from-gray-500 to-gray-700", x: 60, y: 40, years: 2 },
    { name: "DBMS", level: 88, category: "fundamentals", icon: "🛢️", color: "from-blue-500 to-indigo-600", x: 40, y: 75, years: 2 },
  ]

  const categories = [
    { id: "all", name: "All Skills", icon: "🌟" },
    { id: "frontend", name: "Web Development", icon: "💻" },
    { id: "backend", name: "Backend", icon: "⚙️" },
    { id: "languages", name: "Programming Languages", icon: "🖥️" },
    { id: "data", name: "Data & Libraries", icon: "🛠️" },
    { id: "emerging", name: "Emerging Technologies", icon: "🦺" },
    { id: "fundamentals", name: "Computer Fundamentals", icon: "📱" },
  ]

  const filteredSkills =
    selectedCategory === "all" ? skillsData : skillsData.filter((skill) => skill.category === selectedCategory)

  return (
    <section id="tech" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10 mb-8">
            Technical Arsenal
          </Badge>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">Skills Universe</h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            An interactive constellation of technologies I've mastered in my development journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-2">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interactive Skills Constellation */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-96 bg-black/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                {[...Array(100)].map((_, i) => (
                  <div key={i} className="border border-white/5" />
                ))}
              </div>
            </div>

            {/* Skills Nodes */}
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${skill.x}%`,
                    top: `${skill.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.2, z: 10 }}
                >
                  {/* Skill Node */}
                  <div
                    className={`relative w-16 h-16 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <span className="text-2xl">{skill.icon}</span>

                    {/* Skill Level Ring */}
                    <svg className="absolute inset-0 w-16 h-16 -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                        animate={{
                          strokeDashoffset: 2 * Math.PI * 28 * (1 - skill.level / 100),
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>
                  </div>

                  {/* Skill Info Popup */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="text-white font-semibold text-sm">{skill.name}</div>
                        <div className="text-cyan-400 text-xs">{skill.level}% Proficiency</div>
                        <div className="text-white/60 text-xs">{skill.years} years experience</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Connection Lines (when hovered) */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {filteredSkills
                        .filter((s) => s.category === skill.category && s.name !== skill.name)
                        .map((connectedSkill) => (
                          <svg
                            key={connectedSkill.name}
                            className="absolute inset-0 w-full h-full"
                            style={{
                              width: "600px",
                              height: "400px",
                              left: "-300px",
                              top: "-200px",
                            }}
                          >
                            <motion.line
                              x1="50%"
                              y1="50%"
                              x2={`${connectedSkill.x}%`}
                              y2={`${connectedSkill.y}%`}
                              stroke="rgba(34, 197, 94, 0.3)"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5 }}
                            />
                          </svg>
                        ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Skills Summary */}
          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {categories.slice(1).map((category) => {
              const categorySkills = skillsData.filter((skill) => skill.category === category.id)
              const avgLevel = Math.round(
                categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length,
              )

              return (
                <Card key={category.id} className="bg-black/20 backdrop-blur-lg border-white/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-white font-semibold text-sm">{category.name}</div>
                    <div className="text-cyan-400 text-xs">{avgLevel}% avg</div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
// // Revolutionary 3D Project Showcase
// const ProjectsSection = () => {
//   const [activeProject, setActiveProject] = useState(0)
//   const [isAutoPlay, setIsAutoPlay] = useState(true)

//   const projects = [
//     {
//   id: 1, // or whatever the next ID should be
//   title: "MedNexus",
//   subtitle: "AI-Powered Medical Emergency Platform",
//   description:
//     "MedNexus is an innovative AI-driven medical platform designed to provide emergency response services,real-time disease prediction, and a secure Web3 KYC verification system. It ensures rapid help in crises, enabling users to request professional assistance and predict illnesses through AI-powered analysis.",
//   tech: ["Next.js", "MongoDB Atlas", "Express", "JavaScript", "Tailwind CSS", "Python"],
//   metrics: { response: "< 30s", accuracy: "89%", },
//   color: "from-green-500 via-blue-500 to-teal-500",
//   preview: "/MedNexus.png?height=400&width=600",
//   demoType: "interactive",
//   links: {
//       demo: "https://med-nexus.vercel.app/",
//       github: "https://github.com/Jatin-L1/MedNexus"
//     }
// },
//     {
//   id: 2, // or whatever the next ID should be
//   title: "Nova Academy",
//   subtitle: "Smart Campus Management System",
//   description:
//     "Manage your academic journey effortlessly. Upload attendance with <,>facial recognition, stay updated on campus events, and register seamlessly—all in one place. Features include academic records tracking, attendance monitoring, campus events updates, and instant notifications for mission-critical updates.",
//   tech: ["Next.js", "MongoDB", "Express", "JavaScript", "Tailwind CSS", "Face Recognition API"],
//   metrics: { accuracy: "96%", events: "150+" },
//   color: "from-indigo-500 via-purple-500 to-pink-500",
//   preview: "/Nova.png?height=400&width=600",
//   demoType: "interactive",
//   links: {
//       demo: "https://nova-academy-c7t6-coral.vercel.app/",
//       github: "https://github.com/Jatin-L1/Nova-Academy"
//     }
// },
// {
//   id: 3, // or whatever the next ID should be
//   title: "AI Chatbot",
//   subtitle: "Universal Multi-Model AI Integration Hub",
//   description:
//     "This chatbot is designed to integrate multiple AI models seamlessly. Just add your API keys, and the chatbot will automatically connect and start working. No extra setup needed! Features automatic AI detection, <,>instant model switching, and unified chat interface that makes it easy to harness the power of different AI models in one place.",
//   tech: ["TypeScript", "AI APIs", "React", "Tailwind CSS", "OpenAI" , "Gemni" , "Anthropic"],
//   metrics: { response: "< 2s", accuracy: "99.4%" },
//   color: "from-blue-500 via-cyan-500 to-teal-500",
//   preview: "/chat.png?height=400&width=600",
//   demoType: "interactive",
//   links: {
//       demo: "https://chit-chat-kappa-ten.vercel.app/",
//       github: "https://github.com/Jatin-L1/ChatBot"
//     }
// },
// {
//   id: 4, // or whatever the next ID should be
//   title: "MCQ Platform",
//   subtitle: "Interactive Quiz System for Exam Preparation",
//   description:
//     "A comprehensive <strong>MCQ platform designed for batchmates</strong> to practice before exams. Create and share <strong>interactive quizzes</strong> for every exam subject, featuring <strong>real-time scoring</strong>, <strong>instant feedback</strong>, and <strong>performance analytics</strong>. Help your classmates prepare effectively with customized quiz sessions and detailed result tracking.",
//   tech: ["Next.js", "Tailwind CSS", "JavaScript"],
//   metrics: { quizzes: "100+", students: "50++", accuracy: "100%" },
//   color: "from-orange-500 via-red-500 to-pink-500",
//   preview: "/Quiz.png?height=400&width=600",
//   demoType: "interactive",
//   links: {
//       demo: "https://java-mcq-platform.vercel.app/",
//       github: "https://github.com/Jatin-L1/Java-MCQ-Platform"
//     }
  
// },
// {
//   id: 5, // or whatever the next ID should be
//   title: "Grainlyy",
//   subtitle: "Blockchain-Based Ration Delivery Transparency Platform",
//   description:"Grainlyy is a transparent, tamper-proof, blockchain-based platform to track and verify government ration deliveries. It leverages Ethereum, Chainlink, and location verification to eliminate corruption, ensure delivery accountability, and allow public and NGO-based verification—all without requiring a mobile app. Features smart contract automation, real-world GPS verification, and decentralized storage.",
//   tech: ["Solidity", "Next.js", "Node.js", "Express.js", "Ethereum", "Chainlink", "MongoDB Atlas", "IPFS"],
//   metrics: { deliveries: "500+", transparency: "100%", verification: "GPS+" },
//   color: "from-emerald-500 via-green-500 to-lime-500",
//   preview: "/grain.png?height=400&width=600",
//   demoType: "interactive",
//   links: {
//       demo: "https://grainlyy.vercel.app/",
//       github: "https://github.com/Jatin-L1/HackIndia-Spark-7-2025-PookieGrinders"
//     }
// },
//   ]

//   useEffect(() => {
//     if (!isAutoPlay) return

//     const interval = setInterval(() => {
//       setActiveProject((prev) => (prev + 1) % projects.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [isAutoPlay, projects.length])

//   const currentProject = projects[activeProject]

//   return (
//     <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
//       {/* Dynamic Background */}
//       <div className="absolute inset-0">
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-5`}
//           key={activeProject}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.05 }}
//           transition={{ duration: 1 }}
//         />
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <Badge variant="outline" className="border-pink-400/50 text-pink-400 bg-pink-400/10 mb-8">
//             Innovation Showcase
//           </Badge>

//           <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">Projects</h2>

//           <p className="text-xl text-white/70 max-w-3xl mx-auto">
//             Pushing the boundaries of what's possible with cutting-edge technology and revolutionary ideas.
//           </p>
//         </motion.div>

//         <div className="max-w-7xl mx-auto">
//           {/* Main Project Display */}
//           <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//             {/* Project Info */}
//             <motion.div
//               key={activeProject}
//               className="space-y-8"
//               initial={{ opacity: 0, x: -100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="space-y-4">
//                 <Badge className={`bg-gradient-to-r ${currentProject.color} text-white border-0`}>
//                   {currentProject.demoType.toUpperCase()} DEMO
//                 </Badge>

//                 <h3 className="text-4xl lg:text-5xl font-bold text-white">{currentProject.title}</h3>

//                 <p className="text-xl text-cyan-400 font-light">{currentProject.subtitle}</p>

//                 <p className="text-lg text-white/70 leading-relaxed">{currentProject.description}</p>
//               </div>

//               {/* Tech Stack Pills */}
//               <div className="flex flex-wrap gap-3">
//                 {currentProject.tech.map((tech, index) => (
//                   <motion.div
//                     key={tech}
//                     className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     {tech}
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Metrics */}
//               <div className="grid grid-cols-3 gap-4">
//                 {Object.entries(currentProject.metrics).map(([key, value], index) => (
//                   <motion.div
//                     key={key}
//                     className="text-center p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                   >
//                     <div
//                       className={`text-2xl font-bold bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent`}
//                     >
//                       {value}
//                     </div>
//                     <div className="text-white/60 text-sm capitalize">{key}</div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-4">
//   <Button 
//     className={`bg-gradient-to-r ${currentProject.color} hover:opacity-90 text-white border-0`}
//     onClick={() => {
//       if (typeof window !== 'undefined' && currentProject.links?.demo) {
//         window.open(currentProject.links.demo, '_blank')
//       }
//     }}
//   >
//     <ExternalLink className="w-4 h-4 mr-2" />
//     Launch Demo
//   </Button>
//   <Button 
//     variant="outline" 
//     className="border-white/20 text-white hover:bg-white/10"
//     onClick={() => {
//       if (typeof window !== 'undefined' && currentProject.links?.github) {
//         window.open(currentProject.links.github, '_blank')
//       }
//     }}
//   >
//     <Github className="w-4 h-4 mr-2" />
//     View Code
//   </Button>
// </div>
//             </motion.div>

//             {/* 3D Project Preview */}
//             <motion.div
//               key={activeProject}
//               className="relative"
//               initial={{ opacity: 0, x: 100, rotateY: -15 }}
//               animate={{ opacity: 1, x: 0, rotateY: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="relative group perspective-1000">
//                 {/* Main Preview */}
//                 <div className="relative transform-gpu transition-all duration-500 group-hover:rotateY-12 group-hover:rotateX-5">
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-r ${currentProject.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
//                   />

//                   <Card className="relative bg-black/40 backdrop-blur-lg border-white/20 overflow-hidden">
//                     <div className="aspect-video relative">
//                       <Image
//                         src={currentProject.preview || "/placeholder.svg"}
//                         alt={currentProject.title}
//                         fill
//                         className="object-cover"
//                       />

//                       {/* Interactive Overlay */}
//                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <motion.div
//                           className={`w-20 h-20 bg-gradient-to-r ${currentProject.color} rounded-full flex items-center justify-center cursor-pointer`}
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <span className="text-white text-2xl">▶</span>
//                         </motion.div>
//                       </div>
//                     </div>
//                   </Card>
//                 </div>

//                 {/* Floating Elements */}
//                 <motion.div
//                   className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                 >
//                   #{activeProject + 1}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Project Navigation */}
//           <div className="flex justify-center items-center space-x-8">
//             {/* Auto-play Toggle */}
//             <motion.button
//               className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
//               onClick={() => setIsAutoPlay(!isAutoPlay)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {isAutoPlay ? "⏸️" : "▶️"}
//             </motion.button>

//             {/* Project Dots */}
//             <div className="flex space-x-3">
//               {projects.map((project, index) => (
//                 <motion.button
//                   key={project.id}
//                   className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                     index === activeProject
//                       ? `bg-gradient-to-r ${currentProject.color}`
//                       : "bg-white/30 hover:bg-white/50"
//                   }`}
//                   onClick={() => {
//                     setActiveProject(index)
//                     setIsAutoPlay(false)
//                   }}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </div>

//             {/* Navigation Arrows */}
//             <div className="flex space-x-2">
//               <motion.button
//                 className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
//                 onClick={() => setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 ←
//               </motion.button>
//               <motion.button
//                 className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
//                 onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 →
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




// Revolutionary 3D Project Showcase
const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const projects = [
    {
      id: 1,
      title: "MedNexus",
      subtitle: "AI-Powered Medical Emergency Platform",
      description:
        "MedNexus is an innovative AI-driven medical platform designed to provide emergency response services,real-time disease prediction, and a secure Web3 KYC verification system. It ensures rapid help in crises, enabling users to request professional assistance and predict illnesses through AI-powered analysis.",
      tech: ["Next.js", "MongoDB Atlas", "Express", "JavaScript", "Tailwind CSS", "Python"],
      metrics: { response: "< 30s", accuracy: "89%", },
      color: "from-green-500 via-blue-500 to-teal-500",
      preview: "/MedNexus.png?height=400&width=600",
      demoType: "interactive",
      links: {
          demo: "https://med-nexus.vercel.app/",
          github: "https://github.com/Jatin-L1/MedNexus"
        }
    },
    {
      id: 2,
      title: "Nova Academy",
      subtitle: "Smart Campus Management System",
      description:
        "Manage your academic journey effortlessly. Upload attendance with facial recognition, stay updated on campus events, and register seamlessly—all in one place. Features include academic records tracking, attendance monitoring, campus events updates, and instant notifications for mission-critical updates.",
      tech: ["Next.js", "MongoDB", "Express", "JavaScript", "Tailwind CSS", "Face Recognition API"],
      metrics: { accuracy: "96%", events: "150+" },
      color: "from-indigo-500 via-purple-500 to-pink-500",
      preview: "/Nova.png?height=400&width=600",
      demoType: "interactive",
      links: {
          demo: "https://nova-academy-c7t6-coral.vercel.app/",
          github: "https://github.com/Jatin-L1/Nova-Academy"
        }
    },
    {
      id: 3,
      title: "AI Chatbot",
      subtitle: "Universal Multi-Model AI Integration Hub",
      description:
        "This chatbot is designed to integrate multiple AI models seamlessly. Just add your API keys, and the chatbot will automatically connect and start working. No extra setup needed! Features automatic AI detection, instant model switching, and unified chat interface that makes it easy to harness the power of different AI models in one place.",
      tech: ["TypeScript", "AI APIs", "React", "Tailwind CSS", "OpenAI" , "Gemni" , "Anthropic"],
      metrics: { response: "< 2s", accuracy: "99.4%" },
      color: "from-blue-500 via-cyan-500 to-teal-500",
      preview: "/chat.png?height=400&width=600",
      demoType: "interactive",
      links: {
          demo: "https://chit-chat-kappa-ten.vercel.app/",
          github: "https://github.com/Jatin-L1/ChatBot"
        }
    },
    {
      id: 4,
      title: "MCQ Platform",
      subtitle: "Interactive Quiz System for Exam Preparation",
      description:
        "A comprehensive MCQ platform designed for batchmates to practice before exams. Create and share interactive quizzes for every exam subject, featuring real-time scoring, instant feedback, and performance analytics. Help your classmates prepare effectively with customized quiz sessions and detailed result tracking.",
      tech: ["Next.js", "Tailwind CSS", "JavaScript"],
      metrics: { quizzes: "100+", students: "50++", accuracy: "100%" },
      color: "from-orange-500 via-red-500 to-pink-500",
      preview: "/Quiz.png?height=400&width=600",
      demoType: "interactive",
      links: {
          demo: "https://java-mcq-platform.vercel.app/",
          github: "https://github.com/Jatin-L1/Java-MCQ-Platform"
        }
    },
    {
      id: 5,
      title: "Grainlyy",
      subtitle: "Blockchain-Based Ration Delivery Transparency Platform",
      description:"Grainlyy is a transparent, tamper-proof, blockchain-based platform to track and verify government ration deliveries. It leverages Ethereum, Chainlink, and location verification to eliminate corruption, ensure delivery accountability, and allow public and NGO-based verification—all without requiring a mobile app. Features smart contract automation, real-world GPS verification, and decentralized storage.",
      tech: ["Solidity", "Next.js", "Node.js", "Express.js", "Ethereum", "Chainlink", "MongoDB Atlas", "IPFS"],
      metrics: { deliveries: "500+", transparency: "100%", verification: "GPS+" },
      color: "from-emerald-500 via-green-500 to-lime-500",
      preview: "/grain.png?height=400&width=600",
      demoType: "interactive",
      links: {
          demo: "https://grainlyy.vercel.app/",
          github: "https://github.com/Jatin-L1/HackIndia-Spark-7-2025-PookieGrinders"
        }
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, projects.length])

  const currentProject = projects[activeProject]

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-5`}
          key={activeProject}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-pink-400/50 text-pink-400 bg-pink-400/10 mb-8">
            Innovation Showcase
          </Badge>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">Projects</h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Pushing the boundaries of what's possible with cutting-edge technology and revolutionary ideas.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Main Project Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Project Info */}
            <motion.div
              key={`project-info-${activeProject}`}
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <Badge className={`bg-gradient-to-r ${currentProject.color} text-white border-0`}>
                  {currentProject.demoType.toUpperCase()} DEMO
                </Badge>

                <h3 className="text-4xl lg:text-5xl font-bold text-white">{currentProject.title}</h3>

                <p className="text-xl text-cyan-400 font-light">{currentProject.subtitle}</p>

                <p className="text-lg text-white/70 leading-relaxed">{currentProject.description}</p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-3">
                {currentProject.tech.map((tech, index) => (
                  <motion.div
                    key={`${currentProject.id}-tech-${index}`}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(currentProject.metrics).map(([key, value], index) => (
                  <motion.div
                    key={`${currentProject.id}-metric-${key}`}
                    className="text-center p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent`}
                    >
                      {value}
                    </div>
                    <div className="text-white/60 text-sm capitalize">{key}</div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  className={`bg-gradient-to-r ${currentProject.color} hover:opacity-90 text-white border-0`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && currentProject.links?.demo) {
                      window.open(currentProject.links.demo, '_blank')
                    }
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Launch Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    if (typeof window !== 'undefined' && currentProject.links?.github) {
                      window.open(currentProject.links.github, '_blank')
                    }
                  }}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </div>
            </motion.div>

            {/* 3D Project Preview */}
            <motion.div
              key={`project-preview-${activeProject}`}
              className="relative"
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group perspective-1000">
                {/* Main Preview */}
                <div className="relative transform-gpu transition-all duration-500 group-hover:rotateY-12 group-hover:rotateX-5">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${currentProject.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                  />

                  <Card className="relative bg-black/40 backdrop-blur-lg border-white/20 overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={currentProject.preview || "/placeholder.svg"}
                        alt={currentProject.title}
                        fill
                        className="object-cover"
                      />

                      {/* Interactive Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.div
                          className={`w-20 h-20 bg-gradient-to-r ${currentProject.color} rounded-full flex items-center justify-center cursor-pointer`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-white text-2xl">▶</span>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  #{activeProject + 1}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Project Navigation */}
          <div className="flex justify-center items-center space-x-8">
            {/* Auto-play Toggle */}
            <motion.button
              className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlay ? "⏸️" : "▶️"}
            </motion.button>

            {/* Project Dots */}
            <div className="flex space-x-3">
              {projects.map((project, index) => (
                <motion.button
                  key={`project-dot-${index}`}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeProject
                      ? `bg-gradient-to-r ${currentProject.color}`
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => {
                    setActiveProject(index)
                    setIsAutoPlay(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <motion.button
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
              <motion.button
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}







// Achievements Section
const AchievementsSection = () => {
  const achievements = [
    {
      title: "HackIndia 2nd Runner-up",
      description: "National level hackathon achievement",
      image: "/Hackindia.png?height=200&width=300",
      year: "2024",
    },
    {
      title: "Hackwartz Winner",
      description: "Competitive Programming",
      image: "/Hackwartz.png?height=200&width=300",
      year: "2024",
    },
    {
      title: "OSC Hacks 1.0 Winner",
      description: "Major project contributions",
      image: "/OSC.png?height=200&width=300",
      year: "2024",
    },
  ]

  return (
    <section id="achievements" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10 mb-8">
            Recognition
          </Badge>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">Achievements</h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Key milestones and recognition throughout my professional journey as a developer.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Scattered Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className={`${index % 2 === 0 ? "lg:mt-12" : ""} ${index === 2 ? "lg:-mt-8" : ""}`}
                initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotate: Math.random() * 6 - 3,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1">
                        <span className="text-yellow-400 font-bold text-sm">{achievement.year}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                      <p className="text-white/70 text-sm">{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen py-20 relative flex items-center">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-green-400/50 text-green-400 bg-green-400/10 mb-8">
            Let's Connect
          </Badge>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8">Get In Touch</h2>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <ContactForm />
</div>
            </motion.div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">© 2024 Jatin Sharma. Crafted with passion and lots of coffee ☕</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Portfolio() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <AnimatedBackground />
      <FloatingNav />

      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  )
}
