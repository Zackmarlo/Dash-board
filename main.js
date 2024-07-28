const imgs = document.querySelectorAll(".link")

imgs.forEach(img => {
    img.addEventListener("mouseover" , ()=>{
        img.innerHTML = `<img src="images/${img.title} filled.png" alt="person">${img.title}`
    })
    img.addEventListener("mouseout" , ()=>{
        img.innerHTML = `<img src="images/${img.title}.png" alt="person">${img.title}`
    })
})

const math_btn = document.querySelector(".math")
const programming_btn = document.querySelector(".programming")

const selected_courses_card_title = document.querySelectorAll(".course-data .course-title")


math_btn.addEventListener("click" , ()=>{
    math_btn.classList.add("active")
    programming_btn.classList.remove("active")
    curr_program_courses = math_courses
    index = cards.length
    reloadPageData()
})
programming_btn.addEventListener("click" , ()=>{
    programming_btn.classList.add("active")
    math_btn.classList.remove("active")
    curr_program_courses = programming_courses
    index = cards.length
    reloadPageData()
})

function reloadPageData(){
    cards = document.querySelectorAll(".card")
    left_slider.disabled = true
    right_slider.disabled = false
    for (let i = 0; i < cards.length; i++) {
        new_card = document.createElement("div")
        new_card.classList.add("card")
        new_card.innerHTML= `<img src="images/${curr_program_courses[i]}.png" alt="n"> 
                        <p>${curr_program_courses[i]}</p>`
        cards_background.removeChild(cards[i])
        cards_background.appendChild(new_card)
        
    }
    for (let i = 0; i < selected_courses_card_title.length; i++) {
        selected_courses_card_title[i].textContent = curr_program_courses[i]
    }
    index = cards.length
}
let math_courses = ["Linear Algebra" , "Calculus" ,"Ordinary Deferential Equation" ,"Abstract Algebra",
    "Statistics" , "Discreet Math" , "Introduction to Topology" , "Number Theory"]

let programming_courses = ["Ui Ux design" , "Python" , "Web Development" , "Cyber Security" ,
    "Data Structure" , "Data Base" , "Machine Learning" , "Deep Learning"]

const right_slider = document.querySelector(".arrow.right")
const left_slider = document.querySelector(".arrow.left")
let cards_background = document.querySelector(".cards_background")
let cards = document.querySelectorAll(".card")
let new_card
let curr_program_courses = math_courses

let index = cards.length
let times_run = 0
let interval

right_slider.addEventListener("click" ,()=>{
    cards = document.querySelectorAll(".card")
    left_slider.disabled = false
    addCard()
    cards = document.querySelectorAll(".card")
    cards.forEach(card =>{
        card.classList.add("move_right")
    });
    
    
    setTimeout(() => {
        cards[0].classList.add("hidden")
        cards = document.querySelectorAll(".card")
        new_card.classList.remove("new_right")
        cards.forEach(card=>{
            card.classList.remove("move_right")
        })
        cards_background.removeChild(cards[0])
    }, 720);
    
    if (index === math_courses.length){
        right_slider.disabled = true
    }
})
left_slider.addEventListener("click" ,()=>{
    right_slider.disabled = false
    if (index === 0){
        left_slider.disabled = true
    }
    addCardLeft()
    cards = document.querySelectorAll(".card")
    cards.forEach(card =>{
        card.classList.add("move_left")
    });
    
    
    setTimeout(() => {
        cards[cards.length-1].classList.add("hidden")
        cards = document.querySelectorAll(".card")
        new_card.classList.remove("new_left")
        cards.forEach(card=>{
            card.classList.remove("move_left")
        })
        cards_background.removeChild(cards[cards.length-1])
    }, 720);
    
    if (index-4 === 0){
        left_slider.disabled = true
    }
})

