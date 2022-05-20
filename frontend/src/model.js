/*
    Exports the all the functions on the page so that they can be read by other files.
*/
export { allData }

/*
    Groups all the functions together under one constant variable to simplify exportation.
*/
const allData = {

    /*
        Creates variables of the different database content type URLs
    */
    dbUrlJobs: "http://localhost:1337/api/jobs?populate=company",
    dbUrlComps: "http://localhost:1337/api/companies?populate=jobs",
    dbUrlJobApps: "http://localhost:1337/api/job-applications",

    /*
        Creates an array of arrays for the different data types
    */
    Data: {
        allJobs: [],
        allComps: [],
        allJobApps: [],
        job: [],
    },

    /*
        Fetches the data from the company content type database and converts it to a JavaScript readable format and saves it to the array for Companies.
    */
    loadComps: () => {
        fetch (allData.dbUrlComps)
        .then ((response) => {
            return response.json()
        })
        .then ((data) => {
            allData.Data.allComps = data.data
        })
    },

    /*
        Fetches the data from the jobs content type database and converts it to a JavaScript readable format and saves it to the array for jobs. Also
        calls the function which populates the array of the latest 10 jobs.
    */
    loadJobs: () => {
        fetch (allData.dbUrlJobs)
        .then ((response) => {
            return response.json()
        })
        .then ((data) => {
            allData.Data.allJobs = data.data
            allData.new10Jobs(allData.Data.job)
        })
        
    },
    
    /*
        When called, calls the functions for loading jobs and data
    */
    loadAllData: () => {
        allData.loadJobs()
        allData.loadComps()

    },

    /*
        Input: The publish date for a job object in the job array.
        Output: a string of the millisecond when the job was published.
    */
    convertPubAt (publishDate) {
        let jobPubAt = publishDate
        let jobTempStr = jobPubAt.substr(20,3)
        let jobIntfrmStr = parseInt(jobTempStr)
        return jobIntfrmStr
    },

    /*
        Populates the array for the latest 10 jobs with the latest 10 jobs in the array of all jobs
    */
    new10Jobs: () => {
        let j = 0;
        let tempArr = new Array();
        let tempArr10 = new Array();


        for (let i = 0; i < 10; i++) {
            allData.Data.job[i] = "";
        }

        for (let i = 0; i < allData.Data.allJobs.length; i++) {
            let intPubAt = allData.convertPubAt (allData.Data.allJobs[i].attributes.publishedAt)
            tempArr[i] = intPubAt
            tempArr.sort(function (a, b){return a - b});
        }

        for (let i = tempArr.length-1; i > tempArr.length-11; i--) {
            tempArr10[j] = tempArr[i] 
            j++;
        }

        j = 0
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < allData.Data.allJobs.length; j++) {
                let allJobsIntPubAt = allData.convertPubAt (allData.Data.allJobs[j].attributes.publishedAt);
                if (tempArr10[i] == allJobsIntPubAt) {
                    allData.Data.job[i] = allData.Data.allJobs[j]
                }
            }
            
        }
    
        /*
            Creates an even which notifies the main.js file that the data has loaded.
        */
        const event = new CustomEvent ("modelUpdated")
        window.dispatchEvent(event);
    },



};




