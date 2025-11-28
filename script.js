async function translateText(text, targetLang) {
    const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "auto",
            target: targetLang,
            format: "text"
        }),
        headers: {"Content-Type": "application/json"}
    });

    const data = await response.json();
    return data.translatedText;
}

window.onload = () => {
    const selector = document.getElementById("language");
    if (!selector) return;

    selector.addEventListener("change", async () => {
        const targetLanguage = selector.value;

        const title = document.querySelector("h1, h1#h11");
        if (title) {
            title.innerText = await translateText(title.innerText, targetLanguage);
        }

        const paragraphs = document.querySelectorAll("p");
        for (let p of paragraphs) {
            if (p.innerText.trim().length > 0) {
                p.innerText = await translateText(p.innerText, targetLanguage);
            }
        }

        const h3s = document.querySelectorAll(".Stories h3");
        for (let h3 of h3s) {
            h3.innerText = await translateText(h3.innerText, targetLanguage);
        }
    });
};
