export enum EventType {
    Fire = 'Fire',
    Flooding = 'Flooding'
};

export type UserRole = 'Volunteer' | 'Admin';
export type Status = 'On-Going' | 'Finished';
export type Location = {
    type: 'Point';
    coordinates: [Number, Number];
}