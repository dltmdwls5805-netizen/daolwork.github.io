const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

$("#year").textContent = new Date().getFullYear();

const gnb = $("#gnb");
$("#hamburger")?.addEventListener("click", () => {
  gnb?.classList.toggle("is-open");
});

// 게시판 탭
$$('.tab').forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    $$('.tab').forEach((el) => el.classList.remove('is-active'));
    tabBtn.classList.add('is-active');

    const key = tabBtn.dataset.board;
    $$('.boardPanel').forEach((p) => p.classList.remove('is-active'));
    $(`#board-${key}`)?.classList.add('is-active');
  });
});

const BOARD_KEYS = ['air', 'cleaning', 'aircon'];

function storageKey(board) {
  return `daol-board-${board}`;
}

function loadPosts(board) {
  const raw = localStorage.getItem(storageKey(board));
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function savePosts(board, posts) {
  localStorage.setItem(storageKey(board), JSON.stringify(posts));
}

function renderBoard(board) {
  const list = document.querySelector(`[data-list="${board}"]`);
  if (!list) return;

  const posts = loadPosts(board);
  if (!posts.length) {
    list.innerHTML = '<div class="postCard"><p>등록된 시공사례가 없습니다. 첫 글을 등록해보세요.</p></div>';
    return;
  }

  list.innerHTML = posts
    .map((post) => {
      const imageHtml = post.image ? `<img src="${post.image}" alt="${post.title}" />` : '';
      return `
        <article class="postCard">
          <h4>${post.title}</h4>
          <p>${post.content}</p>
          ${imageHtml}
          <div class="postMeta">${post.createdAt}</div>
        </article>
      `;
    })
    .join('');
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

$$('.postForm').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const board = form.dataset.board;
    if (!board) return;

    const fd = new FormData(form);
    const title = (fd.get('title') || '').toString().trim();
    const content = (fd.get('content') || '').toString().trim();
    const imageFile = fd.get('image');

    if (!title || !content) return;

    const image = imageFile instanceof File && imageFile.size > 0
      ? await readFileAsDataURL(imageFile)
      : '';

    const newPost = {
      title,
      content,
      image,
      createdAt: new Date().toLocaleString('ko-KR'),
    };

    const posts = loadPosts(board);
    posts.unshift(newPost);
    savePosts(board, posts.slice(0, 30));

    form.reset();
    renderBoard(board);
  });
});

BOARD_KEYS.forEach(renderBoard);
