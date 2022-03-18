export class Funkcije{

    constructor(bioskopi, sale, filmovi, projekcije){
        this.bioskopi = bioskopi;
        this.sale = sale;
        this.filmovi = filmovi;
        this.projekcije = projekcije;
        this.container = null;
        this.cont1 = null;
        this.cont2 = null;
        this.cont3 = null;
    }

Crtaj(host){

    this.container = document.createElement("div");
    this.container.className = "GlavniKontejner";
    host.appendChild(this.container);
    let k1 = document.createElement("div");
    k1.className="Form";
    k1.id = "cont1";
    this.container.appendChild(k1);
    let k2 = document.createElement("div");
    k2.className="Form";
    k2.id = "cont2";
    this.container.appendChild(k2);
    let k3 = document.createElement("div");
    k3.className="Form";
    k3.id = "cont3";
    this.container.appendChild(k3);

    this.cont1 = k1;
    this.cont2 = k2;
    this.cont3 = k3;
    this.crtajK1();
    this.crtajK2();
    this.crtajK3();
}

crtajK1(){
    let redBioskop = this.crtajRed(this.cont1, "redBioskop");
    this.crtajLabelu(redBioskop, "Bioskop", "labelBioskop");
    let selectBioskop = this.crtajSelect(redBioskop, "selectBioskop");
    this.bioskopi.forEach(b =>{
        this.crtajOption(selectBioskop, b);
    })
    let btnIzaberiBioskop = this.crtajDugme(redBioskop, "Potvrdi", "btnIzaberiBioskop");
   
    let redFilm = this.crtajRed(this.cont1, "redFilm");
    let redProjekcija = this.crtajRed(this.cont1, "redProjekcija");
    redProjekcija.id = "redProjekcija";
    let redSale = this.crtajRed(this.cont2, "redSale");
    redSale.id = "redSale";
    btnIzaberiBioskop.onclick=(ev)=>this.OdabirBioskopa();
}

crtajK2(){
    this.crtajRed(this.cont2, "redRezervisi");
    this.crtajRed(this.cont2, "redIme");
    this.crtajRed(this.cont2, "redPrezime");
    this.crtajRed(this.cont2, "redEmail");
    this.crtajRed(this.cont2, "redUpisi");
    this.crtajRed(this.cont2, "redIzmeni");
    this.crtajRed(this.cont2, "redObrisi");
}

crtajK3(){
    this.crtajRed(this.cont3, "redPrikazProjekcija")
}

crtajRed(host, klasa){
    let red = document.createElement("div");
    red.className = klasa;
    host.appendChild(red);
    return red;
}

crtajLabelu(host, naziv, klasa){
    let labela = document.createElement("label");
    labela.innerHTML = naziv //+ ":";
    labela.className = klasa;
    host.appendChild(labela);
    return labela;
}

crtajSelect(host, klasa){
    let select = document.createElement("select");
    select.className = klasa;
    host.appendChild(select);
    return select;
}

crtajOption(host, obj){
    let op = document.createElement("option");
    op.innerHTML = obj.naziv;
    op.value = obj.id;
    host.appendChild(op);
}

crtajDugme(host, naziv, klasa){
    let btn = document.createElement("button");
    btn.innerHTML = naziv;
    btn.className = klasa;
    host.appendChild(btn);
    return btn;
}

brisiRed(klasa){
    let red = this.cont1.querySelector(klasa)
    if(red.querySelector("label")!=null && red.querySelector("select")!=null && red.querySelector("button")!=null){
        let labela = red.querySelector("label");
        let select = red.querySelector("select");
        let btn = red.querySelector("button"); 
        let roditelj = labela.parentNode;
        roditelj.removeChild(labela);
        roditelj.removeChild(select);
        roditelj.removeChild(btn);
        }
}

brisiSalu(){
    if(this.cont1.querySelector(".redSale")!=null){
        let sala = this.cont1.querySelector(".redSale");
        let roditelj = sala.parentNode;
        roditelj.removeChild(sala);
    }
    let red = this.crtajRed(this.cont1, "redSale");
}

OdabirBioskopa(){
    this.brisiRed(".redFilm");
    this.brisiRed(".redProjekcija");
    this.brisiSalu();
    this.brisiDugme(this.cont2, ".redRezervisi",".btnRezervisi");
    this.brisiInput();
    this.brisiDugme(this.cont2, ".redUpisi",".btnUpisi");
    this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
    this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
    this.brisiDugme(this.cont3, ".redPrikazProjekcija",".btnPrikazProjekcija");
    this.brisiTabelu();
    let redFilm = this.cont1.querySelector(".redFilm");
    this.crtajLabelu(redFilm, "Film", "labelFilm");
    let seFilm = this.crtajSelect(redFilm, "selectFilm");
    let btnIzaberiFilm = this.crtajDugme(redFilm, "Izaberi", "btnIzaberiFilm");
   
    btnIzaberiFilm.onclick=(ev)=>this.OdabirFilma();

    this.filmovi.forEach(film =>{
        this.crtajOption(seFilm, film);
    })
    }

OdabirFilma(){
    this.brisiRed(".redProjekcija");
    this.brisiSalu();
    this.brisiDugme(this.cont2, ".redRezervisi",".btnRezervisi");
    this.brisiInput();
    this.brisiDugme(this.cont2, ".redUpisi",".btnUpisi");
    this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
    this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
    this.brisiDugme(this.cont3, ".redPrikazProjekcija",".btnPrikazProjekcija");
    this.brisiTabelu();
    let redProjekcija = this.cont1.querySelector(".redProjekcija");
    this.crtajLabelu(redProjekcija, "Projekcija", "labelProjekcija");
    let selectProjekcija = this.crtajSelect(redProjekcija, "selectProjekcija");
    let btnIzaberiProjekciju = this.crtajDugme(redProjekcija, "Izaberi", "btnIzaberiProjekciju");
    
    let redBioskop = this.cont1.querySelector(".redBioskop");
    let redFilm = this.cont1.querySelector(".redFilm");
    let op = redBioskop.querySelector("select");
    var idBioskopa = op.options[op.selectedIndex].value;
    let op2 = redFilm.querySelector("select");
    var idFilma = op2.options[op2.selectedIndex].value;
 
    let sale = this.sale.filter(s=> s.bioskopid == idBioskopa);
    sale.forEach(s =>{
        s.projekcije.forEach(p =>{
            if(p.filmid == idFilma){
                let op = document.createElement("option");
                op.innerHTML = p.datum;
                op.value = p.id;
                selectProjekcija.appendChild(op);
            }
        })
    })
    btnIzaberiProjekciju.onclick=(ev)=>this.OdabirProjekcije();
}

OdabirProjekcije(){
    this.brisiSalu();
    this.brisiDugme(this.cont2, ".redRezervisi",".btnRezervisi");
    this.brisiInput();
    this.brisiDugme(this.cont2, ".redUpisi",".btnUpisi");
    this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
    this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
    this.brisiDugme(this.cont3, ".redPrikazProjekcija",".btnPrikazProjekcija");
    this.brisiTabelu();
    let redProjekcija = this.cont1.querySelector(".redProjekcija");
    let op = redProjekcija.querySelector("select");
    var projekcijaID = op.options[op.selectedIndex].value;
    var salaID;
    this.projekcije.forEach(p =>
        {
            if(p.id == projekcijaID){
                salaID = p.salaid;
            }
        })

    let redSala = this.cont1.querySelector(".redSale");
    this.sale.forEach(s =>{
        s.projekcije.forEach(p =>{
            if(p.id == projekcijaID){
                s.CrtajSalu(redSala, projekcijaID);
            }
        })
    })

    let redRezervisi = this.cont2.querySelector(".redRezervisi");
    let btnRezervisi = this.crtajDugme(redRezervisi, "Rezervisi", "btnRezervisi");
    redRezervisi.appendChild(btnRezervisi);
    btnRezervisi.onclick=(ev)=>this.Rezervacija();

    let redPrikazProjekcija = this.cont3.querySelector(".redPrikazProjekcija");
    let btnPrikazProjekcija = this.crtajDugme(redPrikazProjekcija, "Prikazi projekcije", "btnPrikazProjekcija");
    redPrikazProjekcija.appendChild(btnPrikazProjekcija);
    btnPrikazProjekcija.onclick=(ev)=>this.PrikazProjekcija(salaID);
}

brisiDugme(host, klasaRed, klasaBtn){
    let red = host.querySelector(klasaRed);
        if(red.querySelector(klasaBtn)!=null){
            let btn = red.querySelector(klasaBtn);
            let roditelj = btn.parentNode;
            roditelj.removeChild(btn);
        }
}

CrtajInput(host, klasa){
    let input = document.createElement("input");
    input.className = klasa;
    host.appendChild(input);
}

brisiInput(){
    let redIme = this.cont2.querySelector(".redIme");
    let redPrezime = this.cont2.querySelector(".redPrezime");
    let redEmail = this.cont2.querySelector(".redEmail");
         if(redIme.querySelector("input")!=null && redPrezime.querySelector("input")!=null && redEmail.querySelector("input")!=null){
            let iIme = redIme.querySelector("input");
            let iPrezime = redPrezime.querySelector("input");
            let iEmail = redEmail.querySelector("input");
            let lblIme = redIme.querySelector("label");
            let lblPrezime = redPrezime.querySelector("label");
            let lblEmail = redEmail.querySelector("label");
            let roditeljIme = iIme.parentNode;
            let roditeljPrezime = iPrezime.parentNode;
            let roditeljEmail = iEmail.parentNode;
            roditeljIme.removeChild(iIme);
            roditeljPrezime.removeChild(iPrezime);
            roditeljEmail.removeChild(iEmail);
            roditeljIme.removeChild(lblIme);
            roditeljPrezime.removeChild(lblPrezime);
            roditeljEmail.removeChild(lblEmail);
         }
}

Rezervacija(){
    this.brisiInput();
    this.brisiDugme(this.cont2, ".redUpisi",".btnUpisi");
    this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
    this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
    let redIme = this.cont2.querySelector(".redIme");
    let labela = this.crtajLabelu(redIme, "Ime", "labelIme");
    let input = this.CrtajInput(redIme, "inputIme");
    let redPrezime = this.cont2.querySelector(".redPrezime");
    labela = this.crtajLabelu(redPrezime, "Prezime", "labelPrezime");
    input = this.CrtajInput(redPrezime, "inputPrezime");
    let redEmail = this.cont2.querySelector(".redEmail");
    labela = this.crtajLabelu(redEmail, "Email", "labelEmail");
    input = this.CrtajInput(redEmail, "inputEmail");

    let redUpisi = this.cont2.querySelector(".redUpisi");
    let btnUpisi = this.crtajDugme(redUpisi, "Dodaj", "btnUpisi");
    btnUpisi.onclick=(ev)=>this.DodajRezervaciju();
}

DodajRezervaciju(){
    this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
    this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
    let inp = this.cont2.querySelectorAll("input");
    let ime = inp[0].value;
    let prezime = inp[1].value;
    let email = inp[2].value;
    var status = true;
    if(ime.length === 0 || ime.length>50 || /\d/.test(ime)){
        alert("Uneto ime nije validno!");
        status = false;
    }
    if(prezime.length === 0 || prezime.length>50 || /\d/.test(prezime)){
        alert("Uneto prezime nije validno!");
        status = false;
    }
    if(email.length === 0 || !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(email)){
        alert("Uneti email nije validan!");
        status = false;
    }
    let redoviSedista = [];
    let sedista = [];
    sedista = this.cont1.querySelectorAll("#btnOdabrano");
    if(sedista.length == 0){
        alert("Morate odabrati bar jedno sedište!");
        status = false;
    }
    if(sedista.length > 5){
        alert("Maksimalno možete izabrati 5 sedišta!");
        status = false;
    }
    sedista.forEach(s =>{
        redoviSedista.push(s.value);
    })
    sedista.forEach(s =>{
        redoviSedista.push(s.innerHTML);
    })
    let op = this.cont1.querySelector(".selectProjekcija");
    var projekcijaID = op.options[op.selectedIndex].value;
    var gledalacID;
    var rezervacijaID;
    var cena

    if(status === true){
    fetch("https://localhost:5001/Gledalac/DodajGledaoca/"+ime+"/"+prezime+"/"+email,
    {
        method:"POST"
    }).then(must=>{
            must.json().then(m=>{
                gledalacID = m;

                fetch("https://localhost:5001/Rezervacija/DodajRezervaciju/"+projekcijaID+"/"+gledalacID,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(redoviSedista)
                }).then(r=>{
                           r.json().then(rez=>{
                                rezervacijaID = rez.id;
                                cena = rez.cena;

                                alert("Ukupna cena rezervacije: "+cena);
                                let redProjekcija = this.cont1.querySelector(".redProjekcija");
                                let op = redProjekcija.querySelector("select");
                                var projekcijaID = op.options[op.selectedIndex].value;
                                var salaID;
                                this.projekcije.forEach(p =>
                                    {
                                        if(p.id == projekcijaID){
                                            salaID = p.salaid;
                                        }
                                    })
                                this.brisiSalu();
                                let redSala = this.cont1.querySelector(".redSale");
                                this.sale.forEach(s =>{
                                    if(s.id == salaID){
                                        s.CrtajSalu(redSala, projekcijaID);
                                    }
                                })
                                let redIzmeni = this.cont2.querySelector(".redIzmeni");
                                let btnIzmeni = this.crtajDugme(redIzmeni, "Izmeni", "btnIzmeni");
                                btnIzmeni.onclick=(ev)=>this.IzmeniRezervaciju(rezervacijaID, salaID, projekcijaID, sedista);
                                let redObrisi = this.cont2.querySelector(".redObrisi");
                                let btnObrisi = this.crtajDugme(redObrisi, "Obrisi", "btnObrisi");
                                btnObrisi.onclick=(ev)=>this.ObrisiRezervaciju(rezervacijaID, salaID, projekcijaID);
                           })
                .catch(p => {
                    console.log(p);
                    alert ("Neuspesna rezervacija.");
                });
            })   
        })
        .catch(p => {
            console.log(p);
            alert ("Neuspesna rezervacija.");
        });
        alert("Rezervacija uspesna!");
    })
}
}

