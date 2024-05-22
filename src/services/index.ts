import axios from 'axios';

import projectsApi from './api/projects';

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export { projectsApi };

export default api;
