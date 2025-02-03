import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProject = { id: '1', name: 'Test Project', description: 'Test Desc', users: ['user1', 'user2'] };
  const mockCreateProjectDto: CreateProjectDto = { name: 'New Project', users: ['user3'] };
  const mockUpdateProjectDto: UpdateProjectDto = { description: 'Updated Desc' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            createProject: jest.fn().mockResolvedValue(mockProject),
            getProject: jest.fn().mockResolvedValue(mockProject),
            getAllProjects: jest.fn().mockResolvedValue([mockProject]),
            updateProject: jest.fn().mockResolvedValue({ id: '1', ...mockUpdateProjectDto }),
            deleteProject: jest.fn().mockResolvedValue({ message: 'Project deleted successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a project', async () => {
    expect(await controller.createProject(mockCreateProjectDto)).toEqual(mockProject);
    expect(service.createProject).toHaveBeenCalledWith(mockCreateProjectDto);
  });

  it('should get a project by id', async () => {
    expect(await controller.getProject('1')).toEqual(mockProject);
    expect(service.getProject).toHaveBeenCalledWith('1');
  });

  it('should get all projects', async () => {
    expect(await controller.getAllProjects()).toEqual([mockProject]);
    expect(service.getAllProjects).toHaveBeenCalled();
  });

  it('should update a project', async () => {
    expect(await controller.updateProject('1', mockUpdateProjectDto)).toEqual({ id: '1', ...mockUpdateProjectDto });
    expect(service.updateProject).toHaveBeenCalledWith('1', mockUpdateProjectDto);
  });

  it('should delete a project', async () => {
    expect(await controller.deleteProject('1')).toEqual({ message: 'Project deleted successfully' });
    expect(service.deleteProject).toHaveBeenCalledWith('1');
  });
});