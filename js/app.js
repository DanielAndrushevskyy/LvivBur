const header = document.querySelector("header");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");

const links = document.querySelectorAll(".nav-link");


const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");


/* ---------------------  Footer Animation  --------------------- */

footer_input.addEventListener("focus", () => {
   footer_input.classList.add("focus");
});

footer_input.addEventListener("blur", () => {
   if(footer_input.value != "") return;
   footer_input.classList.remove("focus");
});

/* ---------------------  Sticky Navbar  --------------------- */

function stickyNavbar(){
   header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", () => {
   activeLink();
   stickyNavbar();
   countUp();
});

/* ---------------------  Reveal Animation  --------------------- */

let sr = ScrollReveal({
   duration: 2500,
   distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });


/* ---------------------  Employees Animation  --------------------- */

const clientTabItems = document.querySelectorAll('.client-item');
const showDiv = document.querySelector('.show-info');

clientTabItems.forEach((item) => {
   item.addEventListener('click', () => {
      showInfo(item);
   });
});

function showInfo(item){
   showDiv.querySelector('.show-img img').src = item.
   querySelector('.client-thumbnail img').src;
   showDiv.querySelector('.show-name').innerHTML = item.
   querySelector('.client-name').innerHTML;

   showDiv.querySelector('.show-designation').innerHTML = item.
   querySelector('.client-designation').innerHTML;

   showDiv.querySelector('.show-description').innerHTML = item.
   querySelector('.client-description').innerHTML;

   setActiveTab(item);
}

function setActiveTab(item){
clientTabItems.forEach((item) => {
   item.classList.remove('active');
});
item.classList.add('active');
}

showInfo(clientTabItems[0]);


/* ---------------------  Portfolio Filter Animation  --------------------- */

let mixer = mixitup(".portfolio-gallery", {
   selectors: {
      target: ".prt-card",
   },
   animation: {
      duration: 500,
   },
});

/* ---------------------  Modal Pop Up Animation Animation  --------------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
   icn.addEventListener("click", () => {
      prt_section.classList.add("open");
      document.body.classList.add("stopScrolling");
      currentIndex = i;
      changeImage(currentIndex);
   })
);

modal_overlay.addEventListener("click", () => {
   prt_section.classList.remove("open");
   document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
   if(currentIndex === 0) {
      currentIndex = 5;
   }  else{
      currentIndex--;
   }
   console.log(currentIndex);
   changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
   if(currentIndex === 5) {
      currentIndex = 0;
   }  else{
      currentIndex++;
   }
   console.log(currentIndex);
   changeImage(currentIndex);
});

function changeImage(index) {
   images.forEach((img) => img.classList.remove("showImage"));
   images[index].classList.add("showImage");
   console.log(images[index]);
}

/* ---------------------  Records Animation  --------------------- */


function checkScroll(el) {
   let rect = el.getBoundingClientRect();
   if (window.innerHeight >= rect.top + el.offsetHeight) return true;
   return false;
}

function countUp() {
   if (!checkScroll(records_wrap)) return;
   records_numbers.forEach((numb) => {
      const updateCount = () => {
         let currentNum = +numb.innerText;
         let maxNum = +numb.dataset.num;
         let speed = 1200;
         const increment = Math.ceil(maxNum / speed);

         if (currentNum < maxNum) {
         numb.innerText = currentNum + increment;
         setTimeout(updateCount, 1);
         } else {
         numb.innerText = maxNum;
         }
      };

      setTimeout(updateCount, 400);
   });
}


/* ---------------------  Change Page Theme  --------------------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
   if(isDark) {
      document.body.classList.add("dark");
      toggle_btn.classList.replace("uil-moon", "uil-sun");
      localStorage.setItem("dark", 1);
   }
   else {
      document.body.classList.remove("dark");
      toggle_btn.classList.replace("uil-sun", "uil-moon");
      localStorage.setItem("dark", 0);
   }
}

toggle_btn.addEventListener("click", () => {
   changeTheme(!document.body.classList.contains("dark"));
});

/* ---------------------  Open & Close Navbar Menu  --------------------- */

hamburger.addEventListener("click", () => {
   document.body.classList.toggle("open");
   document.body.classList.toggle("stopScrolling");
});

// links.forEach((link) => link.addEventListener("click", () => {
//    document.body.classList.remove("open");
//    document.body.classList.remove("stopScrolling");
// }));

links.forEach((link) => link.addEventListener("click", () =>{
   document.body.classList.remove("open");
   document.body.classList.remove("stopScrolling");
}))

/* ---------------------  Change Active Link On Scroll  --------------------- */

function activeLink() {
   let sections = document.querySelectorAll("section[id]");
   let passedSections = Array.from(sections).map((sct, i) => {
      return { 
         y: sct.getBoundingClientRect().top - header.offsetHeight,
         id: i,
      };
   })
   .filter((sct) => sct.y <= 0);

   let currSectionID = passedSections.at(-1).id;
   
   links.forEach((l) => l.classList.remove("active"));
   links[currSectionID].classList.add("active");
}

activeLink();


