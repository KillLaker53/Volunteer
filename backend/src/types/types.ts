export enum EventType {
    Fire = 'Fire',
    Flooding = 'Flooding',
    Earthquake = 'Earthquake',
};
export enum Status{
    On_Going = 'On-Going', 
    Finished = 'Finished',
};

export enum UserRole {
    Volunteer = 'volunteer',
    Organization = 'organization',
    Admin = 'admin'
};

export type Location = {
    type: 'Point';
    coordinates: [number, number];
}