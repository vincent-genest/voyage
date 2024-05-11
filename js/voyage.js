(function () {
    console.log("rest API");
    // URL de l'API REST de WordPress
    let bouton__categorie = document.querySelectorAll(".bouton__categorie");
    let url;
    for (const elm of bouton__categorie) {
        elm.addEventListener("mousedown", function (e) {
            categories = e.target.id;

            categories = categories.replace("cat_", "");
            url = `https://gftnth00.mywhc.ca/tim41/wp-json/wp/v2/posts?categories=${categories}`;
            console.log(url);
            fetchUrl(url);
        });
    }

    // Effectuer la requête HTTP en utilisant fetch()
    function fetchUrl(url) {
        fetch(url)
            .then(function (response) {
                // Vérifier si la réponse est OK (statut HTTP 200)
                if (!response.ok) {
                    throw new Error("La requête a échoué avec le statut " + response.status);
                }

                // Analyser la réponse JSON
                return response.json();
                console.log(response.json());
            })
            .then(function (data) {
                // La variable "data" contient la réponse JSON
                console.log(data);
                let restapi = document.querySelector(".contenu__restapi");
                restapi.innerHTML = "";
                // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                data.forEach(function (article) {
                    let titre = article.title.rendered;
                    let categories = article.categories;
                    //À partir du numéro de catgorie, on va chercher le nom de la catégorie et on n'en fait un lien

                    // console.log(categories);
                    if (article.meta && article.meta.ville_avoisinante) {
                        console.log("Ville : ", article.meta.ville_avoisinante);
                    } else {
                        // console.log(meta);
                    }
                    let contenu = article.content.rendered;
                    // Coupé contenu après 10 mots
                    let mots = contenu.split(" ");
                    contenu = mots.slice(0, 10).join(" ") + "...";
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__carte");
                    carte.classList.add("carte");

                    carte.innerHTML = `
                    <div class="carte">
                        <h4>${titre}</h4>
                        ${categories}
                        <p>${contenu}</p>
                    </div>
                    `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function (error) {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
})();
