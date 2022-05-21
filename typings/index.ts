export interface UserResponse {
    userId: string;
    firstName: string;
    surName: string;
    phonenumber: string;
    location: string;
    email: string;
}

export type DeviceStatus = 'pending' | 'rejected' | 'approved' | 'collected';
export type DeviceCondition = 'New' | 'Unused' | 'Like New' | 'Used' | 'Old' | 'Useless';

type imageUrl = string;
export interface ListedDevice {
    id: string;
    name: string;
    price: number;
    description: string;
    image: imageUrl;
    status: DeviceStatus;
    creditPoints: number;
    reducibleFootprint: number;
    date: string;
    condition: DeviceCondition;
}

export interface Product {
    group: string;
    id: string;
    name: string;
    description: string;
    image: imageUrl;
    deductibleCredit: number;
    actualPrice: number;
    offerPrice: number;
    condition: DeviceCondition;
}
