window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  const favoritas = JSON.parse(sessionStorage.getItem("favorites"))
  console.log(favoritas);

  try {
    
    const response =  await fetch('http://localhost:3031/api/movies')
    const result = await response.json()

    let data = result.data;

    data.forEach((movie) => {

      if (favoritas.includes(movie.id)) {
        
     
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
      }
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};
