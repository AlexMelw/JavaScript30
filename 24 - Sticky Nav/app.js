const navNode = document.querySelector(`#main`);

const appState = {
    navNodeInitialOffsetTop: navNode.offsetTop
};

function fixNavigationBar(e) {
    
    
    if (window.scrollY >= appState.navNodeInitialOffsetTop) {
        
        navNode.classList.add(`fixed-nav`)
        // document.body.style.paddingTop = `${navNode.offsetHeight}px`
    } else {
        navNode.classList.remove(`fixed-nav`)
        // document.body.style.paddingTop = `0px`
    }

}

window.addEventListener('scroll', fixNavigationBar)