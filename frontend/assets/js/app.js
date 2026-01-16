/*typing animation*/
var typed = new Typed(".typing", {
    strings:["Machine Learning Engineer", "Data Scientist", "Data Analyst", "Data Engineer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

/* Hybrid Navigation - Section Switching with Smooth Scrolling */
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalSection = allSection.length;

for(let i = 0; i<totalNavList; i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function(e){
        e.preventDefault();
        
        // Update active nav state
        for(let j = 0; j<totalNavList; j++){
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        
        // Switch to target section with smooth transition
        const targetId = this.getAttribute("href").split("#")[1];
        switchToSection(targetId);

        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })
}

function switchToSection(targetId) {
    // Hide all sections
    for(let i = 0; i < totalSection; i++){
        allSection[i].classList.remove("active");
        allSection[i].classList.remove("back-section");
    }
    
    // Show target section
    const targetSection = document.querySelector("#" + targetId);
    if(targetSection) {
        targetSection.classList.add("active");
        
        // Smooth scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function removeBackSection(){
    for(let i = 0; i<totalNavList; i++){
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num){
    allSection[num].classList.add("back-section");
}

function showSection(element){
    const targetId = element.getAttribute("href").split("#")[1];
    switchToSection(targetId);
}

function updateNav(element){
    for(let i = 0; i< totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

// Handle hire-me button if it exists
const hireMeBtn = document.querySelector(".hire-me");
if(hireMeBtn) {
    hireMeBtn.addEventListener("click", function(){
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    })
}

// Handle logo click
document.querySelector(".logo a")?.addEventListener("click", function(e){
    e.preventDefault();
    for(let i = 0; i<totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
    }
    navList[0].querySelector("a").classList.add("active");
    showSection(this);
})

// Mobile navigation toggle
const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn()
})

function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    for(let i =0; i < totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}
