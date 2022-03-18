export class Bioskop{

    constructor(id, naziv){
        this.id = id;
        this.naziv = naziv;
        this.sale = [];
    }

    DodajSalu(sala){
        if(this.id === sala.bioskopid){
            this.sale.push(sala);
        }
    }
}