let dropdowns = document.getElementsByClassName("dropdown");
let a = document.getElementsByTagName("a");

for(let i=0;i<a.length;i++) {
    a[i].onclick = (e) => e.preventDefault(); 
}

for(let i=0;i<dropdowns.length;i++) {
    let toggleButton = dropdowns[i].getElementsByClassName("toggle-btn")[0];
    toggleButton.onclick = ((dropdown) => {
        return () => {dropdown.classList.toggle("show")}
    })(dropdowns[i].getElementsByClassName("dropdown-menu")[0]);
}