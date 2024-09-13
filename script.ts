//listing element
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();


    //type assertion
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const usernameElement = document.getElementById(
        "username"
    ) as HTMLInputElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement ) {


        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        


        //picture elements
        const profilePictureFile = profilePictureInput.files?.[0]
        const profilePictureURL = profilePictureFile? URL.createObjectURL(profilePictureFile) : '';
    

    // create resume output
    const resumeOutput = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
    <p><strong>Name:</strong> ${name} </p> <br>
    <p><strong>Email:</strong> ${email} </p> <br>
    <p><strong>Phone:</strong> ${phone}</p> <br>

    <h3>Education</h3>
    <p>${education}</p><br>

    <h3>Experience</h3>
    <p>${experience}</p><br>

    <h3>Skills</h3>
    <p>${skills}</p><br>
    `;
    

    


  




    //display the resume putput

    const resumeOutputElement = document.getElementById("resumeOutput")
    if (resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput
        resumeOutputElement.classList.remove("hidden");


        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click" , () => {
            window.print(); //allowing the user to save as PDF by print dialog
        });
        buttonsContainer.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "copy Shareable Link";
        shareLinkButton.addEventListener("click" , async () => {
            try {
                const ShareableLink = `https://yourdomain.com/resumes/${name.replace(
                    /\s+/g,
                    "_"
                )}_cv.html`;
                await navigator.clipboard.writeText(ShareableLink);
                alert("Shareable Link copied to clipboar!!");
            }catch(err) {
                console.error("Failed to copy link:" , err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);
            
        

    
    } else {
        console.error('THE RESUME OUTPUT CONTAINER NOT FOUND')
        
    }
} else {
    console.error('ONE OR MORE OUTPUT ELEMENTS ARE MISSING')
}
});