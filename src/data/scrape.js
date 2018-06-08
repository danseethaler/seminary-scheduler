var lessons = []

$('.table-of-content>tbody>tr').map((index, elem) => {
  let title
  let lesson

  const text = $(elem)
    .find('a')
    .first()
    .text()

  if (
    !text ||
    text.indexOf('Home-Study') >= 0 ||
    text.indexOf('download') >= 0
  ) {
    return
  }

  const split = text.split(': ')

  if (split.length > 2) {
    lesson = parseInt(split[0].replace('Lesson ', ''))
    title = split.splice(1).join(': ')
  } else if (split.length === 2) {
    lesson = parseInt(split[0].replace('Lesson ', ''))
    title = split[1]
  }

  if (!lesson) {
    return
  }

  lessons.push({
    title,
    lesson,
    href: $(elem)
      .find('a')
      .first()
      .attr('href'),
  })
})

console.log(JSON.stringify(lessons, null, 4))
console.log('lessons.length:', lessons.length)
