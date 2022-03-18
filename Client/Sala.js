export class Sala{

    constructor(id, naziv, brredova, brsedista, bioskopid){
        this.id = id;
        this.naziv = naziv;
        this.brredova = brredova;
        this.brsedista = brsedista;
        this.bioskopid = bioskopid;
        this.projekcije = [];
        this.container = null;
    }

    DodajProjekciju(projekcija){
        if(this.id === projekcija.salaid){
            this.projekcije.push(projekcija);
        }
    }

    CrtajSalu(host, projekcijaID){
        let rezervisanaSedista = [];
        fetch("https://localhost:5001/Rezervacija/PreuzmiRezervacije/"+projekcijaID,
        {
            method:"GET"
        }).then(p=>{
                p.json().then(data1=>{
                    data1.forEach(data2=>{
                        data2.forEach(data3=>{
                            data3.forEach(data4=>{
                                    rezervisanaSedista.push(data4.brojSedista);
                                })
                        })
                    })

                this.container = document.createElement("div");
                this.container.className = "sala";
                host.appendChild(this.container);
                let red = document.createElement("div");
                red.className = "redPlatno";
                red.innerHTML = "Platno";
                this.container.appendChild(red);
        
                let brojsedista = 1;
                let brojreda = 1;
                for(let i=0; i<this.brredova; i++){
                    red = document.createElement("div");
                    red.className = "redSala";
                    this.container.appendChild(red);
        
                    let labela = document.createElement("label");
                    labela.className = "lblBrojReda"
                    labela.innerHTML = brojreda;
                    red.appendChild(labela);
                    for(let j=0; j<this.brsedista; j++){
                        let btn = document.createElement("button");
                        btn.className = "btnSala";
                        btn.value = brojreda;
                        btn.innerHTML = brojsedista;
                        btn.onclick=(ev)=>this.Klik(btn);
                        btn.ondblclick=(ev)=>this.DupliKlil(btn);
                        if(rezervisanaSedista.length != 0){
                            for(let i=0; i<rezervisanaSedista.length; i++){
                                if(btn.innerHTML == rezervisanaSedista[i]){
                                    btn.style.backgroundColor = "red";
                                    btn.onclick=(ev)=>this.RezervisanoSediste();
                                }
                            }
                        }
                        red.appendChild(btn);
                        brojsedista++;
                    }
                    brojreda++;
                }
                red = document.createElement("div");
                red.className = "redSalaPrazno";
                this.container.appendChild(red);
                red = document.createElement("div");
                red.className = "redSala";
                this.container.appendChild(red);
                let btn = [];
                let l = [];
                for(let i=0; i<3; i++){
                    btn[i] = document.createElement("button");
                    btn[i].className = "dugmeSala";
                    btn[i].disabled = true;
                    l[i] = document.createElement("label");
                    l[i].className = "lblBtnRezervacija";
                    red.appendChild(btn[i]);
                    red.appendChild(l[i]);
                }
                btn[0].style.backgroundColor = "lightgreen";
                l[0].innerHTML = "Slobodno";
                btn[1].style.backgroundColor = "red";
                l[1].innerHTML = "Zauzeto";
                btn[2].style.backgroundColor = "black";
                l[2].innerHTML = "Odabrano";
            })
        })
    }

    Klik(dugme){
        dugme.style.backgroundColor = "black";
        dugme.style.color = "white";
        dugme.id = "btnOdabrano";
    }

    DupliKlil(dugme){
        dugme.style.backgroundColor = "lightgreen";
        dugme.style.color = "black";
        dugme.id = "btnSlobodno";
    }

    RezervisanoSediste(){
        alert("Rezervisano sediste!");
    }
}