// import { useState, useEffect, useRef } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import contactImg from "../assets/img/contact-img.svg";
// import './contact.css';
// import TrackVisibility from 'react-on-screen';

// export const Contact = () => {
//   const formInitialDetails = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: ''
//   };
  
//   const [formDetails, setFormDetails] = useState(formInitialDetails);
//   const [buttonText, setButtonText] = useState('Send Message');
//   const [status, setStatus] = useState({});
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);
  
//   const formRef = useRef(null);
//   const confettiRef = useRef(null);
//   const typingIndicatorRef = useRef(null);
  
//   // Form validation
//   const validateForm = () => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    
//     if (!formDetails.firstName.trim()) {
//       errors.firstName = "First name is required";
//     }
    
//     if (!formDetails.lastName.trim()) {
//       errors.lastName = "Last name is required";
//     }
    
//     if (!formDetails.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!emailRegex.test(formDetails.email)) {
//       errors.email = "Please enter a valid email address";
//     }
    
//     if (formDetails.phone && !phoneRegex.test(formDetails.phone)) {
//       errors.phone = "Please enter a valid phone number";
//     }
    
//     if (!formDetails.message.trim()) {
//       errors.message = "Message is required";
//     } else if (formDetails.message.trim().length < 10) {
//       errors.message = "Message should be at least 10 characters";
//     }
    
//     return errors;
//   };

//   const onFormUpdate = (category, value) => {
//     setFormDetails({
//       ...formDetails,
//       [category]: value
//     });
    
//     // Clear error when typing
//     if (formErrors[category]) {
//       setFormErrors({
//         ...formErrors,
//         [category]: null
//       });
//     }
    
//     // Typing indicator animation for message field
//     if (category === 'message' && typingIndicatorRef.current) {
//       typingIndicatorRef.current.style.width = `${Math.min(value.length / 2, 100)}%`;
//     }
//   };

//   const handleFocus = (field) => {
//     setFocusedField(field);
//   };

//   const handleBlur = () => {
//     setFocusedField(null);
//   };

//   // Confetti animation on successful form submission
//   const createConfetti = () => {
//     if (!confettiRef.current) return;
    
//     const canvas = confettiRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    
//     const confettiCount = 200;
//     const confettiColors = ['#ff1a75', '#4a2fbd', '#aa367c', '#21D4FD', '#FFFC00'];
//     const confetti = [];
    
//     for (let i = 0; i < confettiCount; i++) {
//       confetti.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height - canvas.height,
//         size: Math.random() * 10 + 5,
//         color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
//         rotation: Math.random() * 360,
//         speed: Math.random() * 3 + 1,
//         rotationSpeed: Math.random() * 2 - 1
//       });
//     }
    
//     let animationFrameId;
    
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       let finished = true;
      
//       confetti.forEach((c) => {
//         ctx.save();
//         ctx.translate(c.x, c.y);
//         ctx.rotate((c.rotation * Math.PI) / 180);
//         ctx.fillStyle = c.color;
//         ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
//         ctx.restore();
        
//         c.y += c.speed;
//         c.rotation += c.rotationSpeed;
        
//         if (c.y < canvas.height) {
//           finished = false;
//         }
//       });
      
//       if (!finished) {
//         animationFrameId = requestAnimationFrame(animate);
//       } else {
//         setShowConfetti(false);
//       }
//     };
    
//     animate();
    
//     return () => cancelAnimationFrame(animationFrameId);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const errors = validateForm();
//     setFormErrors(errors);
    
//     if (Object.keys(errors).length === 0) {
//       setIsSubmitting(true);
//       setButtonText("Sending...");
      
//       try {
//         let response = await fetch("http://localhost:5000/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json;charset=utf-8",
//           },
//           body: JSON.stringify(formDetails),
//         });
        
//         let result = await response.json();
        
//         setFormDetails(formInitialDetails);
//         if (typingIndicatorRef.current) {
//           typingIndicatorRef.current.style.width = "0%";
//         }
        
//         if (result.code === 200) {
//           setStatus({ success: true, message: 'Message sent successfully!'});
//           setShowConfetti(true);
//           setTimeout(() => createConfetti(), 100);
//         } else {
//           setStatus({ success: false, message: 'Something went wrong, please try again later.'});
//         }
//       } catch (error) {
//         setStatus({ 
//           success: false, 
//           message: 'Network error. Please check your connection and try again.'
//         });
//       } finally {
//         setButtonText("Send Message");
//         setIsSubmitting(false);
        
