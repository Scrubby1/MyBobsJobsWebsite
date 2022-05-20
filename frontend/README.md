# COMP2110 Bob's Jobs Frontend

Module Name: COMP2110 Web Technology

Student Name: Ethan Johnson

Student Number: 46449477


This project implements the front-end code for Bob's Jobs.


1.1 Required the title "Bob's Jobs" it was a simple solution in the HTML of the document, using the <title></title> functions. This was implemented for me.

1.2 Required a linking to a stylesheet with the <link> functions. This was implemented for me.

1.3 & 1.4 Required the creation of "About Us" and "Applicant Help" pages using a single-page in-page referencing technique. To do this I utilised the router class to create valid links to these two pages as specified in the documentation. I then created a nav bar with the "nav" function as well as the "ul" and "li" functions to create a perminent navigation bar at the top of the window. In this nav bar each of the items contained a href link to the established hash links from the earlier router class implementation. I then created an infoView constant and a template, as well as some variables with the desired information, which would print out the required information when each list item is clicked on.

1.5 Required the creation of a "Home" button and a navigation bar to return to the home page. Because I had already implemented the navigation bar in the previous step, I simply copied the process I used above, except this time I created it without any data being returned to the "main" div.

2.1 Required the displaying the first 10 titles, locations, and types for listed jobs on the home page. To do this, I used a fetch function to collect all the job listings from the json file, I then assigned the data from this fetch request to an array in the javascript called "jobs", from there I used the splice function to assign a second array with the first 10 jobs in the "jobs" array, I called this smaller array "jobs10". In the fetch function I made a call to the view function I created with its associated handlebars template that iterated through the "jobs10" array and selected the required information and converted it to HTML. The view function then assigned this to the "main" div in the html file.

2.2 Required the title of a job on the home page to be a hyperlink to a more detailed description of the job. To do this, I updated the template discussed above, so that the title was shown as a href link in the required format, and I adjusted the link to show the id of the job listing. 

2.3 Required the redrawing of the page to show all the data of the job listing, including the description which was written in HTML. I used a similar router.get function to the other pages discussed above to create links for these pages, however this time I also included a variable with the id of each of these jobs. I combined this with a job searching utility to search through the jobs by their ID and from that to refrence a view function which changed the "main" div to show the required data. I also made sure that the HTML description was shown as {{{attributes.description}}} inside its own div called "job-description"

2.4 Required that in each of the job pages, that there still be a navigation bar that could take you to the home page. Because I was changing the "main" <div> and not the <nav> bar in my functions, this was automatically there for each of the webpages.

2.7 Required that there be a "Page Not Found" error catch for any unknown urls. To do this I created an "errorViews" constant combined with the router.js class which was provided automatically caught any unknown URL errors.

3.c Adjusted 2.1 implementation so that it would read and display the data from the array in the backend code with the 10 most recent jobs published. (See backend README for details on the backend implementation for this requirement)

3.d/e Because the searchbar is in the navigation bar and not in the main div it is always on every page, similarly to step 1.5. The search bar searches though the words of the description of each job listing and displays any job listing where the job description contains the search word.
