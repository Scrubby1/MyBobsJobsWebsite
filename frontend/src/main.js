/* Module Name: COMP2110 Web Technology
   Student Name: Ethan Johnson
   Student Number: 46449477
*/


/* Importing the router class from router.js, this allows for all the multi page navigation that happens below. 

    Import the allData class from model.js, this does all of the importing of data from the database
*/
import { Router } from './router.js';
import { allData } from './model.js'



/* These are the data templates, they use the Handlebars script to merge and convert HTML and JavaScript code so it can be assigned to the "main" div in 
    the HTML file. I had an issue with the Handlebars script bugging out whenever I attempted to put the template accross multiple lines so the templates had
    to be created in one single line each.
*/
const simpleInfoTemplate = Handlebars.compile('<div class=info><p>{{dataInfo}}</p></div>')

const jobsTemplate = Handlebars.compile('{{#each this}}<div class = job>  <h2><a href = "#!/jobs/{{this.id}}">{{this.attributes.title}}</a></h2><p>{{this.attributes.location}}</p><p>{{this.attributes.type}}</p><p>{{this.id}}</p></div>{{/each}}')

const indivJobsTemplate = Handlebars.compile('<div class = indivJobs><h2 class="jobtitle">{{attributes.title}}</h2><h4><a href = "#!/companies/{{this.attributes.company.data.id}}">{{this.attributes.company.data.attributes.name}}</a></h4><div class="indivJobDetails"><p>Type: {{attributes.type}}</p> <p>Location: {{attributes.location}}</p> <p>Created at: {{attributes.createdAt}}</p><p> Updated At:{{attributes.updatedAt}}</p><p>Published At: {{attributes.publishedAt}}</p></div> <div class="job-description">{{{attributes.description}}}    </div></div>')

const compTemplate = Handlebars.compile ('<div><h2>{{this.attributes.name}}</h2><p>{{this.attributes.url}}</p>{{#each this.attributes.jobs.data}}<div>  <h3><a href = "#!/jobs/{{this.id}}">{{this.attributes.title}}</a></h3><p>{{this.attributes.location}}</p><p>{{this.attributes.type}}</p><p></p></div>{{/each}}</div>')

/* These are variables which contain the messages which are displayed when the "About Us" or "Applicant Help" pages are clicked on. The search error template
displays the error message when an invalid search method is entered
*/
const about = {"dataInfo": "Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!"}
const help = {"dataInfo": "Be sure to he honest in your application!"}
const searchError = {"dataInfo": "There are no jobs with this word in its job description, clear results and try again to continue"}


/* This is a function for searching through the large "jobs" array and finding specific jobs by their id. It then calls the "indivJobsView" function which 
    assigns the details of a particular individual job listing to the "main" div in the HTML File.
*/

/*
    Input: A pathInfo router object with a path (/search) and id (Item_User_Searched)
    Output: Displays either any valid job descriptions or an error message if no valid job descriptions are found.
*/
function jobSearchDesc (searchWord) {
    let tempSearchArr = [];
    let foundSomething = 0;
    let tempSearchWord = searchWord.id.toLowerCase();
    for (let i = 0; i < allData.Data.allJobs.length; i++) {

        let theHTML = allData.Data.allJobs[i].attributes.description
        let HTMLtoString = theHTML.replace(/<[^>]+>/g, '').toLowerCase();
        if (HTMLtoString.includes(tempSearchWord)) {
            tempSearchArr[i] = allData.Data.allJobs[i]     
            foundSomething = 1;     
        }
    }

    if (tempSearchArr.length ==0) {
        infoView ("main", searchError)
    } else {
        jobsView("main", tempSearchArr)
    }

}

/*
    Input: A router object with a path (/search) and searchID (company_id)
    Output: Calls the function which displays the details of the company with the corresponding searchID
*/
function compSearch (searchID) {
    for (let i = 0; i < allData.Data.allComps.length; i++) {
        if (allData.Data.allComps[i].id == searchID.id) {
            compsView ("main", allData.Data.allComps[i])
        }
    }
}

/*
    Input: A router object with a path (/search) and searchID (job_listing_id)
    Output: Calls the function which displays the details of an individual job listing with the corresponding searchID
*/
function jobSearchID (searchID) {
    for (let i = 0; i < allData.Data.allJobs.length; i++) {
        if (allData.Data.allJobs[i].id == searchID) {
            indivJobsView ("main", allData.Data.allJobs[i])
        }
    }
}


