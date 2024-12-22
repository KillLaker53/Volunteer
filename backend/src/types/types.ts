export enum EventType {
    Fire = 'Fire',
    Flooding = 'Flooding'
};
export enum Status{
    Fire = 'On-Going', 
    Finished = 'Finished',
};

export type UserRole = 'Volunteer' | 'Admin';
export type Location = {
    type: 'Point';
    coordinates: [Number, Number];
}