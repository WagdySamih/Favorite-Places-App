export type Location = {
  lat: number;
  lng: number;
};

export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: Location;
  id: string;

  constructor(
    title: string,
    imageURL: string,
    address: string,
    location: Location,
  ) {
    this.title = title;
    this.address = address;
    this.imageUri = imageURL;
    this.location = location;
    this.id = new Date().toString() + Math.random();
  }
}
