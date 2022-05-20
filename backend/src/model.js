export { allData }

const allData = {

    dbUrlJobs: "http://localhost:1337/api/jobs?populate=company",
    dbUrlComps: "http://localhost:1337/api/companies?populate=jobs",
    dbUrlJobApps: "http://localhost:1337/api/job-applications",


    Data: {
        allJobs: [],
        allComps: [],
        allJobApps: [],
        job: [],
    },

    loadComps: () => {
        fetch (allData.dbUrlComps)
        .then ((response) => {
            return response.json()
        })
        .then ((data) => {
            allData.Data.allComps = data.data
        })
    },

    
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
    
    loadAllData: () => {
        allData.loadJobs()
        allData.loadComps()

    },

    getJobs: () => {
        return allData.Data.allJobs
    },

    getComps: () => {
        return allData.Data.allComps
    },

    getJobsLocal: (id) => {
        for (let i = 0; i < allData.Data.allJobs.length; i++) {
            if (allData.Data.allJobs[i]==id) {
                return allData.Data.allJobs[i]
            }
        }
        return null;
    },

    getCompsLocal: (id) => {
        for (let i = 0; i < allData.Data.allComps.length; i++) {
            if (allData.Data.allJobs[i]==id) {
                return allData.Data.allJobs[i]
            }
        }
        return null;
    },

    checkDuplicates (arr1, inst) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] == inst) {
                return 1;
            }
        }
        return -1;
    },

    convertPubAt (publishDate) {
        let jobPubAt = publishDate
        let jobTempStr = jobPubAt.substr(20,3)
        let jobIntfrmStr = parseInt(jobTempStr)
        return jobIntfrmStr
    },

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
    
        const event = new CustomEvent ("modelUpdated")
        window.dispatchEvent(event);
    },



};




