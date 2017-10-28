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
    public foto: string
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
    public image: string
  ){}
}
