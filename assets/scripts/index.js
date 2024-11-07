const searchBar = document.querySelector('.search-bar');
const search = document.querySelector('#search-bar');
const jobsList = document.querySelector('.jobs-list');
const clearBtn  = searchBar.querySelector('.clear-btn');


search.style.top = `calc(${(-(search.clientHeight / 2) * 2)}px)`;

const queryData = [];
let modifiedData = [];

const data = [
    {
        id: 1,
        company: "Photosnap",
        logo: "./images/photosnap.svg",
        new: true,
        featured: true,
        position: "Senior Frontend Developer",
        role: "Frontend",
        level: "Senior",
        postedAt: "1d ago",
        contract: "Full Time",
        location: "USA Only",
        languages: ["HTML", "CSS", "JavaScript", "Frontend", "Senior"],
        tools: []
    },
    {
        id: 2,
        company: "Manage",
        logo: "./images/manage.svg",
        new: true,
        featured: true,
        position: "Fullstack Developer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "1d ago",
        contract: "Part Time",
        location: "Remote",
        languages: ["Python", "Fullstack", "Midweight"],
        tools: ["React"]
    },
    {
        id: 3,
        company: "Account",
        logo: "./images/account.svg",
        new: true,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2d ago",
        contract: "Part Time",
        location: "USA Only",
        languages: ["JavaScript", "Frontend", "Junior"],
        tools: ["React", "Sass"]
    },
    {
        id: 4,
        company: "MyHome",
        logo: "./images/myhome.svg",
        new: false,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "5d ago",
        contract: "Contract",
        location: "USA Only",
        languages: ["CSS", "JavaScript", "Frontend", "Junior"],
        tools: []
    },
    {
        id: 5,
        company: "Loop Studios",
        logo: "./images/loop-studios.svg",
        new: false,
        featured: false,
        position: "Software Engineer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "1w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["JavaScript", "Fullstack", "Midweight"],
        tools: ["Ruby", "Sass"]
    },
    {
        id: 6,
        company: "FaceIt",
        logo: "./images/faceit.svg",
        new: false,
        featured: false,
        position: "Junior Backend Developer",
        role: "Backend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "UK Only",
        languages: ["Ruby", "Backend", "Junior"],
        tools: ["RoR"]
    },
    {
        id: 7,
        company: "Shortly",
        logo: "./images/shortly.svg",
        new: false,
        featured: false,
        position: "Junior Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["HTML", "JavaScript", "Frontend", "Junior"],
        tools: ["Sass"]
    },
    {
        id: 8,
        company: "Insure",
        logo: "./images/insure.svg",
        new: false,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "USA Only",
        languages: ["JavaScript", "Frontend", "Junior"],
        tools: ["Vue", "Sass"]
    },
    {
        id: 9,
        company: "Eyecam Co.",
        logo: "./images/eyecam-co.svg",
        new: false,
        featured: false,
        position: "Full Stack Engineer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "3w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["JavaScript", "Python", "Fullstack", "Midweight"],
        tools: ["Django"]
    },
    {
        id: 10,
        company: "The Air Filter Company",
        logo: "./images/the-air-filter-company.svg",
        new: false,
        featured: false,
        position: "Front-end Dev",
        role: "Frontend",
        level: "Junior",
        postedAt: "1mo ago",
        contract: "Part Time",
        location: "Worldwide",
        languages: ["JavaScript", "FrontEnd", "Junior"],
        tools: ["React", "Sass"]
    }
];


function updateUI(data) {
    let clearBtn = document.createElement('div');
    clearBtn.className = 'clear-btn';
    clearBtn.textContent = 'Clear';
    jobsList.innerHTML = ''; 
    data.forEach(job => {
        let li = document.createElement('li');
        li.className = 'card';
        li.id = job.id;
        li.innerHTML = `
        <div class='logo'>
        <img src='../assets/${job.logo}' alt='${job.company}' />
            </div>
            <div class='job-info'>
                <div class='leading'>
                    <h3 class='company'>${job.company}</h3>
                    ${job.new ? "<span class='new'>NEW!</span>" : ""}
                    ${job.featured ? "<span class='featured'>FEATURED</span>" : ""}
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

                    let lngs = li.querySelector('.languages');
                    job.languages.forEach(language => {
                        let button = document.createElement('button');
            button.className = `${language} btn`;
            button.textContent = language;
            lngs.appendChild(button);
            
            button.addEventListener('click', () => {
                if (!queryData.includes(language)) {
                    queryData.push(language);
                    filterData();
                    let clearBtn = document.createElement('div');
                    clearBtn.textContent = 'Clear';
                    
                }
            });
        });

        jobsList.appendChild(li);
    });
}

function filterData() {
    modifiedData = data.filter(job => {
        return queryData.every(filter => job.languages.includes(filter));
    });
    
    updateUI(modifiedData);
    
    search.classList.toggle('visible', queryData.length > 0);

    searchBar.innerHTML = '';

    queryData.forEach(data => {
        
        let queryContainer = document.createElement('div');
        queryContainer.className = 'query-container';
    
        let queryText = document.createElement('div');
        queryText.className = 'query-text';
        queryText.textContent = data;
    
        let divBtn = document.createElement('div');
        divBtn.className = 'cancel';
        divBtn.textContent = 'X';
    
        divBtn.addEventListener('click', () => {
            queryData.splice(queryData.indexOf(data), 1);
            filterData();
        });
        
        queryContainer.append(queryText, divBtn);
        searchBar.appendChild(queryContainer,clearBtn);


    });
}

updateUI(data);
clearBtn.addEventListener('click', () => {
    searchBar.innerHTML = '';
    updateUI(data);
})

