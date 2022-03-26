
const button = document.querySelector('.btn-reload')
button.addEventListener('click', () => {

  setTimeout(() => {
    window.location.reload()

  }, 1000)

  console.log('....Reloaded')


})









