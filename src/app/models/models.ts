export class User{
  constructor(
    public _id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public password,
    public role: string,
    public fono: string,
    public ubicacion: string,
    public foto: string,
    public state: boolean
  ){}
}

export class Events{
  constructor(
    public name: string,
    public descripcion: string,
    public org: string,
    public ubicacion : {
        lat : number,
        long : number,
        nombre : string
    },
    public fecha_inicio: string,
    public fecha_termino: string,
    public icon: string,
    public tipo: string,
    public image: string,
    public fono: string
  ){}
}

export class Location{
  constructor(
    public lat: number,
    public lng: number,
    public name: string
  ){}
}

export class Category{
  constructor(
    public actividades: string
  ){}
}