//         // Scroll to form top to show status message
//         if (formRef.current) {
//           formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }
//     }
//   };

//   // Form animations on scroll
//   const getInputFieldClass = (field) => {
//     let className = "input-field";
//     if (focusedField === field) className += " focused";
//     if (formErrors[field]) className += " error";
//     if (formDetails[field]) className += " filled";
//     return className;
//   };

//   // Clear success message after 5 seconds
//   useEffect(() => {
//     if (status.success) {
//       const timer = setTimeout(() => {
//         setStatus({});
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [status]);

//   // Handle window resize for confetti canvas
//   useEffect(() => {
//     const handleResize = () => {
//       if (confettiRef.current) {
//         confettiRef.current.width = window.innerWidth;
//         confettiRef.current.height = window.innerHeight;
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <section className="contact" id="connect">
//       {showConfetti && (
//         <canvas 
//           ref={confettiRef} 
//           className="confetti-canvas"
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             zIndex: 999
//           }}
//         />
//       )}
      
//       <Container>
//         <div className="section-header">
//           <TrackVisibility once>
//             {({ isVisible }) => 
//               <h2 className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                 Let's <span className="highlight-text">Connect</span>
//               </h2>
//             }
//           </TrackVisibility>
//           <TrackVisibility once>
//             {({ isVisible }) => 
//               <p className={isVisible ? "animate__animated animate__fadeIn animate__delay-1s" : ""}>
//                 I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
//               </p>
//             }
//           </TrackVisibility>
//         </div>
        
//         <Row className="align-items-center contact-content">
//           <Col size={12} md={6} className="contact-info-column">
//             <TrackVisibility once>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__zoomIn contact-info-wrapper" : "contact-info-wrapper"}>
//                   <img src={contactImg} alt="Contact Illustration" className="contact-image"/>
//                 </div>
//               }
//             </TrackVisibility>
//           </Col>
          
//           <Col size={12} md={6} className="contact-form-column">
//             <TrackVisibility once>
//               {({ isVisible }) =>
//                 <div ref={formRef} className={isVisible ? "animate__animated animate__fadeIn contact-form-wrapper" : "contact-form-wrapper"}>
//                   <h3>Send Message</h3>
                  
//                   {status.message && (
//                     <div className={`status-message ${status.success ? "success-message" : "error-message"} animate__animated animate__fadeIn`}>
//                       <div className="status-icon"></div>
//                       <p>{status.message}</p>
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleSubmit} className="modern-form">
//                     <Row>
//                       <Col size={12} sm={6} className="px-1">
//                         <div className={getInputFieldClass('firstName')}>
//                           <input 
//                             type="text" 
//                             value={formDetails.firstName} 
//                             onChange={(e) => onFormUpdate('firstName', e.target.value)}
//                             onFocus={() => handleFocus('firstName')}
//                             onBlur={handleBlur}
//                             id="firstName"
//                           />
//                           <label htmlFor="firstName">First Name</label>
//                           <div className="input-line"></div>
//                           {formErrors.firstName && <div className="error-text">{formErrors.firstName}</div>}
//                         </div>
//                       </Col>
                      
//                       <Col size={12} sm={6} className="px-1">
//                         <div className={getInputFieldClass('lastName')}>
//                           <input 
//                             type="text" 
//                             value={formDetails.lastName} 
//                             onChange={(e) => onFormUpdate('lastName', e.target.value)}
//                             onFocus={() => handleFocus('lastName')}
//                             onBlur={handleBlur}
//                             id="lastName"
//                           />
//                           <label htmlFor="lastName">Last Name</label>
//                           <div className="input-line"></div>
//                           {formErrors.lastName && <div className="error-text">{formErrors.lastName}</div>}
//                         </div>
//                       </Col>
                      
//                       <Col size={12} sm={6} className="px-1">
//                         <div className={getInputFieldClass('email')}>
//                           <input 
//                             type="email" 
//                             value={formDetails.email} 
//                             onChange={(e) => onFormUpdate('email', e.target.value)}
//                             onFocus={() => handleFocus('email')}
//                             onBlur={handleBlur}
//                             id="email"
//                           />
//                           <label htmlFor="email">Email Address</label>
//                           <div className="input-line"></div>
//                           {formErrors.email && <div className="error-text">{formErrors.email}</div>}
//                         </div>
//                       </Col>
                      
