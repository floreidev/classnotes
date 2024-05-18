const URL_WHITELIST = ["http://localhost:3000/signup", "http://localhost:3000/home", "http://localhost:3000/login", "http://localhost:3000/", "http://localhost:3000/on-boarding"]


document.addEventListener("DOMContentLoaded", () => {
    /**
     * 
     * @param {HTMLFormElement} form 
     */
    const handleDefault = (form) => {
        form.addEventListener("submit", (ev) => {
            ev.preventDefault();
            const formDat = new FormData(ev.target);
            var formBody = [];
            for (var property of formDat.keys()) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formDat.get(property));
                console.log(property, formDat.get(property))
                formBody.push(encodedKey + "=" + encodedValue);
            }
            fetch(form.action, { method: form.method, headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }, body: formBody.join("&") }).then((v) => v.json().then((resp) => {
                console.log(resp);
                if (resp.clientRedirect && URL_WHITELIST.indexOf(resp.clientRedirect) != -1) window.location.replace(resp.clientRedirect);
                else if (resp.clientMessage) document.getElementById("message").textContent = resp.clientMessage;
            }))
        })
    }
    document.querySelectorAll("form:not(.default)").forEach((v) => {
        handleDefault(v);
    })
})