/*
    Creates constant variables for html inputs or buttons
*/

const searchInput = document.querySelector('.input')
const clearButton = document.getElementById('clear')
const searchButton = document.getElementById('searchbutton')

/*
    Input: Text input by user into the HTML search bar
    Output: Stores a valid string to search when the search bar is pressed, or calls the function which prints an error message.
*/
var value = 0
searchInput.addEventListener("input", (e)=> {
    value = e.target.value

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()
    } else {
        infoView ("main", searchError)
    }

})

/*
    Input: The value of the HTML search input
    Output: Changes the URL hash when the search button is clicked.
*/
searchButton.addEventListener("click", () => {

    let URL = "#!/search/" + value;
    window.location.hash = URL;
})

/*
    Output: When the HTML clear button is pressed the function should change the URL hash back to the home page.
*/
clearButton.addEventListener("click", () => {
    let URL = "/"
    window.location.hash = URL;
})




/*
    Input: targetID: id of a division in the HTML, info: basic string information from the "about", "help" or "searchError" constant variables above
    Output: Displays the given information (info) at the given id of a division in the HTML (targetID)
*/
function infoView (targetID, info)  {
    const list = simpleInfoTemplate(info);
    const target = document.getElementById(targetID)
    target.innerHTML = list;
}

/*
    Input: targetID: id of a division in the HTML, info: The information of an individual job listing
    Output: Displays the given information (info) at the given id of a division in the HTML (targetID)
*/
function indivJobsView (targetID, info) {
    const list = indivJobsTemplate (info)
    const target = document.getElementById(targetID)  
    target.innerHTML = list;
}

/*
    Input: targetID: id of a division in the HTML, info: The information of several job listing
    Output: Displays the given information (info) at the given id of a division in the HTML (targetID)
*/
function jobsView (targetID, info) {
    const list = jobsTemplate (info)
    const target = document.getElementById(targetID)  
    target.innerHTML = list;
}

/*
    Input: targetID: id of a division in the HTML, info: The information of company
    Output: Displays the given information (info) at the given id of a division in the HTML (targetID)
*/
function compsView (targetID, info) {
    const list = compTemplate (info)
    const target = document.getElementById(targetID)  
    target.innerHTML = list;
}


/* These are the router script calls to create valid URLs for each of the pages in the website*/

/*Displays an error message if an invalid URL is entered.*/
const errorView = () => {
    const target = document.getElementById('main')
    target.innerHTML = "<p class='error'>Page Not found</p>";
}

const router = new Router (errorView)

/* 
    When the URL of the home page is entered, calls the function which displays multiple jobs and displays the first 10 jobs
*/
router.get('/', () => {
    jobsView('main', allData.Data.job)
})

/*
    When the URL of the about page is entered, calls the function which displays basic information and displays the about information.
*/
router.get('/about', () => {
    infoView('main', about)
})

/*
    When the URL of the help page is entered, calls the function which displays basic information and displays the help information.
*/
router.get('/help', () =>{
    infoView('main', help)

})

/*
    When the URL is has a hash with the format, "/jobs/Some_Job_ID", calls the jobSearchID function which searches through all jobs 
    for that jobID and displays it.
*/
router.get('/jobs', (pathInfo) => {
    jobSearchID (pathInfo.id)
})

/*
    When the URL is has a hash with the format, "/search/Some_Search_Term", calls the jobSearchDesc function which searches through all job descriptions 
    for that search term and displays it.
*/
router.get('/search', (pathInfo) => {
    jobSearchDesc (pathInfo)
})

/*
    When the URL is has a hash with the format, "/company/Some_Company_ID", calls the compSearch function which searches through all the company IDs 
    for that company ID and displays it.
*/
router.get('/companies', (pathInfo) => {
    compSearch (pathInfo)
})



/* Redraw function is used to cause the page to redraw itself whenever the router script indicates that the hash has changed.*/
function redraw() {
    router.route()
}

/*
    Input: Event which signals that the data from the database has been loaded and is ready to work
    Output: The page is redrawn
*/
window.addEventListener ('modelUpdated', function(e) {
    redraw()
})


/* function used to load the json file and redraw the page as soon as the window loads.*/

window.onload = allData.loadAllData