(function() {
    'use strict';

    /* 이름 */

    document.getElementById('username').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('username').focus()
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });

    /* 이메일 */
    document.getElementById('email').addEventListener('blur', function(event) {
        const value = this.value,
        elParent = this.parentElement,
        parentClassList = elParent.classList;

        if(value) {
            if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('email').focus()
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
        /*
            (실습문제 1) 이메일 유효성검사 작성
              - 이메일 유효성검사 정규식 : /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                * 다른 이메일 정규식을 검색해서 사용해도 됨
                * 다른 유효성검사 항목 참고하여 작성 (이름, 비밀번호 등)

        */
    

    /* 비밀번호 */
    document.getElementById('pwd').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
                document.getElementById('pwd').focus()
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
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
                document.getElementById('pwdConfirm').focus()
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
    
    /** Validation Check End **/

    
    // 회원가입 submit
      /* 
             (실습문제 2) form 전송 시 각 항목 입력값 확인
              # 이름, 이메일, 비밀번호, 개인정보수집동의 필수 입력 값
         */
 
    document.getElementById('form').addEventListener('submit', function(event) {
        const formElements = new Array(
            document.getElementById('username'), 
            document.getElementById('email'), 
            document.getElementById('pwd'), 
            document.getElementById('pwdConfirm'), 
            document.getElementById('privacy')
            );

        for(let element of formElements) {
            if(!element.value || (element.type === 'checkbox' && !element.checked)) {
                alert(`${document.querySelector(`label[for="${element.id}"]`).innerText}가(이) 입력되지 않았습니다.`);
                element.focus();
                event.preventDefault();
                return;
            }
        }

        for (let i = 0; i < localStorage.length; i++){
            if (JSON.parse(localStorage.getItem(localStorage.key(i))).username === formElements[0].value){
                alert("중복된 이름이 존재합니다.");
                event.preventDefault();
                return;
            }

            if (JSON.parse(localStorage.getItem(localStorage.key(i))).email === formElements[0].value){
                alert("중복된 이메일이 존재합니다.");
                event.preventDefault();
                return;
            }
        }


        const userdata = {
            'index': formElements[0].value+localStorage.length,
            'username': formElements[0].value,
            'email':formElements[1].value,
            'pwd':formElements[2].value,
            'user_addr':document.getElementById('userAddr').value,
            'gender':$('input[name="gender"]:checked').val(),
            'privacy':(document.getElementById('privacy').checked) ? "동의":"비동의",
            'marketing': (document.getElementById('marketing').checked) ? "동의":"비동의"
        };

        localStorage.setItem(userdata.index, JSON.stringify(userdata));
        alert(localStorage.length.toString()+"번째 회원입니다.")
        //로컬스토리지 저장완료
    })

    document.getElementById('delete').addEventListener('click', function(event){
        if (document.getElementById('check_all').checked){
            localStorage.clear()
            alert("모든 계정이 삭제되었습니다.");
            location.reload();
            return;
        }

        let checkCount = 0;
        document.querySelectorAll(".check").forEach(function(v) {
            if(v.checked){
                localStorage.removeItem(v.value);
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



function allCheck(e) { // 전체 체크 버튼 클릭시 전체 체크 및 해제
	if(e.target.checked) {
		document.querySelectorAll(".check").forEach(function(v) {
			v.checked = true;
		});
	} else {
		document.querySelectorAll(".check").forEach(function(v) {
			v.checked = false;
		});
	}
}


function checkAllList() { // 체크 버튼 클릭시 전체 체크 버튼 체크 및 해제
    let flag = true;
	document.querySelectorAll(".check").forEach(function(v) {
		if(!v.checked){
			document.getElementById("check_all").checked = false;
            flag = false;
            return;
		}
    })
    if (flag) document.getElementById("check_all").checked = true;
}