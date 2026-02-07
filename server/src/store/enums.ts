export enum InvitationState {
    Pending = 'PENDING',
    Accepted = "ACCEPTED",
    Rejected = "REJECTED",
    Acknowledge = "Acknowledge"
}

export enum PropertyType {
    House = "HOUSE",
    Apartment = "APARTMENT",
    Land = "LAND",
    RetailSpace = "RETAIL SPACE"
}

export enum PropertyState {
    Sold = "SOLD",
    NotAvailable = "NOT AVAILABLE",
    Available = "AVAILABLE"
}

export enum UserType {
    Admin = "ADMIN",
    Agent = "AGENT",
    Client = "CLIENT"
}
