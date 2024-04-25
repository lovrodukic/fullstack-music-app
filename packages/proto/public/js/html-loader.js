const parser = new DOMParser();

export function loadHTML(url, container) {
  fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        throw `Status: ${res.status}`;
      }
      return res.text();
    })
    .then((htmlString) => addFragment(htmlString, container))
    .catch((err) =>
      addFragment(
        `<p class="error"> Failed to fetch ${url}: ${err} </p>`,
        container
      )
    );
}

export function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}
