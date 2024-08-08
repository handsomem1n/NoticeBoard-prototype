document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    setupToggleMenus();
});

// '추가' 버튼 눌렀을 때
function openNoticeForm() {
    document.getElementById('noticeModal').style.display = 'block';
}

function closeNoticeForm() {
    document.getElementById('noticeModal').style.display = 'none';
}

// 사이드바 토글
function setupToggleMenus() {
    const toggleTitles = document.querySelectorAll('.toggle-title');
    toggleTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.querySelector('.toggle-content');
            const currentlyActive = document.querySelector('.toggle-title.active');
            if (currentlyActive && currentlyActive !== title) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.toggle-content').classList.remove('show');
            }
            title.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

document.getElementById('noticeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/api/notices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, content: content }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeNoticeForm();
        loadNotices();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function loadNotices() {
    fetch('/api/notices')
    .then(response => response.json())
    .then(data => {
        const noticeTableBody = document.getElementById('noticeTable').querySelector('tbody');
        noticeTableBody.innerHTML = '';
        data.forEach((notice, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${notice.title}</td>`;
            row.addEventListener('click', () => showNoticeDetails(notice));
            noticeTableBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showNoticeDetails(notice) {
    document.getElementById('detailTitle').innerText = notice.title;
    document.getElementById('detailContent').innerText = notice.content;
}

window.onclick = function(event) {
    const modal = document.getElementById('noticeModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function search() {
    const centerCode = document.getElementById('centerCode').value;
    const clientCompanyName = document.getElementById('clientCompanyName').value;
    const deletionStatus = document.getElementById('deletionStatus').value;
    console.log(`검색: 센터코드=${centerCode}, 고객사명=${clientCompanyName}, 공정=${deletionStatus}`);
}

function reset() {
    document.getElementById('centerCode').value = '';
    document.getElementById('clientCompanyName').value = '';
    document.getElementById('deletionStatus').value = '';
    loadNotices();
}
