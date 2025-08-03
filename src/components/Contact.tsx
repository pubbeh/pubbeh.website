import { useState } from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ContactInfo {
  linkedin: string;
  location: string;
}

interface ContactProps {
  contactInfo: ContactInfo;
}

const Contact = ({ contactInfo }: ContactProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Message length validation
    if (formData.message.length < 10) {
      toast({
        title: "Error",
        description: "Message must be at least 10 characters long.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(), // Add timestamp for rate limiting
          source: window.location.hostname // Add source for tracking
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll respond as soon as possible.",
      });
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Contact Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 section-transition opacity-0 translate-y-8 js-reveal">
            <p className="text-lg">
              If you have any questions or would like to discuss professional opportunities, 
              please feel free to reach out. I'm open to connecting with fellow finance professionals, 
              potential employers, or anyone interested in financial leadership and strategy.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Linkedin className="w-5 h-5 mt-1 mr-3 text-primary" />
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactInfo.linkedin.replace('https://', '')}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-primary" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground">
                    {contactInfo.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-transition opacity-0 translate-y-8 js-reveal delay-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-hover bg-primary text-white py-3 rounded-md font-medium transition-all disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
