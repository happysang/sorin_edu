(function() {
    'use strict';

    drawUser();

    // 전체체크 요소가 체크된 경우 모든 check 요소를 체크한다.
    document.getElementById('cbx_chkAll').addEventListener('change', function() {
        const isChecked = this.checked;
        document.querySelectorAll('.check').forEach(function(element) {
            element.checked = isChecked;
        });
    });

    // check요소가 하나라도 해제되면 전체 체크요소 체크를 해제한다.
    document.addEventListener('change', function(event) {
        if(event.target.classList.contains('check')) {
            document.getElementById('cbx_chkAll').checked = document.querySelectorAll('.check:checked').length === document.querySelectorAll('.check').length;
        }
    });


    // 계정 삭제 로직
    document.getElementById('delete').addEventListener('click', function(){
        if (document.getElementById('cbx_chkAll').checked){
            localStorage.clear()
            alert("모든 계정이 삭제되었습니다.");
            location.reload();
            return; // return을 추가해서 하나의 계정만 남은 경우 alert 메시지가 2개 나오는 것을 방지한다.
        }

        let checkCount = 0;
        document.querySelectorAll(".check").forEach(function(v) {
            if(v.checked){
                localStorage.removeItem('user'+v.value);
                checkCount++;
            }
        });
        
        if (checkCount === 0){
            alert("삭제할 계정을 선택해주세요.")
        }
        else{
            alert(checkCount+"개의 계정이 삭제되었습니다.");
            location.reload();
        }
    })
})();




function drawUser() {

    // 유저의 update 부분 false로 초기화 
    //update.html로 갔다가 뒤로가기를 누른 경우 해당 계정의 update 값이 true로 유지되는 것을 막기 위함.
    let users = [];
    for (let i = 0; i < localStorage.length; i++){
        users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    users.forEach(function(u){
        if (u.update){
            const userdata = {
                'ship_addr': u.ship_addr,
                'user_name': u.user_name,
                'user_phone_first':u.user_phone_first,
                'user_phone_mid':u.user_phone_mid,
                'user_phone_last':u.user_phone_last,
                'postcode':u.postcode,
                'road':u.road,
                'detail':u.detail,
                'extra':u.extra,
                'defaultYn':u.defaultYn,
                'privacyYn':u.privacyYn,
                'update':false,
                'index':u.index
            };
            localStorage.setItem('user'+userdata.index, JSON.stringify(userdata));
        }
    })
    
    // update 수정이 완료된 전체유저를 페이지에 표시하기 위한 부분.
    for (let i = 0; i < localStorage.length; i++){
        appendUser(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
}

function appendUser(data) {
    document.querySelector('#table tbody').appendChild(stringToHTML(replaceTemplate(document.getElementById('user_template').innerHTML, data)));
}


function replaceTemplate(value, data) {
    for(let key in data) { value = value.replace(`{${key}}`, data[key]); }
    value = value.replace(/{([^}]*)}/g, '');
    return value;
}


function stringToHTML(value) {
    const table = document.createElement('table');
    table.innerHTML = value;
    return table.querySelector('tr');   
}


// 수정 버튼을 눌렀을 때 휴대폰 번호를 통해 해당하는 계정의 update 값을 true로 변경
$(document).ready(function(){
    $(".checkBtn").click(function(){
        const td = $(this).parent().parent().children();
        const pnum = td.eq(3).text();
        
        let users = [];
        for (let i = 0; i < localStorage.length; i++){
            users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        users.forEach(function(u){
            let temp = u.user_phone_first + " " + u.user_phone_mid + " " + u.user_phone_last;
            if (temp == pnum){
                const userdata = {
                    'ship_addr': u.ship_addr,
                    'user_name': u.user_name,
                    'user_phone_first':u.user_phone_first,
                    'user_phone_mid':u.user_phone_mid,
                    'user_phone_last':u.user_phone_last,
                    'postcode':u.postcode,
                    'road':u.road,
                    'detail':u.detail,
                    'extra':u.extra,
                    'defaultYn':u.defaultYn,
                    'privacyYn':u.privacyYn,
                    'update':true,
                    'index':u.index
                };
                localStorage.setItem('user'+userdata.index, JSON.stringify(userdata));
                location.href="./update.html";
                return false;
            }
        })
    })
});