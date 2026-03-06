import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    service: string;
    name: string;
    preferredDate: string;
    preferredTime: string;
    timestamp: bigint;
    phone: string;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    submitBooking(name: string, phone: string, service: string, preferredDate: string, preferredTime: string, timestamp: bigint): Promise<void>;
}
