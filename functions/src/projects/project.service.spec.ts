import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { firestoreMock, mockCreateProjectDto, mockProject, mockUpdateProjectDto } from './__mocks__/projectsFirebase.config.mock';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
          providers: [ProjectsService,
            {
              provide: 'FIRESTORE_INSTANCE',
              useValue: firestoreMock,
            }],
        }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears mocks after each test
  });

  it('should create a project', async () => {

      const result = await service.createProject(mockCreateProjectDto);

      expect(firestoreMock.collection).toHaveBeenCalledWith('projects');
      expect(firestoreMock.collection().add).toHaveBeenCalledWith(mockCreateProjectDto);
      expect(result).toEqual({ id: '1', ...mockCreateProjectDto });
  });


  it('should get a project by id', async () => {
      const result = await service.getProject('1');

      expect(firestoreMock.collection).toHaveBeenCalledWith('projects');
      expect(firestoreMock.collection().doc).toHaveBeenCalledWith('1');
      expect(firestoreMock.collection().doc().get).toHaveBeenCalled();
      expect(result).toEqual(mockProject);
  });

  it('should get all projects', async () => {
    const result = await service.getAllProjects();

    expect(firestoreMock.collection).toHaveBeenCalledWith('projects');
    expect(firestoreMock.collection().get).toHaveBeenCalled();
    expect(result).toEqual([mockProject]);
  });

  it('should update a project', async () => {
    const result = await service.updateProject('1', mockUpdateProjectDto);

    expect(firestoreMock.collection).toHaveBeenCalledWith('projects');
    expect(firestoreMock.collection().doc).toHaveBeenCalledWith('1');
    expect(firestoreMock.collection().doc().update).toHaveBeenCalledWith({...mockUpdateProjectDto});
    expect(result).toEqual({ id: '1', ...mockUpdateProjectDto });
  });

  it('should delete a project', async () => {
    const result = await service.deleteProject('1');

    expect(firestoreMock.collection).toHaveBeenCalledWith('projects');
    expect(firestoreMock.collection().doc).toHaveBeenCalledWith('1');
    expect(firestoreMock.collection().doc().delete).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Project deleted successfully' });
  });
});