//                       <Col size={12} sm={6} className="px-1">
//                         <div className={getInputFieldClass('phone')}>
//                           <input 
//                             type="tel" 
//                             value={formDetails.phone} 
//                             onChange={(e) => onFormUpdate('phone', e.target.value)}
//                             onFocus={() => handleFocus('phone')}
//                             onBlur={handleBlur}
//                             id="phone"
//                           />
//                           <label htmlFor="phone">Phone (Optional)</label>
//                           <div className="input-line"></div>
//                           {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
//                         </div>
//                       </Col>
                      
//                       <Col size={12} className="px-1">
//                         <div className={getInputFieldClass('message')}>
//                           <textarea 
//                             rows="6" 
//                             value={formDetails.message} 
//                             onChange={(e) => onFormUpdate('message', e.target.value)}
//                             onFocus={() => handleFocus('message')}
//                             onBlur={handleBlur}
//                             id="message"
//                           ></textarea>
//                           <label htmlFor="message">Your Message</label>
//                           <div className="input-line"></div>
//                           <div className="typing-indicator" ref={typingIndicatorRef}></div>
//                           {formErrors.message && <div className="error-text">{formErrors.message}</div>}
//                         </div>
//                       </Col>
                      
//                       <Col size={12} className="px-1">
//                         <button 
//                           type="submit" 
//                           className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
//                           disabled={isSubmitting}
//                         >
//                           <span>{buttonText}</span>
//                           <div className="btn-overlay"></div>
//                           <div className="btn-loader"></div>
//                         </button>
//                       </Col>
//                     </Row>
//                   </form>
//                 </div>
//               }
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };


import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import './contact.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const formRef = useRef(null);
  const confettiRef = useRef(null);
  const typingIndicatorRef = useRef(null);
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    
    if (!formDetails.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!formDetails.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    
    if (!formDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formDetails.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (formDetails.phone && !phoneRegex.test(formDetails.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!formDetails.message.trim()) {
      errors.message = "Message is required";
    } else if (formDetails.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }
    
    return errors;
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
    
    // Clear error when typing
    if (formErrors[category]) {
      setFormErrors({
        ...formErrors,
        [category]: null
      });
    }
    
    // Typing indicator animation for message field
    if (category === 'message' && typingIndicatorRef.current) {
      typingIndicatorRef.current.style.width = `${Math.min(value.length / 2, 100)}%`;
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Confetti animation on successful form submission
  const createConfetti = () => {
    if (!confettiRef.current) return;
    
    const canvas = confettiRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confettiColors = ['#ff1a75', '#4a2fbd', '#aa367c', '#21D4FD', '#FFFC00'];
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 1,
        rotationSpeed: Math.random() * 2 - 1
      });
    }
    
    let animationFrameId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let finished = true;
      
      confetti.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
        
        c.y += c.speed;
        c.rotation += c.rotationSpeed;
        
        if (c.y < canvas.height) {
          finished = false;
        }
      });
      
      if (!finished) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setShowConfetti(false);
      }
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setButtonText("Sending...");
      
      try {
        let response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formDetails),
        });
        
        let result = await response.json();
        
        setFormDetails(formInitialDetails);
        if (typingIndicatorRef.current) {
          typingIndicatorRef.current.style.width = "0%";
        }
        
        if (result.code === 200) {
          setStatus({ success: true, message: 'Message sent successfully!'});
          setShowConfetti(true);
          setTimeout(() => createConfetti(), 100);
        } else {
          setStatus({ success: false, message: 'Something went wrong, please try again later.'});
        }
      } catch (error) {
        setStatus({ 
          success: false, 
          message: 'Network error. Please check your connection and try again.'
        });
      } finally {
        setButtonText("Send Message");
        setIsSubmitting(false);
        
        // Scroll to form top to show status message
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // Form animations on scroll
  const getInputFieldClass = (field) => {
    let className = "input-field";
    if (focusedField === field) className += " focused";
    if (formErrors[field]) className += " error";
    if (formDetails[field]) className += " filled";
    return className;
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => {
        setStatus({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handle window resize for confetti canvas
  useEffect(() => {
    const handleResize = () => {
      if (confettiRef.current) {
        confettiRef.current.width = window.innerWidth;
        confettiRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="contact" id="connect">
      {showConfetti && (
        <canvas 
          ref={confettiRef} 
          className="confetti-canvas"
        />
      )}
      
      <Container>
        <div className="section-header">
          <TrackVisibility once>
            {({ isVisible }) => 
              <h2 className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                Let's <span className="highlight-text">Connect</span>
              </h2>
            }
          </TrackVisibility>
          <TrackVisibility once>
            {({ isVisible }) => 
              <p className={isVisible ? "animate__animated animate__fadeIn animate__delay-1s" : ""}>
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            }
          </TrackVisibility>
        </div>
        
        <Row className="align-items-center contact-content">
          <Col size={12} md={6} className="contact-info-column">
            <TrackVisibility once>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn contact-info-wrapper" : "contact-info-wrapper"}>
                  <img src={contactImg} alt="Contact Illustration" className="contact-image"/>
                </div>
              }
            </TrackVisibility>
          </Col>
          
          <Col size={12} md={6} className="contact-form-column">
            <TrackVisibility once>
              {({ isVisible }) =>
                <div ref={formRef} className={isVisible ? "animate__animated animate__fadeIn contact-form-wrapper" : "contact-form-wrapper"}>
                  <h3>Send Message</h3>
                  
                  {status.message && (
                    <div className={`status-message ${status.success ? "success-message" : "error-message"} animate__animated animate__fadeIn`}>
                      <div className="status-icon"></div>
                      <p>{status.message}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="modern-form">
                    <Row className="form-row">
                      <Col size={12} sm={6} className="px-1">
                        <div className={getInputFieldClass('firstName')}>
                          <input 
                            type="text" 
                            value={formDetails.firstName} 
                            onChange={(e) => onFormUpdate('firstName', e.target.value)}
                            onFocus={() => handleFocus('firstName')}
                            onBlur={handleBlur}
                            id="firstName"
                          />
                          <label htmlFor="firstName">First Name</label>
                          <div className="input-line"></div>
                          {formErrors.firstName && <div className="error-text">{formErrors.firstName}</div>}
                        </div>
                      </Col>
                      
                      <Col size={12} sm={6} className="px-1">
                        <div className={getInputFieldClass('lastName')}>
                          <input 
                            type="text" 
                            value={formDetails.lastName} 
                            onChange={(e) => onFormUpdate('lastName', e.target.value)}
                            onFocus={() => handleFocus('lastName')}
                            onBlur={handleBlur}
                            id="lastName"
                          />
                          <label htmlFor="lastName">Last Name</label>
                          <div className="input-line"></div>
                          {formErrors.lastName && <div className="error-text">{formErrors.lastName}</div>}
                        </div>
                      </Col>
                      
                      <Col size={12} sm={6} className="px-1">
                        <div className={getInputFieldClass('email')}>
                          <input 
                            type="email" 
                            value={formDetails.email} 
                            onChange={(e) => onFormUpdate('email', e.target.value)}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            id="email"
                          />
                          <label htmlFor="email">Email Address</label>
                          <div className="input-line"></div>
                          {formErrors.email && <div className="error-text">{formErrors.email}</div>}
                        </div>
                      </Col>
                      
                      <Col size={12} sm={6} className="px-1">
                        <div className={getInputFieldClass('phone')}>
                          <input 
                            type="tel" 
                            value={formDetails.phone} 
                            onChange={(e) => onFormUpdate('phone', e.target.value)}
                            onFocus={() => handleFocus('phone')}
                            onBlur={handleBlur}
                            id="phone"
                          />
                          <label htmlFor="phone">Phone (Optional)</label>
                          <div className="input-line"></div>
                          {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
                        </div>
                      </Col>
                      
                      <Col size={12} className="px-1">
                        <div className={getInputFieldClass('message')}>
                          <textarea 
                            rows="6" 
                            value={formDetails.message} 
                            onChange={(e) => onFormUpdate('message', e.target.value)}
                            onFocus={() => handleFocus('message')}
                            onBlur={handleBlur}
                            id="message"
                          ></textarea>
                          <label htmlFor="message">Your Message</label>
                          <div className="input-line"></div>
                          <div className="typing-indicator" ref={typingIndicatorRef}></div>
                          {formErrors.message && <div className="error-text">{formErrors.message}</div>}
                        </div>
                      </Col>
                      
                      <Col size={12} className="px-1 button-col">
                        <button 
                          type="submit" 
                          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                          disabled={isSubmitting}
                        >
                          <span>{buttonText}</span>
                          <div className="btn-overlay"></div>
                          <div className="btn-loader"></div>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};