ObrisiRezervaciju(rezervacijaID, salaID, projekcijaID){
    fetch("https://localhost:5001/Rezervacija/ObrisiRezervaciju/"+rezervacijaID,
    {
        method:"DELETE"
    }).then(r =>{
            this.brisiDugme(this.cont2, ".redIzmeni",".btnIzmeni");
            this.brisiDugme(this.cont2, ".redObrisi",".btnObrisi");
            this.brisiSalu();
            let redSala = this.cont1.querySelector(".redSale");
            this.sale.forEach(s =>{
            if(s.id == salaID){
                s.CrtajSalu(redSala, projekcijaID);
                }
            })
    })
}

IzmeniRezervaciju(rezervacijaID, salaID, projekcijaID,rezervisano){
    let redoviSedista = [];
    let novaSedista = [];
    var status = true;
    novaSedista = this.cont1.querySelectorAll("#btnOdabrano");
    if(novaSedista.length != rezervisano.length){
        alert("Izaberite isti broj sedista!");
        status = false;
    }
    if(status == true){
        novaSedista.forEach(s =>{
            redoviSedista.push(s.value);
        })
        novaSedista.forEach(s =>{
            redoviSedista.push(s.innerHTML);
        })
        fetch("https://localhost:5001/Rezervacija/IzmeniRezervaciju/"+rezervacijaID,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(redoviSedista)
        }).then(r =>{
                this.brisiSalu();
                let redSala = this.cont1.querySelector(".redSale");
                this.sale.forEach(s =>{
                if(s.id == salaID){
                    s.CrtajSalu(redSala, projekcijaID);
                    }
                })
        })
    }
}

