(function() {
    'use strict';

    document.getElementById('shipaddr').addEventListener('blur', function() { checkSpcFun(this.value, this.parentElement.classList,'shipaddr'); });
    document.getElementById('username').addEventListener('blur', function() { checkSpcFun(this.value, this.parentElement.classList,'username'); });
    document.getElementById('detail').addEventListener('blur', function() { checkSpcFun(this.value, this.parentElement.classList,'detail'); });
    document.getElementById('extra').addEventListener('blur', function() { checkSpcFun(this.value, this.parentElement.classList,'extra'); });


    const checkSpc = /[<>]/;
    function checkSpcFun(value, parentClassList, target){
        if(value) {
            //입력된 값에 <,> 문자가 포함되었을 때 에러메시지와 함께 다음 항목으로 넘어가지 못하도록 focus 됨
            if(checkSpc.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById(target).focus();
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    }


    document.getElementById('uphonefirst').addEventListener('blur', function(event) {
        const value = this.value;
        // uphonefirst를 "없음"으로 설정했을 때 중간, 끝 전화번호를 입력하지 못하게 하고 "없음"이 아닐 시 중간, 끝 전화번호 입력을 활성화시킴
        if(value === "없음") {
            document.getElementById('uphonemid').value = "";
            document.getElementById('uphonelast').value = "";
            document.getElementById('uphonemid').readOnly = true;
            document.getElementById('uphonelast').readOnly = true;
        } else {
            document.getElementById('uphonemid').readOnly = false;
            document.getElementById('uphonelast').readOnly = false;
        }
    });
    
    
    document.getElementById('uphonemid').addEventListener('blur', function() { checkRegFun(this.value, this.parentElement.classList, 'uphonemid'); });
    document.getElementById('uphonelast').addEventListener('blur', function() { checkRegFun(this.value, this.parentElement.classList, 'uphonelast'); });
    
    
    // 숫자이외의 값을 입력했을 때 에러 메시지를 전달하고 값을 비우는 함수.
    const regexp = /^[0-9]*$/;
    function checkRegFun(value, parentClassList, target){
        if (value){
            if (regexp.test(value)) {  
                parentClassList.add('success');
                parentClassList.remove('error');  
            }else{
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById(target).value = "";
                document.getElementById(target).focus(); 
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    }

    // 휴대폰 번호의 중복성을 체크하기 위해 전체 유저를 불러옴.
    let users = [];
    for (let i = 0; i < localStorage.length; i++){
        users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }


    document.getElementById('form').addEventListener('submit', function(event) {
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
            if (u.user_phone_first==tempNum[0] && u.user_phone_mid==tempNum[1] && u.user_phone_last == tempNum[2]){
                alert("중복된 휴대폰번호가 존재합니다!");
                event.preventDefault();
                flag = false;
            }
        })


        //동일한 휴대폰 번호가 없는 경우
        if (flag){
            const data = Object.fromEntries(new FormData(this).entries());

            //인덱스 설정 - storage 안에 값이 하나도 없으면 0부터 시작.
            let tar = 0;
            if (localStorage.length){
                let users = [];
                for (let i = 0; i < localStorage.length; i++){
                    users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
                users.forEach(function(u){tar = (tar > Number(u.index)) ? tar:Number(u.index); })
            }
            data.defaultYn = (document.getElementById('defaultYn').checked) ? "동의":"비동의";
            data.privacyYn = (document.getElementById('privacyYn').checked) ? "동의":"비동의";
            data.update = false;
            data.index = tar+1;
            localStorage.setItem("user"+data.index, JSON.stringify(data));
        }

        //동일한 휴대폰 번호가 있는 경우 -> 값을 저장하지 않고 페이지 새로고침
        else{
            location.reload();
        }
    });
})();


function findAddr(){
    new daum.Postcode({
        oncomplete: function(data) {

            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("road").value = roadAddr;
            

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("detail").value = extraRoadAddr;
            } else {
                document.getElementById("detail").value = '';
            }
        }
    }).open();
}
