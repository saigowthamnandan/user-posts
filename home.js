const main = document.createElement('div');
main.setAttribute('id','main');
document.body.prepend(main);
var head = document.createElement('h2');
main.append(head);
head.textContent='User details';
var tab = document.createElement('table');
main.append(tab);
var rowh = document.createElement('tr');
document.body.querySelector('table').append(rowh);
rowh.setAttribute('id','rowh');
var th = ['Name', 'Email', 'Phone', 'Website', 'Company name'];
for(i=0;i<5;i++){
    const h = document.createElement('td');
    h.setAttribute('class','cell');
    document.getElementById('rowh').append(h);
    x=th[i];
    h.innerHTML = `<b>${x}</b>`;
}
var fethead = fetch('https://jsonplaceholder.typicode.com/users');
fethead.then((res) => {
    return res.json();
}).then((data) => {
    for(let j=0;j<data.length;j++){
        var urow = document.createElement('tr');
        urow.setAttribute('class',`user urow${j}`);
        document.body.querySelector('table').append(urow);
        for(k=0;k<Object.keys(data[j]).length;k++){
            if(k==0 || k==2 || k==4){
                continue;
            }
            var udata = document.createElement('td');
            document.querySelector(`.urow${j}`).append(udata);
            udata.setAttribute('class','cell');
            if(k==7){
                udata.textContent = `${(Object.values(data[j])[k]).name}`;
            }
            else{
                udata.textContent = `${Object.values(data[j])[k]}`;
            }
        }
        var rows = document.body.querySelector('table').getElementsByClassName('user');
        function mouseout(){
            if(j%2==0){
                document.body.querySelector(`.urow${j}`).style.background = 'white';
                document.body.querySelector(`.urow${j}`).style.color = 'rgb(100, 100, 100)';
            }
            else{
                document.body.querySelector(`.urow${j}`).style.background = 'rgb(223, 255, 252)';
                document.body.querySelector(`.urow${j}`).style.color = 'rgb(95, 95, 95)';
            }
        }
        mouseout();
        rows[j].onmouseover=function(){
            this.style.background = 'rgb(217, 217, 217)';
        }
        rows[j].onmouseout=function(){mouseout();};
        rows[j].onclick = function(){
            var uid = this.getAttribute('class');
            var id = (uid[uid.length-1]);
            window.open(`posts.html?${id}`);
            // localStorage.setItem('userid',`${id}`);
            // window.location = 'posts.html';
        }
    }
})
var desc = document.createElement('i');
main.append(desc);
desc.style.marginTop='20px';
desc.textContent=`"Clicking on the user details will take you to the user's posts"`;