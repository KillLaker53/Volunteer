import * as eventService from '../src/services/events.service';
import { Event } from '../src/models/events';

jest.mock('../src/models/events', () => ({
    Event: {
        create: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        updateOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findById: jest.fn(),
        findOneAndDelete: jest.fn(),
        findOneAndUpdate: jest.fn(),
        lean: jest.fn(),
    }
}));

describe('events.service', () => {
    const mockEventId = '507f1f77bcf86cd799439012';
    const mockVolunteerId = '507f1f77bcf86cd799439011';
    const mockEvent = {
        _id: mockEventId,
        id: mockEventId,
        eventName: 'Test Event',
        eventType: 'fire',
        startDate: new Date(),
        endDate: new Date(),
        location: { coordinates: [0, 0], type: 'Point' },
        status: 'active',
        address: 'Test Address',
        description: 'Test Desc',
        requirements: 'None',
        fundingNeeded: 100,
        creatorId: mockVolunteerId,
        volunteers: [],
        is_approved: true,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('createEventDoc should create an event', async () => {
        (Event.create as jest.Mock).mockResolvedValue(mockEvent);
        const result = await eventService.createEventDoc(mockEvent as any);
        expect(Event.create).toHaveBeenCalledWith(mockEvent);
        expect(result).toEqual(mockEvent);
    });

    it('addUserToEventHistory should update event', async () => {
        (Event.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });
        const result = await eventService.addUserToEventHistory(mockVolunteerId, mockEventId);
        expect(Event.updateOne).toHaveBeenCalledWith(
            { _id: mockEventId },
            { $addToSet: { volunteers: mockVolunteerId } }
        );
        expect(result).toEqual({ modifiedCount: 1 });
    });

    it('removeUserFromEvent should call findByIdAndUpdate', async () => {
        (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
        await eventService.removeUserFromEvent(mockVolunteerId, mockEventId);
        expect(Event.findByIdAndUpdate).toHaveBeenCalledWith(
            mockEventId,
            { $pull: { volunteers: mockVolunteerId } },
            { new: true }
        );
    });

    it('getEventName should return event name', async () => {
        (Event.findById as jest.Mock).mockResolvedValue({ eventName: 'Test Event' });
        const result = await eventService.getEventName(mockEventId);
        expect(result).toBe('Test Event');
    });

    it('deleteEventDoc should delete event', async () => {
        (Event.findOneAndDelete as jest.Mock).mockResolvedValue(mockEvent);
        await eventService.deleteEventDoc(mockEventId);
        expect(Event.findOneAndDelete).toHaveBeenCalledWith({ _id: mockEventId });
    });

    it('approveEventDoc should update event approval', async () => {
        (Event.findOneAndUpdate as jest.Mock).mockResolvedValue(mockEvent);
        const result = await eventService.approveEventDoc(mockEventId);
        expect(Event.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: mockEventId },
            { is_approved: true }
        );
        expect(result).toEqual(mockEvent);
    });
});


