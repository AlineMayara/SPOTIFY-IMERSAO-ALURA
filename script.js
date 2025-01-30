const searchInput = document.getElementById('search-input')
const resultArtist = document.getElementById('result-artist')
const resultPlaylist = document.getElementById('result-playlists')

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`
  fetch(url)
    .then(response => response.json())
    .then(result => displayResults(result))
}

function displayResults(result) {
  resultPlaylist.classList.add('hidden')
  resultArtist.classList.remove('hidden')

  const searchContainer = document.getElementById('search-container')

  searchContainer.textContent = ''

  result.forEach(element => {
    const artistCard = document.createElement('div')

    artistCard.className = 'artist-card'

    artistCard.innerHTML = `
      <div class="card-img">
        <img class="artist-img" src="${element.urlImg}" />
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <a title="Foo Fighters" class="vst" href="">
          <span class="artist-name">${element.name}</span>
          <span class="artist-categorie">Artista</span>
        </a>
      </div>
    `

    searchContainer.appendChild(artistCard)
  })
}

document.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase()

  console.log({ searchTerm })

  if (searchTerm === '') {
    resultPlaylist.classList.remove('hidden')
    resultArtist.classList.add('hidden')
    return
  }

  requestApi(searchTerm)
})
