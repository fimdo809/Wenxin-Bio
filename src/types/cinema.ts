export interface Hall {
  id: number;
  name: string;
  lens: 'F' | 'S' | 'Both';
  seats: string;
  capacity: number;
  unit: string;
  kdm: string;
  formats: string;
  note: string;
  projectorType?: string;
  soundSystem?: string;
}

export interface Movie {
  id: string;
  title: string;
  file: string;
  showName: string;
  distributor: string;
  release: string;
  duration?: number | null; // in seconds
  lights?: number | null;   // lights on seconds
  lens?: 'F' | 'S' | string;  // Flat (1.85:1) or Scope (2.39:1)
  sound?: string;    // '5.1' | '7.1' | 'Atmos'
  rating?: string;
  license?: boolean;
  kdmStart?: string;
  kdmEnd?: string;
  size?: number | null;     // GB
  tms?: boolean;
  halls?: number[];
  volumes?: Record<string, string>;
  note?: string;
  [key: string]: any;
}

export interface Trailer {
  id: string;
  title: string;
  file: string;
  duration: number;
  lens?: 'F' | 'S' | string;
  rating?: string;
  distributor?: string;
  [key: string]: any;
}

export interface CommercialAd {
  id: string;
  title: string;
  file: string;
  duration: number;
  lens?: 'F' | 'S' | string;
  [key: string]: any;
}

export interface SpecialScreening {
  id: string;
  kind: 'special' | 'booking';
  title: string;
  movie: string;
  start: string;
  end: string;
  time: string;
  screen: string;
  description: string;
  reminder?: string;
  version?: string;
  stockStatus?: string;
  price?: number;
  requirements?: {
    easel?: number;
    microphone?: number;
    table?: number;
    chairs?: number;
    qaCard?: boolean;
    catering?: string;
    parkingVouchers?: number;
  };
}

export interface EnvironmentLog {
  id: string;
  date: string;
  shift: '早班' | '晚班';
  roomTemp7F: number;
  roomHumidity7F: number;
  roomTemp8F: number;
  roomHumidity8F: number;
  exhaustTempLaser: number;
  exhaustTempXenon: number;
  inspector: string;
  status: '正常' | '預警' | '異常';
}

export interface HandoverRecord {
  id: string;
  date: string;
  shift: '早班' | '晚班';
  author: string;
  audioVisualNotes: string;
  kdmAlerts: string;
  maintenanceNotes: string;
  specialEventBrief: string;
}
