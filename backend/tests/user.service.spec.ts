import * as userService from '../src/services/user.service';
import { User } from '../src/models/users';

jest.mock('../src/models/users', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        updateOne: jest.fn(),
    }
}));

describe('user.service', () => {
    const mockUserId = '507f1f77bcf86cd799439011';
    const mockEventId = '507f1f77bcf86cd799439012';
    const mockUser = {
        _id: mockUserId,
        id: mockUserId,
        email: 'test@example.com',
        events: [mockEventId],
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        role: 'volunteer'
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('createUser should create a user', async () => {
        (User.create as jest.Mock).mockResolvedValue(mockUser);
        const result = await userService.createUser(mockUser as any);
        expect(User.create).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockUser);
    });

    it('getUserByEmail should return user by email', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        const result = await userService.getUserByEmail('test@example.com');
        expect(result).toEqual(mockUser);
    });

    it('getUserDoc should return transformed user', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        const result = await userService.getUserDoc(mockUserId);
        expect(result).toMatchObject({
            _id: mockUserId,
            email: mockUser.email,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            phone: mockUser.phone,
            role: mockUser.role,
        });
    });

    it('addEventToUserHistory should call updateOne', async () => {
        (User.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });
        const result = await userService.addEventToUserHistory(mockUserId, mockEventId);
        expect(User.updateOne).toHaveBeenCalledWith(
            { _id: mockUserId },
            { $addToSet: { events: mockEventId } }
        );
        expect(result).toEqual({ modifiedCount: 1 });
    });

    it('getUserEvents should return user events', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        const result = await userService.getUserEvents(mockUserId);
        expect(result).toEqual([mockEventId]);
    });

    it('getUserEmail should return user email', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        const result = await userService.getUserEmail(mockUserId);
        expect(result).toBe('test@example.com');
    });
});