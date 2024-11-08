const searchBar = document.querySelector(".search-bar");
const search = document.querySelector("#search-bar");
const jobsList = document.querySelector(".jobs-list");
const clearBtn = searchBar.querySelector(".clear-btn");

search.style.top = `calc(${-(search.clientHeight / 2) * 2}px)`;

const queryData = [];
let modifiedData = [];



function updateUI(data) {
  jobsList.innerHTML = "";
  data.forEach((job) => {
    let li = document.createElement("li");
    li.className = "card";
    li.id = job.id;
    li.innerHTML = `
        <div class='logo'>
        <img src='../assets/${job.logo}' alt='${job.company}' />
            </div>
            <div class='job-info'>
                <div class='leading'>
                    <h3 class='company'>${job.company}</h3>
                    ${job.new ? "<span class='new'>NEW!</span>" : ""}
                    ${
                      job.featured
                        ? "<span class='featured'>FEATURED</span>"
                        : ""
                    }
                </div>
                <div class='position'>
                    <h2 class='role'>${job.position}</h2>
                    </div>
                <div class='trailing'>
                <div class='posted-at'>${job.postedAt}</div>
                    <div class='contract'>${job.contract}</div>
                    <div class='location'>${job.location}</div>
                    </div>
                    </div>
                    <div class='languages'></div>
                    `;

    let lngs = li.querySelector(".languages");
    job.languages.forEach((language) => {
      let button = document.createElement("button");
      button.className = `${language} btn`;
      button.textContent = language;
      lngs.appendChild(button);

      button.addEventListener("click", () => {
        if (!queryData.includes(language)) {
          queryData.push(language);
          filterData();
        }
      });
    });

    jobsList.appendChild(li);
  });
}

function filterData() {
  modifiedData = data.filter((job) => {
    return queryData.every((filter) => job.languages.includes(filter));
  });

  updateUI(modifiedData);

  search.classList.toggle("visible", queryData.length > 0);

  searchBar.innerHTML = "";

  queryData.forEach((data) => {
    let queryContainer = document.createElement("div");
    queryContainer.className = "query-container";

    let queryText = document.createElement("div");
    queryText.className = "query-text";
    queryText.textContent = data;

    let divBtn = document.createElement("div");
    divBtn.className = "cancel";
    divBtn.textContent = "X";

    divBtn.addEventListener("click", () => {
      queryData.splice(queryData.indexOf(data), 1);
      filterData();
    });

    queryContainer.append(queryText, divBtn);
    searchBar.appendChild(queryContainer, clearBtn);
  });
  searchBar.appendChild(clearBtn);
}

updateUI(data);
clearBtn.addEventListener("click", () => {
  queryData.length = 0;
  searchBar.innerHTML = "";
  search.classList.remove("visible");
  updateUI(data);
  searchBar.appendChild(clearBtn);
});
