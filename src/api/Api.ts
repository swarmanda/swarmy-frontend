import axios from 'axios';
import { useAuthStore } from '../store/AuthStore.ts';

class Api {
  constructor() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.interceptors.request.use(
      async (config) => {
        const { accessToken } = useAuthStore.getState();
        if (config?.headers) {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (401 === error.response.status) {
          useAuthStore.getState().setAccessToken('');
        }
        return Promise.reject(error);
      },
    );
  }

  async login(email: string, password: string) {
    const response = await axios.post('/auth/login', { email, password });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    return response.data.access_token;
  }

  async getProfile() {
    const { data } = await axios.get('/users/me');
    return data;
  }

  async getApiKeys() {
    const { data } = await axios.get('/api-keys');
    return data;
  }

  async createApiKey(name: string) {
    const { data } = await axios.post('/api-keys', { name });
    return data;
  }

  async revokeApiKey(id: string) {
    const { data } = await axios.put(`/api-keys/${id}/revoke`);
    return data;
  }

  async uploadFile(file: File, uploadAsWebsite?: boolean) {
    const formData = new FormData();
    formData.append('file', file);
    if (uploadAsWebsite) {
      formData.append('website', 'true');
    }
    const { data } = await axios.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async uploadFileApi(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Authorization': 'Bearer 3f98e83f1ffce3794afb4'
      },
    });
    return data;
  }

  async getFileReferences() {
    const { data } = await axios.get('/file-references');
    return data;
  }

  async getUsageMetrics() {
    const { data } = await axios.get('/usage-metrics');
    return data;
  }

  async getActivePlan() {
    const { data } = await axios.get('/plans/active');
    return data;
  }

  async getPlanTemplates() {
    const { data } = await axios.get('/plans/templates');
    return data;
  }

  async getSubscriptionConfig() {
    const { data } = await axios.get('/plans/config');
    return data;
  }

  async sendResetPasswordEmail(email: string) {
    const { data } = await axios.post('/users/reset-password', { email });
    return data;
  }

  async signup(payload) {
    const { data } = await axios.post('/users/register', payload);
    return data;
  }

  async startSubscription(uploadSizeLimit: number, downloadSizeLimit: number) {
    const { data } = await axios.post('/subscriptions/init', { uploadSizeLimit, downloadSizeLimit });
    return data;
  }

  async cancelSubscription() {
    const { data } = await axios.post('/subscriptions/cancel');
    return data;
  }

  async sendFakePaymentWebhook(merchantTransactionId: string) {
    const { data } = await axios.post('/payment/form-notification', { merchantTransactionId });
    return data;
  }

  async getPrivacyPolicy() {
    const { data } = await axios.get('/static-text/privacy-policy');
    return data;
  }

  async getTermsOfService() {
    const { data } = await axios.get('/static-text/terms-of-service');
    return data;
  }

  async getContactText() {
    const { data } = await axios.get('/static-text/contact');
    return data;
  }

  async resendVerificationEmail() {
    const { data } = await axios.post('/users/resend-email-verification');
    return data;
  }

  async verifyEmail(code: string) {
    const { data } = await axios.post('/users/verify-email', { code });
    return data;
  }
}

export const api = new Api();
