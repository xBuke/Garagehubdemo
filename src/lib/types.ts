export type Channel = 'whatsapp' | 'facebook' | 'instagram' | 'sms';

export interface Lead {
  id: string;
  name: string;
  carModel: string;
  issue: string;
  contact: string;
  date: string;
  urgent?: boolean;
}

export interface Message {
  id: string;
  channel: Channel;
  from: string;
  contact: string;
  text: string;
  createdAt: string;
  urgent?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  carModel: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  urgent?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
}

export interface Car {
  id: string;
  customerId: string;
  model: string;
}

export interface Service {
  id: string;
  name: string;
}
