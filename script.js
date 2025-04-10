function showSection(sectionId) {
    const aboutSection = document.getElementById("about");
    const portfolioSection = document.getElementById("portfolio");
    const contactSection = document.getElementById("contact");

    // Display the about section and hide the portfolio section and contact section
    if (sectionId === "about") {
        aboutSection.style.display = "block";
        portfolioSection.style.display = "none";
        contactSection.style.display = "none";
    }
    // Display the portfolio section and hide the about section and contact section
    else if (sectionId === "portfolio") {
        aboutSection.style.display = "none";
        portfolioSection.style.display = "block";
        contactSection.style.display = "none";
    }

    // Display the contact section and hide the about section and portfolio section
    else if (sectionId === "contact") {
        aboutSection.style.display = "none";
        portfolioSection.style.display = "none";
        contactSection.style.display = "block";
    }

    // Hide all sections if an invalid sectionId is provided
    else {
        aboutSection.style.display = "none";
        portfolioSection.style.display = "none";
        contactSection.style.display = "none";
    }
}