const h = window.hyperapp.h;
const app = window.hyperapp.app;

const state = {
    fuzzyLoadImg: {
        isSmallImgLoaded: false,
        isFullImgLoaded: false,
    }
};

const actions = {
    fuzzyLoadImg: {
        handleSmallImgLoad: () => (state) => ({ isSmallImgLoaded: true }),
        handleFullImgLoad: () => (state) => ({ isFullImgLoaded: true }),
    }
};

const view = (state, actions) => (
    FuzzyLoadImg({ 
        smallImgUrl: "unsplash-small.jpg",
        fullImgUrl: "unsplash.jpg",
    })
);

const FuzzyLoadImg = ({smallImgUrl, fullImgUrl}) => (state, actions) => {
    const setLoadingCallbacks = function() {
        let smallImg = new Image();
        smallImg.src = smallImgUrl;
        smallImg.onload = actions.fuzzyLoadImg.handleSmallImgLoad;

        let fullImg = new Image();
        fullImg.src = fullImgUrl;
        fullImg.onload = actions.fuzzyLoadImg.handleFullImgLoad;
    }

    let smallLoadClass = state.fuzzyLoadImg.isSmallImgLoaded ? "loaded" : "";
    let fullLoadClass = state.fuzzyLoadImg.isFullImgLoaded ? "loaded" : "";

    return (
        h("div", { id: "fuzzy-load-img-container", oncreate: setLoadingCallbacks}, [
            h("img", { class: `fuzzy-load-img small ${smallLoadClass}`, src: smallImgUrl }),
            h("img", { class: `fuzzy-load-img ${fullLoadClass}`, src: fullImgUrl })
        ])
    );
};

app(state, actions, view, document.body);