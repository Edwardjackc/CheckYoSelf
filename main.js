

function appendCard() {
`<article class="card__article--container">
  <header class="card__header"><h3 class="card__h3--title">Task Title</h3>
  </header>
  <section class="card__section--main">
    <p class="card__paragraph">Fam pug williamsburg PBR&B, ut shoreditch gluten-free
  ramps pariatur austin. Fugiat meggings yuccie ut, lumbersexual est
  VHS labore food truck actually.
        </p>
  </section>
  <footer class="card__footer">
    <input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
      src=${item.urgent === true ? 'images/urgent-active.svg' : 'images/urgent.svg'}>
      <input class="card__footer--images card__footer--delete" type="image" alt="Card delete button"
        src="images/delete.svg">
      </footer>
    </article>`
    }