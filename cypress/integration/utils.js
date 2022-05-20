const axios = require('axios')
const qs = require('qs');

const BASE_URL = 'http://localhost:1337/api/'

let JWT = ''


/* Login to the Strapi API */
const login = async (identifier, password) => {
    const { data } = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
    });
    JWT = data.jwt
    console.log(`Logged in as '${identifier}'`)
}

/* remove all existing instaces of 'what' via
 * DELETE requests to the API
 */
const clearData = (what) => {


    axios.get(BASE_URL+what, {
            headers: {
                Authorization: 'Bearer '+JWT
            }
        })
         .then((response) => {
            return response.data
         })
         .then((data) => {
             data.data.forEach((job) => {
                axios.delete(BASE_URL + what + '/' + job.id, {
                    headers: {
                        Authorization: 'Bearer '+ JWT
                    }
                })
             })
         })
         console.log(`Old ${what} data cleared`)
}

/*
 * Upload one job via the API
 */
const uploadJob = job => {

    const companyName = job.attributes.company.data.attributes.name
    delete job.attributes.company

    // first find the company id with a GET query
    const query = qs.stringify({
    filters: {
            name: {
                $eq: companyName,
            },
        },
    }, {
        encodeValuesOnly: true,
    });

    axios({
        method: 'get',
        url: BASE_URL + `companies?${query}`
    })
    .then((response) => {
        // use the company id in the job record to create the relation
        job.attributes.company = response.data.data[0].id

        axios({
            method: 'post',
            url: BASE_URL + 'jobs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ JWT
            },
            data: {data: job.attributes}
        })
        .catch(error => {
            console.log("ERROR! job", job.id, job.attributes.company, error.message)
        })

    })

}

/*
 * upload one company record via the API
 */
const uploadCompany = async (company) => {
    axios({
        method: 'post',
        url: BASE_URL + 'companies',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ JWT
        },
        data: {data: company.attributes}
    })
    .catch(error => {
        console.log("ERROR! company", company.id, error.message)
    })
}

// function to resolve a promise after a delay
const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const uploadData = (sampleData) => {

    /* Login and process the data */
    login('bob', 'bobalooba')
    .then(() => {

        clearData('companies')
        console.log("Creating companies")
        sampleData.companies.forEach(async (company)  => {
            await uploadCompany(company)
        })

        // wait before creating jobs so that all companies are in the db
        delay(1000)
        .then(() => {
            clearData('jobs')
            console.log("Creating jobs")
            sampleData.jobs.forEach((job) => {
                uploadJob(job)
            })
        })
    })
}

module.exports = {uploadData}