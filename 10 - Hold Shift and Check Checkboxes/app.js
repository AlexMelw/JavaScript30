const checkboxesElems = document.querySelectorAll(`.inbox input[type="checkbox"]`);
const inboxElem = document.querySelector(`.inbox`);

let lastCheckedCheckboxesElems = [];

const handleClick = function (e) {
    console.log(e);

    let clickedCheckboxElem = null;

    if (e.target.matches(`input[type="checkbox"]`)) {

        e.stopPropagation();
        clickedCheckboxElem = e.target;
    }
    else if (e.target.matches(`div.item`)) {

        clickedCheckboxElem = e.target.querySelector(`input[type="checkbox"]`);
        clickedCheckboxElem.checked = !clickedCheckboxElem.checked;

    } else {
        clickedCheckboxElem = e.target.parentElement.querySelector(`input[type="checkbox"]`);
        clickedCheckboxElem.checked = !clickedCheckboxElem.checked;
    }

    console.log(lastCheckedCheckboxesElems);

    if (e.shiftKey && lastCheckedCheckboxesElems.length) {

        let inBetween = false;
        checkboxesElems.forEach(chkbox => {

            let isLastCheckboxWithinSelection = false;
            if (chkbox === clickedCheckboxElem || chkbox === lastCheckedCheckboxesElems.slice(-1).pop()) {
                inBetween = !inBetween;
                if (!inBetween) {
                    isLastCheckboxWithinSelection = true;
                }
            }

            if (inBetween) {
                chkbox.checked = true;
            }
            if (lastCheckedCheckboxesElems.indexOf(chkbox) < 0 &&
                (inBetween || isLastCheckboxWithinSelection)) {

                lastCheckedCheckboxesElems.splice(-1, 0, chkbox);
            }
        })

    } else if (!clickedCheckboxElem.checked) {

        lastCheckedCheckboxesElems = lastCheckedCheckboxesElems.filter(
            chkbox => chkbox !== clickedCheckboxElem
        );

    } else if (clickedCheckboxElem.checked) {

        lastCheckedCheckboxesElems.push(clickedCheckboxElem);
    }

    console.log(lastCheckedCheckboxesElems);
};

inboxElem.addEventListener('click', handleClick);
