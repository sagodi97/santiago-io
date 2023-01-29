export function typeText(text: string, el: HTMLElement) {
  let a = "";
  let i = 0;

  setInterval(() => {
    if (i < text.length) {
      a += text[i];
      el.childNodes[0].textContent = a;
    }
    i++;
    if (i >= text.length + 10) {
      a = "";
      i = 0;
    }
  }, 200);
}
