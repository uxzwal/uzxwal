import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaDownload } from 'react-icons/fa';

const dummyProjects = [
  {
    title: "Dockerized Web App",
    description: "Engineered optimized Dockerfiles leveraging layer caching, .dockerignore, and strategic COPY ordering, reducing image build times by ~30%.",
    tech: ["Docker", "Node.js", "Nginx"],
    link: "https://github.com/uxzwal",
  },
  {
    title: "Multi-Container Compose Stack",
    description: "Designed and deployed multi-container application environments using Docker Compose, enabling consistent local development setups across 3+ interconnected containers.",
    tech: ["Docker Compose", "PostgreSQL", "Redis"],
    link: "https://github.com/uxzwal",
  },
  {
    title: "GitHub Actions CI/CD Pipeline",
    description: "Automated build and integration workflows using GitHub Actions CI/CD pipelines, triggering Docker builds on every push and reducing manual deployment effort to near zero.",
    tech: ["GitHub Actions", "Docker", "YAML"],
    link: "https://github.com/uxzwal",
  },
];

const userCertificates = [
  { title: "Docker Essentials: A Developer Introduction", issuer: "IBM", date: "2024" },
  { title: "Introduction to Containers, Kubernetes, and OpenShift", issuer: "IBM", date: "2024" },
  { title: "Containers, Kubernetes and Istio on IBM Cloud", issuer: "IBM", date: "2024" },
  { title: "Getting Started with Microservices using Istio", issuer: "IBM", date: "2024" },
  { title: "Beyond the Basics: Istio and IBM Cloud", issuer: "IBM", date: "2024" },
];

const ProjectSection = () => {
  return (
    <div className="w-full">
      <div className="mb-12">
        <h2 className="text-[28px] font-semibold text-[#f3f3f3] uppercase mb-2">Projects</h2>
        <p className="text-[16px] text-[#808080]">Showcase of recent DevOps and engineering work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {dummyProjects.map((project, idx) => (
          <div key={idx} className="p-6 border border-[#e5e7eb] bg-[#000000] hover:border-[#808080] transition-colors duration-150 rounded">
            <h3 className="text-[18px] font-semibold text-[#f3f3f3] mb-3">{project.title}</h3>
            <p className="text-[16px] text-[#a6a6a6] mb-6 leading-[27px]">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-[#f3f3f3] text-[#000000] text-[14px] font-medium rounded">{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.link} className="flex items-center gap-2 text-[#808080] hover:text-[#f3f3f3] transition-colors text-[14px] font-medium uppercase">
                <FaGithub /> Source
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-[28px] font-semibold text-[#f3f3f3] uppercase mb-2">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {userCertificates.map((cert, idx) => (
          <div key={idx} className="p-6 border border-[#e5e7eb] bg-[#000000] hover:border-[#808080] transition-colors duration-150 rounded flex flex-col justify-between">
            <div>
              <p className="text-[14px] text-[#808080] mb-2 uppercase">{cert.issuer} • {cert.date}</p>
              <h3 className="text-[18px] font-semibold text-[#f3f3f3] leading-[27px]">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;