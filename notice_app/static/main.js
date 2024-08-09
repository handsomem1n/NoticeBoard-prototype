document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('noticeTable')) {
        loadNotices();
    }
    if (document.getElementById('classification')) {
        setDateFilter('today'); // 기본값을 오늘로
    }
    setupToggleMenus();
});

/* 사이드바 시간 설정*/
function updateTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const koreaTime = now.toLocaleString('ko-KR', options);
    document.getElementById('currentTime').textContent = koreaTime;
}

setInterval(updateTime, 1000); // 1초마다 시간 표시
updateTime(); //
/* 사이드바 시간 설정*/

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


// 반출.html

// 반출.html 기능 추가
function setDateFilter(period) {
    const today = new Date();
    let startDate, endDate;
    
    switch (period) {
        case 'today':
            startDate = today;
            endDate = today;
            break;
        case '1week':
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            endDate = today;
            break;
        case '1month':
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            endDate = today;
            break;
        case '3months':
            startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
            endDate = today;
            break;
        case '6months':
            startDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
            endDate = today;
            break;
        case '1year':
            startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            endDate = today;
            break;
        default:
            startDate = today;
            endDate = today;
    }

    document.getElementById('startDate').valueAsDate = startDate;
    document.getElementById('endDate').valueAsDate = endDate;
}

function searchByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    console.log(`기간 검색: 시작일=${startDate}, 종료일=${endDate}`);
    // 날짜 필터 검색 로직을 여기에 추가
}