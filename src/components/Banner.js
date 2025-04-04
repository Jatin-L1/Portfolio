import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle, Download, Stars, Linkedin, Github } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import cvFile from "../assets/docs/Jatin_CV.pdf"; // Add your CV file path here

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  
  // Expanded role list
  const toRotate = [
    "Full Stack Developer", 
    "Problem Solver", 
    "Tech Enthusiast",
    "Backend Developer",
    "Blockchain Developer",
    "DSA Enthusiast",
    "Leetcoder"
  ];
  
  const period = 2000;

  // Initialize particles effect
  useEffect(() => {
    setTimeout(() => {
      setShowParticles(true);
    }, 1000);
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta, isDeleting, loopNum]);

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }, [text, delta, isDeleting, loopNum, period, toRotate]);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    // Simulate short delay for better UX feedback
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = cvFile; // Use imported CV file
      link.download = "Jatin_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
    }, 800);
  }

  const connectToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  return (
    <section className="banner" id="home">
      {showParticles && <div className="particles"></div>}
      
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">
                  <Stars className="tagline-icon" /> Welcome to My Digital Space
                </span>
                
                <h1>
                  {`Hi! I'm Jatin `} 
                  <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Full Stack Developer", "Problem Solver", "Tech Enthusiast", "UI/UX Designer", "Code Craftsman" ]'>
                    <span className="wrap">{text}</span>
                  </span>
                </h1>
                
                <p className="banner-description">
                  I'm passionate about creating elegant solutions to complex problems. With expertise in 
                  <span className="highlight"> modern web technologies</span> and a keen eye for 
                  <span className="highlight"> design</span>, I build applications that are both 
                  <span className="highlight"> functional and beautiful</span>. Let's turn your ideas into reality!
                </p>
                
                <div className="banner-stats">
                  <div className="stat-item">
                    <span className="stat-number">1.5+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Contributions</span>
                  </div>
                </div>
                
                <div className="banner-btns">
                  <button onClick={() => connectToSection('projects')} className="connect-btn">
                    Let's Build Something Amazing <ArrowRightCircle size={25} />
                  </button>
                  
                  <button 
                    onClick={handleDownloadCV} 
                    className={`cv-download-btn ${isDownloading ? 'downloading' : ''}`}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <div className="spinner"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        Download CV <Download size={22} />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/jatin-sharma-391830283/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/Jatin-L1" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Github size={20} />
                  </a>
                </div>
              </div>}
            </TrackVisibility>
          </Col>
          
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <div className="header-img-container">
                    <img src={headerImg} alt="Header Img" className="header-img"/>
                    <div className="img-badge">Available for Work</div>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}