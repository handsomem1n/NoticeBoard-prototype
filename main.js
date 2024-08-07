document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    setupToggleMenus();
});

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


function loadNotices() {
    // 여기에 공지사항 데이터를 로드하는 로직을 작성하면 됨
    const notices = [
        // 별도의 load해오는 함수를 구현하여 모두 불러옴
    ];
    const noticeTableBody = document.getElementById('noticeTable').querySelector('tbody');
    noticeTableBody.innerHTML = '';
    notices.forEach(notice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${notice.id}</td>
            <td>${notice.title}</td>
        `;
        row.onclick = () => loadNoticeDetails(notice.id);
        noticeTableBody.appendChild(row);
    });
}

function loadNoticeDetails(noticeId) {
    // 공지사항 세부사항을 로드하는 로직을 작성
    const details = {
        // 해당 공지사항의 내용 전체를 보여주는 기능
    };
    const detail = details[noticeId];
    const detailTableBody = document.getElementById('detailTable').querySelector('tbody');
    detailTableBody.innerHTML = `
        <tr>
            <td>${detail.id}</td>
            <td>${notice.title}</td>

        </tr>
    `;
}


// 이건 main.html에서만 해당함. 따라서 각각의 페이지 별로 맞는 query를 설정해줘야함
function search() {
    // const centerCode = document.getElementById('centerCode').value;
    // const clientCompanyName = document.getElementById('clientCompanyName').value;
    // const deletionStatus = document.getElementById('deletionStatus').value;
    // // 검색 로직 작성
    // console.log(`검색: 센터코드=${centerCode}, 고객사명=${clientCompanyName}, 삭제여부=${deletionStatus}`);
}



function reset() {
    // 초기화인데 페이지 별로 초기화해야할 인스턴스가 다르기 때문에 조정해야함
    // document.getElementById('centerCode').value = '';
    // document.getElementById('clientCompanyName').value = '';
    // document.getElementById('deletionStatus').value = '';
    loadNotices();
}
