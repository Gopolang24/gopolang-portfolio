/*typing animation*/
var typed = new Typed(".typing", {
    strings:["Machine Learning Engineer", "Data Scientist", "Data Analyst", "Data Engineer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

/* Navigation & Scroll Spy */
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
mainContent = document.querySelector(".main-content");

const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");

// Menu click → smooth scroll to section
navList.forEach(li => {
    const a = li.querySelector("a");
    a.addEventListener("click", function(e){
        e.preventDefault();
        const targetId = this.getAttribute("href").replace("#", "");
        const target = document.getElementById(targetId);
        if(target){
            mainContent.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }
        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    });
});

// Logo click → scroll to top (home)
document.querySelector(".logo a")?.addEventListener("click", function(e){
    e.preventDefault();
    mainContent.scrollTo({ top: 0, behavior: "smooth" });
});

// Hire-me button if it exists
const hireMeBtn = document.querySelector(".hire-me");
if(hireMeBtn){
    hireMeBtn.addEventListener("click", function(){
        const targetId = this.getAttribute("href")?.replace("#","") || "contact";
        const target = document.getElementById(targetId);
        if(target){
            mainContent.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
    });
}

// Mobile navigation toggle
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

// Floating dot nav — click to scroll
const dotNavItems = document.querySelectorAll(".dot-nav-item");
dotNavItems.forEach(dot => {
    dot.addEventListener("click", function(e){
        e.preventDefault();
        const targetId = this.getAttribute("href").replace("#","");
        const target = document.getElementById(targetId);
        if(target){
            mainContent.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
    });
});

// Scroll Spy — highlights sidebar nav + dot nav
function updateActiveNavLink(sectionId){
    navList.forEach(li => {
        const a = li.querySelector("a");
        a.classList.remove("active");
        if(a.getAttribute("href") === `#${sectionId}`){
            a.classList.add("active");
        }
    });
    dotNavItems.forEach(dot => {
        dot.classList.remove("active");
        if(dot.getAttribute("data-section") === sectionId){
            dot.classList.add("active");
        }
    });
}

mainContent.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");
    const scrollMid = mainContent.scrollTop + mainContent.clientHeight / 2;

    sections.forEach(section => {
        if(scrollMid >= section.offsetTop && scrollMid < section.offsetTop + section.offsetHeight){
            updateActiveNavLink(section.getAttribute("id"));
        }
    });
});

// Scroll-triggered animations for sections and dividers
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("in-view");
        } else {
            entry.target.classList.remove("in-view");
        }
    });
}, {
    root: mainContent,
    threshold: 0.1
});

document.querySelectorAll(".section, .section-divider").forEach(el => {
    revealObserver.observe(el);
});

// Make home section visible immediately
document.querySelector("#home")?.classList.add("in-view");
