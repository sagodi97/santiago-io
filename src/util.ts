export function typeText(text: string, el: HTMLElement, speed = 200) {
  el.childNodes[0].textContent = "";
  let i = 0;

  (function type() {
    console.log("siema");
    if (i < text.length) {
      el.childNodes[0].textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  })();
}
