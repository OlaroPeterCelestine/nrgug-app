import { clientFetch } from './client-api';

// API utility functions for the website
export const apiUtils = {
  // Fetch shows
  async fetchShows() {
    const response = await clientFetch('/shows');
    return response.json();
  },

  // Fetch clients
  async fetchClients() {
    const response = await clientFetch('/clients');
    return response.json();
  },

  // Fetch news
  async fetchNews() {
    const response = await clientFetch('/news');
    return response.json();
  },

  // Fetch single news article
  async fetchNewsById(id: string) {
    const response = await clientFetch(`/news/${id}`);
    return response.json();
  },

  // Subscribe to newsletter
  async subscribeToNewsletter(email: string, name?: string) {
    const response = await clientFetch('/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
    return response.json();
  },

  // Submit contact form
  async submitContactForm(formData: {
    purpose: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const response = await clientFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return response.json();
  },
};
