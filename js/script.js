document.addEventListener('DOMContentLoaded', () => {
  input.focus(); // Define o foco no input ao carregar a página
});

const backgroundSong = document.getElementById('background-song');
backgroundSong.volume = 0.2;

const playAudio = () => {
  if (backgroundSong.paused) {
    backgroundSong.play()
      .then(() => {
        eventos.forEach(ev => document.body.removeEventListener(ev, playAudio));
      })
  }
};

const eventos = ['click', 'keydown', 'touchstart'];

eventos.forEach(ev => {
  document.body.addEventListener(ev, playAudio);
});

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemon_imageGif = document.querySelector('.pokemon_imagegif');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonWeight = document.querySelector('.pokemon_weight');
const pokemonHeight = document.querySelector('.pokemon_height');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-previous');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let currentAudio = null;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemon_imageGif.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    // Definindo as imagens de acordo com o ID do Pokémon
    if (data.id <= 649) {
      pokemon_imageGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      pokemon_imageGif.classList.remove('pokemon_image'); // Garante que a classe antiga é removida
    } else {
      pokemon_imageGif.src = data['sprites']['front_default'];
      pokemon_imageGif.classList.add('pokemon_image'); // Adiciona a classe apenas para imagens grandes
    }

    pokemonType.innerHTML = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokemonWeight.innerHTML = data.weight / 10 + ' kg'; // Convertendo para kg
    pokemonHeight.innerHTML = data.height / 10 + ' m'; // Convertendo para metros
    input.value = '';
    searchPokemon = data.id;

    // Definir e tocar o áudio baseado na URL retornada pela API
    if (data['cries'] && data['cries']['latest']) {
      // Se houver um áudio atual, pausá-lo
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      currentAudio = new Audio(data['cries']['latest']);
      currentAudio.volume = 0.4; // Definir o volume do áudio para 40%

    } else {
      console.log('No audio found for this Pokémon');
    }

  } else {
    pokemon_imageGif.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonWeight.innerHTML = '';
    pokemonHeight.innerHTML = '';
  }
}

pokemon_imageGif.addEventListener('click', () => {
  if (currentAudio) {
    currentAudio.play();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Adicionando a funcionalidade para as teclas de seta
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  } else if (event.key === 'ArrowRight') {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

// Renderizar o Pokémon inicial
renderPokemon(searchPokemon);
