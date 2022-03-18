import { Bioskop } from "./Bioskop.js";
import { Sala } from "./Sala.js";
import { Film } from "./Film.js";
import { Projekcija } from "./Projekcija.js";
import { Funkcije } from "./Funkcije.js";

var bioskopi = [];
var sale = [];
var filmovi = [];
var projekcije = [];

fetch("https://localhost:5001/Bioskop/PreuzmiBioskope")
.then(b=>{
    b.json().then(c=>{
        c.forEach(d => {
            var b = new Bioskop(d.id, d.naziv);
            bioskopi.push(b);
        });

        fetch("https://localhost:5001/Bioskop/PreuzmiSale")
        .then(s=>{
            s.json().then(p=>{
                p.forEach(q => {
                var s = new Sala(q.id, q.naziv, q.brojRedova, q.brojSedista, q.bioskopID);
                sale.push(s);
            });
            fetch("https://localhost:5001/Projekcija/PreuzmiFilmove")
            .then(f=>{
                f.json().then(flm=>{
                    flm.forEach(film => {
                        var f = new Film(film.id, film.naziv, film.godina, film.zanr, film.glavneUloge, film.reziser, film.trajanje);
                        filmovi.push(f);
                    });

                    fetch("https://localhost:5001/Projekcija/PreuzmiProjekcije")
                    .then(p=>{
                        p.json().then(pr=>{
                            pr.forEach(projekcija => {
                                var p = new Projekcija(projekcija.id, projekcija.datum, projekcija.salaID, projekcija.filmID);
                                projekcije.push(p);
                            })

                            sale.forEach(s =>{
                                bioskopi.forEach(b =>{
                                    b.DodajSalu(s);
                                })
                            })
                            
                            projekcije.forEach(p =>{
                                sale.forEach(s =>{
                                    s.DodajProjekciju(p);
                                })
                            })
                            
                            projekcije.forEach(p =>{
                                filmovi.forEach(f =>{
                                    f.DodajProjekciju(p);

                                })
                            })
                            let bioskop = new Funkcije(bioskopi, sale, filmovi, projekcije);
                            bioskop.Crtaj(document.body);
                        })
                    })
                })
            })
        })
    })
    })
})