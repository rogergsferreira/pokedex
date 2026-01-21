# 📱 PokéDex Interativa

![GitHub repo size](https://img.shields.io/github/repo-size/rogergsferreira/pokedex)
![GitHub language count](https://img.shields.io/github/languages/count/rogergsferreira/pokedex)
![GitHub last commit](https://img.shields.io/github/last-commit/rogergsferreira/pokedex)

Uma PokéDex moderna, responsiva e imersiva que consome dados da **PokeAPI**. O projeto apresenta uma interface visualmente rica com transições suaves, filtragem dinâmica e trilha sonora clássica.

🔗 **[Acesse o projeto ao vivo aqui](https://rogergsferreira.github.io/pokedex/)**

---

## 🚀 Funcionalidades

* **Listagem via PokeAPI:** Carregamento dinâmico dos dados oficiais dos Pokémons.
* **Busca Inteligente:** Sistema de filtro por nome que atualiza a interface em tempo real.
* **Experiência Sonora:** Trilha sonora integrada que respeita as políticas de autoplay, ativando-se após a primeira interação do usuário.
* **Design Responsivo:** Totalmente adaptado para desktop, tablets e smartphones.

---

## 🛠️ Tecnologias e Ferramentas

As seguintes tecnologias foram utilizadas no desenvolvimento deste projeto:

* **HTML5** - Estrutura e semântica.
* **CSS3** - Estilização, animações e layout (Flexbox/Grid).
* **JavaScript (ES6+)** - Consumo de API (Fetch), manipulação de eventos e lógica de áudio.
* **PokeAPI** - API REST pública para dados de Pokémon.

---

## 🎵 Solução para o Gerenciamento de Áudio

Um diferencial técnico deste projeto é o gerenciamento da trilha sonora. Para contornar as restrições de **Autoplay** dos navegadores modernos (que bloqueiam áudio automático), implementei uma lógica de *Event Listeners* múltiplos:

```javascript
// O áudio aguarda qualquer uma dessas interações para iniciar
const eventos = ['click', 'keydown', 'touchstart'];
eventos.forEach(ev => {
  document.body.addEventListener(ev, playAudio, { once: true });
});
