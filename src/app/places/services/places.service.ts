import { Injectable } from '@angular/core';
import { PlaceModel } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: PlaceModel[] = [
    new PlaceModel(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City.',
        'https://static.amazon.jobs/locations/58/thumbnails/NYC.jpg?1547618123',
        149.99,
          new Date('2019-01-01'),
          new Date('2019-12-31'),
    ),
    new PlaceModel(
        'p2',
        'L\'Amour Toujours',
        'A romantic place in Paris!',
        'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/newsletter/eiffel-tower-in-paris-151-medium.jpg?1564742900',
        189.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
    ),
    new PlaceModel(
        'p3',
        'The Foggy Palace',
        'Not your average city trip!',
        'data:image/jpeg;base64,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',
        99.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }

  public getPlace(id: string) {
    return {...this._places.find((p: PlaceModel) => p.id === id)};
  }
}
