async function getAvailableCourses(){
    const data = await new Promise((resolve, reject)=>{
        fetch('https://golf-courses-api.herokuapp.com/courses/')
        .then((response)=>response.json())
        .then((data)=>{
            resolve(data)
        })
    })
    const courses = data.courses
    // console.log(courses)
    return courses
}

let allCourses = []

export async function runOnLoad(){
    const courses = await getAvailableCourses()
    // allCourses = []
    console.log(allCourses)
    courses.forEach((course, i) => {
        if(allCourses.length === 0 || allCourses.length < courses.length){
            allCourses.push(course)
        } else {
            
        }
    });
}

export const courses = allCourses


async function getCourseInfo(courseId) {
    const data = await new Promise((resolve, reject)=>{
        fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
        .then((response)=>response.json())
        .then((data=>resolve(data)))
    })
    return data
}