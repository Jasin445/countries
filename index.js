const dropDown = document.getElementById("dropdown");
const click = document.getElementById("clickToToggle");
let filterBlock = document.querySelector(".filter");
const dark = document.getElementById("darkMode");
const wrapAll = document.getElementById("wrapper");
const container = document.querySelector(".container");
const searchBlock = document.querySelector(".search-block");
const bigDiv = document.querySelector(".bigDiv");
const searched = document.getElementById("input");
let load = document.getElementById("myLoader");


// for filter dropdown
document.body.addEventListener('click', (event) => {
    if (filterBlock.contains(event.target) /*|| dropDown.contains(event.target)*/) {
        if (dropDown.style.visibility === "visible") {
            dropDown.style.visibility = "hidden";
            click.style.transform = "rotate(0deg)"
        } else {
            dropDown.style.visibility = "visible";
            click.style.transform = "rotate(180deg)"
        }
    } else {
        dropDown.style.visibility = "hidden";
        click.style.transform = "rotate(0deg)"
    }
})

// for dark mode
dark.addEventListener('click', event => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.querySelector(".filter img").src = "./assets/Group 2 (1).png";
        document.querySelector("#darkMode p").textContent = "Dark Mode";
    } else {
        document.body.classList.add("dark-mode");
        document.querySelector(".filter img").src = "./assets/Group 2 (2).png";
        document.querySelector("#darkMode p").textContent = "Light Mode";
    }
})

// for fetching API data
function getCountries() {
    return new Promise((resolve, reject) => {
        let url = "https://restcountries.com/v3.1/all";
        resolve(url);
    })
}

function fetchCountryData(data) {
    return new Promise((resolve, reject) => {
        fetch(data)
            .then((msg) => (msg.status === 200) ? resolve(msg) : reject("Server Error"))
            .catch(err => reject(err))
    })
}

function convertToJson(data1) {
    return new Promise((resolve, reject) => {
        data1.json()
            .then((msg) => resolve(msg))
            .catch((err) => reject(err))
    })
}

function onFailure(err) {
    feedBack(err.message);
}

// display the data when the window loads
window.addEventListener('load', () => {
    getCountries()
        .then(fetchCountryData)
        .then(convertToJson)
        .then((data) => {
            myFunction();
            displayCountries(data);
            search(data);
            filter(data);
        })
        .catch(onFailure)
})

// create a grid and update DOM 
function displayCountries(country) {
    document.querySelector(".bigDiv").innerHTML = "";
    if (country.length === 0) {
        return feedBack("No Countries Found!!")
    }
    country.forEach((theCountry, index) => {
        let a = document.createElement("a");
        a.id = "removeStyle";
        document.querySelector(".bigDiv").append(a)
        let div = document.createElement("div");
        a.append(div);
        div.classList.add("flex");
        div.classList.add("column");

        a.addEventListener('click', event => {
            event.preventDefault();
            localStorage.setItem("information", JSON.stringify(theCountry));

            location.href = "index2.html";

        })


        let img = document.createElement("img");
        img.setAttribute("src", theCountry.flags.png)
        img.id = `setCountryFlag${index + 1}`;
        img.style.width = "150%";
        img.style.cursor = "pointer";
        div.append(img);

        let divPadded = document.createElement("div");
        divPadded.setAttribute('class', "padded");
        div.append(divPadded);

        let pDetail = document.createElement("p");
        pDetail.id = "details";
        pDetail.innerHTML = theCountry.name.common;
        divPadded.append(pDetail);

        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        p1.innerHTML = `Population: ${theCountry.population}`;
        p2.innerHTML = `Region: ${theCountry.region}`;
        if (theCountry.capital === undefined) {
            p3.innerHTML = "Capital: No Capital";
        } else {
            p3.innerHTML = `Capital: ${theCountry.capital}`;

        }
        divPadded.append(p1);
        divPadded.append(p2);
        divPadded.append(p3);

        


    })

}
    // for filtering regions
    function filter(country) {

        let regions = document.querySelectorAll("li");

        regions.forEach((region) => {
            region.addEventListener('click', (event) => {
                let category = event.currentTarget.dataset.region;

                let menuCateg = country.filter(datas => datas.region === category);

                if (category === 'All') {
                    displayCountries(country);
                    searched.removeEventListener('keyup', search)
                    search(country)
                } else {

                    displayCountries(menuCateg);
                    searched.removeEventListener('keyup', search)
                    search(menuCateg)
                }
                searched.value = "";

                dropDown.style.visibility = "hidden";
                click.style.transform = "rotate(0deg)";
            })
        })
    }


    // for the search block
    function search(countryData) {
        let sear;
        searched.addEventListener('keyup', (event) => {
            let n = searched.value.toLowerCase().trim();
            sear = countryData.filter((country) => {
                return country.name.common.toLowerCase().includes(n)
            })
            document.querySelector(".bigDiv").innerHTML = "";
            if (sear.length === 0) {
                feedBack("No Countries Found!!");
            } else {
                feedBack("")
                displayCountries(sear);
            }
            return;
        })
    }

    function myFunction() {
        load.style.display = "none";
        bigDiv.style.display = "grid";
    }


    function feedBack(msg) {
        let message = document.getElementById("message")
        if (!message) {

            let message = document.createElement("p");
            message.id = "message"
            message.style.fontSize = "40px";
            message.style.color = "red";
            message.style.textAlign = "center";
            document.body.append(message);

        }
        message.textContent = msg;
    }
