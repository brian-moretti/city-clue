export interface TeleportItems {
  count: number;
  _links: {
    ['ua:item']: [{ href: string; name: string }];
  };
}

export interface TeleportCity {
  continent: string;
  full_name: string;
}

export interface TeleportCityScores {
  categories: [{  color: string; name: string; score_out_of_10: number  }];
  summary: string;
  teleport_city_score: number; //! DA ARROTONDARE
}

export interface TeleportCityImages {
  photos: [{ image: { mobile: string; web: string } }];
}

