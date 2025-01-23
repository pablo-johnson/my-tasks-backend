import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase.config';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  private projectsCollection = firestore.collection('projects');

  async createProject(data: CreateProjectDto) {
    const project = await this.projectsCollection.add(data);
    return { id: project.id, ...data };
  }

  async getProject(id: string) {
    const projectDoc = await this.projectsCollection.doc(id).get();
    if (!projectDoc.exists) throw new Error('Project not found');
    return { id, ...projectDoc.data() };
  }

  async getAllProjects() {
    const projectsSnapshot = await this.projectsCollection.get();
    return projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateProject(id: string, data: UpdateProjectDto) {
    await this.projectsCollection.doc(id).update({...data});
    return { id, ...data };
  }

  async deleteProject(id: string) {
    await this.projectsCollection.doc(id).delete();
    return { message: 'Project deleted successfully' };
  }
}
