/**
 * Wczytuje 151 pierwszych pokemonów oraz dodaje je do listy
 */

const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("pokemons").innerHTML = data.results.map(
      (pokemon, idx) => 
      `
        <li class='pokemons' id='${idx+1}'>${pokemon.name}</li>
      `
    ).join('');
};

getData();

/**
 * Dodaje nasłuchiwanie na cały dokument, w razie kliknięcia na pokemona wrzuca szczegółowe informacje do sekcji data
 */

document.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.className === "pokemons") {
    Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.getAttribute('id')}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }), fetch(`https://pokeapi.co/api/v2/pokemon-species/${e.target.getAttribute('id')}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })]).then(async ([response, speciesResponse]) => {
        const responseJson = await response.json();
        const speciesResponseJson = await speciesResponse.json();
        document.getElementById("main__data").innerHTML = 
        `
        <header class="pokemons__header"> ${responseJson.name} </header>
        <img class="pokemons__image" src= ${responseJson.sprites.front_default} />
        <div class="pokemons__types"> ${responseJson.types.map(t =>
          t.type.name
        ).join(', ')} </div>
        <div class="pokemons__description">${speciesResponseJson.flavor_text_entries[0].flavor_text}</div>`;
      })
  }
}) 
