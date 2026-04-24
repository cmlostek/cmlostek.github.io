import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_00uzfhv',
        'template_8pimgtk',
        {
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
          to_email:   'colerm17@gmail.com',
        },
        '-mtb4mwaA4yC6Au-3'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Contact</span>
          <h2>Get In Touch</h2>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to new opportunities, interesting projects, or just a friendly hello.
            </p>
            <ul className="contact-list">
              <li>
                <span className="contact-list__label">Email</span>
                <a href="mailto:colerm17@gmail.com">colerm17@gmail.com</a>
              </li>
              <li>
                <span className="contact-list__label">LinkedIn</span>
                <a href="https://linkedin.com/in/colemlostek" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/colemlostek
                </a>
              </li>
              <li>
                <span className="contact-list__label">GitHub</span>
                <a href="https://github.com/cmlostek" target="_blank" rel="noopener noreferrer">
                  github.com/cmlostek
                </a>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus === 'success' && (
              <div className="status-msg status-msg--success">
                Message sent — thanks for reaching out!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-msg status-msg--error">
                Something went wrong. Please email me directly at{' '}
                <a href="mailto:colerm17@gmail.com">colerm17@gmail.com</a>.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange}
                required disabled={isSubmitting}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                required disabled={isSubmitting}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange}
                rows="5" required disabled={isSubmitting}
                placeholder="What's on your mind?"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
