let capitulos = [];
let autores = [
  { id: 1, nome: "Autor 1", progresso: 0, status: "Não iniciado", textos: [] },
  { id: 2, nome: "Autor 2", progresso: 0, status: "Não iniciado", textos: [] },
];

const formCadastro = document.getElementById('formCadastro');
const capitulosContainer = document.getElementById('capitulosContainer');
const autorSelect = document.getElementById('autorSelect');
const textoSelect = document.getElementById('textoSelect');
const listaResponsabilidade = document.getElementById('listaResponsabilidade');

// Função para adicionar um novo capítulo
document.getElementById('adicionarCapitulo').addEventListener('click', () => {
  const capitulo = {
    id: Date.now(),
    titulo: `Capítulo ${capitulos.length + 1}`,
    conteudo: '',
  };
  capitulos.push(capitulo);
  renderizarCapitulos();
  atualizarSeletoresTextos();
});

// Função para renderizar capítulos
function renderizarCapitulos() {
  capitulosContainer.innerHTML = '';
  capitulos.forEach((capitulo, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${capitulo.titulo}</strong>
      <textarea placeholder="Conteúdo do capítulo" id="conteudo-${capitulo.id}">${capitulo.conteudo}</textarea>
      <button class="remove" onclick="removerCapitulo(${index})">Remover Capítulo</button>
    `;
    capitulosContainer.appendChild(div);

    const textoCapitulo = document.getElementById(`conteudo-${capitulo.id}`);
    textoCapitulo.addEventListener('input', (e) => {
      capitulo.conteudo = e.target.value;
    });
  });
}

// Função para remover capítulo
function removerCapitulo(index) {
  capitulos.splice(index, 1);
  renderizarCapitulos();
  atualizarSeletoresTextos();
}

// Função para atualizar os seletores de texto
function atualizarSeletoresTextos() {
  textoSelect.innerHTML = '';
  capitulos.forEach((capitulo) => {
    const option = document.createElement('option');
    option.value = capitulo.id;
    option.textContent = capitulo.titulo;
    textoSelect.appendChild(option);
  });
}

// Função para atribuir autor a um capítulo
document.getElementById('atribuirAutor').addEventListener('click', () => {
  const autorId = parseInt(autorSelect.value);
  const textoId = parseInt(textoSelect.value);
  const autor = autores.find(a => a.id === autorId);
  const capitulo = capitulos.find(c => c.id === textoId);

  if (autor && capitulo) {
    if (autor.textos.includes(capitulo.id)) {
      alert("Este autor já está atribuído a este capítulo.");
      return;
    }

    autor.textos.push(capitulo.id);
    atualizarResponsabilidade();
  }
});

// Função para renderizar a lista de responsabilidades
function atualizarResponsabilidade() {
  listaResponsabilidade.innerHTML = '';
  autores.forEach((autor) => {
    autor.textos.forEach((textoId) => {
      const capitulo = capitulos.find(c => c.id === textoId);
      const li = document.createElement('li');
      li.innerHTML = `${autor.nome} é responsável pelo ${capitulo.titulo}`;
      listaResponsabilidade.appendChild(li);
    });
  });
}

// Função para inicializar o sistema com autores e capítulos
function inicializarSistema() {
  autores.forEach(autor => {
    const option = document.createElement('option');
    option.value = autor.id;
    option.textContent = autor.nome;
    autorSelect.appendChild(option);
  });

  renderizarCapitulos();
  atualizarResponsabilidade();
  atualizarSeletoresTextos();
}

inicializarSistema();
