function showSection(sectionId) {
    const aboutSection = document.getElementById("about");
    const portfolioSection = document.getElementById("portfolio");

    // Display the bios section and hide the vision section
    if (sectionId === "about") {
        aboutSection.style.display = "block";
        portfolioSection.style.display = "none";
    }
    // Display the vision section and hide the bios section
    else if (sectionId === "portfolio") {
        aboutSection.style.display = "none";
        portfolioSection.style.display = "block";
    }
}