function addCard() {
    new_card = document.createElement("div")
    new_card.classList.add("card" , "new_right")
    new_card.innerHTML= `<img src="images/${curr_program_courses[index]}.png" alt="n"> 
                        <p>${curr_program_courses[index]}</p>`
    cards_background.appendChild(new_card)
    console.log(index)
    index++
    
}
function addCardLeft(){
    new_card = document.createElement("div")
    new_card.classList.add("card" , "new_left")
    new_card.innerHTML= `<img src="images/${curr_program_courses[index-5]}.png" alt="n"> 
                        <p>${curr_program_courses[index-5]}</p>`
    cards_background.insertBefore(new_card,cards_background.firstChild)
    index--
}
function loadPercentage(){
    const progress_bar = document.querySelectorAll(".progress-bar svg circle")
    const percentage = document.querySelectorAll(".percentage")
    const completed_lessons =document.querySelectorAll(".completed-lessons")
    const lessons_num =document.querySelectorAll(".lessons")
    const state = document.querySelectorAll(".state")
    for(let i=0 ; i < completed_lessons.length ; i++){
        const completed_lessons_data = completed_lessons[i].textContent
        const lessons_num_data = lessons_num[i].textContent
        progress_bar[i].style.strokeDashoffset = 450-(350 * (Number(completed_lessons_data)/Number(lessons_num_data)))
        percentage[i].textContent = Math.round((Number(completed_lessons_data)/Number(lessons_num_data))*100) +"%"
        percentage[i].style.marginLeft = `${-(percentage[i].clientWidth)/2}px`
        if (Math.round((Number(completed_lessons_data)/Number(lessons_num_data))*100) >= 80 ) {
            progress_bar[i].style.stroke = "rgb(0, 128, 0)"
        }else if (Math.round((Number(completed_lessons_data)/Number(lessons_num_data))*100) >= 50){
            progress_bar[i].style.stroke = "orange"
        }else{
            progress_bar[i].style.stroke = "gray"
        }
        if(Math.round((Number(completed_lessons_data)/Number(lessons_num_data))*100) === 100){
            state[i].style.backgroundColor = "rgb(0, 128, 0)"
            state[i].style.color = "white"
            state[i].textContent = "completed"
        }
    }
}
loadPercentage()

function isLeapYear(year){
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

function febDays(year) {
    return isLeapYear(year) ? 29 : 28
}

const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
    "October", "November","December"]

const curr_date = new Date()
const calender_month = document.querySelector(".month")

