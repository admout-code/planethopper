export type PlanetType = {
  climate: string;
  created: string | Date;
  diameter: string;
  edited: string | Date;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
  films: string[];
  residents: string[];
};

export type Planets = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetType[];
};
