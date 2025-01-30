const dark = document.getElementById("darkMode");
const wrapAll = document.getElementById("wrapper");
const back = document.querySelector(".back")

dark.addEventListener('click', event => {
  if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      back.src = "./assets/call-made.png";
      document.querySelector("#darkMode p").textContent = "Dark Mode";
  } else {
      document.body.classList.add("dark-mode");
      back.src = "./assets/call-made (1).png";
      document.querySelector("#darkMode p").textContent = "Light Mode";
  }
})


let divA = document.createElement("div");
divA.classList.add("country-details-container");
divA.classList.add("flex");

let aLinks = document.createElement("a");
aLinks.setAttribute("href", "#");

let theImage = document.createElement("img");
theImage.id = "detailCountryFlag";

let divB = document.createElement("div");
divB.classList.add("overall-details");

let divC = document.createElement("div");
divC.classList.add("details");
divC.classList.add("flex");

let divD = document.createElement("div");
divD.classList.add("innerDetails");

let h1 = document.createElement("h1");


let p1 = document.createElement("p");


let p2 = document.createElement("p");


let p3 = document.createElement("p");

let p4 = document.createElement("p");

let divE = document.createElement("div");
divE.classList.add("innerDetails2");

let p5 = document.createElement("p");

let p6 = document.createElement("p");

let p7 = document.createElement("p");

let divF = document.createElement("div");
divF.classList.add("down-flex");
divF.classList.add("flex");

let divG = document.createElement("div");
let p8 = document.createElement("p");

let divH = document.createElement("div");
divH.classList.add("linkFlex");
divH.classList.add("flex");

let btn1 = document.createElement("button");
btn1.classList.add("button");

let aLinks1 = document.createElement("a");
aLinks1.setAttribute("href", "#");


let btn2 = document.createElement("button");
btn2.classList.add("button");

let aLinks2 = document.createElement("a");
aLinks2.setAttribute("href", "#");



let btn3 = document.createElement("button");
btn3.classList.add("button");


let aLinks3 = document.createElement("a");
aLinks3.setAttribute("href", "#");

let imageId = ["setCountryFlag"];

    let text = "";

    document.querySelector(".body").append(divA);

    divA.append(aLinks);

    
    aLinks.id = "detailCountryFlag";
    aLinks.append(theImage);

    divA.append(divB);

    divB.append(divC);

    divC.append(divD);

    divD.append(h1);
    divD.append(p1);
    divD.append(p2);
    divD.append(p3);
    divD.append(p4);

    divC.append(divE);

    divE.append(p5);
    divE.append(p6);
    divE.append(p7);

    divB.append(divF);
    divF.append(divG);
    divG.append(p8);
    divF.append(divH);

    divH.append(aLinks1);
    divH.append(aLinks2);
    divH.append(aLinks3);

  

    function updateDOM() {
      
      let data = JSON.parse(localStorage.getItem('information'));

      if (!data) {
        document.body.innerHTML = `<h2>No Countries Found!!`;
      }else{
        
        theImage.setAttribute("src", data.flags.png);
        
        for (x in data.currencies) {
             
          text += data.currencies[x].name + "<br>";
               
        }
        h1.innerHTML = `${data.name.common}`;
        p1.innerHTML = `Population: ${data.population}`;
        p2.innerHTML = `Region: ${data.region}`;
        p3.innerHTML = `Sub Region: ${data.subregion}`;
        p4.innerHTML = `Capital: ${data.capital}`;
        p5.innerHTML = `Top Level Domain: ${data.tld}`;
            
        p6.innerHTML = `Currencies: ${text}`;
        
        
        let text1 = "";
        for (x in data.languages) {
          text1 += data.languages[x] + ", ";
                
        }
        
        p7.innerHTML = `Languages: ${text1}`;
        p8.innerHTML = "Border Countries:";
        btn1.innerHTML = `${data.borders}`;
        let split = btn1.innerHTML.split(",");
        split.forEach((x, index) => {
          let btns = document.createElement("a");
          btns.classList.add("button");
          btns.setAttribute("href", "#");
          btns.id = `borderCountry${index + 1}`;
          aLinks1.append(btns);
          if (btn1.innerHTML === "undefined") {
            btns.innerHTML = "Doesn't share Border(s) with any Country";
          } else {
            btns.innerHTML = x;
        
          }
      })          
      }
}     

window.addEventListener('DOMContentLoaded', () => {
  updateDOM()
})

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("selectedCountry");
});
  
  




