import { supabase } from '../lib/supabase';

class ApiService {
  // Projects
  async getProjects() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('getProjects failed:', error);
      return [];
    }
  }

  async createProject(projectData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('projects').insert([projectData]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateProject(id, projectData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('projects').update(projectData).eq('id', id).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteProject(id) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Certificates
  async getCertificates() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('certificates').select('*').order('issue_date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async createCertificate(certificateData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('certificates').insert([certificateData]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Contact Messages
  async sendContactMessage(messageData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('contact_messages').insert([messageData]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getContactMessages() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  // Comments
  async getComments() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async createComment(commentData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('comments').insert([commentData]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async approveComment(id) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { error } = await supabase.from('comments').update({ approved: true }).eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteComment(id) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Gallery
  async getGallery() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  }

  async createGalleryItem(itemData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const payload = {
        title: itemData.title,
        description: itemData.description,
        media_url: itemData.media_url,
        media_urls: itemData.media_urls,
        type: itemData.type,
        date: itemData.date,
      };
      const { data, error } = await supabase.from('gallery').insert([payload]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateGalleryItem(id, itemData) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase.from('gallery').update(itemData).eq('id', id).select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteGalleryItem(id) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async likeGalleryItem(id) {
    if (!supabase) return { success: false };
    try {
      const { error } = await supabase.rpc('increment_gallery_likes', { row_id: id });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getGalleryComments(galleryId) {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('gallery_comments')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async postGalleryComment(galleryId, name, content) {
    if (!supabase) return { success: false, error: 'No DB' };
    try {
      const { data, error } = await supabase
        .from('gallery_comments')
        .insert([{ gallery_id: galleryId, name, content }])
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new ApiService();
