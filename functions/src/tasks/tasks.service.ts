import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase.config';
import { Query, CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';


@Injectable()
export class TasksService {
  private tasksCollection: CollectionReference<DocumentData>;

  constructor() {
    this.tasksCollection = firestore.collection('tasks');
  }

  async createTask(data: CreateTaskDto) {
    const task = await this.tasksCollection.add(data);
    return { id: task.id, ...data };
  }

  async getTask(id: string) {
    const taskDoc = await this.tasksCollection.doc(id).get();
    if (!taskDoc.exists) throw new Error('Task not found');
    return { id, ...taskDoc.data() };
  }

  async getAllTasks(projectId?: string) {
    let query: Query<DocumentData> | CollectionReference<DocumentData> = this.tasksCollection;
    if (projectId) {
      query = query.where('projectId', '==', projectId);
    }
    const tasksSnapshot = await query.get();
    return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    await this.tasksCollection.doc(id).update({...data});
    return { id, ...data };
  }

  async deleteTask(id: string) {
    await this.tasksCollection.doc(id).delete();
    return { message: 'Task deleted successfully' };
  }
}
