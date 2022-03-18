export class Film{

    constructor(id, naziv, godina, zanr, glavneuloge, reziser, duzinatrajanja)
    {
        this.id = id;
        this.naziv = naziv;
        this.godina = godina;
        this.zanr = zanr;
        this.glavneuloge = glavneuloge;
        this.reziser = reziser;
        this.duzinatrajanja = duzinatrajanja;
        this.projekcije = [];
    }

    DodajProjekciju(projekcija)
    {
        if(this.id === projekcija.filmid){
            this.projekcije.push(projekcija);
        }
    }
}