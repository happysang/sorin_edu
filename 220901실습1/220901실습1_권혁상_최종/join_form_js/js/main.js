(function() {
    'use strict';


    /** Validation Check Start **/
    /* 이름 */
    document.getElementById('username').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('target_btn').disabled = true;
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
                document.getElementById('target_btn').disabled = false;
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });

    /* 이메일 */
    document.getElementById('email').addEventListener('blur', function(event) {
        /*
            (실습문제 1) 이메일 유효성검사 작성
              - 이메일 유효성검사 정규식 : /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                * 다른 이메일 정규식을 검색해서 사용해도 됨
                * 다른 유효성검사 항목 참고하여 작성 (이름, 비밀번호 등)

        */
        const value = this.value,
            elParent = this.parentElement,
            parentClassList = elParent.classList;
  
            let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
            if(value) {
                if(!regex.test(value)) {
                    parentClassList.add('error');
                    parentClassList.remove('success');
                    document.getElementById('target_btn').disabled = true;
                }else{
                    parentClassList.add('success');
                    parentClassList.remove('error');
                    document.getElementById('target_btn').disabled = false;
                }
            }else{
                parentClassList.remove('success', 'error');
            }
    });

    /* 비밀번호 */
    document.getElementById('pwd').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('target_btn').disabled = true;
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
                document.getElementById('target_btn').disabled = false;
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });

    /* 비밀번호확인 */
    document.getElementById('pwdConfirm').addEventListener('blur', function(event) {
        const value = this.value,
              pwdValue = document.getElementById('pwd').value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value !== pwdValue) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('target_btn').disabled = true;
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
                document.getElementById('target_btn').disabled = false;
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
    
    /** Validation Check End **/

    
    // 회원가입 submit
    document.getElementById('form').addEventListener('submit', function(event) {
        /* 
             (실습문제 2) form 전송 시 각 항목 입력값 확인
              # 이름, 이메일, 비밀번호, 개인정보수집동의 필수 입력 값
         */

        if (form.username.value==""){
            form.username.focus();
            alert("이름을 입력해주세요.");
            event.preventDefault();
        }

        else if (form.email.value==""){
            form.username.focus();
            alert("이메일을 입력해주세요.");
            event.preventDefault();
        }

        else if (form.pwd.value==""){
            form.pwd.focus();
            alert("비밀번호를 입력해주세요.");
            event.preventDefault();
        }

        else if (form.pwdConfirm.value==""){
            form.pwdConfirm.focus();
            alert("비밀번호 확인을 입력해주세요.");
            event.preventDefault();
        }
        else if (!document.getElementById('privacy').checked){
            form.privacy.focus();
            alert("개인정보 수집 및 이용동의는 필수 입니다.");
            event.preventDefault();
        }
        else {
            alert("회원가입 완료");
        }
     });
})();
