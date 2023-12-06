const favoriteClick = (event) => {
  event.preventDefault()

  console.log(event.target);
  event.target.classList.toggle("fa-regular")
  event.target.classList.toggle("fa-solid")

  const favoritas = JSON.parse(sessionStorage.getItem("favorites"))
  
  if (favoritas.includes(id)) {
    sessionStorage.setItem('favorites', JSON.stringify(favoritas.filter(favorite => favorite !== id)))
  } else {
    favoritas.push(id)
    sessionStorage.setItem("favorites", JSON.stringify(favoritas))
  }
}

window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  try {
    
    const response =  await fetch('http://localhost:3031/api/movies')
    const result = await response.json()

    let data = result.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const link = document.createElement("a");
      link.classList.add('ver')
      link.textContent = "ver mas"
      link.setAttribute('href',`formulario.html?movie=${movie.id}`)

      const favoriteLink = document.createElement("a")
      favoriteLink.style.display = "flex"
      favoriteLink.style.justifyContent = "center"
      favoriteLink.innerHTML = '<a href="#" onclick("favoriteClick(event)")=><i class="fa-regular fa-heart"></i></a>'
      favoriteLink.setAttribute("href","a")
      favoriteLink.setAttribute("onclick", "favoriteClick(event)")

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(link);
      h1.appendChild(favoriteLink)
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};
