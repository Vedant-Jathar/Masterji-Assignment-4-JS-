let url = "https://api.freeapi.app/api/v1/public/books"
let book_container = document.getElementById('book_container')
let search_box = document.getElementById('search_box')

fetch(url)
    .then((data) => data.json())
    .then((data) => {
        data.data.data.forEach((item) => {


            //Creating a book div:
            let book_div = document.createElement('div')
            book_div.className = "book_div"
            let book_img = document.createElement('img')
            book_img.className = "book_img"
            book_img.src = item.volumeInfo.imageLinks.smallThumbnail
            book_img.style.width = "100%"

            let a_tag = document.createElement('a')
            a_tag.href = item.volumeInfo.infoLink
            a_tag.appendChild(book_img)
            book_div.appendChild(a_tag)
            // a_tag.style.width = "100%"

            book_container.appendChild(book_div)

            let info_div = document.createElement('info_div')
            info_div.className = "info_div"

            //Creating the title:
            let title = document.createElement('p')
            title.className = "title"
            title.innerText = `Title: ${item.volumeInfo.title}`
            info_div.appendChild(title)

            //Creating the author:
            let author = document.createElement('p')
            author.innerText = "Authors: "
            item.volumeInfo.authors.forEach((item) => {
                author.innerText += ` ${item} `
            })
            info_div.appendChild(author)

            //Creating the publisher:
            let publisher = document.createElement('p')
            publisher.innerText = `Publisher: ${item.volumeInfo.publisher}`
            info_div.appendChild(publisher)

            //Creating the published_date:
            let publishe_date = document.createElement('p')
            publishe_date.innerText = `Published Date: ${item.volumeInfo.publishedDate}`
            info_div.appendChild(publishe_date)

            book_div.appendChild(info_div)

        })
    })

// Viewing Options(List or Grid):

let viewOptions = document.getElementById('viewing_options')

viewOptions.addEventListener('change', function () {
    let book_imgs = document.getElementsByClassName('book_img')
    let book_imgs_array = Array.from(book_imgs)


    if (viewOptions.value == "list") {
        book_container.style.gridTemplateColumns = "1fr"
        book_imgs_array.forEach((item) => {
            item.style.width = "10%"
        })


    }

    else if (viewOptions.value == "grid") {
        book_container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
        book_imgs_array.forEach((item) => {
            item.style.width = "100%"
        })


    }
})

//Filtering the books according to the selected option(title or author):

let filterOptions = document.getElementById('filterBy_options')

search_box.addEventListener('input', function () {
    let input_value = search_box.value.toLowerCase()
    let book_divs = document.getElementsByClassName('book_div')
    let book_divs_array = Array.from(book_divs)

    //filtering by title
    if (filterOptions.value === "title") {

        book_divs_array.forEach((item) => {
            item.style.display = "block"
            if (!item.children[1].children[0].innerText.toLowerCase().includes(input_value)) {
                item.style.display = "none"
            }
        })
    }

    //filtering by athor
    else if (filterOptions.value === "authors") {
        book_divs_array.forEach((item) => {
            item.style.display = "block"
            if (!item.children[1].children[1].innerText.toLowerCase().includes(input_value)) {
                item.style.display = "none"
            }
        })
    }
})

// Sorting the books according to the title:

let sortByOptions = document.getElementById('sortByOptions')

sortByOptions.addEventListener('change', function () {
    if (sortByOptions.value === "title") {
        let book_divs = document.getElementsByClassName('book_div')
        let book_divs_array = Array.from(book_divs)

        book_divs_array.sort((a, b) => (a.children[1].innerText).localeCompare(b.children[1].innerText))
        console.log(book_divs_array);

        book_divs_array.forEach((item) => {
            item.remove()
            book_container.appendChild(item)
        })
    }

    else if (sortByOptions.value === "published_date") {
        let book_divs = document.getElementsByClassName('book_div')
        let book_divs_array = Array.from(book_divs)

        book_divs_array.sort((a, b) => new Date(a.children[1].children[3].innerText) - new Date(b.children[1].children[3].innerText))

        book_divs_array.forEach((item) => {
            item.remove()
            book_container.appendChild(item)
        })

    }
})




