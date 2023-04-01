let $ = document
let dataBase = null
let idUnic = 13
let datesArray = null
window.addEventListener('load', ()=>{
    dataBase = JSON.parse(localStorage.getItem('dataBaseSt'))
    datesArray = JSON.parse(localStorage.getItem('datesArray'))
    idUnic = localStorage.getItem("idUnic")

    dataBase ? getInfoSt(dataBase) :  dataBase = [];
    datesArray ? showDates(datesArray) :  datesArray = [];
    if(!idUnic) idUnic = 13
})

// variables
const mainPage = $.querySelector('.main-page')
const addPage = $.querySelector('.add-page')
const stuPage = $.querySelector('.stu-page')
const dataPage = $.querySelector('.date-page')
const listHQ = $.querySelector('.list-hq')

const names = $.querySelector('#names')
const father = $.querySelector('#father')
const brithday = $.querySelector('#brithday')
const tellphon = $.querySelector('#tellphon')
const saveInfo = $.querySelector('#save-info')
let sumInfo = ''
const listsStudent = $.querySelector('.lists-student')
const searchStudents = $.querySelector('#search-st')
const dates = $.querySelector('.dates')
const dateInput = $.querySelector('#date-input')
const addDate = $.querySelector('#add-date')
const infoStContainer = $.querySelector('.info-st-container')
let dateTop = $.querySelector('#date-top')

// change pages
function changePage(pg){
    mainPage.classList.remove('active-page')
    pg.classList.add('active-page')
}

// HQ list
function showPageEnd(){
    dataPage.classList.remove('active-page')
    listHQ.classList.add('active-page')
}
// controls of pages
$.querySelector('#list-of-students').addEventListener('click', ()=>{
    changePage(stuPage)
    getInfoSt(dataBase)
})
$.querySelector('#date-of-class').addEventListener('click', ()=>{
    changePage(dataPage)
})
$.querySelector('#add-new-student').addEventListener('click', ()=>{
    changePage(addPage)
})
$.querySelectorAll('.headP p').forEach((item)=>{
    item.addEventListener('click', ()=>{
        stuPage.classList.remove('active-page')
        dataPage.classList.remove('active-page')
        addPage.classList.remove('active-page')
        mainPage.classList.add('active-page')
        searchStudents.value = ''
    })
})
$.querySelector('#revous').addEventListener('click', ()=>{
    listHQ.classList.remove('active-page')
    dataPage.classList.add('active-page')
})

// update number of students
function updateNumSt(){
    $.querySelector('#num-st').innerHTML = dataBase.length
    $.querySelector('#num-st2').innerHTML = dataBase.length
    $.querySelector('#num-of-st').innerHTML = dataBase.length
}

// empty values of add page
function emptyValues(){
    names.value = ''
    father.value = ''
    brithday.value = ''
    tellphon.value = ''
}

// save value in array and set in local storage
saveInfo.addEventListener('click', ()=>{
    let newStObj = {
        id: idUnic++,
        nameObj: names.value.trim(),
        fatherObj: father.value.trim(),
        brithdayObj: brithday.value,
        tellphonObj: tellphon.value.trim(),
        datesGheybat: []
    }
    dataBase.push(newStObj)
    localStorage.setItem("dataBaseSt", JSON.stringify(dataBase))
    localStorage.setItem("idUnic", idUnic)
    updateNumSt()
    emptyValues()
})

// remove student in list
function removeSt(event){
    let dataUnic = event.target.getAttribute('data-Unic')
    let selectSt = dataBase.findIndex(ST => ST.id == dataUnic)
    dataBase.splice(selectSt, 1)
    localStorage.setItem("dataBaseSt", JSON.stringify(dataBase))
    updateNumSt()
    getInfoSt(dataBase)
}

// show infos of students in list
function getInfoSt(arrST){
    if(arrST){
        listsStudent.innerHTML = ''
        sumInfo = ''
        updateNumSt()
        arrST.forEach(std =>{
            let showDTQeybat = std.datesGheybat.toString().replace(","," * ")
            sumInfo += ` <div class="list">
                            <p><span>(${std.id})</span>:نام و نام خانوادگی: <span>${std.nameObj}</span></p>
                            <p>نام پدر: <span>${std.fatherObj}</span></p>
                            <p>تاریخ تولد: <span>${std.brithdayObj}</span></p>
                            <p>شماره تماس: <span>${std.tellphonObj}</span></p>
                            <div class="enz-st">
                                <p>غیبت : ${std.datesGheybat.length} <span>(${showDTQeybat})</span></p>
                                <button type="button" data-Unic="${std.id}" onclick="removeSt(event)"><i class="far fa-trash-alt"> حذف</i></button>
                            </div>
                        </div>`
        })
        listsStudent.innerHTML = sumInfo
    }
}

// search student in list
searchStudents.addEventListener('keyup', event =>{
    if(dataBase){
        let filterStudents = dataBase.filter(st =>{
            return st.nameObj.includes(searchStudents.value.trim())
        })
        getInfoSt(filterStudents)
    }
})

//remove dates from list
function removeDate(event){
    let EnterValue = event.target.parentElement.innerText.replace("حذف","")
    let selectDT = datesArray.findIndex(dt => dt==EnterValue)
    datesArray.splice(selectDT, 1)
    localStorage.setItem("datesArray", JSON.stringify(datesArray))
    showDates()
    dataBase.forEach(st => {
        if(st.datesGheybat.includes(EnterValue)){
            let removeDT = st.datesGheybat.findIndex(dt => dt==EnterValue)
            st.datesGheybat.splice(removeDT, 1)
        }
    })
    localStorage.setItem("dataBaseSt", JSON.stringify(dataBase))
}

// Qeybat function
function QeybatFun(event){
    let idST = event.target.previousElementSibling.firstElementChild.innerText
    let tarikh = dateTop.innerText
    let qeybatSt = dataBase.find(ST => ST.id == idST)
    if(!qeybatSt.datesGheybat.includes(tarikh)){
        qeybatSt.datesGheybat.push(tarikh)
        event.target.style.backgroundColor = "#00d807"
        event.target.style.color = "#fff"
    }else{
        let qeybatStrevers = qeybatSt.datesGheybat.findIndex(dt => dt == tarikh)
        qeybatSt.datesGheybat.splice(qeybatStrevers, 1)
        event.target.style.backgroundColor = "#fff"
        event.target.style.color = "#00d807"
    }
    localStorage.setItem("dataBaseSt", JSON.stringify(dataBase))
}

// Enter a date
function EnterList(event){
    if(event.target.tagName === "DIV"){
        showPageEnd()
        let stInDates = ''
        dataBase.forEach(st =>{
            stInDates += `<div class="info-st">
                            <div class="info-st-names"><span>${st.id}</span>${st.nameObj}</div>
                            <button onclick="QeybatFun(event)"> غیبت</button>
                            </div>`
        })
        infoStContainer.innerHTML = stInDates
        dateTop.innerHTML = event.target.innerText.replace("حذف","")
    }
}

//show dates in list
function showDates(){
    localStorage.setItem("datesArray", JSON.stringify(datesArray))
    let sumDate = ''
    datesArray.forEach(d =>{
        sumDate += `<div onclick="EnterList(event)">${d}<button onclick="removeDate(event)"><i class="far fa-trash-alt"></i> حذف</button></div>`
    })
    dates.innerHTML = sumDate
}

// add dates in list
addDate.addEventListener('click', ()=>{
    datesArray.push(dateInput.value)
    showDates()
    dateInput.value = ''
})