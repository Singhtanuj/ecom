export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface Login{
    email:string,
    password:string
}

export interface AddProd{
    name:string,
    price:string,
    color:string,
    category:string,
    image:string,
    id:number,
    quantity: undefined | number
}
