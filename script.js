const siteNameInput = document.getElementById('siteName');
const siteUrlInput = document.getElementById('siteUrl');
const saveBtn = document.getElementById('saveBtn');
const bookmarksDiv = document.getElementById('bookmarks');

document.addEventListener('DOMContentLoaded', loadBookmarks);
saveBtn.addEventListener('click', saveBookmark);

function saveBookmark() {
    const name = siteNameInput.value.trim();
    let url = siteUrlInput.value.trim();
    
    if (!name || !url) return alert('Please enter both site name and URL');
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarks.push({ id: Date.now(), name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    siteNameInput.value = '';
    siteUrlInput.value = '';
    loadBookmarks();
    alert('Bookmark saved successfully!');
}

function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarksDiv.innerHTML = bookmarks.length === 0 ? 
        '<p style="color: #999; text-align: center;">No bookmarks saved yet</p>' : '';
    
    bookmarks.forEach(bookmark => {
        const div = document.createElement('div');
        div.className = 'bookmark';
        div.innerHTML = `
            <span>
                <strong>${escapeHtml(bookmark.name)}</strong><br>
                <small>${escapeHtml(bookmark.url)}</small>
            </span>
            <div>
                <button onclick="visitBookmark('${bookmark.url}')" style="background: #2196F3; margin-right: 5px;">Visit</button>
                <button onclick="deleteBookmark(${bookmark.id})" style="background: #f44336;">Delete</button>
            </div>
        `;
        bookmarksDiv.appendChild(div);
    });
}

function deleteBookmark(id) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const updated = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    loadBookmarks();
    alert('Bookmark deleted!');
}

function visitBookmark(url) {
    window.open(url, '_blank');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

siteNameInput.addEventListener('keypress', e => e.key === 'Enter' && saveBookmark());
siteUrlInput.addEventListener('keypress', e => e.key === 'Enter' && saveBookmark());