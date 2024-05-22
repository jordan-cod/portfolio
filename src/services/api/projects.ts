import api from '../index';
import { Project } from '../../types/project';

const projectsApi = {
  getAllProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar projetos.');
    }
  },

  getProjectById: async (projectId: string) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar o projeto.');
    }
  },

  createProject: async (projectData: Project) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar o projeto.');
    }
  },

  updateProject: async (projectId: string, projectData: Project) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar o projeto.');
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const response = await api.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao excluir o projeto.');
    }
  }
};

export default projectsApi;
