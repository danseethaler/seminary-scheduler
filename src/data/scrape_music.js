var hymns = [];

$('table#playlist>tbody>tr').map((index, elem) => {
  const title = $(elem)
    .find('a.playlist-notrigger')
    .first()
    .text();

  const number = parseInt(
    $(elem)
      .find(':nth-child(4)')
      .first()
      .text(),
    10
  );

  const url = $(elem)
    .find('a')
    .filter((i, elem) => elem.innerHTML.indexOf('>Music') > 0)
    .attr('href');

  hymns.push({
    title,
    number,
    url,
  });
});

console.log(JSON.stringify(hymns, null, 4));
console.log('hymns.length:', hymns.length);
