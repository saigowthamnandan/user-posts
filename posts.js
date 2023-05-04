// var id = Number(localStorage.getItem('userid'))+1;
var urlparams = new URLSearchParams(window.location.search);
var id = urlparams.get('id')+1;
const main = document.createElement('div');
main.setAttribute('id', 'main');
document.body.prepend(main);
const selall = document.createElement('h2');
selall.setAttribute('class',`fa-solid fa-check-double fa-xl selall`);
document.body.querySelector('#main').append(selall);
const mdel = document.createElement('h2');
mdel.setAttribute('class',`fa-solid fa-trash-can fa-xl mdel`);
document.body.querySelector('#main').append(mdel); 
mdel.style.display='none';
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((resp) => {
    return resp.json();
    }).then((data) => {
        myfun(data);
        myfun1(data);
    })
const formcon = document.createElement('div');
formcon.setAttribute('class', 'formcon');
document.body.prepend(formcon);
const eform = document.createElement('form');
eform.setAttribute('class','eform');
formcon.append(eform);
const etit = document.createElement('div');
etit.setAttribute('class', 'etit');
eform.append(etit);
const tinput = document.createElement('input');
tinput.setAttribute('type','text');
tinput.setAttribute('name','text');
tinput.setAttribute('id','tinput');
document.querySelector('.eform').append(tinput);
const ebody = document.createElement('div');
ebody.setAttribute('class', 'ebody');
eform.append(ebody);
const binput = document.createElement('input');
binput.setAttribute('type','text');
binput.setAttribute('name','text');
binput.setAttribute('id','binput');
eform.append(binput);
const savech = document.createElement('input');
savech.setAttribute('type','submit');
savech.setAttribute('value','Save Changes');
savech.setAttribute('class', 'btn');
eform.append(savech);
const cancel = document.createElement('input');
cancel.setAttribute('type','button');
cancel.setAttribute('name','cancel');
cancel.setAttribute('value','Cancel');
cancel.setAttribute('class', 'btn');
eform.append(cancel);
function myfun(data){
    for(i=0;i<data.length;i++){
        const post = document.createElement('label');
        post.setAttribute('class', `post post${[i]} cb`);
        main.append(post);
        const  checkbox = document.createElement('input');
        checkbox.setAttribute('class',`checkbox cbox${i}`);
        checkbox.setAttribute('type', 'checkbox');
        document.querySelector(`.post${[i]}`).append(checkbox);
        const  cm = document.createElement('span');
        cm.setAttribute('class',`checkmark`);
        document.querySelector(`.post${[i]}`).append(cm);
        const header = document.createElement('div');
        header.setAttribute('class',`h header${i}`);
        document.querySelector(`.post${[i]}`).append(header);
        const title = document.createElement('div');
        title.setAttribute('class',`title title${i}`);
        title.setAttribute('spellcheck','false');
        document.querySelector(`.header${[i]}`).append(title);
        title.innerHTML = `<b>${data[i].title}</b>`;
        const tedit = document.createElement('div');
        tedit.setAttribute('class',`fa-regular fa-pen-to-square tedit tedit${i}`);
        document.querySelector(`.header${[i]}`).append(tedit);
        const del = document.createElement('div');
        del.setAttribute('class',`fa-solid fa-trash-can del del${i}`);
        document.querySelector(`.header${[i]}`).append(del);
        const mid = document.createElement('div');
        mid.setAttribute('class',`m mid${i}`);
        document.querySelector(`.post${[i]}`).append(mid);
        const body = document.createElement('div');
        body.setAttribute('spellcheck','false');
        body.setAttribute('class',`body body${i}`);
        document.querySelector(`.mid${[i]}`).append(body);
        body.textContent = `${data[i].body}`;
    }
    var dlist = document.body.getElementsByClassName('del');
    var elist = document.body.getElementsByClassName('tedit');
    var tlist = document.body.getElementsByClassName('title');
    var blist = document.body.getElementsByClassName('body');
    var cblist = document.body.getElementsByClassName('post');
    for(i=0;i<data.length;i++){
        tlist[i].onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
        }
        blist[i].onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
        }
        dlist[i].onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
            var x = this.getAttribute('class');
            var msg = confirm(`Do you want to delete the post with title: \n " ${data[x[x.length-1]].title} "?`);
            if(msg){
                document.body.querySelector(`.post${x[x.length-1]}`).remove();
                ck=ck.filter(item => item !== (x[x.length-1]));
            }
            if(document.querySelector('.post')==undefined){
                selall.style.display='none';
                const nopost = document.createElement('h1');
                main.append(nopost);
                main.style.height='100%';
                nopost.textContent='No posts to show!!!';
            }
        }
        elist[i].onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
            var x = this.getAttribute('class');
            var oldtitle = document.querySelector(`.title${x[x.length-1]}`).textContent;
            var oldbody = document.querySelector(`.body${x[x.length-1]}`).textContent;
            function hidelayer() {
                document.querySelector('.layer').remove();
                document.body.style.overflowY = '';
              }
            function dynprompt(oldtitle,oldbody, cbfun){
                const layer = document.createElement('div');
                layer.setAttribute('class','layer');
                document.body.style.overflowY = 'hidden';
                document.body.append(layer);
                const form = document.querySelector('.eform');
                const formcont = document.querySelector('.formcon');
                etit.innerHTML='<b>Title:</b>';
                ebody.innerHTML='<b>Body:</b>';
                form.tinput.value=oldtitle;
                form.binput.value=oldbody;
                function done(newtitle,newbody) {
                    hidelayer();
                    formcont.style.display = 'none';
                    document.onkeydown = null;
                    cbfun(newtitle,newbody);
                }
                form.onsubmit = function() {
                let newtitle = form.tinput.value;
                let newbody = form.binput.value;
                if (newtitle == '' || newbody == '') return false; // ignore empty submit
                done(newtitle,newbody);
                return false;
                };
                form.cancel.onclick = function() {
                done(null);
                };
                document.onkeydown = function(e) {
                    if (e.key == 'Escape') {
                        done(null);
                    }
                }
                formcont.style.display = 'block';
                form.elements.tinput.focus();
            }
            dynprompt(oldtitle,oldbody, (newtitle, newbody) => {
                if(newbody!=null && newtitle!=null){
                    document.body.querySelector(`.title${x[x.length-1]}`).innerHTML= `<b>${newtitle}</b>`;
                    document.body.querySelector(`.body${x[x.length-1]}`).innerHTML= `${newbody}`;
                }
            });
        }    
        cblist[i].addEventListener('change', ckfunc);
        mdel.addEventListener('click',mdelfun);
    }
    var ck=[];
    var temp=[];
    function ckfunc(){
        x=this.querySelector('.checkbox').getAttribute('class');
        if(this.querySelector('.checkbox').checked){
            ck.push(x[x.length-1]);
            this.querySelector(`.tedit`).style.display= 'none';
        }
        else{
            ck=ck.filter(item => item !== (x[x.length-1]));
            this.querySelector(`.del`).style.display= 'block';
            this.querySelector(`.tedit`).style.display= 'block';
            flag=0;
        }
        // console.log(ck);
        if(ck.length>1){
            for(j=0;j<ck.length;j++){
                document.body.querySelector(`.del${ck[j]}`).style.display= 'none';
            }
            mdel.style.display='block';
        }
        else{
            for(i=0;i<ck.length;i++){
                document.body.querySelector(`.del${ck[i]}`).style.display= 'block';
            }
            mdel.style.display='none';
        }
    }
    var flag;
    selall.addEventListener('click',function(){
        var cboxlist = document.body.getElementsByClassName('checkbox');
        if((flag==0) || (flag==undefined)){
            for(i=0;i<cboxlist.length;i++){
                    cboxlist[i].checked=true;
                    var x=cboxlist[i].getAttribute('class');
                    ck.push(x[x.length-1]);
                    document.body.querySelector(`.tedit${x[x.length-1]}`).style.display = 'none';
                    document.body.querySelector(`.del${x[x.length-1]}`).style.display = 'none';
            }
            mdel.style.display='block';
            flag=1;
        }
        else{
            for(i=0;i<cboxlist.length;i++){
                cboxlist[i].checked=false;
                var x=cboxlist[i].getAttribute('class');
                document.body.querySelector(`.tedit${x[x.length-1]}`).style.display = 'block';
                document.body.querySelector(`.del${x[x.length-1]}`).style.display = 'block';
            }
            ck=[];
            mdel.style.display='none';
            flag=0;
        }
    });
    function mdelfun(){
        var seltitles=[];
        for(i=0;i<ck.length;i++){
            seltitles.push(document.querySelector(`.title${ck[i]}`).textContent);
        }
        seltitles=seltitles.map((item) => item= '\n' + item);
        var msg = confirm(`Do you want to delete posts with titles: \n ${seltitles}?`);
        if(msg){
            for(i=0;i<ck.length;i++){
                temp.push(ck[i]);
                document.body.querySelector(`.post${ck[i]}`).remove();
            }
            for(i=0;i<temp.length;i++){
                ck=ck.filter(item => item !== temp[i]);
            }
            mdel.style.display='none';
        }
        if(document.querySelector('.post')==undefined){
            selall.style.display='none';
            const nopost = document.createElement('h1');
            main.append(nopost);
            main.style.height='100%';
            nopost.textContent='No posts to show!!!';
        }
    }
}
async function myfun1(data){
    for(i=0;i<data.length;i++){
        await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${(id)*10-9+i}`).then((res) => {
                return res.json();
            }).then((info) => {
                myfun2(info,data);
        })
    }
    function myfun2(info,data){
        for(i=0;i<data.length;i++){
            const comments = document.createElement('div');
            comments.setAttribute('class', `comments${i}`);
            document.body.querySelector(`.post${i}`).append(comments);
            const com = document.createElement('div');
            com.setAttribute('class', `com com${i}`);
            document.body.querySelector(`.comments${i}`).append(com);
            com.innerHTML = '<i class="fa-solid fa-comments fa-xs"></i> Comments';
            for(j=5;j>=3;j--){
                const cmt = document.createElement('div');
                cmt.setAttribute('class', `cmt cmt${j}`);
                document.querySelector(`.comments${i}`).append(cmt);
                cmt.innerHTML = `<div><i class="fa-solid fa-user-tie fa-xs"></i><b> ${info[j-1].name}</b></div><div><i class="fa-solid fa-comment-dots fa-xs"></i> ${info[j-1].body}</div><div><i class="fa-solid fa-envelope fa-2xs"></i><b> ${info[j-1].email}</b></div>`
            }
        }
    }
}