const htmlFiles = import.meta.glob(["./*.html", "!./index.html"]);

const linkList = document.querySelector("#list")!;

const audio = document.querySelector("#beep") as HTMLAudioElement;

function parseName(link: string) {
  return link.split("/")[1].split(".")[0].replace(/-/g, " ");
}

function addSelector(html: HTMLElement) {
  html.addEventListener("focusin", async () => {
    audio.pause();
    html.classList.add("pointing");
    await audio.play();
  });
  html.addEventListener("focusout", () => {
    audio.pause();
    html.classList.remove("pointing");
  });

  html.addEventListener("mouseenter", async () => {
    audio.pause();
    html.classList.add("pointing");
    await audio.play();
  });
  html.addEventListener("mouseout", () => {
    audio.pause();
    html.classList.remove("pointing");
  });
}

for (const htmlFile in htmlFiles) {
  if (htmlFiles.hasOwnProperty(htmlFile)) {
    const element = htmlFiles[htmlFile];

    const link = document.createElement("a");
    link.href = element.name;
    link.innerText = parseName(element.name);
    addSelector(link);

    const listElement = document.createElement("li");
    listElement.append(link);
    linkList.append(listElement);
  }
}
