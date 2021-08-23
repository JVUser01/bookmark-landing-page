let tabContentContainer = document.querySelector(".tab_content_container");
let tabContentAreas = document.querySelectorAll(".tab_content_area");
let tabs = document.querySelectorAll(".tab");
let faqItemTitles = document.querySelectorAll(".faq_item_title");
let mobileMenuIconOpen = document.querySelector(".mobile_menu_icon_open");
let mobileMenuIconClose = document.querySelector(".mobile_menu_header img");

tabContentContainer.style.width = `${document.querySelector(".section_body").clientWidth * tabContentAreas.length}px`;
for(let i=0; i<tabContentAreas.length; i++) {
    tabContentAreas[i].style.width = `${document.querySelector(".section_body").clientWidth}px`;
}

tabContentAreas[0].style.opacity = "1";

tabs.forEach((item, index) => {
    item.addEventListener("click", () => {
        document.querySelector(".active_tab").classList.remove("active_tab");
        item.classList.add("active_tab");
        tabContentAreas.forEach((item) => {
            item.style.opacity = "0";
        });
        tabContentAreas[index].style.opacity = "1";

        tabContentContainer.style.marginLeft = `-${index * tabContentAreas[0].clientWidth}px`;
    });
});


faqItemTitles.forEach((item) => {
    item.addEventListener("click", () => {
        let faqItemContent = item.nextElementSibling;
        let arrowIcon = item.querySelector("svg");
        let arrowIconSVGPath = item.querySelector("path");
        if(faqItemContent.clientHeight == 0) {
            faqItemContent.style.height = "auto";
            let maxHeightContent = faqItemContent.clientHeight;
            faqItemContent.style.height = 0;

            setTimeout(() => {
                faqItemContent.style.height = maxHeightContent + "px";
            }, 10);
            faqItemContent.style.marginTop = "15px";
            faqItemContent.style.marginBottom = "20px";
            arrowIcon.style.transform = "rotate(-180deg)";
            arrowIconSVGPath.style.stroke = "#fa5757";
        } else {
            faqItemContent.style = "";
            arrowIcon.style = "";
            arrowIconSVGPath.style = "";
        }
    });
});


let validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;
        validator.clearError();

        let input = document.querySelector("form input");
        let checkResult = validator.checkInput(input);
        if(checkResult != true) {
            send = false;
            validator.showError(input, checkResult);
        }
        
        if(send) {
            form.submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute("data-rules");

        if(rules != null) {
            rules = rules.split("|");
            for(let i in rules) {
                let rulesDetails = rules[i].split("=");
                switch(rulesDetails[0]) {
                    case "required":
                        if(input.value == "") {
                            return "Required field";
                        }
                        break;

                    case "email":
                        if(input.value != ""){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return "Whoops, make sure it's an email";
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },

    showError: (input, checkResult) => {
        input.style.borderColor = "#fa5757";

        let errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = checkResult;

        input.parentElement.insertBefore(errorElement, input.elementSibling);

        let errorIcon = document.createElement("img");
        errorIcon.setAttribute("src", "assets/images/icon-error.svg");
        input.parentElement.insertBefore(errorIcon, input.elementSibling);
        errorIcon.style.position = "absolute";
        errorIcon.style.right = "15px";
        errorIcon.style.top = "12px";
        errorIcon.style.zIndex = 2;
        input.style.paddingRight = "45px";
    },

    clearError: () => {
        let input = form.querySelector("input");
        input.style = "";

        let errorElement = document.querySelector(".error");
        if(errorElement != null) {
            errorElement.remove();
        }

        let errorIcon = form.querySelector("img");
        if(errorIcon != null) {
            errorIcon.remove();
        }
    }
}

let form = document.querySelector("form");

form.addEventListener("submit", validator.handleSubmit);


mobileMenuIconOpen.addEventListener("click", () => {
    document.querySelector(".menu_container").style.width = "100vw";
});

mobileMenuIconClose.addEventListener("click", () => {
    document.querySelector(".menu_container").style.width = 0;
});