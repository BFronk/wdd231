const nonButton = document.querySelector('#learn-non-profit');
const nonModal = document.querySelector('#non-profit-modal');
const nonClose = document.querySelector('#non-close'); 
const bronzeButton = document.querySelector('#learn-bronze');
const bronzeModal = document.querySelector('#bronze-modal');
const bronzeClose = document.querySelector('#bronze-close'); 
const silverButton = document.querySelector('#learn-silver');
const silverModal = document.querySelector('#silver-modal');
const silverClose = document.querySelector('#silver-close');
const goldButton = document.querySelector('#learn-gold');
const goldModal = document.querySelector('#gold-modal');
const goldClose = document.querySelector('#gold-close'); 

nonButton.addEventListener("click", () => {
    nonModal.showModal();
});

nonClose.addEventListener("click", () => {
    nonModal.close();  
});

bronzeButton.addEventListener("click", () => {
    bronzeModal.showModal();
});

bronzeClose.addEventListener("click", () => {
    bronzeModal.close();  
});
silverButton.addEventListener("click", () => {
    silverModal.showModal();
});

silverClose.addEventListener("click", () => {
    silverModal.close();  
});
goldButton.addEventListener("click", () => {
    goldModal.showModal();
});

goldClose.addEventListener("click", () => {
    goldModal.close();  
});