brisiTabelu(){
        if(this.cont3.querySelector(".redTabela")!=null){
            let table = this.cont3.querySelector(".redTabela");
            let roditelj = table.parentNode;
            roditelj.removeChild(table);
        }
    }

crtajTabelu(host, datum, naziv, godina, zanr, glUloge, reziser, trajanje){
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=datum;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=naziv;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=godina;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=zanr;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=glUloge;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=reziser;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=trajanje;
        tr.appendChild(el);   
    }

PrikazProjekcija(salaID){
    this.brisiTabelu();
    let red = this.crtajRed(this.cont3, "redTabela");
    let redNazivSala = this.crtajRed(red, "redNazivSala");
    this.sale.forEach(s =>{
        if(s.id == salaID){
            let labelaNazivSala = this.crtajLabelu(redNazivSala, s.naziv, "labelaNazivSala");
            labelaNazivSala.innerHTML = s.naziv;
        }
    })
   
    var table = document.createElement("table");
    table.className="tabela";
    red.appendChild(table);

    var thead= document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    thead.appendChild(tr);

    var tbody = document.createElement("tbody");
    tbody.className="tPodaci";
    table.appendChild(tbody);
    
    let th;
    var zag=["Datum", "Naziv filma", "Godina", "Zanr", "Glavne uloge", "Reziser", "Duzina trajanja"];
    zag.forEach(el=>{
        th = document.createElement("th");
        th.innerHTML=el;
        tr.appendChild(th);
    })

    fetch("https://localhost:5001/Projekcija/PreuzmiProjekcijeUSali/"+salaID,
    {
        method:"GET"
    }).then(p =>{
        p.json().then(d =>{
            d.forEach(data =>{
                this.crtajTabelu(tbody, data.datum, data.naziv, data.godina, data.zanr, data.glavneUloge, data.reziser, data.trajanje);
            })
        })
    })
}
    
}