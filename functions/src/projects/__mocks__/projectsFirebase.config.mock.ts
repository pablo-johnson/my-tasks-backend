import { CreateProjectDto } from "@projects/dtos/create-project.dto";
import { UpdateProjectDto } from "@projects/dtos/update-project.dto";

export const mockProject = { id: '1', name: 'Test Project', description: 'Test Desc', users: ['user1', 'user2'] };
export const mockCreateProjectDto: CreateProjectDto = { name: 'Test Project', description: 'Test Desc', users: ['user1', 'user2'] };
export const mockUpdateProjectDto: UpdateProjectDto = { description: 'Updated Desc' };

const addMock = jest.fn(async (data) => ({ id: '1', ...data }));
const getAllMock = jest.fn().mockResolvedValue({ docs: [{ id: '1', data: () => mockProject }] })
const getMock = jest.fn(async () => ({
  exists: true,
  data: jest.fn(() => (mockProject)),
}));
const updateMock = jest.fn().mockResolvedValue(undefined);
const deleteMock = jest.fn().mockResolvedValue(undefined);
const docMock = jest.fn(() => ({
  get: getMock,
  update: updateMock,
  delete: deleteMock,
}));

export const firestoreMock = {
  collection: jest.fn(() => ({
    add: addMock,
    doc: docMock,
    get: getAllMock
  })),
};