function fillCalender(year ,month){
    const calender_year = document.querySelector(".year")
    const days = document.querySelector(".days")

    let days_of_month = [31 , febDays(year) , 31 , 30 , 31 , 30, 31 , 31 ,30,31 ,30, 31]
    days.innerHTML = ""
    
    let first_day = new Date(year , month , 1)
    
    calender_month.textContent = month_names[month]
    calender_year.textContent = year
    let fill_rest = 1

    for (let i = 0; i < 35; i++) {
        const day = document.createElement("div")
        if(i < first_day.getDay()){
            day.classList.add("disabled")
            day.textContent = days_of_month.at(month-1) - first_day.getDay() + i +1
        }else if (i > days_of_month[first_day.getMonth()] + first_day.getDay()-1){
            day.classList.add("disabled")
            day.textContent = fill_rest
            fill_rest++
        }else{
            day.innerHTML= i - first_day.getDay() + 1
            day.innerHTML+= `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            
            if(i - first_day.getDay() + 1 === curr_date.getDate() && year === curr_date.getFullYear() && month === curr_date.getMonth()){
                day.classList.add("curr_day")
                day.innerHTML= curr_date.getDate()
            }
        }

        days.appendChild(day)
    }
}
let curr_year = curr_date.getFullYear()
let curr_month = curr_date.getMonth()

fillCalender(curr_year ,curr_month)

const next_year_arrow = document.querySelector(".arrow.next")
const prev_year_arrow = document.querySelector(".arrow.prev")

next_year_arrow.addEventListener("click",()=>{
    curr_year++
    fillCalender(curr_year ,curr_month)
    active_return_button()
})
prev_year_arrow.addEventListener("click",()=>{
    curr_year--
    fillCalender(curr_year ,curr_month)
    active_return_button()
})

const month_list = document.querySelector(".month-list")

calender_month.addEventListener("click",()=>{
    month_list.classList.add("show")
    const month_pic = document.querySelectorAll(".month-list div")
    month_pic.forEach(month=>{
        month.addEventListener("click",()=>{
            curr_month = month.id
            fillCalender(curr_year , curr_month)
            month_list.classList.remove("show")
            active_return_button()
        })
    })
    
})

const return_to_curr_date = document.querySelector(".return")
function active_return_button(){
    if(curr_year === curr_date.getFullYear() && curr_month === curr_date.getMonth()){
        return_to_curr_date.style.display = "none"
    }else{
        return_to_curr_date.style.display = "block"
}
}

return_to_curr_date.addEventListener("click",()=>{
    curr_year = curr_date.getFullYear()
    curr_month = curr_date.getMonth()
    fillCalender(curr_year,curr_month)
    return_to_curr_date.style.display = "none"
})

const assignment_score_percent = document.querySelectorAll(".score-percent .percent")
const bar_fill = document.querySelectorAll(".bar .fill")
const right_answers = document.querySelectorAll(".right-answers")
const total_questions = document.querySelectorAll(".total-questions")

for (let i = 0; i < assignment_score_percent.length; i++) {
    let right_answers_num = Number(right_answers[i].textContent)
    let total_questions_num = Number(total_questions[i].textContent)
    let percent = Math.round((right_answers_num / total_questions_num)*100)
    assignment_score_percent[i].textContent = percent+"%"
    bar_fill[i].style.width = `${percent}%`
    if(percent >= 80){
        bar_fill[i].style.backgroundColor = "rgb(0, 128, 0)"
    }else if (percent >=50){
        bar_fill[i].style.backgroundColor = "orange"
    }else{
        bar_fill[i].style.backgroundColor = "red"
    }
    
}

let change_theme = document.querySelector('.theme')


change_theme.onclick = () => {
    document.querySelector(".theme button").innerHTML = `<img src="images/${document.querySelector('body').classList[0]} theme.png" alt="dark theme icon"></img>`
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

function checkWidth() {
    const width = window.innerWidth;
    cards_background = document.querySelector(".cards_background")
    cards = document.querySelectorAll(".card")
    const numChildren = cards_background.children.length

    if (width <= 1024 && numChildren > 3) {
        cards_background.removeChild(cards[cards.length-1])
    } else if(width > 1300 && numChildren < 4){
        new_card = document.createElement("div")
        new_card.classList.add("card")
        new_card.innerHTML= `<img src="images/${curr_program_courses[index]}.png" alt="n"> 
                            <p>${curr_program_courses[index]}</p>`
        cards_background.appendChild(new_card)

    }
    
    else if (width <= 768 && numChildren > 2) {
        cards_background.removeChild(cards[cards.length-1])        
    }else if(width > 1024 && numChildren< 3){
        new_card = document.createElement("div")
        new_card.classList.add("card")
        new_card.innerHTML= `<img src="images/${curr_program_courses[index]}.png" alt="n"> 
                            <p>${curr_program_courses[index]}</p>`
        cards_background.appendChild(new_card)
    }
    else if (width <= 425 && numChildren > 1) {
        cards_background.removeChild(cards[cards.length-1])        
    }else if(width > 768 && numChildren< 2){
        new_card = document.createElement("div")
        new_card.classList.add("card")
        new_card.innerHTML= `<img src="images/${curr_program_courses[index]}.png" alt="n"> 
                            <p>${curr_program_courses[index]}</p>`
        cards_background.appendChild(new_card)
    }
    cards_background = document.querySelector(".cards_background")
    cards = document.querySelectorAll(".card")
    index = cards.length
    console.log(cards[cards.length-1])
}

window.addEventListener('resize', ()=>{for(let i= 0 ; i < 3 ; i++ ){checkWidth()}});
window.addEventListener('load', ()=>{for(let i= 0 ; i < 3 ; i++ ){checkWidth()}});


const menu = document.querySelector(".menu")
const sidebar = document.querySelector(".sidebar")
const toggle_sidebar = document.querySelector(".close")

menu.addEventListener("click",()=>{
    sidebar.style.transform = "translateX(100%)"
    sidebar.style.hight = `${window.innerHeight}px`
})
toggle_sidebar.addEventListener("click",()=>{
    sidebar.style.transform = "translateX(-100%)"
})