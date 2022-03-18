export class Projekcija{
    
    constructor(id, datum, salaid, filmid){
        this.id = id;
        this.datum = datum;
        this.salaid = salaid;
        this.filmid = filmid;
        this.rezervacije = [];
    }

    DodajRezervaciju(rezervacija){
        if(this.id === rezervacija.projekcija.id){
            this.rezervacije.push(rezervacija);
        }
    }
}