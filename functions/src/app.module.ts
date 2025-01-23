import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [AuthModule, UsersModule, TasksModule, ProjectsModule, FirebaseModule],
})
export class AppModule {}