document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // 로그인 성공, 토큰 저장
            localStorage.setItem('token', data.token);
            loadMemberContent();
        } else {
            alert('로그인 실패');
        }
    })
    .catch(error => {
        console.error('로그인 중 에러 발생:', error);
    });
});

function loadMemberContent() {
    var token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    fetch('https://your-backend-api.com/member-content', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('memberContent').style.display = 'block';
        document.getElementById('memberContent').innerHTML += data.content;
    })
    .catch(error => {
        console.error('멤버 컨텐츠 로드 중 에러 발생:', error);
    });
}
