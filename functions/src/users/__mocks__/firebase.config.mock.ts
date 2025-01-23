const addMock = jest.fn(async (data) => ({ id: 'mockUserId', ...data }));
const docMock = jest.fn(() => ({
  get: jest.fn(async () => ({
    exists: true,
    data: jest.fn(() => ({ email: 'test@example.com', displayName: 'Test User' })),
  })),
  update: jest.fn(async () => null),
  delete: jest.fn(async () => null),
}));

export const firestoreMock = {
  collection: jest.fn(() => ({
    add: addMock,
    doc: docMock,
  })),
};
