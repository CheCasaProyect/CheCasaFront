export default interface IAccommodation {
    id?: number;  
    title: string;
    provincia: string;
    description: string;
    price: number;
    photos: string[];
    latitude: any;
    longitude: any;
    stripePriceId: any;
    stripeProductId:any;
  }