export default interface IUser {
    reservations(reservations: any): unknown;
    firstname: string;
    lastname: string;
    birthdate: string;
    phone: string;
    email: string;
    id: string;
    profileImgUrl: string;
  }