export default interface IAccommodation {
    id?: number;  
    title: string;
    provincia?: string;
    description: string;
    price: number;
    photos: string[];
    latitude: number;
    longitude: number;
    stripePriceId: any;
    stripeProductId:any;
  }