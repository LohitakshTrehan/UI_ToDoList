/**
 * Created by lohitakshtrehan on 25/06/17.
 */
/**
 * Created by lohitakshtrehan on 24/06/17.
 */

var arrofitems = [];

window.onload = function () {
    let gettext=document.getElementById("gettext");
    let addtext=document.getElementById("addtext");
    let deldone=document.getElementById("deldone");
    let list=document.getElementById("list");
    retrievelocal(list);

    addtext.onclick = function () {
        saveandupdate(gettext.value,list);
    }
    deldone.onclick = function () {
        deletechecked(list);
    }

};

function saveandupdate(val,listid) {
    arrofitems.push({
        work: val,
        done: false
    });
    addtolocal();
    retrievelocal(listid);
}

function addtolocal() {
    localStorage.setItem('locality', JSON.stringify(arrofitems));
}

function retrievelocal(listid) {
    let localdata = localStorage.getItem('locality');
    if(localdata)
    {
        arrofitems= JSON.parse(localdata);
        showlist(listid);
    }
}

function showlist(listid) {
    listid.innerHTML='';
    var scop = listid;
    for (let i in arrofitems)
    {

        let temp = document.createElement('li');
        temp.setAttribute("data-id", i);
        let labl= document.createElement('label');
        labl.setAttribute('class','custom-control custom-checkbox');
        let btemp = document.createElement('input');
        btemp.setAttribute('type','checkbox');
        btemp.setAttribute('class','custom-control-input');
        btemp.addEventListener('click',function () { changecss(scop,i) });
        let sp1 = document.createElement('span');
        sp1.setAttribute('class','custom-control-indicator');
        let txt = document.createElement('span');
        txt.innerText= arrofitems[i].work;
        txt.setAttribute('class','custom-control-description');
        let dtemp = document.createElement('input');
        dtemp.setAttribute('type','button');
        dtemp.setAttribute('value','X');
        dtemp.addEventListener('click',function(){ deleteselected(dtemp,listid); });
        let down = document.createElement('input');
        down.setAttribute('type','button');
        down.setAttribute('value','down');
        let up = document.createElement('input');
        up.setAttribute('type','button');
        up.setAttribute('value','up');
        up.addEventListener('click',function(){ ups(up,listid); });
        down.addEventListener('click',function(){ downs(down,listid); });
        if(arrofitems[i].done==true) {
            txt.style.textDecoration = "line-through";
            btemp.setAttribute('checked','checked');
        }
        labl.appendChild(btemp);
        labl.appendChild(sp1);
        labl.appendChild(txt);
        temp.appendChild(labl);
        temp.appendChild(up);
        temp.appendChild(down);
        temp.appendChild(dtemp);
        //listid.appendChild(temp);
        listid.insertAdjacentElement('afterbegin',temp);
    }
    if(arrofitems.length>=2){
        listid.firstChild.childNodes[1].remove();
        listid.lastChild.childNodes[2].remove();}

    else {if(arrofitems.length>0) {
        listid.firstChild.childNodes[1].remove();
        listid.firstChild.childNodes[1].remove();}
    }

}

function changecss(listid,i) {
    let arrindex = i;
    console.log(i);
    if(arrofitems[arrindex].done == false)
        arrofitems[arrindex].done = true;
    else
        arrofitems[arrindex].done = false;
    addtolocal();
    retrievelocal(listid);
    /*let ln= arrofitems.length;
    if(listid.childNodes[ln - (i+1)].childNodes[0].childNodes[2].style.textDecoration!="line-through")
        listid.childNodes[ln - (i+1)].childNodes[0].childNodes[2].style.textDecoration = "line-through";
    else
        listid.childNodes[ln - (i+1)].childNodes[0].childNodes[2].style.textDecoration = "";*/
}


function deletechecked(listid) {
    retrievelocal(listid);
    arrofitems=arrofitems.filter(istrue);
    addtolocal();
    retrievelocal(listid);
}


function istrue(obj) {
    return obj.done ==false;
}

function deleteselected(childd,listid) {
    let parentlistid = childd.parentNode.getAttribute("data-id");
    arrofitems.splice(parentlistid,1);
    addtolocal();
    retrievelocal(listid);
}

function ups(childd,listid) {
    let parentlistid = parseInt(childd.parentNode.getAttribute("data-id"));
    let temp = arrofitems[parentlistid+1];
    arrofitems[parentlistid+1]=arrofitems[parentlistid];
    arrofitems[parentlistid]=temp;
    addtolocal();
    retrievelocal(listid);
}

function downs(childd,listid) {
    let parentlistid = parseInt(childd.parentNode.getAttribute("data-id"));
    let temp = arrofitems[parentlistid-1];
    arrofitems[parentlistid-1]=arrofitems[parentlistid];
    arrofitems[parentlistid]=temp;
    addtolocal();
    retrievelocal(listid);
}