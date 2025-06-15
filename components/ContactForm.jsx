import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, User, AtSign, MessageSquare, Sparkles, Zap } from "lucide-react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      emailjs.init('BzSR-v7E37vg6FpKK')
      
      const result = await emailjs.send(
        'service_67coxsc',
        'template_s7n7rlo',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      )

      console.log('Email sent successfully:', result)
      alert('Message sent successfully! 🎉')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsOpen(false)
    } catch (error) {
      console.error('Error sending email:', error)
      alert(`Failed to send message: ${error.text || 'Please try again.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: User,
      value: formData.name
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@example.com',
      icon: AtSign,
      value: formData.email
    },
    {
      id: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'What would you like to discuss?',
      icon: Sparkles,
      value: formData.subject
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="group"
        >
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Send Message
            
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{ scale: [0, 1.2, 0] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            />
          </Button>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl border border-white/20 text-white max-w-lg p-0 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 400],
                y: [0, Math.random() * 600],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8">
          <DialogHeader className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10 mb-4 w-fit"
              >
                <Zap className="w-3 h-3 mr-1" />
                Let's Connect
              </Badge>
              
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Send me a message
              </DialogTitle>
              
              <p className="text-white/60 mt-2">
                Have a project in mind? Let's discuss how we can work together.
              </p>
            </motion.div>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            {formFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <Label 
                  htmlFor={field.id} 
                  className="text-white/80 font-medium flex items-center gap-2"
                >
                  <field.icon className="w-4 h-4 text-cyan-400" />
                  {field.label}
                </Label>
                
                <div className="relative">
                  <Input
                    id={field.id}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 transition-all duration-300 ${
                      focusedField === field.id 
                        ? 'border-cyan-400/50 bg-white/10 shadow-lg shadow-cyan-400/10' 
                        : 'hover:border-white/30'
                    }`}
                    placeholder={field.placeholder}
                    required
                  />
                  
                  {/* Focus indicator */}
                  <AnimatePresence>
                    {focusedField === field.id && (
                      <motion.div
                        className="absolute inset-0 border-2 border-cyan-400/30 rounded-md pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
            
            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <Label 
                htmlFor="message" 
                className="text-white/80 font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Your Message
              </Label>
              
              <div className="relative">
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[120px] resize-none transition-all duration-300 ${
                    focusedField === 'message' 
                      ? 'border-purple-400/50 bg-white/10 shadow-lg shadow-purple-400/10' 
                      : 'hover:border-white/30'
                  }`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  required
                />
                
                {/* Focus indicator */}
                <AnimatePresence>
                  {focusedField === 'message' && (
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-400/30 rounded-md pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                  isLoading ? 'animate-pulse' : 'group-hover:translate-x-1'
                }`} />
                
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Sending message
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </motion.div>
          </form>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </DialogContent>
    </Dialog>
  )
}

export default ContactForm