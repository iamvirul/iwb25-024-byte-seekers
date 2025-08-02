export interface LandOwner {
  id: number;
  ownerId: string;
  firstName: string;
  lastName: string;
  nic: string;
  address?: string;
  contactNo?: string;
}

export interface LandTransfer {
  id: number;
  transferDate: string;
  verifiedBy: string;
  blockIndex: number;
  blockHash: string;
  prevBlockHash: string;
  fromLandOwner: LandOwner | null;
  toLandOwner: LandOwner;
}

export interface LandDetails {
  id: number;
  landId: string;
  landName: string;
  landPlace: string;
  landLat: number;
  landLang: number;
  landSize: number;
  landValue: number;
  landType: string;
  registerDate: string;
  landStatus: string;
  priority: number;
}