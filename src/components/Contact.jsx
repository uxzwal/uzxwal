import React, { useState } from 'react';
import { FaPaperPlane, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full">
      <div className="mb-12">
        <h2 className="text-[28px] font-semibold text-[#f3f3f3] uppercase mb-2">Contact</h2>
        <p className="text-[16px] text-[#808080]">Let's collaborate and create something amazing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
                className="w-full p-4 bg-[#000000] border border-[#e5e7eb] text-[#f3f3f3] placeholder-[#808080] focus:border-[#a6a6a6] focus:outline-none transition-colors rounded text-[16px]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
                className="w-full p-4 bg-[#000000] border border-[#e5e7eb] text-[#f3f3f3] placeholder-[#808080] focus:border-[#a6a6a6] focus:outline-none transition-colors rounded text-[16px]"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                required
                rows={5}
                className="w-full p-4 bg-[#000000] border border-[#e5e7eb] text-[#f3f3f3] placeholder-[#808080] focus:border-[#a6a6a6] focus:outline-none transition-colors rounded text-[16px] resize-none"
              ></textarea>
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-[#f3f3f3] text-[#000000] font-semibold rounded hover:bg-[#e5e7eb] transition-colors text-[16px]">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

        <div className="p-8 border border-[#e5e7eb] bg-[#000000] rounded">
          <h3 className="text-[23px] font-semibold text-[#f3f3f3] mb-6">Connect With Me</h3>
          <div className="flex flex-col gap-4">
            <a href="https://github.com/uxzwal" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#a6a6a6] hover:text-[#f3f3f3] transition-colors">
              <FaGithub className="text-[24px]" />
              <span className="text-[18px]">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/uxzwal" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#a6a6a6] hover:text-[#f3f3f3] transition-colors">
              <FaLinkedin className="text-[24px]" />
              <span className="text-[18px]">LinkedIn</span>
            </a>
            <a href="https://uxzwal.dev" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#a6a6a6] hover:text-[#f3f3f3] transition-colors">
              <FaGlobe className="text-[24px]" />
              <span className="text-[18px]">Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;