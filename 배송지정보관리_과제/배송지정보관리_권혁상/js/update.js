(function() {
    'use strict';

    let IDX = 0;
    let users = [];
    for (let i = 0; i < localStorage.length; i++){
        users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    drawUserOne();

    function drawUserOne() {
        users.forEach(function(u){
            if (u.update){
                IDX = u.index;
                document.getElementById('shipaddr').value = u.ship_addr; //배송지명
                document.getElementById('username').value = u.user_name; //받으시는 분
                document.getElementById('uphonefirst').value = u.user_phone_first; //휴대폰번호1
                document.getElementById('uphonemid').value = u.user_phone_mid;//휴대폰번호2
                document.getElementById('uphonelast').value = u.user_phone_last; //휴대폰번호3
                document.getElementById('postcode').value = u.postcode; //우편번호
                document.getElementById('road').value = u.road; //도로명주소
                document.getElementById('detail').value = u.detail; //상세주소
                document.getElementById('extra').value = u.extra; //특이사항
                if (u.privacyYn == "동의"){ document.getElementById('privacyYn').checked = true; }
                if (u.defaultYn == "동의"){ document.getElementById('defaultYn').checked = true; }
            }
        })
    }

    document.getElementById('updateform').addEventListener('submit', function(event) {
        const formElements = [
            document.getElementById('shipaddr'), //배송지명
            document.getElementById('username'), //받으시는 분
            document.getElementById('uphonefirst'), //휴대폰번호1
            document.getElementById('uphonemid'), //휴대폰번호2
            document.getElementById('uphonelast'), //휴대폰번호3
            document.getElementById('postcode'), //주소
            document.getElementById('privacyYn') //배송정보수집
        ];
    
        const tempNum = [];
        for(let i=0; i<formElements.length; i++) {
            if (i===2 || i===3 || i===4){ 
                if (!formElements[i].value){
                    alert("휴대폰번호가 입력되지 않았습니다.");
                    event.preventDefault();
                    formElements[i].focus();
                    return;
                } else {
                    tempNum.push(formElements[i].value);  //tempNUm에 휴대폰 값을 넣음.
                    continue; 
                }
            }

            if(!formElements[i].value || (formElements[i].type === 'checkbox' && !formElements[i].checked) ) {
                alert(`${document.querySelector(`label[for="${formElements[i].id}"]`).innerText}가(이) 입력되지 않았습니다.`);
                event.preventDefault();
                formElements[i].focus();
                return;
            }
        }


        let flag = true;
        // 위에서 생성한 users 에 tempNum을 비교하면서 동일한 휴대폰번호가 있는지 확인
        users.forEach(function(u){
            if (u.user_phone_first==tempNum[0] && u.user_phone_mid==tempNum[1] && u.user_phone_last == tempNum[2] && u.index != IDX){
                alert("중복된 휴대폰번호가 존재합니다!");
                event.preventDefault();
                flag = false;
            }
        })


        if(flag){
            const data = Object.fromEntries(new FormData(this).entries());

            data.defaultYn = (document.getElementById('defaultYn').checked) ? "동의":"비동의";
            data.privacyYn = (document.getElementById('privacyYn').checked) ? "동의":"비동의";
            data.update = false;
            data.index = IDX;
            localStorage.setItem("user"+data.index, JSON.stringify(data));
        }

        else{
            location.reload();
        }
            
    });
})()



