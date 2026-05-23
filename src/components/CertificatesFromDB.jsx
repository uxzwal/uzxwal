import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const CertificatesFromDB = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewCert, setPreviewCert] = useState(null);
  const INITIAL_SHOW = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCertificates(data);
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-emerald-400/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <p className="text-red-400 font-semibold mb-2">Failed to load certificates</p>
          <p className="text-red-300/70 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
          <p className="text-slate-400 text-lg">No certificates found</p>
          <p className="text-slate-500 text-sm mt-2">Add certificates in your Supabase database!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {certificates.slice(0, visibleCount).map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-400/50 transition-all duration-500 shadow-lg hover:shadow-emerald-500/20"
                whileHover={{ y: -8 }}
                onClick={() => setPreviewCert(cert)}
              >
                {cert.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-1">{cert.issuer}</p>
                  {cert.issue_date && (
                    <p className="text-emerald-400 text-xs font-medium mb-4">
                      {formatDate(cert.issue_date)}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    <span className="flex items-center gap-2">
                      <FaDownload className="text-xs" />
                      View Certificate
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaExternalLinkAlt className="text-emerald-300" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Buttons */}
        {certificates.length > INITIAL_SHOW && (
          <div className="flex justify-center mt-12">
            {visibleCount < certificates.length ? (
              <motion.button
                onClick={() => setVisibleCount(certificates.length)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More ({certificates.length - visibleCount} more)
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setVisibleCount(INITIAL_SHOW)}
                className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Less
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setPreviewCert(null)}
                  className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md p-3 rounded-full border border-red-400/30 transition-all duration-300 group"
                >
                  <FaTimes className="text-red-300 group-hover:text-red-200" />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">{previewCert.title}</h2>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 font-semibold border border-cyan-400/30">
                      {previewCert.issuer}
                    </span>
                    <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 font-semibold border border-emerald-400/30">
                      {formatDate(previewCert.issue_date)}
                    </span>
                  </div>
                </div>

                {previewCert.image_url && (
                  <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-6">
                    <img
                      src={previewCert.image_url}
                      alt={previewCert.title}
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  </div>
                )}

                {previewCert.credential_url && (
                  <div className="flex justify-center">
                    <a
                      href={previewCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-8 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <FaDownload className="group-hover:scale-110 transition-transform" />
                      <span>View Credential</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesFromDB;
