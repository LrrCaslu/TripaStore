
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('itensCarrinho');
  const total = document.getElementById('total');
  const emptyMessage = document.getElementById('emptyMessage');

  lista.innerHTML = '';
  let soma = 0;

  if (carrinho.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
    carrinho.forEach((item, index) => {
      const li = document.createElement('li');

      const info = document.createElement('div');
      info.className = 'item-info';

      const nomeSpan = document.createElement('span');
      nomeSpan.className = 'nome';
      nomeSpan.textContent = item.nome;

      const precoSpan = document.createElement('span');
      precoSpan.className = 'preco';
      precoSpan.textContent = `R$ ${item.preco.toFixed(2)}`;

      info.appendChild(nomeSpan);
      info.appendChild(precoSpan);

      const btnRemover = document.createElement('button');
      btnRemover.textContent = 'Remover';
      btnRemover.onclick = () => removerDoCarrinho(index);

      li.appendChild(info);
      li.appendChild(btnRemover);
      lista.appendChild(li);

      soma += item.preco;
    });
  }

  total.textContent = soma.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const openCart = document.getElementById('openCart');
  const closeCart = document.getElementById('closeCart');
  const viewProducts = document.getElementById('viewProducts');
  const fecharModal = document.getElementById('fecharModal');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const navList = document.querySelector('nav ul');
      if (navList) navList.classList.toggle('show');
    });
  }

  if (openCart) {
    openCart.addEventListener('click', () => {
      const cartSidebar = document.getElementById('cartSidebar');
      if (cartSidebar) cartSidebar.classList.add('open');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      const cartSidebar = document.getElementById('cartSidebar');
      if (cartSidebar) cartSidebar.classList.remove('open');
    });
  }

  if (viewProducts) {
    viewProducts.addEventListener('click', () => {
      const cartSidebar = document.getElementById('cartSidebar');
      if (cartSidebar) cartSidebar.classList.remove('open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (fecharModal) {
    fecharModal.addEventListener('click', () => {
      const modal = document.getElementById('modalProduto');
      if (modal) modal.style.display = 'none';
    });
  }
});

function abrirModal(nome, preco, descricao, imagem) {
  document.getElementById('modalNome').textContent = nome;
  document.getElementById('modalPreco').textContent = preco.toFixed(2);
  document.getElementById('modalDescricao').textContent = descricao;
  document.getElementById('modalImagem').src = imagem;
  document.getElementById('modalProduto').style.display = 'block';

  document.getElementById('modalComprar').onclick = () => {
    adicionarAoCarrinho(nome, preco);
    document.getElementById('modalProduto').style.display = 'none';
  };
}
