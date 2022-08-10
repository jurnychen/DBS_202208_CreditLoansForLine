// ==========================================================
// 1_選單
// 2_專案介紹 - 閱讀更多 
// 3_回到頂端列
// 4_Q&A收合
// 5_Action button & referral code
// ==========================================================




// ==========================================================
// 1_選單
// ==========================================================
    const navbarheader = document.querySelector('.nav-header');
    const navbartoggler = document.querySelector('.navbar-toggler');

    navbartoggler.addEventListener('click',function(e){
        e.preventDefault();
        if (navbarheader.classList.contains('open')) {
            navbarheader.classList.remove('open');
        } else {
            navbarheader.classList.add('open');
        }
    }, false);

    const navitems = document.querySelectorAll('.nav-item');
    const navHeight = document.querySelector('nav').offsetHeight;

    navitems.forEach(item => item.addEventListener('click', function(e){
        navbartoggler.click();
        let sectiontarget = e.target.dataset.target;
        if (typeof(sectiontarget) !== 'undefined'){
            e.preventDefault();
            let hash = '.' + sectiontarget;
            let hashTop = document.querySelector(hash).offsetTop;
            window.scrollTo({
                top: hashTop - navHeight,
                behavior: 'smooth'
            });
            var uri = window.location.toString();
            if (uri.indexOf("#") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("#"));
                window.history.replaceState({}, document.title, clean_uri);
            }
        }
    }, false));



// ==========================================================
// 2_專案介紹 - 閱讀更多
// ==========================================================
    const readmore = document.querySelectorAll('.readmore');
    readmore.forEach(item => item.addEventListener('click', function(e){
        e.preventDefault();
        const hidetxtList = this.parentNode.parentNode.querySelectorAll('.hidetxt');
        hidetxtList.forEach(item => item.classList.remove('hidetxt'));
        item.classList.add('hidetxt');
    }, false));



// ==========================================================
// 3_回到頂端列
// ==========================================================
    const btntop = document.querySelector('.btn-top');

    btntop.addEventListener('click', function(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, false);

    // scrollFunction();
    // window.onscroll = function() { scrollFunction(); };

    function scrollFunction() {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            btntop.style.display = 'block';
        } else {
            btntop.style.display = 'none';
        }
    }



// ==========================================================
// 4_Q&A收合
// ==========================================================
    const qaboxtitlebuttons = document.querySelectorAll('.qa-box-title');
    qaboxtitlebuttons.forEach(item => item.addEventListener('click', function(e){
        e.preventDefault();
        if (this.classList.contains('open')){
            this.classList.remove('open');
        } else {
            const qaboxtitleOpen = document.querySelectorAll('.qa-box-title.open');
            qaboxtitleOpen.forEach(item => item.classList.remove('open'));
            this.classList.add('open');
            window.scrollTo({
                top: getPosition(this).y - navHeight,
                behavior: 'smooth'
            });
        }
    }, false));

    const qaitembuttons = document.querySelectorAll('.qa-item .qa-title-image');
    qaitembuttons.forEach(item => item.addEventListener('click', function(e){
        e.preventDefault();
        const qaitemSelected = e.target.parentNode.parentNode.parentNode;
        if (qaitemSelected.classList.contains('open')){
            qaitemSelected.classList.remove('open');    
        } else {
            // const qaitemOpen = document.querySelectorAll('.qa-item.open');
            // qaitemOpen.forEach(item => item.classList.remove('open'));
            qaitemSelected.classList.add('open');
            // window.scrollTo({
            //     top: getPosition(e.target).y - navHeight,
            //     behavior: 'smooth'
            // });
        }
    }, false));



// ==========================================================
// 5_Action button & referral code
// ==========================================================
    // 導向到連結時會附加到導向網站URL的資料（Query String）
    // 如：設定為whiteList=['anchor', 'referralCode']，並在打開的HTML網址後加入?referralCode=xxx&anchor=xxx
    // 就會在導引到給定連結https://internet-banking.dbs.com.tw/dao?prodOption=3&step=0&referralCode=xxx&anchor=xxx
    // 除了anchor和referralCode的其他資料就不會帶入
    let whiteList = ['referralCode','cid'];

    document.querySelectorAll('a[data-bind-q-str]').forEach(elem => elem.addEventListener('click', function(e){
        e.preventDefault();
        redirectToInternetBank(this);
    }, false));

    function redirectToInternetBank(e) {
        let url = e.getAttribute('href');
        location.search.trim().replace(/^[?#&]/, '').split('&').forEach(function(str) {
            let entry = str.split('=');
            if (whiteList.indexOf(entry[0]) > -1) {
                let sep = url.indexOf('?') > -1 ? '&' : '?';
                url += (sep + entry[0] + '=' + entry[1]);
            }
        });
        location.assign(url);
    }

    function getPosition(el) {
        var xPosition = 0;
        var yPosition = 0;
       
        while (el) {
          if (el.tagName == 'body') {
            // deal with browser quirks with body/window/document and page scroll
            var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
            var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
       
            xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
            yPosition += (el.offsetTop - yScrollPos + el.clientTop);
          } else {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
          }
       
          el = el.offsetParent;
        }
        return {
          x: xPosition,
          y: yPosition
        };
      }



