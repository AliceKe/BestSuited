


// const jobCard = (job) => {
// <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">${posting.role}</h5>
//     <h6 class="card-subtitle mb-2 text-muted">${posting.city}</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div>
// }

// function sendFocus(){
//     // document.getElementById('filter-text-val').focus()
//     console.log("hi")
// }


// function filterText() {
//     document.getElementById("answer-box").innerHTML = ""
//     const sortingParam = document.getElementById("filter-opts").value;
//     // console.log(document.getElementById("filter-opt-ratings").value)
//     // console.log(document.getElementById("filter-text-val").value)
//     let urlSearchParams = { title: document.getElementById("filter-text-val").value, sortingDir: sortingDirection }
//     if (sortingParam !== "") {
//         urlSearchParams.filter_opts = sortingParam;
//     }
//     fetch("/episodes?" + new URLSearchParams(urlSearchParams).toString())
//         .then((response) => response.json())
//         .then((data) => {
//             const companies = data.map(([companyName, companyData]) => {
//                 return {
//                     name: companyName,
//                     data: companyData
//                 };
//             });


//             companies.forEach((company) => {
//                 let tempDiv = document.createElement("div")
//                 let tmpContent = `<h2> ${company.name}</h2>`
//                 console.log(company.data.postings)

//                 company.data.postings.forEach((p) => {
//                     tempDiv.innerHTML = ""
//                     tmpContent += jobCard(p)
//                 })
//                 tempDiv.innerHTML = tmpContent
//                 document.getElementById("answer-box").appendChild(tempDiv)
//             })


//         })
// }


// let sortingDirection = "asc";
// document.getElementById("sort-direction-btn").addEventListener("click", function () {
//     sortingDirection = sortingDirection === "asc" ? "desc" : "asc";
//     document.getElementById("sort-direction-btn").innerHTML = sortingDirection === "asc" ? "&#9650;" : "&#9660;";
//     filterText();
// });

// document.getElementById("filter-opts").addEventListener("change", function () {
//     filterText()
// });




// const rangevalue = document.querySelector(".slider-container .salary-slider");
// const rangeInputvalue = document.querySelectorAll(".range-input input");


// let salaryGap = 500;


// const salaryInputvalue = document.querySelectorAll(".salary-input input");
// for (let i = 0; i < salaryInputvalue.length; i++) {
//     salaryInputvalue[i].addEventListener("input", e => {


//         let minsal = parseInt(salaryInputvalue[0].value);
//         let maxsal = parseInt(salaryInputvalue[1].value);
//         let diff = maxsal - minsal


//         if (minsal < 15000) {
//             alert("minimum salary cannot be less than 15000");
//             salaryInputvalue[0].value = 150000;
//             minsal = 15000;
//         }


//         if (maxsal > 250000) {
//             alert("maximum salary cannot be greater than 250000");
//             salaryInputvalue[1].value = 250000;
//             maxsal = 250000;
//         }


//         if (minsal > maxsal - salaryGap) {
//             salaryInputvalue[0].value = maxsal - salaryGap;
//             minsal = maxsal - salaryGap;


//             if (minsal < 15000) {
//                 salaryInputvalue[0].value = 15000;
//                 minsal = 15000;
//             }
//         }


//         if (diff >= salaryGap && maxsal <= rangeInputvalue[1].max) {
//             if (e.target.className === "min-salary") {
//                 rangeInputvalue[0].value = minsalary;
//                 let value1 = rangeInputvalue[0].max;
//                 rangevalue.style.left = `${(minsalary / value1) * 100}%`;
//             }
//             else {
//                 rangeInputvalue[1].value = maxsalary;
//                 let value2 = rangeInputvalue[1].max;
//                 rangevalue.style.right =
//                     `${5000 - (maxsalary / value2) * 100}%`;
//             }
//         }
//     });


//     for (let i = 0; i < rangeInputvalue.length; i++) {
//         rangeInputvalue[i].addEventListener("input", e => {
//             let minVal =
//                 parseInt(rangeInputvalue[0].value);
//             let maxVal =
//                 parseInt(rangeInputvalue[1].value);


//             let diff = maxVal - minVal


//             if (diff < salaryGap) {


//                 if (e.target.className === "min-range") {
//                     rangeInputvalue[0].value = maxVal - salaryGap;
//                 }
//                 else {
//                     rangeInputvalue[1].value = minVal + salaryGap;
//                 }
//             }
//             else {
//                 salaryInputvalue[0].value = minVal;
//                 salaryInputvalue[1].value = maxVal;
//                 rangevalue.style.left =
//                     `${(minVal / rangeInputvalue[0].max) * 100}%`;
//                 rangevalue.style.right =
//                     `${5000 - (maxVal / rangeInputvalue[1].max) * 100}%`;
//             }
//         });
//     }
// }




