var hymns = [];

$('table#playlist>tbody>tr').map((index, elem) => {
  const title = $(elem)
    .find('a.playlist-notrigger')
    .first()
    .text();

  const contentUrl = $(elem)
    .find('a.playlist-notrigger')
    .attr('href');

  const number = parseInt(
    $(elem)
      .find(':nth-child(4)')
      .first()
      .text(),
    10
  );

  let url = $(elem)
    .find('a')
    .filter((i, elem) => elem.innerHTML.indexOf('>Music') > 0)
    .attr('href');

  if (url) {
    // Remove ?download=true
    url = url.split('?').shift();
  }

  hymns.push({
    title,
    number,
    url,
    contentUrl,
  });
});

console.log(JSON.stringify(hymns, null, 4));
console.log('hymns.length:', hymns.length);
