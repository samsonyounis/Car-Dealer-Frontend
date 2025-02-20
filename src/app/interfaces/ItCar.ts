export interface ItCar{
    id: string,
    name: string,
    type:string
    des: string,
    image: string,
    available:string,
    price:string,
    phoneNumber:string
    reviews:[{name:string,comment:string,date:string}];
}